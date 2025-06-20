import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Float, PerspectiveCamera, useTexture } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { projects, Project } from '@/lib/constants';

// Componente de partículas 3D
function Particles3D() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 1000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

    colors[i * 3] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 2] = Math.random() * 0.5 + 0.5;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Componente de card 3D
function ProjectCard3D({ project, index, total, isActive }: {
  project: Project;
  index: number;
  total: number;
  isActive: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Calcular posição no carrossel
  const angle = (index / total) * Math.PI * 2;
  const radius = 8;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = isActive ? 0 : -1;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      if (isActive) {
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={isActive ? 0.5 : 0.2}
      floatIntensity={isActive ? 0.5 : 0.2}
    >
      <mesh
        ref={meshRef}
        position={[x, y, z]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isActive ? 1.2 : 0.8}
      >
        <boxGeometry args={[3, 4, 0.2]} />
        <meshStandardMaterial
          color={isActive ? '#3b82f6' : '#64748b'}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={isActive ? 1 : 0.7}
        />
      </mesh>
      
      {/* Texto do projeto */}
      <Text
        position={[x, y + 2.5, z]}
        fontSize={0.3}
        color={isActive ? '#ffffff' : '#94a3b8'}
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        {project.title}
      </Text>
    </Float>
  );
}

// Componente de geometrias flutuantes
function FloatingGeometries() {
  const geometries = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (geometries.current) {
      geometries.current.rotation.x = state.clock.elapsedTime * 0.1;
      geometries.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={geometries}>
      {/* Tetraedro */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-5, 2, -5]}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#3b82f6" wireframe />
        </mesh>
      </Float>

      {/* Octaedro */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
        <mesh position={[5, -2, 5]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>

      {/* Icosaedro */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
        <mesh position={[0, 4, 0]}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ec4899" wireframe />
        </mesh>
      </Float>

      {/* Esfera */}
      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh position={[3, -3, -3]}>
          <sphereGeometry args={[0.8, 16, 16]} />
          <meshStandardMaterial color="#10b981" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

// Componente principal 3D
function Projects3DScene({ currentProject, setCurrentProject }: {
  currentProject: number;
  setCurrentProject: (index: number) => void;
}) {
  const { camera } = useThree();

  useEffect(() => {
    // Animar câmera para o projeto ativo
    const angle = (currentProject / projects.length) * Math.PI * 2;
    const radius = 12;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    
    camera.position.set(x, 2, z);
    camera.lookAt(0, 0, 0);
  }, [currentProject, camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      
      {/* Iluminação */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#ec4899" />

      {/* Partículas 3D */}
      <Particles3D />

      {/* Geometrias flutuantes */}
      <FloatingGeometries />

      {/* Cards dos projetos */}
      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          isActive={index === currentProject}
        />
      ))}

      {/* Linhas de conexão */}
      <group>
        {projects.map((_, index) => {
          const angle1 = (index / projects.length) * Math.PI * 2;
          const angle2 = ((index + 1) / projects.length) * Math.PI * 2;
          const radius = 8;
          
          const x1 = Math.cos(angle1) * radius;
          const z1 = Math.sin(angle1) * radius;
          const x2 = Math.cos(angle2) * radius;
          const z2 = Math.sin(angle2) * radius;

          return (
            <line key={index}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={new Float32Array([x1, 0, z1, x2, 0, z2])}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
            </line>
          );
        })}
      </group>
    </>
  );
}

// Componente principal
export default function Projects3D() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate projects
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
      
      {/* Canvas 3D */}
      <div className="absolute inset-0">
        <Canvas>
          <Projects3DScene 
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
          />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2 
          className="text-xl uppercase tracking-widest text-white font-bold mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          MEUS PROJETOS
        </motion.h2>
        <motion.h3 
          className="text-4xl md:text-5xl font-black mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          PROJETOS EM DESTAQUE
        </motion.h3>

        {/* Project info card */}
        <motion.div
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h4 
            className="text-3xl font-bold mb-4 text-white"
            key={currentProject}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {projects[currentProject].title}
          </motion.h4>
          <motion.p 
            className="text-white/90 mb-6 text-lg"
            key={`desc-${currentProject}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {projects[currentProject].description}
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            key={`tags-${currentProject}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {projects[currentProject].tags.slice(0, 4).map((tag, index) => (
              <motion.span
                key={index}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white border border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                currentProject === index
                  ? 'bg-white scale-150 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75 hover:scale-125'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Play/Pause button */}
        <motion.button
          className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      </div>
    </section>
  );
} 