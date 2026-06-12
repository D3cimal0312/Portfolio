export type DeviceTier = "low" | "mid" | "high"

export function getDeviceTier(): DeviceTier {
  let score = 0

  // ─── CPU (0–3 pts) ───────────────────────────────────────────────
  // hardwareConcurrency: logical cores including hyperthreading
  // Budget phone: 4  |  Mid Android: 6–8  |  Desktop/M-series: 8–16+
  const cores = navigator.hardwareConcurrency ?? 2
  if (cores >= 12) score += 3      // desktop / M-series MacBook
  else if (cores >= 8) score += 2  // upper mid-range phone / laptop
  else if (cores >= 4) score += 1  // most modern budget phones
  // <= 2 cores → 0 pts (very old/weak device)

  // ─── RAM (0–3 pts) ───────────────────────────────────────────────
  // deviceMemory rounds to: 0.25 / 0.5 / 1 / 2 / 4 / 8
  // Not supported in Firefox/Safari → falls back to 2 (neutral)
  // Budget phone: 1–2GB  |  Mid: 4GB  |  High: 8GB+
  const mem = (navigator as any).deviceMemory ?? 2
  if (mem >= 8) score += 3
  else if (mem >= 4) score += 2
  else if (mem >= 2) score += 1
  // < 2GB → 0 pts

  // ─── GPU (0–3 pts) ───────────────────────────────────────────────
  // WEBGL_debug_renderer_info is blocked in Firefox with
  // privacy.resistFingerprinting — falls back to +1 (neutral)
  // Tiers cover: desktop discrete, Apple silicon, modern mobile,
  // old mobile, and software renderers (Chromebook, VM, old Android)
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    if (gl) {
      const ext = gl.getExtension("WEBGL_debug_renderer_info")
      if (ext) {
        const renderer = (gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string).toLowerCase()

        if (
          // Desktop discrete — Nvidia, AMD, Intel Arc
          /nvidia|geforce|rtx|gtx|quadro|radeon\s(rx|pro|vega)|rx\s\d{3,4}|arc\s[ab]\d/i.test(renderer)
        ) score += 3

        else if (
          // Apple silicon (M1–M4) + flagship mobile
          // Adreno 700+ = Snapdragon 8 Gen series
          // Mali-G710/G715 = Dimensity 9000+
          // Apple A15/A16/A17 = iPhone 13–15
          /apple\sm[1-4]|adreno\s7\d\d|mali-g7[1-9]|mali-g[89]\d|apple\sa1[5-9]/i.test(renderer)
        ) score += 3

        else if (
          // Upper mid-range mobile
          // Adreno 600/500 = Snapdragon 7/6 series
          // Mali-G57/G68/G76 = Dimensity 700/800/1000
          // Apple A12/A13/A14 = iPhone XS–12
          // PowerVR GX = older iPad/iPhone
          /adreno\s[56]\d\d|mali-g[5-7]\d|apple\sa1[2-4]|powervr\sgx[6-9]/i.test(renderer)
        ) score += 2

        else if (
          // Low-end mobile — still has a real GPU
          // Adreno 300/400 = older Snapdragon budget
          // Mali-400/T series = older/budget Android
          // VideoCore = Raspberry Pi
          /adreno\s[34]\d\d|mali-[4t]\d+|videocore/i.test(renderer)
        ) score += 1

        // Software / no GPU → 0 pts
        // swiftshader, llvmpipe, mesa, software rasterizer
        // these are Chromebooks in software mode, VMs, old netbooks
      }
    }
  } catch {
    score += 1 // extension blocked → assume neutral
  }

  // ─── Screen DPR (0–1 pt) ─────────────────────────────────────────
  // High DPR screen correlates with premium device
  // Budget Android: 1–1.5  |  Most phones: 2–3  |  iPad Pro: 2
  // Not a strong signal alone — just a tiebreaker
  if (window.devicePixelRatio >= 2) score += 1

  // ─── Connection / battery overrides ──────────────────────────────
  // These hard-cap regardless of hardware score
  // User explicitly asked for reduced data — respect it
  const connection = (navigator as any).connection
  if (connection?.saveData) return "low"

  // Slow connection = low regardless of GPU
  // effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') return "low"

  // ─── Score → tier ────────────────────────────────────────────────
  // Max possible score: 3+3+3+1 = 10
  //
  // "low"  0–3:  budget phones, old devices, Chromebooks, VMs
  // "mid"  4–6:  mid-range Android, older iPhones, base laptops
  // "high" 7–10: flagship phones, M-series, gaming laptops, desktops
  if (score >= 7) return "high"
  if (score >= 4) return "mid"
  return "low"
}



// low — dpr: 1, no antialias, lowp precision, stencil: false, flat: true
// low — dpr: 1, no antialias, lowp precision, stencil: false, flat: true
// mid — dpr: 1.5, no antialias, mediump precision, stencil: false
// high — dpr: 2, antialias on, highp precision, full quality  what would the different in visuals

// low — Noticeably pixelated, no smooth edges on geometry, flat lighting with no gamma correction.low — Noticeably pixelated, no smooth edges on geometry, flat lighting with no gamma correction. Looks rough but runs anywhere.
// mid — Slightly soft edges (no antialias), correct lighting/colors, decent sharpness on most screens. Hard to distinguish from high on non-retina displays.
// high — Sharp crisp edges, smooth curves, correct colors, full detail on retina/4K screens. Looks exactly as the artist intended.