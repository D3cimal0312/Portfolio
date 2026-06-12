import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseTracker } from "./MouseTracker";


function createSeededRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s += 0x6d2b79f5;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


interface OctahedronConfig {
  position: [number, number, number];
  speed: number;
  parallaxStrength: number;
  color: string;
}

function Octahedron({ position, speed, parallaxStrength, color }: OctahedronConfig) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useMouseTracker();
  const basePos = useRef(new THREE.Vector3(...position));

  // fade + scale in on mount
  const scale = useRef(0);
  const opacity = useRef(0);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    scale.current = Math.min(1, scale.current + delta * 2)  
    opacity.current = Math.min(1, opacity.current + delta * 2)
    mesh.current.scale.setScalar(scale.current)
    ;(mesh.current.material as THREE.MeshBasicMaterial).opacity = opacity.current

   
    mesh.current.rotation.x += delta * speed * 0.6;
    mesh.current.rotation.y += delta * speed * 0.8;
    mesh.current.position.y =
      basePos.current.y +
      Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.15;
    mesh.current.position.x =
      basePos.current.x + mouse.current.x * parallaxStrength;
  });

  return (
    <mesh ref={mesh} position={position} scale={0}>
      <octahedronGeometry args={[0.18]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0} />
    </mesh>
  );
}


function generateConfigs(
  count: number,
  seed: number,
  halfW: number,   // exact visible half-width in world units
  halfH: number    // exact visible half-height in world units
): OctahedronConfig[] {
  const rng = createSeededRng(seed);
  const COLORS = ["#00e5ff", "#c8f500"];
  const SPEEDS = [1.2, 0.8, 1.5, 1.0, 1.3];

  return Array.from({ length: count }, (_, i) => ({
    position: [
      (rng() - 0.5) * 2 * halfW,   // full visible width
      (rng() - 0.5) * 2 * halfH,   // full visible height
      (rng() - 0.5) * 1,
    ] as [number, number, number],
    speed: SPEEDS[i % SPEEDS.length],
    parallaxStrength: 0.1 + rng() * 0.2,
    color: COLORS[Math.floor(rng() * COLORS.length)],
  }));
}


interface SceneProps {
  count: number;
  seed: number;
  margin: number;
}

function Scene({ count, seed, margin }: SceneProps) {
  const { camera, size } = useThree();

  const items = useMemo(() => {
    // Derive visible world size from the actual camera + viewport
    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    const dist = camera.position.z;
    const halfH = Math.tan(fov / 2) * dist;
    const halfW = halfH * (size.width / size.height);

    return generateConfigs(count, seed, halfW * (1 - margin), halfH * (1 - margin));
  }, [count, seed, margin, camera, size]);

  return (
    <>
      {items.map((cfg, i) => (
        <Octahedron key={i} {...cfg}  />
      ))}
    </>
  );
}


interface OctahedronsProps {
  /** Number of octahedrons to render (default: 11) */
  count?: number;
  /** Seed — same number always gives the same layout (default: 42) */
  seed?: number;
  /**
   * How much of the visible area to leave empty at the edges (0–1).
   * 0 = right to the edge, 0.1 = 10% inset on each side. (default: 0.05)
   */
  margin?: number;
}

export default function Octahedrons({
  count = 11,
  seed = 42,
  margin = 0.05,
}: OctahedronsProps) {
  return <Scene count={count} seed={seed} margin={margin} />;
}



// count (default: 11)
// How many octahedrons to render. Change this to add or remove shapes — count={5} for sparse, count={30} for dense.seed (default: 42)
// A number that controls the random layout. Same seed always produces the exact same positions, colors, and parallax values. Change it to get a completely different arrangement — seed={1}, seed={99}, anything — without touching anything else.margin (default: 0.05)
// How much breathing room to leave at the canvas edges, as a fraction of the visible area. 0 means shapes can appear right at the edge, 0.1 means 10% inset on all sides. Keeps shapes from feeling clipped.