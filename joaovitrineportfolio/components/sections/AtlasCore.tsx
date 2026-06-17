"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─── GLSL Shaders ──────────────────────────────────────────────────────────────

const CORE_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // subtle displacement on the sphere surface
    float disp =
      sin(position.y * 7.0 + uTime * 0.45) * 0.018 +
      sin(position.x * 5.0 + uTime * 0.28) * 0.012;

    vec3 displaced = position + normal * disp;
    vec4 mvPos = modelViewMatrix * vec4(displaced, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const CORE_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uAccent;

  void main() {
    // Fresnel rim
    float fresnel = 1.0 - clamp(dot(vViewDir, vNormal), 0.0, 1.0);
    fresnel = pow(fresnel, 2.2);

    // Emissive scanline
    float scanline = step(0.5, fract(vUv.y * 48.0 - uTime * 0.06));
    float scanEmit = scanline * 0.05;

    vec3 base = vec3(0.04, 0.04, 0.04);
    vec3 color = mix(base, uAccent, fresnel * 0.85);
    color += uAccent * scanEmit;

    // soft inner glow
    float glow = pow(fresnel, 1.2) * 0.35;
    color += uAccent * glow;

    float alpha = 0.65 + fresnel * 0.35;
    gl_FragColor = vec4(color, alpha);
  }
`;

const NODE_FRAG = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  uniform vec3 uAccent;
  uniform float uActive;

  void main() {
    float fresnel = 1.0 - clamp(dot(vViewDir, vNormal), 0.0, 1.0);
    fresnel = pow(fresnel, 2.0);

    vec3 base = mix(vec3(0.08), uAccent, uActive * 0.7);
    vec3 color = mix(base, uAccent, fresnel * 0.9);

    gl_FragColor = vec4(color, 0.55 + fresnel * 0.45);
  }
`;

const NODE_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

// ─── Atlas Nodes data ─────────────────────────────────────────────────────────

const NODES = [
  { label: "AI",          angle: 0,      radius: 2.1, speed: 0.38, href: "/#work" },
  { label: "Production",  angle: 0.785,  radius: 2.4, speed: 0.28, href: "/#work" },
  { label: "Interface",   angle: 1.571,  radius: 2.0, speed: 0.45, href: "/#work" },
  { label: "Automation",  angle: 2.356,  radius: 2.5, speed: 0.22, href: "/lab" },
  { label: "Audio",       angle: 3.142,  radius: 2.2, speed: 0.35, href: "/lab" },
  { label: "Motion",      angle: 3.927,  radius: 2.3, speed: 0.30, href: "/#work" },
  { label: "Backend",     angle: 4.712,  radius: 2.1, speed: 0.42, href: "/#stack" },
  { label: "Systems",     angle: 5.497,  radius: 2.4, speed: 0.25, href: "/#experience" },
] as const;

const ACCENT = new THREE.Color("#FF3B1F");

// ─── Core Sphere ─────────────────────────────────────────────────────────────

function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAccent: { value: ACCENT },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = clock.elapsedTime;
    if (meshRef.current) meshRef.current.rotation.y = clock.elapsedTime * 0.06;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.05, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={CORE_VERT}
        fragmentShader={CORE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}

// ─── Orbital node ─────────────────────────────────────────────────────────────

function OrbitalNode({
  angle,
  radius,
  speed,
  label,
  href,
}: (typeof NODES)[number]) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const hoveredRef = useRef(false);

  const uniforms = useMemo(
    () => ({ uAccent: { value: ACCENT }, uActive: { value: 0 } }),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + angle;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius * 0.55; // flattened orbit
      meshRef.current.position.y = Math.sin(t * 0.6) * 0.35;
    }
    if (matRef.current) {
      const target = hoveredRef.current ? 1 : 0;
      matRef.current.uniforms.uActive.value +=
        (target - matRef.current.uniforms.uActive.value) * 0.12;
    }
  });

  const navigate = useCallback(() => {
    const el = document.getElementById(href.replace("/#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else window.location.href = href;
  }, [href]);

  return (
    <mesh
      ref={meshRef}
      onClick={navigate}
      onPointerOver={() => {
        hoveredRef.current = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        hoveredRef.current = false;
        document.body.style.cursor = "";
      }}
    >
      <sphereGeometry args={[0.14, 24, 24]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={NODE_VERT}
        fragmentShader={NODE_FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function Scene() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.04) * 0.25;
    camera.position.y = Math.cos(t * 0.03) * 0.15;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#FF3B1F" />
      <pointLight position={[-4, -2, -4]} intensity={0.4} color="#E8E8E8" />
      <CoreSphere />
      {NODES.map((n) => (
        <OrbitalNode key={n.label} {...n} />
      ))}
    </>
  );
}

// ─── Fallback (static) ────────────────────────────────────────────────────────

function StaticFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-rust-500/30" />
        <div className="absolute inset-4 rounded-full border border-rust-500/20" />
        <div className="h-6 w-6 rounded-full bg-rust-500/40" />
      </div>
    </div>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export function AtlasCore({ className }: { className?: string }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    return (
      <div className={className}>
        <StaticFallback />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* visually-hidden description for screen readers */}
      <span className="sr-only">
        Atlas Command Core — interactive 3D visualization with 8 orbital nodes representing
        project domains. Use keyboard shortcuts W, E, S, A, C to navigate sections.
      </span>
      <Canvas
        aria-label="Atlas Command Core — 3D orbital navigation"
        aria-hidden="true"
        role="img"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
