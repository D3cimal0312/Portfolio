import Scene3D from "./three/Scene3D";
import { memo } from "react";

const StableScene = memo(() => (
  <Scene3D octahedrons={{ count: 12, seed: 39 }} />
));

export default function Hero() {
  return (
    <section
      className="relative w-full h-screen overflow-clip bg-black/10"
      id="hero"
    >
      <StableScene />

      <div className=" flex flex-col justify-center h-full px-6 sm:px-10 md:px-16 max-w-2xl">
        <p
          data-aos="fade-up"
          className="flex items-center gap-3 text-white text-xs uppercase mb-6 bg-black/50 "
        >
          <span className="w-8 h-px bg-lux inline-block" />
          MERN Developer &amp; CSIT Student
        </p>

        <h1
          data-aos="fade-up"
          className="font-black uppercase leading-[0.9] tracking-tight select-none"
          style={{ fontSize: "clamp(2.75rem, 12vw, 7rem)" }}
        >
          <span className=" text-lux block">Anuj</span>
          <span className=" text-lux ">Bajra</span>
          <span className=" text-white">charya</span>
        </h1>

        <p
          data-aos="fade-up"
          className="text-slate-300 text-sm sm:text-base md:text-lg mt-6 mb-8 font-mono leading-relaxed max-w-md
          bg-black/50 line-clamp-8"
        >
          Building full-stack web experiences with React, Node &amp; MongoDB —
          final-year CSIT student based in{" "}
          <span className="text-lux text-lg sm:text-xl md:text-2xl font-bold bg-black whitespace-nowrap">
            Kathmandu, Nepal
          </span>
          .
        </p>

        <div data-aos="fade-up" className="flex gap-4 flex-wrap pt-8">
          <a href="https://github.com/D3cimal0312" target="_blank" className="w-full sm:w-auto">
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

      <span
        data-aos="fade-up"
        data-aos-offset="10"
        className="absolute bottom-8 sm:bottom-12 right-6 sm:right-10 text-white text-base sm:text-lg md:text-xl tracking-[0.3em]
                   uppercase font-mono rotate-90 origin-bottom-right opacity-30
                   flex justify-between items-center gap-3 sm:gap-5
                   bg-black/50 md:bg-none
                   animate-bounce-x"
      >
        <span className="w-15 h-1 bg-[#00e5ff] inline-block" />

        <span className="   text-white/80 md:text-lux">SCROLL DOWN</span>
        <span className="w-15 h-1 bg-[#00e5ff] inline-block" />
      </span>
    </section>
  );
}