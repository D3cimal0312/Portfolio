import { Canvas } from "@react-three/fiber";
import TorusKnot from "./TorusKnot";
import WireSphere from "./WireSphere";
import Octahedrons from "./Octahedrons";
import { getDeviceTier } from "../../utlis/deviceTier";

import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei'

const FORCE_TIER: "low" | "mid" | "high" | null = null;
// const FORCE_TIER: "low" | "mid" | "high" | null = "low";


interface OctahedronOptions {
  count?: number;
  seed?: number;
  margin?: number;
}

interface Scene3DProps {
  showTorusKnot?: boolean;
  showWireSphere?: boolean;
  showOctahedrons?: boolean;
  octahedrons?: OctahedronOptions;
}

export default function Scene3D({
  showTorusKnot = true,
  showWireSphere = true,
  showOctahedrons = true,
  octahedrons = {},
}: Scene3DProps) {
  const detectedTier = getDeviceTier();
  const tier = FORCE_TIER ?? detectedTier;








  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
  

<Canvas
  camera={{ position: [0, 0, 6], fov: 60 }}
  gl={{
    antialias: tier !== 'low',
    alpha: true,
    powerPreference: 'low-power',
    precision: tier === 'low' ? 'lowp' : 'highp',
    stencil: false,
    depth: true,
  }}
  dpr={tier === 'low' ? 1 : Math.min(window.devicePixelRatio, 2)}
  style={{ background: 'transparent' }}
  performance={{ min: 0.5 }}
  flat={tier === 'low'}

  shadows={false}
>
  <AdaptiveDpr pixelated />
  <AdaptiveEvents/>
  <Preload all />
  {showTorusKnot && <TorusKnot />}
  {showWireSphere && <WireSphere />}
  {showOctahedrons && <Octahedrons {...octahedrons} />}
</Canvas>
    </div>
  );
}


// AdaptiveDpr pixelated — Lowers dpr automatically when FPS drops, raises it back when recovered.AdaptiveDpr pixelated — Lowers dpr automatically when FPS drops, raises it back when recovered. pixelated keeps the upscaling sharp instead of blurry.
// AdaptiveEvents — Pauses raycasting during movement. Skip it — your canvas is decorative with no click handlers.
// !but adaptive events if records some other mouse even can cause the 3d render to disapper good for multi pages

// Preload all — Renders one hidden frame upfront so the first visible frame doesn't stutter.