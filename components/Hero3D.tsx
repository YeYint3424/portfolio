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

// Minimalist Floating 3D Wireframe Software Node
function SoftwareNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x -= delta * 0.25;
      wireRef.current.rotation.y -= delta * 0.35;
    }
  });

  return (
    <group>
      {/* Distorted Core Polyhedron */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <dodecahedronGeometry args={[1.4, 0]} />
        <MeshDistortMaterial
          color={hovered ? "#00f0ff" : "#38bdf8"}
          emissive="#0284c7"
          emissiveIntensity={hovered ? 0.65 : 0.25}
          roughness={0.15}
          metalness={0.85}
          distort={0.3}
          speed={2.2}
        />
      </mesh>

      {/* Wireframe Architectural Cage */}
      <lineSegments ref={wireRef}>
        <wireframeGeometry args={[new THREE.DodecahedronGeometry(1.65, 0)]} />
        <lineBasicMaterial color="#38bdf8" opacity={0.45} transparent />
      </lineSegments>
    </group>
  );
}

// Orbiting Minimalist 3D Engineering Badges
function FloatingBadge({
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
      groupRef.current.position.y = position[1] + Math.sin(t * 1.6 + position[0]) * 0.12;
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

// Ambient Background 3D Particles
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 60;
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
      pointsRef.current.rotation.y += delta * 0.04;
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
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
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
          <SoftwareNode />

          {/* Minimalist 3D engineering tokens */}
          <FloatingBadge text="TS" position={[-2.1, 1.2, 0.5]} color="#3178c6" />
          <FloatingBadge text="React" position={[2.1, 1.1, -0.4]} color="#38bdf8" />
          <FloatingBadge text="Next.js" position={[-2.2, -1.1, 0.8]} color="#ffffff" />
          <FloatingBadge text="Java" position={[2.0, -1.2, -0.2]} color="#f89820" />
        </Float>

        <Particles />

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
