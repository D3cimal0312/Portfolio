
import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss,
  SiTailwindcss, SiBootstrap, SiFramer, SiFigma,
  SiNodedotjs, SiExpress, SiMongodb, SiGraphql,
  SiGit, SiGithub, SiVercel, SiPostman, SiSelenium,
  SiMantine, SiC,
} from "@icons-pack/react-simple-icons";

export interface SkillItem {
  icon: any;
  label: string;
  sub_label?: string;
  color: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend & UI",
    items: [
      { icon: SiHtml5,       label: "HTML",          color: "#E34F26" },
      { icon: SiCss,         label: "CSS",           color: "#1572B6" },
      { icon: SiJavascript,  label: "JavaScript",    color: "#F7DF1E" },
      { icon: SiTypescript,  label: "TypeScript",    color: "#3178C6" },
      { icon: SiReact,       label: "React",         color: "#61DAFB" },
      { icon: SiTailwindcss, label: "Tailwind",      color: "#06B6D4" },
      { icon: SiBootstrap,   label: "Bootstrap",     color: "#7952B3" },
      { icon: SiFramer,      label: "Framer Motion", color: "#ffffff" },
      { icon: SiMantine,     label: "Mantine UI",    color: "#339AF0" },
      { icon: SiFigma,       label: "Figma",         color: "#F24E1E" },
    ],
  },
  {
    id: "backend",
    label: "Backend & DB",
    items: [
      { icon: SiNodedotjs, label: "Node.js",  color: "#339933" },
      { icon: SiExpress,   label: "Express",  color: "#ffffff" },
      { icon: SiMongodb,   label: "MongoDB",  color: "#47A248" },
      { icon: SiGraphql,   label: "GraphQL",  color: "#E10098" },
      { icon: SiC,         label: "C",        color: "#A8B9CC" },
      { icon: null,        label: "REST",     sub_label: "API", color: "#1572B6" },
    ],
  },
  {
    id: "tools",
    label: "Tools & QA",
    items: [
      { icon: SiGit,      label: "Git",      color: "#F05032" },
      { icon: SiGithub,   label: "GitHub",   color: "#ffffff" },
      { icon: SiVercel,   label: "Vercel",   color: "#ffffff" },
      { icon: SiPostman,  label: "Postman",  color: "#FF6C37" },
      { icon: SiSelenium, label: "Selenium", color: "#43B02A" },
    ],
  },
];