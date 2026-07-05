import Scene3D from "./three/Scene3D";
import { memo } from "react";
import DotNetwork from "./DotNetwork";
import ScrollDown from "./ScrollDown";

const StableScene = memo(() => (
  <Scene3D octahedrons={{ count: 12, seed: 39, margin: 0.1 }} />
));

const STACK = [
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "Tailwind",
  "TypeScript",
];

export default function Hero() {
  return (
    <section
      className="relative z-0 w-full h-screen overflow-clip bg-surface"
      id="hero"
    >
      {/* 3d components */}
      <StableScene />
      <DotNetwork />

      <div className=" hero relative z-10 flex flex-col items-center justify-center h-full px-6 sm:px-10 text-center">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <span className="absolute top-[12%] left-[8%] w-10 h-10 border-t-2 border-l-2 border-secondary" />
          <span className="absolute top-[12%] right-[8%] w-10 h-10 border-t-2 border-r-2 border-secondary" />
          <span className="absolute bottom-[14%] left-[8%] w-10 h-10 border-b-2 border-l-2 border-secondary" />
          <span className="absolute bottom-[14%] right-[8%] w-10 h-10 border-b-2 border-r-2 border-secondary" />
        </div>

        <div className="flex flex-col items-center max-w-3xl">
          <p
            data-aos="fade-up"
            className="flex items-center gap-3 text-white text-xs uppercase mb-6 bg-surface/50 px-3 py-1"
          >
            <span className="w-8 h-px bg-lux inline-block" />
            MERN Developer &amp; CSIT Student
            <span className="w-8 h-px bg-lux inline-block" />
          </p>

          <h1
            data-aos="fade-up"
            className="font-black uppercase leading-[0.9] tracking-tight select-none"
            style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
          >
            <span className="text-lux block">Anuj</span>
            <span className="text-lux">Bajra</span>
            <span className="text-white">charya</span>
          </h1>

          <p
            data-aos="fade-up"
            className="text-slate-300 text-sm sm:text-base md:text-lg mt-6 mb-4 font-mono leading-relaxed max-w-lg
            bg-surface/50 px-2"
          >
            Building full-stack web experiences with React, Node &amp; MongoDB —
            final-year CSIT student based in{" "}
            <span className="text-lux text-lg sm:text-2xl md:text-3xl font-bold bg-surface whitespace-nowrap px-1">
              Kathmandu, Nepal.
            </span>
          </p>

          <div
            data-aos="fade-up"
            className="flex flex-wrap justify-center gap-2 mb-8 max-w-xl"
          >
            {STACK.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-lux/90
                           border border-lux/30 px-3 py-1.5 bg-surface/60 hover:bg-lux/10
                           hover:border-lux transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            data-aos="fade-up"
            className="flex gap-4 flex-wrap justify-center pt-2"
          >
            <a
              href="https://github.com/D3cimal0312"
              target="_blank"
              className="w-full sm:w-auto"
            >
              <div
                className="px-6 py-2.5 bg-lux text-black text-xs font-bold
                           tracking-widest uppercase cursor-pointer text-center
                           hover:bg-white transition-colors duration-200"
              >
                Visit Github
              </div>
            </a>

            <a href="#contact" className="w-full sm:w-auto">
              <div
                className="px-6 py-2.5 border border-white/60 text-white text-xs font-bold
                           tracking-widest uppercase cursor-pointer text-center
                           hover:bg-white hover:text-black transition-colors duration-200"
              >
                LET'S TALK
              </div>
            </a>
          </div>
        </div>
      </div>

      <ScrollDown />
    </section>
  );
}
