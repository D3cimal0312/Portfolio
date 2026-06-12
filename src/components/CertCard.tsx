// CertCard.tsx
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

type CertCardProps = {
  issuer: string;
  title: string;
  sub: string;
  link: string | null;
  verified: boolean;
  index: number;
};

export function CertCard({
  issuer,
  title,
  sub,
  link,
  verified,
  index,
}: CertCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rx = ((y - height / 2) / (height / 2)) * -20;
    const ry = ((x - width / 2) / (width / 2)) * 20;

    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
    shine.style.background = `radial-gradient(circle at ${(x / width) * 100}% ${(y / height) * 100}%, rgba(200,245,0,0.10) 0%, transparent 60%)`;
    shine.style.opacity = "1";
  };

  const onLeave = () => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || !shine) return;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    shine.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden flex flex-col gap-3 
        bg-transparent border-[0.5px] border-lux/30 hover:border-lux/70
        transition-colors duration-200"
      style={{ transition: "transform 0.1s linear, border-color 0.2s" }}
    >
      <div
        data-aos="flip-right"
        data-aos-duration="1000"
        data-aos-delay={index * 100}
        className="bg-black/50 w-full h-full p-6"
      >
        <div
          ref={shineRef}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
        />

        {/* top row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-lg tracking-[0.25em] uppercase text-lux/50">
            {issuer}
          </span>
          <span
            className="font-mono text-lg tracking-[0.2em] uppercase px-2 py-0.5"
            style={{
              border: "1px solid rgba(200,245,0,0.3)",
              color: verified ? "#c8f500" : "rgba(255,255,255,0.25)",
              borderColor: verified
                ? "rgba(200,245,0,0.3)"
                : "rgba(255,255,255,0.1)",
            }}
          >
            {verified ? "Verified" : "Completed"}
          </span>
        </div>

        {/* title */}
        <p
          className="font-mono text-sm font-bold uppercase tracking-wide text-white
        leading-snug group-hover:text-lux transition-colors duration-200"
        >
          {title}
        </p>

        {/* sub */}
        <p className="font-mono text-lg uppercase tracking-widest text-white/30">
          {sub}
        </p>

        {/* link */}
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-2 inline-flex items-center gap-1 font-mono text-[10px]
            tracking-[0.2em] uppercase text-lux/40 hover:text-lux
            transition-colors duration-200"
            style={{ borderBottom: "1px solid rgba(200,245,0,0.2)" }}
          >
            View certificate <FiArrowUpRight />
          </a>
        ) : (
          <div className="mt-auto pt-2" />
        )}
      </div>
    </div>
  );
}
