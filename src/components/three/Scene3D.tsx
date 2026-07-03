import { Canvas } from "@react-three/fiber";
import WireSphere from "./WireSphere";
import Octahedrons from "./Octahedrons";
import { getDeviceTier } from "../../utlis/deviceTier";

import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";

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

const TIER_SETTINGS = {
  low: { sphereDetail: 1, octahedronCount: 7 },
  mid: { sphereDetail: 2, octahedronCount: 10 },
  high: { sphereDetail: 3, octahedronCount: 14 },
} as const;

export default function Scene3D({
  showWireSphere = true,
  showOctahedrons = true,
  octahedrons = {},
}: Scene3DProps) {
  const detectedTier = getDeviceTier();
  const tier = FORCE_TIER ?? detectedTier;

  const { sphereDetail, octahedronCount } = TIER_SETTINGS[tier];

  // Explicit props always win over the tier default — this only fills
  // in a value when the caller hasn't specified one.
  const resolvedOctahedrons = {
    count: octahedronCount,
    ...octahedrons,
  };

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{
          antialias: tier !== "low",
          alpha: true,
          powerPreference: "low-power",
          precision: tier === "low" ? "lowp" : "highp",
          stencil: false,
          depth: true,
        }}
        dpr={tier === "low" ? 1 : [1, Math.min(window.devicePixelRatio, 2)]}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
        flat={tier === "low"}
        shadows={false}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Preload all />
        {showWireSphere && <WireSphere detail={sphereDetail} />}
        {showOctahedrons && <Octahedrons {...resolvedOctahedrons} />}
      </Canvas>
    </div>
  );
}
