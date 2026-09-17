"use client";

import { useLayoutEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Projects } from "../data/Projectdata";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

interface ProjectListProps {
  headerRef: RefObject<HTMLDivElement>;
  stickyOffset?: number;
}

const ProjectList = ({ headerRef, stickyOffset = 80 }: ProjectListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ordered = [...Projects].sort((a, b) => a.index - b.index);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".project-stack-card");
      const lastCard = cards[cards.length - 1];

      if (headerRef.current && lastCard) {
        ScrollTrigger.create({
          trigger: headerRef.current,
          start: "top top",
          endTrigger: lastCard,
          end: `top top+=${stickyOffset}`,
          pin: true,
          pinSpacing: false,
        });
      }

      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1;
        if (isLast) return;

        ScrollTrigger.create({
          trigger: card,
          start: `top top+=${stickyOffset}`,
          endTrigger: cards[i + 1],
          end: `top top+=${stickyOffset}`,
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.94,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: `top top+=${stickyOffset}`,
            scrub: true,
          },
        });
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [ordered.length, stickyOffset, headerRef]);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-44 lg:gap-22">
      {ordered.map((project, i) => (
        <div
          key={project.index}
          className="project-stack-card origin-top rounded-2xl bg-background"
          style={{ zIndex: i + 1 }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
