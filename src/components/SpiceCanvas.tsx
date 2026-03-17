'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Spice Shape Geometries ─────────────────────────────────── */

// Star Anise arm — procedural
function StarAniseGeometry() {
  const shape = new THREE.Shape();
  const numArms = 8;
  const outerR = 0.18;
  const innerR = 0.06;

  for (let i = 0; i < numArms * 2; i++) {
    const angle = (i / (numArms * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: true, bevelSize: 0.015, bevelSegments: 2 });
}

// Cardamom pod — stretched ellipsoid
const cardamomGeo = new THREE.SphereGeometry(0.1, 12, 8);
cardamomGeo.scale(0.7, 1.4, 0.7);

// Clove — small elongated shape
const cloveGeo = new THREE.CapsuleGeometry(0.04, 0.18, 6, 8);

// Peppercorn — tiny sphere
const peppercornGeo = new THREE.SphereGeometry(0.07, 10, 8);

const starAniseGeo = StarAniseGeometry();

/* ─── Materials ──────────────────────────────────────────────── */

const materials = {
  starAnise: new THREE.MeshStandardMaterial({
    color: '#8B4513',
    roughness: 0.5,
    metalness: 0.1,
    emissive: '#F4BB44',
    emissiveIntensity: 0.08,
  }),
  cardamom: new THREE.MeshStandardMaterial({
    color: '#4a7c59',
    roughness: 0.6,
    metalness: 0.05,
    emissive: '#2d5c3a',
    emissiveIntensity: 0.1,
  }),
  clove: new THREE.MeshStandardMaterial({
    color: '#3d1c02',
    roughness: 0.7,
    metalness: 0.05,
  }),
  peppercorn: new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.4,
    metalness: 0.15,
  }),
  goldDust: new THREE.MeshStandardMaterial({
    color: '#F4BB44',
    roughness: 0.2,
    metalness: 0.8,
    emissive: '#F4BB44',
    emissiveIntensity: 0.3,
  }),
};

/* ─── Mouse Tracker ──────────────────────────────────────────── */

interface SpiceGroupProps {
  mouse: React.MutableRefObject<[number, number]>;
}

function SpiceGroup({ mouse }: SpiceGroupProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { size } = useThree();

  // Randomize positions
  const spices = useRef(
    Array.from({ length: 38 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 1,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
      scale: 0.6 + Math.random() * 0.8,
      type: i < 10 ? 'starAnise' : i < 20 ? 'cardamom' : i < 28 ? 'clove' : i < 34 ? 'peppercorn' : 'gold',
      speed: 0.003 + Math.random() * 0.006,
      floatOffset: Math.random() * Math.PI * 2,
    }))
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Mouse parallax — subtle tilt
    const targetX = (mouse.current[0] / size.width - 0.5) * 0.8;
    const targetY = -(mouse.current[1] / size.height - 0.5) * 0.5;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetY,
      0.04
    );

    // Animate individual children for drift
    groupRef.current.children.forEach((child, i) => {
      const s = spices.current[i];
      if (!s) return;
      child.rotation.z = s.rotation[2] + t * s.speed;
      child.rotation.x = s.rotation[0] + Math.sin(t * 0.4 + s.floatOffset) * 0.15;
      child.position.y =
        s.position[1] + Math.sin(t * 0.5 + s.floatOffset) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {spices.current.map((s, i) => {
        const geo =
          s.type === 'starAnise'
            ? starAniseGeo
            : s.type === 'cardamom'
            ? cardamomGeo
            : s.type === 'clove'
            ? cloveGeo
            : s.type === 'peppercorn'
            ? peppercornGeo
            : peppercornGeo;

        const mat =
          s.type === 'starAnise'
            ? materials.starAnise
            : s.type === 'cardamom'
            ? materials.cardamom
            : s.type === 'clove'
            ? materials.clove
            : s.type === 'gold'
            ? materials.goldDust
            : materials.peppercorn;

        return (
          <mesh
            key={i}
            geometry={geo}
            material={mat}
            position={s.position}
            rotation={s.rotation}
            scale={s.scale}
          />
        );
      })}
    </group>
  );
}

/* ─── Ambient Glow Particles ─────────────────────────────────── */

function GlowParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useRef(() => {
    const arr = new Float32Array(300);
    for (let i = 0; i < 300; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  });

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current(), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#F4BB44"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ─── Main Canvas ─────────────────────────────────────────────── */

export default function SpiceCanvas() {
  const mouse = useRef<[number, number]>([0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [e.clientX, e.clientY];
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} color="#fff5e0" />
        <directionalLight
          position={[3, 5, 3]}
          intensity={1.5}
          color="#F4BB44"
          castShadow={false}
        />
        <pointLight position={[-4, -2, 2]} intensity={0.8} color="#c0392b" />
        <pointLight position={[4, 2, -2]} intensity={0.4} color="#F4BB44" />

        {/* Spices */}
        <Suspense fallback={null}>
          <SpiceGroup mouse={mouse} />
          <GlowParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
