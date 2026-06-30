import { FiArrowUpRight } from "react-icons/fi";
import { FaHexagonNodes } from "react-icons/fa6";
import { useState, useEffect } from "react";
import HoverImage from "./HoverImage";
import L2rshine from "./common/L2rshine";
import { Projects } from "../data/Projectdata";

const link_class =
  "flex items-center gap-1 pt-1 whitespace-nowrap font-mono text-xs tracking-widest uppercase text-white/80 group-hover:text-lux group-hover:translate-x-1 transition-all duration-200 border-b border-lux";

const ProjectList = () => {
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
    <div>
      <div className="border-t border-lux/15">
        {Projects.map(({ index, project_name, project_description, github_link, live_link, tag, image }) => (
          <div
            key={index}
            onMouseEnter={() => { setHoveredImage(image); setVisible(true); }}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
            onClick={() => github_link && window.open(github_link, "_blank", "noopener,noreferrer")}
            className="group relative overflow-hidden cursor-pointer
              py-5 border-b border-lux/15
              transition-colors duration-200"
          >
            <L2rshine />

            {/* lux bg tint */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(200,245,0,0.018)" }}
            />

            <div
              data-aos="fade-right"
              data-aos-delay={(index) * 150}
              className="relative grid grid-cols-1 md:grid-cols-[2.75rem_1fr_auto] items-center gap-3 md:gap-5"
            >
              <span className="font-mono text-base md:text-lg tracking-wide text-lux group-hover:text-lux transition-colors duration-200 flex justify-between items-center gap-2">
                <FaHexagonNodes size={20} />
                <span>{String(index).padStart(2, "0")}</span>
              </span>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-lux transition-colors duration-200">
                    {project_name}
                  </span>
                  {tag.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs tracking-widest uppercase text-secondary/55 bg-secondary/[0.07] border border-lux/20 px-1.5 py-0.5 rounded-[2px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-white/60 max-w-full sm:max-w-[58ch]">
                  {project_description}
                </p>
              </div>

              <div className="flex gap-4 flex-row md:flex-col">
                {github_link && (
                  <a
                    href={github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={link_class}
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    Live <FiArrowUpRight className="text-base" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}


      </div>

      <div className="hidden md:block">
        <HoverImage image={hoveredImage} x={mousePos.x} y={mousePos.y} visible={visible} />
      </div>
    </div>
  );
};

export default ProjectList;