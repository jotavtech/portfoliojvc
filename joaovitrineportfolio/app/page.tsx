import { Hero } from "@/components/sections/Hero";
import { FeaturedSystem } from "@/components/sections/FeaturedSystem";
import { SelectedProjects } from "@/components/sections/SelectedProjects";
import { Experience } from "@/components/sections/Experience";
import { Technologies } from "@/components/sections/Technologies";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { LabTeaser } from "@/components/sections/LabTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSystem />
      <SelectedProjects />
      <Experience />
      <Technologies />
      <About />
      <LabTeaser />
      <Contact />
    </>
  );
}
