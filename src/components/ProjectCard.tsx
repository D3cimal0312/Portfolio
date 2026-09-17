import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
} from "react-icons/fi";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ProjectImage from "./common/ProjectImage";
import L2rshine from "./common/L2rshine";
import CopyToClipboard from "../utlis/CoptToClipboard";

export interface Project {
  index: number;
  project_name: string;
  project_description: string;
  details: string[];
  github_link: string;
  live_link?: string;
  tag: string[];
  image: string[];
}

interface ProjectCardProps {
  project: Project;
}

const AUTO_ADVANCE_MS = 5000;

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    index,
    project_name,
    project_description,
    details,
    github_link,
    live_link,
    tag,
    image,
  } = project;

  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const images = image.filter(Boolean);
  const multi = images.length > 1;
  const copyUrl = live_link || github_link;

  const next = () => setActive((a) => (a + 1) % images.length);
  const prev = () => setActive((a) => (a - 1 + images.length) % images.length);

  useEffect(() => {
    if (!multi) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % images.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(id);
  }, [active, images.length, multi]);

  return (
    <article
      className="group relative border border-lux/10 bg-surface px-5 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12
        transition-colors duration-300 hover:border-lux/25"
      data-aos="fade-up"
      data-aos-delay={(index % 5) * 80}
    >
      <L2rshine />

      <div className="flex flex-col md:flex-row-reverse gap-8 md:gap-10 lg:gap-14">
        <div className="w-full md:w-[45%] lg:w-[48%] shrink-0 h-fit">
          <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/40">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 min-w-0 flex-1 truncate rounded-sm border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] tracking-widest text-white/40">
                <CopyToClipboard
                  text={copyUrl || ""}
                  urlTrim
                  className="block w-full truncate text-left transition-colors duration-200 hover:text-lux"
                />
              </span>
            </div>

            <div className="relative aspect-[3/2] overflow-hidden bg-zinc-900">
              {images.map((src, i) => (
                <ProjectImage
                  key={i}
                  images={[src]}
                  alt={`${project_name} screenshot ${i + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover object-top
                    transition-opacity duration-300 motion-reduce:transition-none
                    ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              {multi && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous screenshot"
                    className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center
                      border border-white/15 bg-black/50 text-white/80
                      transition-colors duration-200 hover:border-white/50 hover:text-white motion-reduce:transition-none
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-lux"
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next screenshot"
                    className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center
                      border border-white/15 bg-black/50 text-white/80
                      transition-colors duration-200 hover:border-white/50 hover:text-white motion-reduce:transition-none
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-lux"
                  >
                    <FiChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`Go to screenshot ${i + 1}`}
                        aria-current={i === active ? "true" : undefined}
                        className={`h-1 rounded-full transition-all duration-300 motion-reduce:transition-none
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-lux
                          ${i === active ? "w-6 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="mt-2.5 font-mono text-[10px] uppercase text-lux">
            {multi ? `${active + 1} / ${images.length} - ` : ""} preview
          </p>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-7 bg-lux" />
            <span className="font-mono text-xs uppercase text-lux">
              Project 0{index}
              {tag[0] ? ` · ${tag[0]}` : ""}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl">
            {project_name}
          </h3>

          <p className="mt-3 max-w-prose text-sm leading-7 tracking-wide text-white/70 text-pretty sm:text-base">
            {project_description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {tag.map((t) => (
              <span
                key={t}
                className="rounded-full border px-2.5 py-1 font-mono text-xs tracking-widest uppercase
                  border-lux/35 bg-lux/10 text-lux"
              >
                {t}
              </span>
            ))}
          </div>

          {/* actions */}
          <div className="flex flex-wrap mt-auto gap-3 pt-6">
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border px-4 py-2.5 font-mono text-xs tracking-widest uppercase
                border-lux bg-lux/10 text-white
                transition-colors duration-200 hover:bg-lux hover:text-black motion-reduce:transition-none
                focus:outline-none focus-visible:ring-2 focus-visible:ring-lux"
            >
              <SiGithub size={16} />
              Source
            </a>
            {live_link && (
              <a
                href={live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/25 px-4 py-2.5 font-mono text-xs tracking-widest uppercase
                  text-white/85 transition-colors duration-200 hover:border-lux hover:text-lux motion-reduce:transition-none
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-lux"
              >
                <FiExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* full-width tech details */}
      <div className="mt-6 w-full border-t border-lux/10 pt-4">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`spec-${index}`}
          onClick={() => setIsOpen((o) => !o)}
          className={`flex items-center gap-2 font-mono text-xs  uppercase
          transition-colors duration-200 motion-reduce:transition-none
          focus:outline-none focus-visible:ring-2 focus-visible:ring-lux
          ${isOpen ? "text-lux" : "text-white/80 hover:text-white"}`}
        >
          <span className="h-px w-4 bg-lux" />
          Tech Details / Arch Spec
          <FiChevronDown
            size={16}
            className={`transition-transform duration-300 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          id={`spec-${index}`}
          className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="mt-2 space-y-1">
              {details.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 text-sm leading-6 tracking-wide text-white/65"
                >
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-lux" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
