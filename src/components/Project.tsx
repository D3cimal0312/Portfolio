"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Title from "./common/Title";
import { Projects, portfolio } from "../data/Projectdata";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ProjectList from "./ProjectList";

const Project = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(80);

  useEffect(() => {
    Projects.forEach(({ image }) => {
      image.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);

  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const update = () => setHeaderHeight(headerRef.current?.offsetHeight ?? 80);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full bg-surface/10 pt-14 text-white sm:pt-16 md:pt-20 px-4 pb-16 sm:px-6 sm:pb-20 md:px-12 md:pb-24"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <header
          ref={headerRef}
          className="relative z-30 mb-6 flex flex-wrap items-end justify-between gap-4 py-4 md:mb-10"
        >
          <Title heading="My Projects" sub_heading="Selected Work" />
        </header>

        <ProjectList
          headerRef={headerRef as React.RefObject<HTMLDivElement>}
          stickyOffset={headerHeight}
        />

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-lux/10 pt-6">
          <a
            href={portfolio.github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase text-white/60
              transition-colors duration-150 hover:border-lux hover:text-white
              border border-lux/40 "
          >
            {portfolio.project_name}
            <SiGithub size={16} aria-hidden />
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Project;
