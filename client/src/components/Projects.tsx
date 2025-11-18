import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

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

				{/* ScrollStack Projects */}
				<div className="w-full max-w-7xl mx-auto h-screen">
					<ScrollStack 
						itemDistance={150}
						itemScale={0.05}
						itemStackDistance={40}
						stackPosition="25%"
						scaleEndPosition="15%"
						baseScale={0.8}
						rotationAmount={2}
						blurAmount={1}
					>
						<ScrollStackItem itemClassName="card-orange">
							<div className="project-label">Dashboard</div>
							<h2>DashMEBoard</h2>
							<img 
								src="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1753404264/2025-07-24_21-44_jtqh8i.png"
								alt="DashMEBoard"
								className="project-image"
							/>
							<p>Modern and intuitive dashboard for data management with responsive interface and advanced visualization features.</p>
						</ScrollStackItem>
						
						<ScrollStackItem itemClassName="card-white">
							<div className="project-label">E-commerce</div>
							<h2>Cynthia Makes</h2>
							<img 
								src="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/2025-06-03_13-54_aj7yd0.png"
								alt="Cynthia Makes"
								className="project-image"
							/>
							<p>E-commerce especializado em maquiagem e produtos de beleza com interface moderna, sistema de filtros avançados e experiência de compra otimizada.</p>
						</ScrollStackItem>
						
						<ScrollStackItem itemClassName="card-black">
							<div className="project-label">Comparison</div>
							<h2>Comparate</h2>
							<img 
								src="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/comparate_ea3kgx.png"
								alt="Comparate"
								className="project-image"
							/>
							<p>Car comparison website based on FIPE table with detailed price analysis, technical specifications and value history.</p>
						</ScrollStackItem>
						
						<ScrollStackItem itemClassName="card-white-black">
							<div className="project-label">Literature</div>
							<h2>Folheando</h2>
							<img 
								src="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/folheando_u5ifrg.png"
								alt="Folheando"
								className="project-image"
							/>
							<p>Book evaluation and discovery platform with review system, personalized recommendations and reader community.</p>
						</ScrollStackItem>
						
						<ScrollStackItem itemClassName="card-orange">
							<div className="project-label">Music</div>
							<h2>PlayOff</h2>
							<img 
								src="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1748972944/2025-06-03_12-50_iodj9l.png"
								alt="PlayOff"
								className="project-image"
							/>
							<p>Real-time music battle with dynamic voting system, real-time ranking and interactive interface for music competitions.</p>
						</ScrollStackItem>
						
						<ScrollStackItem itemClassName="card-white">
							<div className="project-label">Education</div>
							<h2>Ksim</h2>
							<img 
								src="https://res.cloudinary.com/dzwfuzxxw/image/upload/v1763477153/Captura_de_tela_de_2025-11-14_15-48-41_hnrejk.png"
								alt="Ksim"
								className="project-image"
							/>
							<p>Online and in-person testing platform with artificial intelligence for automated assessment and enhanced educational experience.</p>
						</ScrollStackItem>
					</ScrollStack>
				</div>
			</div>
		</motion.section>
	);
}