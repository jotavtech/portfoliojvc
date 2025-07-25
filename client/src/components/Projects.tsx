import { motion } from 'framer-motion';
import MagicBento from './MagicBento';

export default function Projects() {
	return (
		<motion.section
			id="projects"
			className="relative min-h-screen py-20 overflow-hidden bg-black z-10"
			initial={{ scale: 0.95, opacity: 0 }}
			whileInView={{ scale: 1, opacity: 1 }}
			viewport={{ once: true, amount: 0.3 }}
			transition={{ duration: 0.8, ease: 'easeOut' }}
		>
			{/* Conteúdo */}
			<div className="container mx-auto px-6 relative z-10">
				{/* Título da seção */}
					<motion.div 
					className="text-center mb-20"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
							>
									<motion.h3 
						className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl mb-6 space-grotesk-bold"
										initial={{ opacity: 0, y: 15 }}
										whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
									>
						FEATURED PROJECTS
									</motion.h3>
									<motion.p 
						className="text-lg md:text-xl text-gray-300 leading-relaxed drop-shadow-lg max-w-3xl mx-auto"
										initial={{ opacity: 0, y: 15 }}
										whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
									>
						Explore my main projects developed with the most modern technologies and best development practices.
									</motion.p>
							</motion.div>

				{/* MagicBento Grid */}
				<div className="w-full max-w-7xl mx-auto">
					<MagicBento 
						textAutoHide={true}
						enableStars={true}
						enableSpotlight={true}
						enableBorderGlow={true}
						enableTilt={true}
						enableMagnetism={true}
						clickEffect={true}
						spotlightRadius={300}
						particleCount={12}
						glowColor="191, 255, 0"
					/>
				</div>
			</div>
		</motion.section>
	);
}