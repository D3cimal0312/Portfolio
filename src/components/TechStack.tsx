import { useRef } from "react";
import Title from "./common/Title";
import {
  SiReact,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiGit,
  SiGithub,
  SiTailwindcss,
  SiBootstrap,
  SiTypescript,
  SiFramer,
  SiSelenium,
  SiC,
  SiMantine,
  SiVercel,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiGraphql,
  SiFigma,
  SiPostman,
} from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation'
import { useIntersection } from 'react-use'
const items = [
  { icon: SiHtml5, label: "HTML", color: "#E34F26" },
  { icon: SiCss, label: "CSS", color: "#1572B6" },
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiExpress, label: "Express", color: "#ffffff" },
  { icon: SiNodedotjs, label: "Node.js", color: "#339933" },
  { icon: SiMongodb, label: "MongoDB", color: "#47A248" },
  { icon: SiGit, label: "Git", color: "#F05032" },
  { icon: SiGithub, label: "GitHub", color: "#ffffff" },
  { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
  { icon: SiBootstrap, label: "Bootstrap", color: "#7952B3" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiFramer, label: "Framer Motion", color: "#ffffff" },
  { icon: SiSelenium, label: "Selenium", color: "#43B02A" },
  { icon: SiC, label: "C", color: "#A8B9CC" },
  { icon: SiMantine, label: "Mantine UI", color: "#339AF0" },
  { icon: SiVercel, label: "Vercel", color: "#ffffff" },
  { icon: SiGraphql, label: "GraphQL", color: "#E10098" },
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: SiPostman, label: "Postman", color: "#FF6C37" },

  { icon: null, label: "REST", sub_label: "API", color: "#1572B6" },
];

const DraggableIcon = ({
  icon: Icon,
  label,
  sub_label,
  color,
  
}: {
  icon: any;
  label: string;
  sub_label?: string;
  color: string;

}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="group flex flex-col items-center justify-center cursor-grab active:cursor-grabbing shrink-0 w-16 sm:w-20 md:w-24 lg:w-[100px]"
      style={{ zIndex: 1 }}
      drag
  
      dragSnapToOrigin
      dragElastic={1}
      dragTransition={{ bounceStiffness: 1000, bounceDamping: 50 }}
      whileDrag={{ scale: 1.2, zIndex: 50 }}
      whileHover={{ scale: 1.15 }}
      onHoverStart={() => {
        if (iconRef.current) iconRef.current.style.color = color;
      }}
      onHoverEnd={() => {
        if (iconRef.current) iconRef.current.style.color = "#ffffff";
      }}
    >
      <div
        ref={iconRef}
        style={{ color: "#ffffff", transition: "color 0.3s", "--icon-color": color } as React.CSSProperties}
        className="max-sm:text-(--icon-color)!"
      >
        {Icon ? (
          <Icon size={100} className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px]" />
        ) : (
          <div className="flex flex-col items-center leading-none">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">{label}</span>
            {sub_label && (
              <span className="text-xs font-mono tracking-widest uppercase opacity-70 mt-1">
                {sub_label}
              </span>
            )}
          </div>
        )}
      </div>
      <span
        className="text-xs font-mono tracking-widest uppercase whitespace-nowrap mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
        style={{ color }}
      >
        {label}
      </span>
    </motion.div>
  );
};

const TechStack = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
const intersection = useIntersection(sectionRef as React.RefObject<HTMLElement>, { threshold: 0.3 }) 
  const inView = intersection?.isIntersecting ?? false

  return (
    <div
  ref={sectionRef} id="tech-stack"
      className="text-white px-4 sm:px-6 md:px-12 mt-8 sm:mt-10 md:mt-12 pt-8 sm:pt-10 md:pt-12 border-y-2 border-lux overflow-hidden z-50 bg-black  "
    >
      <Title heading="Tech Stack" sub_heading="Technologies" />
      <p className="mt-4 text-white/40 font-mono text-sm leading-relaxed max-w-2xl">
        A curated set of tools and technologies I work with — from crafting
        pixel-perfect interfaces to building scalable backends and shipping to
        production.
      </p>
  {inView && (
        <TypeAnimation
          sequence={['Hold and drag the tech stack', 1000]}
          speed={40}
          className="text-lux font-mono text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mt-4 sm:mt-6 md:mt-8 uppercase tracking-widest block"
          cursor={true}
          repeat={0}
        />
      )}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 h-full w-8 sm:w-16 md:w-24 z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-8 sm:w-16 md:w-24 z-10 pointer-events-none" />

        <div
          onMouseEnter={() => {
            if (trackRef.current)
              trackRef.current.style.animationPlayState = "paused";
          }}
          onMouseLeave={() => {
            if (trackRef.current)
              trackRef.current.style.animationPlayState = "running";
          }}
        >
          <div
            ref={trackRef}
            className="marquee-track flex w-max py-6 sm:py-8 md:py-10 gap-8 sm:gap-12 md:gap-16"
          >
            {[...items, ...items].map(
              ({ icon, label, sub_label, color }, i) => (
                <DraggableIcon
                  key={i}
                  icon={icon}
                  label={label}
                  sub_label={sub_label}
                  color={color}
                  
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;