import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Float } from '@react-three/drei';

interface Props {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  autoRotate?: boolean;
  enableZoom?: boolean;
}

export const Showroom: React.FC<Props> = ({
  children,
  cameraPosition = [0, 1.5, 3.5],
  autoRotate = true,
  enableZoom = true,
}) => {
  return (
    <Canvas shadows camera={{ position: cameraPosition, fov: 40 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 4, 2]} intensity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={0.3} />
      <spotLight position={[0, 5, 3]} angle={0.3} penumbra={0.5} intensity={0.6} castShadow />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.4}>
        {children}
      </Float>
      <ContactShadows position={[0, -0.2, 0]} opacity={0.5} blur={3} far={1.2} />
      <Environment preset="studio" />
      <OrbitControls
        enableZoom={enableZoom}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={1.5}
        maxDistance={6}
        autoRotate={autoRotate}
        autoRotateSpeed={2.5}
      />
    </Canvas>
  );
};
