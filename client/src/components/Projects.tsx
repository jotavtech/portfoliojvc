import { motion, useMotionValue, useSpring, useTransform, useScroll, useInView } from "framer-motion";
import { useRef } from "react";

interface Project {
    id: number;
    title: string;
    description: string;
    tags: string[];
    link: string;
}

const projects = [
	{
		id: 1,
		title: "Portfólio Pessoal",
		description:
			"Um portfólio moderno e responsivo desenvolvido com React, Next.js, Tailwind CSS e Framer Motion. Apresenta designs modernos, animações suaves e é totalmente responsivo.",
		tags: ["React", "Next.js", "Tailwind", "Framer Motion"],
		link: "#",
	},
	{
		id: 2,
		title: "E-commerce de Maquiagem",
		description:
			"Plataforma completa de e-commerce para produtos de maquiagem com carrinho de compras, sistema de pagamento e painel administrativo.",
		tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
		link: "#",
	},
	{
		id: 3,
		title: "Venda de Templates",
		description:
			"Marketplace para venda de templates de sites com preview em tempo real e sistema de download automático.",
		tags: ["TypeScript", "Next.js", "Prisma", "AWS"],
		link: "#",
	},
];

function ProjectCard({ project }: { project: Project }) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const scale = useMotionValue(1);

	const rotateX = useTransform(y, [-100, 100], [30, -30]);
	const rotateY = useTransform(x, [-100, 100], [-30, 30]);
	const skewX = useTransform(x, [-100, 100], [-15, 15]);
	const skewY = useTransform(y, [-100, 100], [-15, 15]);

	const springConfig = { damping: 15, stiffness: 150 };
	const springRotateX = useSpring(rotateX, springConfig);
	const springRotateY = useSpring(rotateY, springConfig);
	const springSkewX = useSpring(skewX, springConfig);
	const springSkewY = useSpring(skewY, springConfig);
	const springScale = useSpring(scale, springConfig);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		const rect = event.currentTarget.getBoundingClientRect();
		const centerX = rect.x + rect.width / 2;
		const centerY = rect.y + rect.height / 2;

		x.set(event.clientX - centerX);
		y.set(event.clientY - centerY);
		scale.set(1.1);
	}

	function handleMouseLeave() {
		x.set(0);
		y.set(0);
		scale.set(1);
	}

	return (
		<motion.div
			className="relative h-[400px] rounded-xl p-6 cursor-none perspective-1000 backdrop-blur-sm"
			style={{
				rotateX: springRotateX,
				rotateY: springRotateY,
				skewX: springSkewX,
				skewY: springSkewY,
				scale: springScale,
				transformStyle: "preserve-3d",
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/5 rounded-xl border border-black/10 backdrop-blur-sm p-6 transition-all duration-300 hover:backdrop-blur-lg">
				<h4 className="text-2xl font-bold mb-4 text-black transform-gpu">
					{project.title}
				</h4>
				<p className="text-black/80 mb-6 transform-gpu">
					{project.description}
				</p>
				<div className="flex flex-wrap gap-2 mb-4">
					{project.tags.map((tag: string, index: number) => (
						<span
							key={index}
							className="px-3 py-1 bg-black/10 rounded-full text-sm text-black/90 transform-gpu"
						>
							{tag}
						</span>
					))}
				</div>
				<motion.button
					className="mt-4 px-6 py-2 bg-black/10 hover:bg-black/20 rounded-lg text-black transition-colors transform-gpu"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Ver Projeto
				</motion.button>
			</div>
		</motion.div>
	);
}

export default function Projects() {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	});

	const ballSize = useTransform(
		scrollYProgress,
		[0, 0.2, 0.4],
		["2rem", "10rem", "200vw"]
	);

	const ballY = useTransform(
		scrollYProgress,
		[0, 0.2, 0.4],
		["0%", "30%", "50%"]
	);

	const ballScale = useTransform(
		scrollYProgress,
		[0, 0.2, 0.4],
		[0, 1, 1.5]
	);

	return (
		<section
			ref={sectionRef}
			id="projects"
			className="relative min-h-screen flex items-center justify-center py-20 cursor-none"
		>
			{/* Background container */}
			<div className="absolute inset-0 overflow-hidden">
				{/* Animated ball */}
				<motion.div
					className="absolute left-1/2 bg-white rounded-full"
					style={{
						x: "-50%",
						y: ballY,
						width: ballSize,
						height: ballSize,
						scale: ballScale,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				/>
			</div>

			<div className="container mx-auto px-6 text-center relative z-10">
				<h2 className="text-xl uppercase tracking-widest text-black font-bold mb-3">
					MEUS PROJETOS
				</h2>
				<h3 className="text-4xl md:text-5xl font-black mb-16 text-black">
					PROJETOS EM DESTAQUE
				</h3>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}