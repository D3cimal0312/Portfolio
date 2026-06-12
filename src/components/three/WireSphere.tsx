import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseTracker } from "./MouseTracker";

export default function WireSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useMouseTracker();

  // entrance — slightly longer delay so it comes in after TorusKnot
  const scale = useRef(0);
  const opacity = useRef(0);
  const elapsed = useRef(0);
  const DELAY = 0.3; // seconds before it starts appearing

  useFrame((_, delta) => {
    if (!mesh.current) return;

    // entrance
    elapsed.current += delta;
    if (elapsed.current > DELAY) {
      scale.current = Math.min(1, scale.current + delta * 1.5)
      opacity.current = Math.min(1, opacity.current + delta * 1.5)
      mesh.current.scale.setScalar(scale.current)
      ;(mesh.current.material as THREE.MeshBasicMaterial).opacity = opacity.current
    }

    // spin
    mesh.current.rotation.x += delta * 0.25;
    mesh.current.rotation.y += delta * 0.25;

    // parallax
    mesh.current.position.x = -7.250 + mouse.current.x * 0.15;
    mesh.current.position.y = 3.125 + mouse.current.y * 0.15;
  });

  return (
    <mesh ref={mesh} position={[-5, -5, -1]} scale={0}>
      <icosahedronGeometry args={[0.9, 3]} />
      <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0} />
    </mesh>
  );
}