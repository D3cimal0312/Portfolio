import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
const FINAL_TEXT = "ANUJ";
const INITIAL_LENGTH = 10;

function useScramble(final: string, active: boolean) {
  const [text, setText] = useState(
    Array.from(
      { length: INITIAL_LENGTH },
      () => CHARS[Math.floor(Math.random() * CHARS.length)],
    ).join(""),
  );

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const totalFrames = 80; // higher = slower

    const interval = setInterval(() => {
      frame++;

      const currentLength = Math.max(
        final.length,
        Math.round(
          INITIAL_LENGTH -
            ((INITIAL_LENGTH - final.length) * frame) / (totalFrames * 0.5),
        ),
      );

      //  finalll charas
      const locked = Math.floor((frame / totalFrames) * final.length);

      const chars = Array.from({ length: currentLength }, (_, i) =>
        i < locked ? final[i] : CHARS[Math.floor(Math.random() * CHARS.length)],
      ).join("");

      setText(chars);

      if (frame >= totalFrames) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [active, final]);

  return text;
}
const Loader = ({ onDone }: { onDone: () => void }) => {
  const [scrambling, setScrambling] = useState(false);
  const [exiting, setExiting] = useState(false);
  const text = useScramble(FINAL_TEXT, scrambling);

  useEffect(() => {
    const t1 = setTimeout(() => setScrambling(true), 400);

    const t2 = setTimeout(() => setExiting(true), 4000);

    const t3 = setTimeout(() => onDone(), 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]"
          exit={{ y: "-100%" }}
           transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} 
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff18 2px, transparent 2px)",
              backgroundSize: "40px 40px",
            }}
          />

          <motion.span
            className="relative z-10 font-black tracking-[0.3em] text-6xl md:text-8xl text-white font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {text.split("").map((char, i) => (
              <span
                key={i}
                style={{
                  color: text[i] === FINAL_TEXT[i] ? "#c8f500" : "#ffffff55",
                  transition: "color 0.1s",
                }}
              >
                {char}
              </span>
            ))}
          </motion.span>

          <motion.div
            className="absolute bottom-10 left-0 h-[2px] bg-lux"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3.5, ease: "linear" }}
          />

          <motion.p
            className="relative z-10 mt-6 font-mono text-xs tracking-[0.4em] uppercase text-white/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Portfolio — 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
