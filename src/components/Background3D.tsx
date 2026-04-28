import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleCloud() {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const particlesCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [particlesCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
        pointsRef.current.rotation.y += delta * 0.03;
        pointsRef.current.rotation.x += delta * 0.05;

        // Interactive mouse movement effect
        const targetX = (state.mouse.x * viewport.width) / 10;
        const targetY = (state.mouse.y * viewport.height) / 10;

        pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * delta;
        pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * delta;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#ea580c"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <ParticleCloud />
      </Canvas>
    </div>
  );
}
