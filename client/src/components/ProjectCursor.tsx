import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            const projectsSection = document.getElementById('projects');
            const rect = projectsSection?.getBoundingClientRect();
            
            if (rect && 
                e.clientY >= rect.top && 
                e.clientY <= rect.bottom && 
                e.clientX >= rect.left && 
                e.clientX <= rect.right
            ) {
                setIsVisible(true);
                setMousePosition({ x: e.clientX, y: e.clientY });
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
            animate={{
                x: mousePosition.x - 50,
                y: mousePosition.y - 50,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
            <div className="relative w-[100px] h-[100px]">
                <div className="absolute inset-0 bg-white rounded-full opacity-50 blur-lg" />
                <div className="absolute inset-0 flex items-center justify-center text-black font-bold">
                    Projects
                </div>
            </div>
        </motion.div>
    );
}