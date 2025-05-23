import { useState, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { useScrollSpy } from "./hooks/use-scroll-spy";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
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

  // Mostrar links sociais somente após rolar além da seção Hero
  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = window.innerHeight;
    setShowSocialLinks(latest > heroHeight * 0.7);
  });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomCursor />
      
      <Header 
        activeSection={activeSection} 
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <main>
        <Hero showSocialLinks={showSocialLinks} />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
