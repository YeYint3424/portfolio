"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Text,
  MeshDistortMaterial,
  OrbitControls,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

// Central 3D Abstract Developer Core
function CodeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25;
      meshRef.current.rotation.y += delta * 0.35;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.2;
      wireRef.current.rotation.y -= delta * 0.3;
    }
  });

  return (
    <group>
      {/* Outer Distorted Tech Sphere / Glass Matrix */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <icosahedronGeometry args={[1.35, 2]} />
        <MeshDistortMaterial
          color={hovered ? "#00f0ff" : "#38bdf8"}
          emissive="#0284c7"
          emissiveIntensity={hovered ? 0.6 : 0.25}
          roughness={0.15}
          metalness={0.85}
          distort={0.32}
          speed={2.2}
        />
      </mesh>

      {/* Wireframe Overlay Cage */}
      <lineSegments ref={wireRef}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(1.5, 1)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.45} transparent />
      </lineSegments>
    </group>
  );
}

// Orbiting Tech Badges in 3D Space
function FloatingToken({
  text,
  position,
  color,
}: {
  text: string;
  position: [number, number, number];
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <boxGeometry args={[0.9, 0.45, 0.1]} />
        <meshStandardMaterial
          color="#061827"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
      <mesh position={[0, 0, 0.06]}>
        <planeGeometry args={[0.88, 0.43]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.22}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
}

// Background Floating Ambient Particles in 3D
function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 70;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 8;
      pos[i + 1] = (Math.random() - 0.5) * 8;
      pos[i + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#38bdf8"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas3D() {
  return (
    <div className="w-full h-full min-h-[360px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#bae6fd" />
        <pointLight position={[-4, -4, -2]} intensity={1} color="#0284c7" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <CodeCore />

          {/* Floating tech badges in 3D space */}
          <FloatingToken text="TS" position={[-2.1, 1.2, 0.5]} color="#3178c6" />
          <FloatingToken text="React" position={[2.1, 1.1, -0.4]} color="#38bdf8" />
          <FloatingToken text="Next.js" position={[-2.2, -1.1, 0.8]} color="#ffffff" />
          <FloatingToken text="Java" position={[2.0, -1.2, -0.2]} color="#f89820" />
        </Float>

        <ParticleCloud />

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.45}
          scale={6}
          blur={2.5}
          far={4}
          color="#0284c7"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          autoRotate
          autoRotateSpeed={0.8}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
