import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Sparkles, Center } from '@react-three/drei';
import * as THREE from 'three';

function Wheel({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  const rotGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (rotGroupRef.current) {
      rotGroupRef.current.rotation.x += delta * 1.8;
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <group ref={rotGroupRef}>
        <mesh castShadow>
          <torusGeometry args={[0.18, 0.07, 12, 24]} />
          <meshPhysicalMaterial color="#1a1a1a" metalness={0.0} roughness={0.95} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.005, 8, 24]} />
          <meshPhysicalMaterial color="#222" metalness={0.0} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <cylinderGeometry args={[0.12, 0.12, 0.03, 20]} />
          <meshPhysicalMaterial color="#999" metalness={1.0} roughness={0.25} envMapIntensity={2.0} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <torusGeometry args={[0.12, 0.015, 8, 24]} />
          <meshPhysicalMaterial color="#aaa" metalness={1.0} roughness={0.2} envMapIntensity={2.0} />
        </mesh>
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.sin(angle) * 0.07, Math.cos(angle) * 0.07, 0.035]}
              rotation={[0, 0, -angle]}
            >
              <boxGeometry args={[0.04, 0.1, 0.025]} />
              <meshPhysicalMaterial color="#aaa" metalness={1.0} roughness={0.2} envMapIntensity={2.0} />
            </mesh>
          );
        })}
        <mesh position={[0, 0, 0.045]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 12]} />
          <meshPhysicalMaterial color="#ccc" metalness={1.0} roughness={0.15} envMapIntensity={2.0} />
        </mesh>
        <mesh position={[0, 0, -0.03]}>
          <cylinderGeometry args={[0.11, 0.11, 0.008, 16]} />
          <meshPhysicalMaterial color="#444" metalness={0.9} roughness={0.5} />
        </mesh>
      </group>
      <mesh position={[0.04, 0, -0.025]}>
        <boxGeometry args={[0.03, 0.04, 0.025]} />
        <meshPhysicalMaterial color="#cc3333" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

function createCarBodyGeometry(): THREE.BufferGeometry {
  const points = [
    new THREE.Vector3(-0.85, 0.04, 0),
    new THREE.Vector3(-0.82, 0.10, 0),
    new THREE.Vector3(-0.78, 0.12, 0),
    new THREE.Vector3(-0.70, 0.13, 0),
    new THREE.Vector3(-0.60, 0.14, 0),
    new THREE.Vector3(-0.48, 0.16, 0),
    new THREE.Vector3(-0.40, 0.30, 0),
    new THREE.Vector3(-0.30, 0.34, 0),
    new THREE.Vector3(-0.10, 0.37, 0),
    new THREE.Vector3(0.10, 0.37, 0),
    new THREE.Vector3(0.25, 0.35, 0),
    new THREE.Vector3(0.35, 0.27, 0),
    new THREE.Vector3(0.45, 0.24, 0),
    new THREE.Vector3(0.55, 0.23, 0),
    new THREE.Vector3(0.68, 0.20, 0),
    new THREE.Vector3(0.78, 0.16, 0),
    new THREE.Vector3(0.85, 0.12, 0),
    new THREE.Vector3(0.88, 0.08, 0),
    new THREE.Vector3(0.86, 0.04, 0),
    new THREE.Vector3(-0.85, 0.04, 0),
  ];

  const curve = new THREE.CatmullRomCurve3(points, false);
  const shape = new THREE.Shape();
  const samples = curve.getPoints(60);

  shape.moveTo(samples[0].x, samples[0].y);
  for (let i = 1; i < samples.length; i++) {
    shape.lineTo(samples[i].x, samples[i].y);
  }

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 2,
    depth: 0.55,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.025,
    bevelSegments: 10,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.translate(0, 0, -0.275);
  return geo;
}

function createCabinGeometry(): THREE.BufferGeometry {
  const cabPoints = [
    new THREE.Vector3(-0.45, 0.18, 0),
    new THREE.Vector3(-0.38, 0.32, 0),
    new THREE.Vector3(-0.25, 0.38, 0),
    new THREE.Vector3(0.0, 0.40, 0),
    new THREE.Vector3(0.15, 0.38, 0),
    new THREE.Vector3(0.27, 0.36, 0),
    new THREE.Vector3(0.35, 0.28, 0),
    new THREE.Vector3(0.30, 0.22, 0),
    new THREE.Vector3(0.25, 0.20, 0),
    new THREE.Vector3(-0.40, 0.16, 0),
  ];

  const curve = new THREE.CatmullRomCurve3(cabPoints, true);
  const samples = curve.getPoints(40);

  const shape = new THREE.Shape();
  shape.moveTo(samples[0].x, samples[0].y);
  for (let i = 1; i < samples.length; i++) {
    shape.lineTo(samples[i].x, samples[i].y);
  }

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 2,
    depth: 0.45,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelSegments: 6,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.translate(0, 0, -0.225);
  return geo;
}

function createSpoilerGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  shape.moveTo(0.75, 0.24);
  shape.lineTo(0.88, 0.28);
  shape.lineTo(0.90, 0.27);
  shape.lineTo(0.77, 0.23);
  shape.closePath();

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    depth: 0.35,
    bevelEnabled: false,
  };

  const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geo.translate(0, 0, -0.175);
  return geo;
}

function createMetallicFlakeTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 400; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const s = 0.5 + Math.random() * 2.5;
    const alpha = 0.15 + Math.random() * 0.6;
    ctx.fillStyle = `rgba(255, 220, 140, ${alpha})`;
    ctx.beginPath();
    if (Math.random() > 0.5) {
      ctx.arc(x, y, s, 0, Math.PI * 2);
    } else {
      const angle = Math.random() * Math.PI;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillRect(-s * 1.5, -s * 0.5, s * 3, s);
      ctx.restore();
    }
    ctx.fill();
  }

  for (let i = 0; i < 20; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const s = 2 + Math.random() * 4;
    ctx.fillStyle = `rgba(255, 240, 200, ${0.2 + Math.random() * 0.5})`;
    ctx.beginPath();
    ctx.arc(x, y, s, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.anisotropy = 4;
  return texture;
}

function SportsCar() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const flakeTexture = useMemo(() => createMetallicFlakeTexture(), []);

  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#cc1111',
    metalness: 0.7,
    roughness: 0.12,
    roughnessMap: flakeTexture,
    metalnessMap: flakeTexture,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 3.5,
  }), [flakeTexture]);

  const mirrorMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#cc1111',
    metalness: 0.6,
    roughness: 0.15,
    roughnessMap: flakeTexture,
    metalnessMap: flakeTexture,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    envMapIntensity: 2.5,
  }), [flakeTexture]);

  const fenderMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#cc1111',
    metalness: 0.6,
    roughness: 0.15,
    roughnessMap: flakeTexture,
    metalnessMap: flakeTexture,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 2.0,
  }), [flakeTexture]);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1a3a5c',
    metalness: 0.05,
    roughness: 0.0,
    transparent: true,
    opacity: 0.25,
    envMapIntensity: 1.5,
    side: THREE.DoubleSide,
    depthWrite: false,
  }), []);

  const bodyGeo = useMemo(() => createCarBodyGeometry(), []);
  const cabinGeo = useMemo(() => createCabinGeometry(), []);
  const spoilerGeo = useMemo(() => createSpoilerGeometry(), []);

  return (
    <group ref={groupRef} position={[0, 0.12, 0]}>
      <mesh geometry={bodyGeo} material={bodyMat} position={[0, 0.06, 0]} castShadow receiveShadow />

      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[1.3, 0.005, 0.01]} />
        <meshPhysicalMaterial color="#334466" metalness={0.9} roughness={0.1} envMapIntensity={3.0} />
      </mesh>

      <mesh geometry={cabinGeo} material={glassMat} position={[0, 0.06, 0]} />

      <mesh position={[0, 0.06, 0.23]}>
        <boxGeometry args={[0.7, 0.005, 0.005]} />
        <meshPhysicalMaterial color="#ccc" metalness={1.0} roughness={0.1} envMapIntensity={3.0} />
      </mesh>
      <mesh position={[0, 0.06, -0.23]}>
        <boxGeometry args={[0.7, 0.005, 0.005]} />
        <meshPhysicalMaterial color="#ccc" metalness={1.0} roughness={0.1} envMapIntensity={3.0} />
      </mesh>

      <mesh position={[0.28, 0.28, 0]} rotation={[0.55, 0, 0]}>
        <planeGeometry args={[0.35, 0.18]} />
        <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.2} side={THREE.DoubleSide} envMapIntensity={1.0} />
      </mesh>
      <mesh position={[0.28, 0.28, 0.21]} rotation={[0.55, 0, 0]}>
        <planeGeometry args={[0.35, 0.18]} />
        <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.28, 0.28, -0.21]} rotation={[0.55, 0, 0]}>
        <planeGeometry args={[0.35, 0.18]} />
        <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[-0.40, 0.25, 0]} rotation={[-0.6, 0, 0]}>
        <planeGeometry args={[0.25, 0.15]} />
        <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.40, 0.25, 0.20]} rotation={[-0.6, 0, 0]}>
        <planeGeometry args={[0.25, 0.15]} />
        <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.40, 0.25, -0.20]} rotation={[-0.6, 0, 0]}>
        <planeGeometry args={[0.25, 0.15]} />
        <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      <mesh geometry={spoilerGeo} material={bodyMat} position={[0, 0.06, 0]} castShadow />

      <mesh position={[0.82, 0.22, 0.10]}>
        <boxGeometry args={[0.01, 0.03, 0.01]} />
        <meshPhysicalMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.82, 0.22, -0.10]}>
        <boxGeometry args={[0.01, 0.03, 0.01]} />
        <meshPhysicalMaterial color="#111" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0.82, 0.08, 0]}>
        <boxGeometry args={[0.04, 0.08, 0.15]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0.835, 0.06 + i * 0.012, 0]}>
          <boxGeometry args={[0.005, 0.002, 0.14]} />
          <meshPhysicalMaterial color="#333" metalness={0.8} roughness={0.4} />
        </mesh>
      ))}

      <mesh position={[0.80, 0.02, 0]} castShadow>
        <boxGeometry args={[0.06, 0.015, 0.25]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.0} roughness={0.9} />
      </mesh>
      <mesh position={[0.81, 0.035, 0]} castShadow>
        <boxGeometry args={[0.02, 0.01, 0.12]} />
        <meshPhysicalMaterial color="#222" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[-0.82, 0.025, 0]} castShadow>
        <boxGeometry args={[0.04, 0.02, 0.2]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.0} roughness={0.9} />
      </mesh>

      <mesh position={[0.85, 0.10, 0.12]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshPhysicalMaterial color="#ddeeff" emissive="#88ccff" emissiveIntensity={0.5} metalness={0.0} roughness={0.0} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.85, 0.10, -0.12]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshPhysicalMaterial color="#ddeeff" emissive="#88ccff" emissiveIntensity={0.5} metalness={0.0} roughness={0.0} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0.84, 0.10, 0.12]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshPhysicalMaterial color="#ccc" metalness={0.9} roughness={0.2} transparent opacity={0.3} />
      </mesh>
      <mesh position={[0.84, 0.10, -0.12]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshPhysicalMaterial color="#ccc" metalness={0.9} roughness={0.2} transparent opacity={0.3} />
      </mesh>

      <mesh position={[0.85, 0.07, 0.08]}>
        <boxGeometry args={[0.02, 0.005, 0.04]} />
        <meshPhysicalMaterial color="#88ddff" emissive="#44aaff" emissiveIntensity={0.8} metalness={0.0} roughness={0.1} />
      </mesh>
      <mesh position={[0.85, 0.07, -0.08]}>
        <boxGeometry args={[0.02, 0.005, 0.04]} />
        <meshPhysicalMaterial color="#88ddff" emissive="#44aaff" emissiveIntensity={0.8} metalness={0.0} roughness={0.1} />
      </mesh>

      <mesh position={[-0.86, 0.11, 0.12]}>
        <boxGeometry args={[0.02, 0.035, 0.06]} />
        <meshPhysicalMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.4} metalness={0.1} roughness={0.3} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.86, 0.11, -0.12]}>
        <boxGeometry args={[0.02, 0.035, 0.06]} />
        <meshPhysicalMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={0.4} metalness={0.1} roughness={0.3} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.86, 0.13, 0]}>
        <boxGeometry args={[0.015, 0.008, 0.28]} />
        <meshPhysicalMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={0.3} metalness={0.0} roughness={0.2} transparent opacity={0.7} />
      </mesh>

      <mesh position={[0.80, 0.06, 0.17]}>
        <boxGeometry args={[0.02, 0.01, 0.02]} />
        <meshPhysicalMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.2} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0.80, 0.06, -0.17]}>
        <boxGeometry args={[0.02, 0.01, 0.02]} />
        <meshPhysicalMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.2} transparent opacity={0.8} />
      </mesh>

      <group position={[0.25, 0.24, 0.30]}>
        <mesh material={mirrorMat}>
          <boxGeometry args={[0.06, 0.03, 0.02]} />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[0.055, 0.025, 0.005]} />
          <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 0, -0.008]}>
          <boxGeometry args={[0.01, 0.025, 0.005]} />
          <meshPhysicalMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>
      <group position={[0.25, 0.24, -0.30]}>
        <mesh material={mirrorMat}>
          <boxGeometry args={[0.06, 0.03, 0.02]} />
        </mesh>
        <mesh position={[0, 0, -0.015]}>
          <boxGeometry args={[0.055, 0.025, 0.005]} />
          <meshPhysicalMaterial color="#88bbdd" metalness={0.0} roughness={0.0} transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.008]}>
          <boxGeometry args={[0.01, 0.025, 0.005]} />
          <meshPhysicalMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
      </group>

      <mesh position={[-0.86, 0.035, 0.06]}>
        <cylinderGeometry args={[0.015, 0.02, 0.04, 12]} />
        <meshPhysicalMaterial color="#555" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[-0.86, 0.035, -0.06]}>
        <cylinderGeometry args={[0.015, 0.02, 0.04, 12]} />
        <meshPhysicalMaterial color="#555" metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[-0.88, 0.035, 0.06]}>
        <cylinderGeometry args={[0.018, 0.015, 0.015, 12]} />
        <meshPhysicalMaterial color="#888" metalness={1.0} roughness={0.2} />
      </mesh>
      <mesh position={[-0.88, 0.035, -0.06]}>
        <cylinderGeometry args={[0.018, 0.015, 0.015, 12]} />
        <meshPhysicalMaterial color="#888" metalness={1.0} roughness={0.2} />
      </mesh>

      <mesh position={[0.55, 0.14, 0.275]}>
        <circleGeometry args={[0.025, 12]} />
        <meshPhysicalMaterial color="#1a2a3a" metalness={0.5} roughness={0.5} />
      </mesh>

      <mesh position={[0.55, 0.23, 0]}>
        <boxGeometry args={[0.06, 0.005, 0.02]} />
        <meshPhysicalMaterial color="#111" metalness={0.8} roughness={0.3} />
      </mesh>

      <Wheel position={[-0.55, 0.08, 0.28]} rotation={0} />
      <Wheel position={[-0.55, 0.08, -0.28]} rotation={0} />
      <Wheel position={[0.55, 0.08, 0.28]} rotation={0} />
      <Wheel position={[0.55, 0.08, -0.28]} rotation={0} />

      {[[-0.55, 0.10, 0.29], [-0.55, 0.10, -0.29], [0.55, 0.10, 0.29], [0.55, 0.10, -0.29]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} material={fenderMat}>
          <torusGeometry args={[0.22, 0.015, 6, 12, Math.PI]} />
        </mesh>
      ))}

      <mesh position={[0.0, 0.035, 0.28]} castShadow>
        <boxGeometry args={[1.0, 0.02, 0.03]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.0} roughness={0.9} />
      </mesh>
      <mesh position={[0.0, 0.035, -0.28]} castShadow>
        <boxGeometry args={[1.0, 0.02, 0.03]} />
        <meshPhysicalMaterial color="#0a0a0a" metalness={0.0} roughness={0.9} />
      </mesh>
    </group>
  );
}

function ShowroomFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[12, 12]} />
      <meshPhysicalMaterial color="#080810" metalness={1.0} roughness={0.05} envMapIntensity={1.5} transparent opacity={0.85} />
    </mesh>
  );
}

export const CarViewer: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-gradient-to-b from-[#05050a] via-[#0a0a18] to-[#0f0f1a] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-transparent via-transparent to-[#05050a]/30" />

      <Canvas
        shadows
        camera={{ position: [0, 1.2, 3.8], fov: 32 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={['#05050a']} />
        <fog attach="fog" args={['#05050a', 5, 10]} />

        <Environment preset="studio" />

        <ambientLight intensity={0.15} color="#4466aa" />

        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#ddeeff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        <directionalLight position={[-3, 4, 2]} intensity={0.6} color="#6688cc" />

        <directionalLight position={[-2, 3, -5]} intensity={0.8} color="#88aaff" />

        <pointLight position={[0, 5, 0]} intensity={0.3} color="#4488ff" />

        <pointLight position={[0, -0.5, 1]} intensity={0.15} color="#ff8844" distance={4} />

        <spotLight position={[0, 4, 2]} angle={0.4} penumbra={0.6} intensity={1.2} color="#ffffff" castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        <Center disableX disableZ>
          <SportsCar />
        </Center>

        <ShowroomFloor />

        <ContactShadows position={[0, -0.04, 0]} opacity={0.6} blur={3.5} far={2.5} color="#000" resolution={1024} />

        <Sparkles count={60} scale={[10, 3, 8]} size={0.015} color="#88bbff" opacity={0.08} speed={0.3} />

        <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={Math.PI / 5} maxPolarAngle={Math.PI / 2.0} minDistance={1.8} maxDistance={6} autoRotate autoRotateSpeed={2.5} rotateSpeed={0.8} dampingFactor={0.08} />
      </Canvas>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex items-center gap-4 text-[10px] text-white/20 font-display uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            Zoom
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 9l7-7 7 7M5 15l7 7 7-7" />
            </svg>
            Rotate
          </span>
        </div>
      </div>
    </div>
  );
};
