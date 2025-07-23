import { motion } from "framer-motion";
import { useRef, Suspense, useMemo } from "react";
import { projects } from "@/lib/constants";
import CardSwap, { Card } from "./CardSwap";
import SimpleImage from "./SimpleImage";
import LoadingSpinner from "./LoadingSpinner";
import { getDynamicConfig, optimizeCloudinaryImage } from "@/lib/performance";

// Componente de fundo otimizado para performance
function OptimizedBackground() {
	return (
		<div className="absolute inset-0 overflow-hidden">
			{/* Gradiente estático otimizado */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-purple-900 to-slate-900" />
			
			{/* Padrão de ondas simplificado */}
			<div
				className="absolute inset-0 opacity-10"
				style={{
					background: `
						radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
						radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
						radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)
					`
				}}
			/>
		</div>
	);
}

export default function Projects() {
	const sectionRef = useRef(null);
	const config = useMemo(() => getDynamicConfig(), []);

	// Otimizar imagens dos projetos
	const optimizedProjects = useMemo(() => 
		projects.map(project => ({
			...project,
			imageUrl: optimizeCloudinaryImage(project.imageUrl, {
				quality: config.imageQuality,
				format: 'auto'
			})
		})), [config.imageQuality]
	);

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
		>
			{/* Background container */}
			<OptimizedBackground />

			{/* Transição suave para a próxima seção */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 via-slate-800/80 to-transparent z-10" />

			<div className="container mx-auto px-6 relative z-10">
				<div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
					{/* Título à esquerda */}
				<motion.div
						className="flex-1 flex items-center justify-center lg:justify-start"
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: config.animationDuration, delay: 0.1 }}
					>
						<div className="text-center lg:text-left max-w-md">
							<motion.h3 
								className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
								initial={{ opacity: 0, y: 15 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: config.animationDuration * 0.8, delay: 0.2 }}
							>
					PROJETOS EM DESTAQUE
							</motion.h3>
							<motion.p 
								className="text-lg md:text-xl text-gray-300 mt-6 leading-relaxed"
								initial={{ opacity: 0, y: 15 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: config.animationDuration * 0.8, delay: 0.3 }}
							>
								Explore meus principais projetos desenvolvidos com as mais modernas tecnologias e melhores práticas de desenvolvimento.
							</motion.p>
						</div>
					</motion.div>
					
					{/* CardSwap Container à direita */}
					<motion.div 
						className="flex-1 flex justify-center items-center w-full lg:w-auto"
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className="relative w-full max-w-[700px] h-[600px] flex items-center justify-center">
							<Suspense fallback={<LoadingSpinner text="Carregando projetos..." />}>
								<CardSwap
									cardDistance={80}
									verticalDistance={100}
									delay={4000}
									pauseOnHover={true}
									width={600}
									height={500}
								>
									{optimizedProjects.map((project) => (
										<Card key={project.id}>
											<div className="project-image">
												<SimpleImage 
													src={project.imageUrl} 
													alt={project.imageAlt}
													className="w-full h-full"
												/>
											</div>
											<h3>{project.title}</h3>
											<p>{project.description}</p>
											<div className="tech-stack">
												{project.tags.map((tag, index) => (
													<span key={index} className="tech-tag">
														{tag}
													</span>
									))}
											</div>
											{project.url && (
												<div className="project-links">
													<a 
														href={project.url} 
														target="_blank" 
														rel="noopener noreferrer"
														className="project-link"
													>
														Ver Projeto
													</a>
												</div>
											)}
										</Card>
									))}
								</CardSwap>
							</Suspense>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}