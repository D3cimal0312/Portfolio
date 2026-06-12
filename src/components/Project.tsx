import { FiArrowUpRight } from "react-icons/fi";
import { FaHexagonNodes } from "react-icons/fa6";
import { useState, memo } from "react";
import { useEffect } from "react";
import HoverImage from "./HoverImage";
import Title from "./common/Title";
import Scene3D from "./three/Scene3D";
import L2rshine from "./common/L2rshine";

const Projects = [
  {
    index: 1,
    project_name: "Expense Tracker",
    project_description:
      "A web application that helps users track their daily expenses, built with React.js and Node.js.",
    github_link: "https://github.com/D3cimal0312/expense_tracker",
    tag: ["Typescript"],
    image: "/expenseTracker.jpg",
  },
  {
    index: 2,
    project_name: "VAEL E-commerce",
    project_description:
      "A web application that helps users track their daily expenses, built with React.js and Node.js.",
    github_link: "https://github.com/D3cimal0312/VAEL",
    live_link: "https://vael-nine.vercel.app",
    tag: ["Full-Stack", "Mantine"],
    image: "/vael-ecommerce.png",
  },
  {
    index: 3,
    project_name: "CinePro",
    project_description:
      "A web application that helps users track their daily expenses, built with React.js and Node.js.",
    github_link: "https://github.com/D3cimal0312/CinePro",
    tag: ["UI", "API", "React"],
    image:
      "/cinepro.png",
  },
];

const link_class =
  "flex items-center gap-1 pt-1 whitespace-nowrap font-mono text-xs tracking-widest uppercase text-white/80 group-hover:text-lux group-hover:translate-x-1 transition-all duration-200 border-b border-lux hover:border-b transition-all duration-300";

const StableScene = memo(() => (
  <Scene3D
    showTorusKnot={false}
    showWireSphere={false}
    octahedrons={{ count: 8, seed: 18 }}
  />
));

const Project = () => {
  const [hoveredImage, setHoveredImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


    useEffect(() => {
    Projects.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  return (
    <div
      className="relative w-full h-full  text-white pt-8 sm:pt-10 md:pt-12 px-4 sm:px-6 md:px-12 bg-black/10 "
      id="projects"
    >
      <StableScene />

      <div className="relative z-10 px-0 sm:px-4 md:px-12  ">
        <Title heading="My Projects" sub_heading="Selected Work" />

        <div className="border-t border-lux/15">
          {Projects.map(
            ({
              index,
              project_name,
              project_description,
              github_link,
              live_link,
              tag,
              image,
            }) => (
              <div
                key={index}
                onMouseEnter={() => {
                  setHoveredImage(image);
                  setVisible(true);
                }}
                onMouseLeave={() => {
                  setVisible(false);
                }}
                onMouseMove={(e) => {
                  setMousePos({ x: e.clientX, y: e.clientY });
                }}
                className="group relative overflow-hidden
                       py-6 border-b border-lux/15
                       transition-colors duration-200"
              >
                {/* shine sweep */}
                <L2rshine />

                {/* subtle bg tint */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(200,245,0,0.018)" }}
                />

                <div
                  data-aos="fade-right"
                  data-aos-delay={(index - 1) * 100}
                  className="relative grid grid-cols-1 md:grid-cols-[2.75rem_1fr_auto] items-start gap-3 md:gap-5"
                >
                  {/* Index */}
                  <span className="font-mono text-base md:text-lg tracking-wide pt-1 text-lux/35 group-hover:text-lux transition-colors duration-200 whitespace-nowrap flex justify-between items-center gap-2">
                    <FaHexagonNodes size={22} />
                    <span>{String(index).padStart(2, "0")}</span>
                  </span>

                  {/* Body */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-lux transition-colors duration-200">
                        {project_name}
                      </span>
                      {tag.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs sm:text-sm md:text-base lg:text-lg tracking-widest uppercase text-lux/55 bg-lux/[0.07] border border-lux/20 px-1.5 py-0.5 rounded-[2px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-white/40 max-w-full sm:max-w-[52ch]">
                      {project_description}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 flex-row md:flex-col">
                    {github_link && (
                      <a
                        href={github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link_class}
                      >
                        Github <FiArrowUpRight className="text-base" />
                      </a>
                    )}
                    {live_link && (
                      <a
                        href={live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={link_class}
                      >
                        Live <FiArrowUpRight className="text-base" />
                      </a>
                    )}
                  </div>
                </div>


              </div>
            ),
          )}
        </div>

        <p className="mt-6 font-mono text-lg sm:text-xl uppercase text-lux">
          {Projects.length} projects &mdash; 2026
        </p>
      </div>
      <div className="hidden md:block">
        <HoverImage
          image={hoveredImage}
          x={mousePos.x}
          y={mousePos.y}
          visible={visible}
        />
      </div>
    </div>
  );
};

export default Project;