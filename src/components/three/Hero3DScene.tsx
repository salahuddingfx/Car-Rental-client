import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, ContactShadows, Sparkles, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// --- GLTF/GLB Car Model ---
function GLTFCar({ carRef }: { carRef: React.RefObject<THREE.Group | null> }) {
  const { scene } = useGLTF('/models/CarConcept.glb');
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && carRef) {
      (carRef as React.MutableRefObject<THREE.Group | null>).current = groupRef.current;
    }
  }, [carRef]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => {
                m.envMapIntensity = 1.5;
                if (m.clearcoat !== undefined) m.clearcoat = 1.0;
              });
            } else {
              child.material.envMapIntensity = 1.5;
              if (child.material.clearcoat !== undefined) child.material.clearcoat = 1.0;
            }
          }
        }
      });
    }
  }, [scene]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y += Math.sin(clock.getElapsedTime() * 20) * 0.00015;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]} scale={0.9}>
      <primitive object={scene} />
    </group>
  );
}

// --- Wet Road ---
function Road() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshPhysicalMaterial
          color="#050508"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={0.8}
        />
      </mesh>
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={x} position={[x, -0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.03, 30]} />
          <meshBasicMaterial color="#ffffcc" transparent opacity={0.06} />
        </mesh>
      ))}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[0, -0.11, -15 + i * 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.02, 0.2]} />
          <meshBasicMaterial color="#ffffcc" transparent opacity={0.12} />
        </mesh>
      ))}
    </group>
  );
}

// --- Rain System ---
function Rain() {
  const count = 600;
  const meshRef = useRef<THREE.Points>(null);
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      spd[i] = 0.6 + Math.random() * 1.2;
    }
    return [pos, spd];
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= speeds[i] * delta * 4;
      pos[i * 3] -= 0.15 * delta;
      if (pos[i * 3 + 1] < -1) {
        pos[i * 3 + 1] = 7 + Math.random() * 1;
        pos[i * 3] = (Math.random() - 0.5) * 30;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 25;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#8899cc" transparent opacity={0.15} sizeAttenuation />
    </points>
  );
}

// --- Splash Particles on ground ---
function Splashes() {
  const count = 30;
  const meshRef = useRef<THREE.Points>(null);
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = 0.02;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    (meshRef.current.material as THREE.PointsMaterial).opacity = 0.15 + Math.sin(clock.getElapsedTime() * 3) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#aabbdd" transparent opacity={0.15} sizeAttenuation />
    </points>
  );
}

// --- Street Lamps ---
function StreetLamps() {
  const lamps = useMemo(() =>
    Array.from({ length: 16 }).map(() => ({
      x: (Math.random() - 0.5) * 22,
      z: (Math.random() - 0.5) * 18,
      intensity: 0.5 + Math.random() * 2,
    })), []);

  return (
    <group>
      {lamps.map((p, i) => (
        <group key={i} position={[p.x, 0, p.z]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.01, 0.015, 1.5, 6]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.55, 0]}>
            <boxGeometry args={[0.05, 0.015, 0.08]} />
            <meshStandardMaterial color="#555" metalness={0.5} roughness={0.5} />
          </mesh>
          <pointLight position={[0, 1.5, 0]} intensity={p.intensity} distance={4} color="#ffdd88" />
          <mesh position={[0, 0.7, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.3, 0.8, 6]} />
            <meshBasicMaterial color="#ffdd88" transparent opacity={0.012} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// --- Mist Particles ---
function Mist() {
  const count = 80;
  const meshRef = useRef<THREE.Points>(null);
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = Math.random() * 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return [pos];
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#8899bb" transparent opacity={0.06} sizeAttenuation />
    </points>
  );
}

// --- City Background (simple buildings) ---
function CityBuildings() {
  const buildings = useMemo(() =>
    Array.from({ length: 30 }).map(() => ({
      x: (Math.random() - 0.5) * 50,
      z: -12 - Math.random() * 8,
      w: 0.3 + Math.random() * 0.6,
      h: 0.5 + Math.random() * 2.5,
      d: 0.3 + Math.random() * 0.5,
      windows: Math.random() > 0.5,
    })), []);

  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2 - 0.1, b.z]}>
          <mesh castShadow>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshPhysicalMaterial color="#080812" metalness={0.3} roughness={0.8} />
          </mesh>
          {b.windows && Array.from({ length: Math.floor(b.h * 4) }).map((_, yi) =>
            Array.from({ length: 2 }).map((_, xi) => (
              <mesh key={`${yi}-${xi}`}
                position={[(xi - 0.5) * b.w * 0.5, -b.h / 2 + 0.1 + (yi + 0.5) * 0.2, b.d / 2 + 0.001]}>
                <planeGeometry args={[0.04, 0.06]} />
                <meshBasicMaterial color="#ffdd88"
                  transparent opacity={0.1 + Math.random() * 0.4} />
              </mesh>
            ))
          )}
        </group>
      ))}
    </group>
  );
}

// --- Camera Setup ---
function CameraController() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0.5, 1.2, 3.8);
    camera.lookAt(0, 0.2, 0);
  }, [camera]);
  return null;
}

// --- Scene Glow effect (post-processing lite) ---
function SceneGlow() {
  return (
    <mesh position={[0, 0.3, -2]} scale={[6, 3, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#4488ff" transparent opacity={0.03} />
    </mesh>
  );
}

// --- Main Scene ---
interface Props {
  carGroupRef: React.RefObject<THREE.Group | null>;
}

export const Hero3DScene: React.FC<Props> = ({ carGroupRef }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0.5, 1.2, 3.8], fov: 32 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}>
        <color attach="background" args={['#010108']} />
        <fog attach="fog" args={['#010108', 4, 14]} />

        <ambientLight intensity={0.08} color="#335" />
        <directionalLight position={[5, 8, 4]} intensity={0.15} color="#4488ff" />
        <directionalLight position={[-4, 5, -5]} intensity={0.06} color="#ff8844" />
        <hemisphereLight args={['#224466', '#000011', 0.5]} />

        {/* Back rim light for the car */}
        <pointLight position={[-2, 1.5, -3]} intensity={8} distance={10} color="#4466ff" />

        <GLTFCar carRef={carGroupRef} />
        <Road />
        <CityBuildings />
        <StreetLamps />
        <Rain />
        <Splashes />
        <Mist />
        <SceneGlow />
        <CameraController />

        <Sparkles count={40} scale={[12, 3, 10]} size={0.015} color="#88bbff" opacity={0.12} />
        <ContactShadows position={[0, -0.1, 0]} opacity={0.5} blur={3.5} far={2.5} color="#000" />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};
