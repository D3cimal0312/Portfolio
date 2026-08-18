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
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="600"
      data-aos-delay={Math.min(index * 60, 300)}
      className="group relative flex h-full flex-col  overflow-hidden
        bg-surface/50 p-6 transition-colors duration-300 hover:bg-lux/4 sm:p-7"
    >
      <span className="absolute left-0 top-0 h-full w-0 bg-lux transition-all duration-300 ease-out group-hover:w-[3px]" />

      <span className=" absolute bottom-1 right-3 select-none font-mono text-6xl font-bold leading-none text-white/10">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative z-10 flex h-full flex-col gap-4">
        <div className="flex items-start justify-between ">
          <span className="font-mono text-lg font-medium uppercase tracking-[0.25em] text-lux sm:text-xs">
            {issuer}
          </span>

          {verified ? (
            <span
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap  px-3 py-1
            font-mono text-lg uppercase 
            ${
              verified
                ? "border border-lux/30 bg-lux/6 text-lux"
                : "border border-white/10 bg-white/3 text-white/35"
            }`}
            >
              Verified
            </span>
          ) : (
            <span
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap  px-3 py-1
            font-mono text-lg uppercase border border-lux/30 bg-lux/6 text-lux`}>
            Completed
            </span>
          )}
        </div>

        <div className="">
          <p className="font-mono text-lg font-bold uppercase  tracking-wide text-secondary/75 transition-colors duration-200 group-hover:text-secondary">
            {title}
          </p>
          <p className="mt-2 font-mono text-lg uppercase tracking-[0.15em] text-white/40">
            {sub}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-white/0.40 pt-4">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-mono text-md uppercase tracking-[0.2em]
              text-lux transition-all duration-200 hover:text-lux hover:scale-110 "
            >
              View certificate
              <FiArrowUpRight className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          ) : (
            <span className="font-mono text-md uppercase tracking-[0.2em] text-white/20">
              No record on file
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
