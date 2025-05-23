import { useState } from "react";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/constants";
import { motion } from "framer-motion";
import ProjectCard from "./ui/project-card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

type FilterCategory = "all" | "web" | "ui" | "branding";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const { ref, isInView } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter,
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={cn(
            "max-w-2xl mx-auto text-center mb-16 reveal-element",
            isInView && "active",
          )}
        >
          <h2 className="text-sm uppercase tracking-widest gradient-text font-semibold mb-4">
            Meus trabalhos
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Projetos em Destaque
          </h3>
          <p className="text-muted-foreground">
            Uma coleção selecionada dos meus projetos mais recentes,
            demonstrando habilidades em design e desenvolvimento.
          </p>
        </div>

        <div
          className={cn(
            "mb-10 flex flex-wrap justify-center gap-4 reveal-element",
            isInView && "active",
          )}
        >
          <button
            className={cn(
              "px-4 py-2 rounded-lg transition-colors shadow-md",
              activeFilter === "all"
                ? "bg-secondary text-white"
                : "bg border border-border hover:border-secondary hover:text-secondary",
            )}
            onClick={() => setActiveFilter("all")}
          >
            Todos
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-lg transition-colors shadow-md",
              activeFilter === "web"
                ? "bg-secondary text-white"
                : "bg border border-border hover:border-secondary hover:text-secondary",
            )}
            onClick={() => setActiveFilter("web")}
          >
            Web Design
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-lg transition-colors shadow-md",
              activeFilter === "ui"
                ? "bg-secondary text-white"
                : "bg- border border-border hover:border-secondary hover:text-secondary",
            )}
            onClick={() => setActiveFilter("ui")}
          >
            UI/UX
          </button>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-element"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
