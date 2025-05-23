import { motion } from "framer-motion";
import { Project } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        duration: 0.8 
      } 
    }
  };

  const handleViewProject = () => {
    if (project.url) {
      window.open(project.url, '_blank');
    }
  };

  return (
    <motion.div 
      className="project-card group relative overflow-hidden rounded-2xl shadow-xl bg-white/5 backdrop-blur-sm"
      variants={item}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img 
          src={project.imageUrl} 
          alt={project.imageAlt} 
          className="w-full h-full object-cover"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            filter: isHovered ? "brightness(0.7)" : "brightness(1)"
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      <div className="p-6 bg-gradient-to-t from-black/90 to-black/50">
        <h4 className="text-xl font-bold text-white mb-2">
          {project.title}
        </h4>
        
        <p className="text-white/90 text-sm mb-4">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="text-xs px-3 py-1 rounded-full bg-secondary text-white font-medium"
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: index * 0.1
                }
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {project.url && (
          <motion.button
            onClick={handleViewProject}
            className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-white py-3 px-4 rounded-lg font-bold mt-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.9,
              y: isHovered ? 0 : 5
            }}
            transition={{ duration: 0.3 }}
          >
            Visualizar Projeto
            <ExternalLink size={16} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
