import { CiGrid41, CiBoxList } from "react-icons/ci";

import { useState } from "react";
import { useEffect } from "react";
import Title from "./common/Title";
import { Projects, portfolio } from "../data/Projectdata";
import { SiGithub } from "@icons-pack/react-simple-icons";

import ProjectGrid from "./ProjectGrid";
import ProjectList from "./ProjectList";

const button_options = [
  {
    icon: CiGrid41,
    text: "Grid",
    grid:true,
  },
  {
    icon: CiBoxList,
    text: "List",
    grid:false,
  },
];


const Project = () => {
 const [isGrid,setIsGrid] = useState(true);



  useEffect(() => {
    Projects.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div
      className="relative w-full h-full  text-white pt-8 sm:pt-10 md:pt-12 px-4 sm:px-6 md:px-12 bg-surface/10 "
      id="projects"
    >

      <div className="relative z-10 px-0 sm:px-4 md:px-12  ">
        <div className="flex justify-between  items-center">
          <Title heading="My Projects" sub_heading="Selected Work" />

 <div className="relative flex items-center border border-secondary/20 ">

    {/* sliding indicator */}
    <div
      className="absolute top-0.5 bottom-0.5 w-1/2 bg-secondary/40 border border-secondary/40 transition-all duration-300"
      style={{ left: isGrid ? "2px" : "calc(50%)" }}
    />

    {button_options.map(({ icon: Icon, text, grid }) => (
      <button
        key={text}
        onClick={() => setIsGrid(grid)}
        className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5
          font-mono text-lg font-semibold tracking-widest uppercase transition-colors duration-200
          ${isGrid === grid ? "text-white" : "text-secondary hover:text-white/60"}`}
      >
        <Icon size={20} />
        {text}
      </button>
    ))}
  </div>

        </div>


<div className="px-4  ">
  {isGrid?(
    <ProjectGrid/>
):(
    <ProjectList/>
  )}
</div>

        <div className="flex items-center mt-4 px-4 md:px-12 lg:px-24">
          <a
            href={portfolio.github_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="font-mono text-lg tracking-[0.2em] uppercase text-white/60 px-4 py-2
                border-[0.5px] border-lux/40 hover:border-lux hover:text-white
                transition-all duration-150 flex gap-2 items-center"
            >
              {portfolio.project_name}
              <SiGithub size={24} />
            </div>
          </a>
        </div>
        <p className="mt-6 font-mono text-lg sm:text-xl uppercase text-lux">
          {Projects.length} projects &mdash; 2026
        </p>
      </div>

    </div>
  );
};

export default Project;
