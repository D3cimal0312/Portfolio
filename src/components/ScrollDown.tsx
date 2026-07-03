export default function ScrollDown() {
  return (
    <span
      
      

      className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10
                 flex flex-col items-center gap-3 text-white/50 text-lg sm:text-xs
                 tracking-[0.4em] uppercase  group"
    >
      <span className="group-hover:text-lux transition-colors duration-300">
        Scroll
      </span>

      <span className="relative w-[2px] h-14 sm:h-12 bg-white/10 overflow-hidden rounded-full">
        <span className="scroll-glow-line absolute left-0 top-0 w-full h-6" />
      </span>
    </span>
  );
}