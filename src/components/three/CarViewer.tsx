import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function CarModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[1.8, 0.18, 0.8]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, 0.45, 0]} castShadow>
        <boxGeometry args={[1.2, 0.12, 0.7]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0.5, 0.45, 0]} rotation={[0, 0, 0.3]}>
        <planeGeometry args={[0.5, 0.25]} />
        <meshStandardMaterial color="#88ccff" metalness={0.1} roughness={0.1} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Hood accent */}
      <mesh position={[-0.6, 0.38, 0]} castShadow>
        <boxGeometry args={[0.4, 0.04, 0.65]} />
        <meshStandardMaterial color="#2d2d4e" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Wheels */}
      {[[-0.55, 0.08, 0.42], [0.55, 0.08, 0.42], [-0.55, 0.08, -0.42], [0.55, 0.08, -0.42]].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.08, 24]} />
            <meshStandardMaterial color="#111" metalness={0.5} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.045]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.02, 12]} />
            <meshStandardMaterial color="#444" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      ))}
      {/* Headlights */}
      <mesh position={[-0.88, 0.28, 0.25]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#aaddff" emissive="#aaddff" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.88, 0.28, -0.25]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#aaddff" emissive="#aaddff" emissiveIntensity={0.5} />
      </mesh>
      {/* Taillights */}
      <mesh position={[0.88, 0.28, 0.25]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.88, 0.28, -0.25]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={0.3} />
      </mesh>
      {/* Spoiler */}
      <mesh position={[0.85, 0.52, 0]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.55]} />
        <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

export const CarViewer: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 1.2, 3], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <directionalLight position={[-3, 4, 2]} intensity={0.3} />
        <pointLight position={[0, 3, 0]} intensity={0.3} />
        <spotLight position={[0, 4, 2]} angle={0.3} penumbra={0.5} intensity={0.5} castShadow />
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
          <CarModel />
        </Float>
        <ContactShadows position={[0, -0.1, 0]} opacity={0.4} blur={2.5} far={1} />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={1.5}
          maxDistance={5}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};
