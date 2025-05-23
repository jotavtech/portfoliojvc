import { motion } from "framer-motion";
import { Project } from "@/lib/constants";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="project-card group relative overflow-hidden rounded-xl shadow-lg"
      variants={item}
    >
      <img 
        src={project.imageUrl} 
        alt={project.imageAlt} 
        className="w-full h-64 object-cover transition-transform duration-500 ease-in-out"
      />
      <div className="project-overlay absolute inset-0 bg-primary bg-opacity-80 p-6 flex flex-col justify-end opacity-0 transition-opacity duration-300">
        <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
        <p className="text-neutral-200 text-sm mb-4">{project.description}</p>
        <div className="flex gap-2">
          {project.tags.map((tag, index) => (
            <span 
              key={index} 
              className={`text-xs px-3 py-1 rounded-full ${
                index === 0 
                  ? "bg-secondary text-white" 
                  : "bg-white text-primary"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
