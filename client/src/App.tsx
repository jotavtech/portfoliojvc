import { useState, useEffect, Suspense, lazy } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";
import { SectionObserver } from "./components/SectionObserver";
import { useScrollSpy } from "./hooks/use-scroll-spy";
import { useLazySection } from "./hooks/use-lazy-section";
import SectionPlaceholder from "./components/SectionPlaceholder";
import Footer from "./components/Footer";
import InitialLoading from "./components/InitialLoading";
import { Toaster } from "./components/ui/toaster";

// Lazy loading sections
const Projects = lazy(() => import("./components/Projects"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));

// Loading component for sections
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-white text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <p>Loading section...</p>
    </div>
  </div>
);

// Componente wrapper para lazy loading inteligente
const LazySection = ({ 
  component: Component, 
  onLoad, 
  rootMargin = "-20%",
  placeholderHeight = "min-h-screen"
}: { 
  component: React.ComponentType<any>; 
  onLoad?: () => void;
  rootMargin?: string;
  placeholderHeight?: string;
}) => {
  const { sectionRef, isVisible } = useLazySection({
    threshold: 0.1,
    rootMargin,
    onLoad
  });

  return (
    <div ref={sectionRef as any}>
      {isVisible ? (
        <Suspense fallback={<SectionLoader />}>
          <Component />
        </Suspense>
      ) : (
        <SectionPlaceholder height={placeholderHeight} />
      )}
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logoTransformed, setLogoTransformed] = useState(false);
  const [loadedSections, setLoadedSections] = useState({
    projects: false,
    about: false,
    skills: false,
    contact: false
  });
  
  const activeSection = useScrollSpy({
    sectionIds: ["home", "projects", "about", "skills", "contact"],
    offset: 100
  });
  const { scrollY } = useScroll();

  // Close mobile menu when a section becomes active (i.e., user has scrolled to a new section)
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [activeSection]);

  // Show social links only after scrolling beyond Hero section
  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = window.innerHeight;
    setShowSocialLinks(latest > heroHeight * 0.7);
  });

  // Function to mark section as loaded
  const markSectionLoaded = (sectionName: keyof typeof loadedSections) => {
    setLoadedSections(prev => ({
      ...prev,
      [sectionName]: true
    }));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <InitialLoading onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <CustomCursor />
      
      <Header 
        activeSection={activeSection} 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        logoTransformed={logoTransformed}
      />
      
      <main>
        <SectionObserver>
          <Hero 
            showSocialLinks={showSocialLinks} 
            onLogoTransform={setLogoTransformed}
          />
        </SectionObserver>

        <LazySection 
          component={Projects} 
          onLoad={() => markSectionLoaded('projects')}
          rootMargin="-20%"
        />

        <LazySection 
          component={About} 
          onLoad={() => markSectionLoaded('about')}
          rootMargin="-20%"
        />

        <LazySection 
          component={Skills} 
          onLoad={() => markSectionLoaded('skills')}
          rootMargin="-20%"
        />

        {/* Gradiente de transição entre Skills e Contato removido */}

        <LazySection 
          component={Contact} 
          onLoad={() => markSectionLoaded('contact')}
          rootMargin="-20%"
        />
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
