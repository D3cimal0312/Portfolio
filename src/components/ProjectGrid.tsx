import { FiArrowUpRight } from "react-icons/fi";
import { FaHexagonNodes } from "react-icons/fa6";
import L2rshine from "./common/L2rshine";
import { Projects } from "../data/Projectdata";

const link_class =
  "flex items-center gap-1 pt-1 whitespace-nowrap font-mono text-xs tracking-widest uppercase text-white/80 group-hover:text-lux group-hover:translate-x-1 transition-all duration-200 border-b border-lux hover:border-b transition-all duration-300";

const ProjectGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 lg:gap-10">
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
            onClick={() =>
              github_link &&
              window.open(github_link, "_blank", "noopener,noreferrer")
            }
            className="group relative flex flex-col overflow-hidden
            border border-lux/15 hover:border-lux/40
            rounded-2xl min-h-132 cursor-pointer
            transition-colors duration-300"
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >
            <L2rshine />

            <div className="relative w-full h-58 bg-zinc-900 ">
              <img
                src={image}
                alt={project_name}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0" />

              {/* badgin */}
              <span
                className="absolute top-3 left-3 font-mono text-xs tracking-widest px-2 py-0.5
              text-lux/55 group-hover:text-lux group-hover:bg-black/50
              transition-all duration-200 flex items-center gap-1.5"
              >
                <FaHexagonNodes size={14} />
                {String(index).padStart(2, "0")}
              </span>
            </div>

            <div className="relative flex flex-col gap-2 p-4 flex-1">
              <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-lux transition-colors duration-200">
                {project_name}
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                {tag.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs tracking-widest uppercase text-lux/55 bg-lux/[0.07] border border-lux/20 px-1.5 py-0.5 rounded-[2px]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-white/60">
                {project_description}
              </p>

              <div className="flex gap-4 mt-auto pt-3 border-t border-lux/15 group-hover:border-lux/40 transition-all duration-200">
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
        ),
      )}
    </div>
  );
};

export default ProjectGrid;
