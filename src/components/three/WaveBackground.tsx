import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Wave() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 12, 120, 80);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = Math.sin(x * 0.6 + time * 0.8) * 0.25
            + Math.sin(z * 0.5 + time * 0.6) * 0.2
            + Math.sin((x + z) * 0.3 + time * 0.4) * 0.15;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1.5, 0]}>
      <meshStandardMaterial
        color="#2563eb"
        transparent
        opacity={0.08}
        wireframe={false}
        side={THREE.DoubleSide}
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}

function WaveWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 12, 60, 40);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const time = clock.getElapsedTime();
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = Math.sin(x * 0.6 + time * 0.8) * 0.25
            + Math.sin(z * 0.5 + time * 0.6) * 0.2
            + Math.sin((x + z) * 0.3 + time * 0.4) * 0.15;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1.5, 0]}>
      <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export const WaveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Wave />
        <WaveWireframe />
      </Canvas>
    </div>
  );
};
