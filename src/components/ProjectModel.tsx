import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { FiX, FiChevronLeft, FiChevronRight, FiGlobe } from "react-icons/fi";
import ProjectImage from "./common/ProjectImage";

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

interface ProjectModelProps {
  project: Project | null;
  onClose: () => void;
}

const AUTO_ADVANCE_MS = 5000;

const ProjectModel = ({ project, onClose }: ProjectModelProps) => {
  const [index, setIndex] = useState(0);

  const slideCount = project ? Math.max(project.image.length, 1) : 1;

  useEffect(() => {
    setIndex(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slideCount),
      AUTO_ADVANCE_MS,
    );
    return () => clearInterval(id);
  }, [project, index, slideCount]);

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const slides = project.image.length > 0 ? project.image : [""];
  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + slideCount) % slideCount);

  const modal = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-200 flex items-center justify-center p-3 sm:p-6"
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 24 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-[94vw] sm:w-[86vw] lg:w-[80vw] max-w-375
          h-[92vh] sm:h-[85vh] lg:h-[82vh] max-h-275
          border border-lux/30 bg-surface flex flex-col"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-30 flex size-9 items-center justify-center
            text-white/80 hover:text-lux
            border border-lux/40 hover:border-lux
            transition-colors duration-200 bg-black/50"
        >
          <FiX size={18} />
        </button>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-full">

            <div className="relative aspect-4/3 sm:aspect-video lg:aspect-auto lg:h-full bg-zinc-900 overflow-hidden">
              {slides.map((src, i) => (
                <ProjectImage
                  key={i}
                  images={[src]}
                  alt={project.project_name}
                  className={`absolute inset-0 w-full h-full object-cover object-top
                    transition-opacity duration-500
                    ${i === index ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              <button
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center
                  text-white/80 hover:text-lux
                  border border-lux/30 hover:border-lux
                  transition-colors duration-200 bg-surface/60"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center
                  text-white/80 hover:text-lux
                  border border-lux/30 hover:border-lux
                  transition-colors duration-200 bg-surface/60"
              >
                <FiChevronRight size={20} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1 transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-lux"
                        : "w-3 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4 p-6 sm:p-8 md:p-10">
              <span className="font-mono text-xs tracking-widest uppercase text-lux">
                {String(project.index).padStart(2, "0")} / Project
              </span>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                {project.project_name}
              </h3>

              <div className="flex items-center gap-2 flex-wrap">
                {project.tag.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs tracking-widest uppercase text-secondary/55
                      bg-secondary/[0.07] border border-lux/20 px-1.5 py-0.5 rounded-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-2.5 pt-4">
                {project.details.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-sm md:text-lg lg:text-xl leading-6 tracking-wider text-white/60"
                  >
                    <span className="mt-2 size-1 shrink-0 bg-lux" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="flex gap-3 pt-4 mt-auto border-t border-lux/15">
                {project.github_link && (
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5
                      font-mono text-sm tracking-widest uppercase text-white/80
                      border border-lux/30 hover:border-lux hover:text-lux
                      transition-colors duration-200"
                  >
                    <SiGithub
                      size={18}
                      className="text-white/80 group-hover:text-lux transition-colors duration-200"
                    />
                    GitHub
                  </a>
                )}
                {project.live_link && (
                  <a
                    href={project.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2.5
                      font-mono text-sm tracking-widest uppercase text-white/80
                      border border-lux/30 hover:border-lux hover:text-lux
                      transition-colors duration-200"
                  >
                    <FiGlobe
                      size={18}
                      className="text-white/80 group-hover:text-lux transition-colors duration-200"
                    />
                    Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modal, document.body);
};

export default ProjectModel;
