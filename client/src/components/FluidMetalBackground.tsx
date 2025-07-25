import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;

void main() {
  vec2 uv = vUv;
  float t = uTime * 0.2;

  // Metal base color
  vec3 base = vec3(0.85, 0.85, 0.9);

  // Simple fluid distortion
  float fluid = 0.0;
  for (float i = 1.0; i < 3.0; i++) {
    fluid += 0.05 / i * sin(i * 8.0 * uv.x + t) * cos(i * 8.0 * uv.y + t);
  }

  // Combine
  float shade = fluid;
  vec3 color = base + shade * vec3(0.15, 0.18, 0.22);

  // Simple highlight
  float highlight = pow(1.0 - distance(uv, vec2(0.7,0.3)), 6.0);
  color += highlight * 0.2;

  gl_FragColor = vec4(color, 1.0);
}
`;

const FluidMetalMesh: React.FC = () => {
  const meshRef = useRef<Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (uniforms.uTime) {
      uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const FluidMetalBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas 
        dpr={[1, 2]} 
        frameloop="demand"
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 1] }}
      >
        <FluidMetalMesh />
      </Canvas>
    </div>
  );
};

export default FluidMetalBackground; 