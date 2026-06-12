import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseTracker } from "./MouseTracker";

export default function TorusKnot() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useMouseTracker();

  const tiltX = useRef(0);
  const tiltY = useRef(0);

  // entrance
  const spinBoost = useRef(4)
  const opacity = useRef(0)

  useFrame((_, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    // boost decays from 10 → 0 over ~3s
    spinBoost.current = Math.max(0, spinBoost.current - delta * 3)

    // fade in during the first ~1s
    opacity.current = Math.min(1, opacity.current + delta * 1.5)
    ;(meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity.current

    // spin — fast at start, settles to idle speed
    meshRef.current.rotation.x += delta * (0.2 + spinBoost.current)
    meshRef.current.rotation.y += delta * (0.4 + spinBoost.current)

    // mouse tilt
    tiltX.current += (mouse.current.y * 0.25 - tiltX.current) * 1;
    tiltY.current += (mouse.current.x * 0.25 - tiltY.current) * 0.75;

    groupRef.current.rotation.x = tiltX.current;
    groupRef.current.rotation.y = tiltY.current;
    groupRef.current.position.x = 2.5 + mouse.current.x * 0.3;
    groupRef.current.position.y = mouse.current.y * 0.3;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.5, 0.35, 42, 24, 2, 3]} />
        <meshBasicMaterial color="#c8f500" wireframe transparent opacity={0} />
      </mesh>
    </group>
  );
}