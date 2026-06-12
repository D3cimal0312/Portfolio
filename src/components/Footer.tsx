
export default function Footer() {
  return (
    <footer className="bg-black px-12 py-8 flex  flex-wrap gap-4 items-center justify-between border-t border-lux/20">

      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/20 whitespace-nowrap">
        © 2026 
      </p>

      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/20">
        Built with <span className="text-lux">React</span> · <span className="text-lux">TypeScript</span> · <span className="text-lux">Tailwind</span>
      </p>

      <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/20">
        Designed &amp; developed by <span className="text-white/40">Anuj</span>
      </p>

    </footer>
  )
}