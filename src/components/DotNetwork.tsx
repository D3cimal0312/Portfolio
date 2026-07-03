import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.trim().replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function lerpColor(a: [number, number, number], b: [number, number, number], t: number) {
  return a.map((c, i) => Math.round(c + (b[i] - c) * t)) as [number, number, number];
}

export default function DotNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const luxHex = getComputedStyle(document.documentElement).getPropertyValue("--color-lux").trim() || "#05d9e8";
    const secondaryHex = getComputedStyle(document.documentElement).getPropertyValue("--color-secondary").trim() || "#20bcc7";
    const CYAN = hexToRgb(luxHex);
    const MAGENTA = hexToRgb(secondaryHex);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Dot[] = [];
    let animationFrame: number;

    const buildDots = () => {
      const count = Math.min(110, Math.floor((vw * vh) / 14000));
      dots = Array.from({ length: count }, () => {
        const x = Math.random() * vw;
        const y = Math.random() * vh;
        const t = x ;
        const [r, g, b] = lerpColor(CYAN, MAGENTA, t);
        return {
          x,
          y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          color: `${r},${g},${b}`,
        };
      });
    };

    const resize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
    };

    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const CONNECT_DIST = 130;
    const MOUSE_DIST = 190;

    const frame = () => {
      ctx.clearRect(0, 0, vw, vh);

      if (!reduceMotion) {
        dots.forEach((d) => {
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0) d.x = vw;
          if (d.x > vw) d.x = 0;
          if (d.y < 0) d.y = vh;
          if (d.y > vh) d.y = 0;
        });
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const o = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.strokeStyle = `rgba(${a.color},${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      dots.forEach((d) => {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const o = (1 - dist / MOUSE_DIST) * 0.85;
          ctx.strokeStyle = `rgba(${d.color},${o})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      dots.forEach((d) => {
        ctx.fillStyle = `rgba(${d.color},0.9)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(frame);
    };
    frame();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden="true"
    />
  );
}