import { useRef } from "react";
import Title from "./common/Title";

import SkillCategoryView from "./SkillCategoryView";
import { skillCategories } from "../data/SkillPreview";

 .
import { TypeAnimation } from "react-type-animation";
import { useIntersection } from "react-use";
import { SnapIcon} from "./common/SnapIcon";


const TechStack = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(
    sectionRef as React.RefObject<HTMLElement>,
    { threshold: 0.3 },
  );
  const inView = intersection?.isIntersecting ?? false;

  return (
    <div
      ref={sectionRef}
      id="tech-stack"
      className="text-white px-4 sm:px-6 md:px-12 mt-8 sm:mt-10 md:mt-12 pt-8 sm:pt-10 md:pt-12 border-y-2 border-lux overflow-hidden z-50 bg-black  "
    >
      <div className="flex flex-wrap xl:flex-nowrap justify-between">
        <div data-aos="fade-right">
          <Title heading="Tech Stack" sub_heading="Technologies" />
          <p className="mt-4 text-white/40 font-mono text-sm leading-relaxed max-w-2xl">
            A curated set of tools and technologies I work with — from crafting
            pixel-perfect interfaces to building scalable backends and shipping
            to production.
          </p>
          {inView && (
            <TypeAnimation
              sequence={["Hold and drag the tech stack below", 1000]}
              speed={40}
              className="text-lux font-mono text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mt-4 sm:mt-6 md:mt-8 uppercase tracking-widest block"
              cursor={true}
              repeat={0}
            />
          )}
        </div>
        <div data-aos="fade-left" className=" mb-10  w-full xl:w-[50%]">
                    <Title  sub_heading="Quick Preview" mb={false} />

          <SkillCategoryView categories={skillCategories} />
        </div>
      </div>

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
            {/* {[...items, ...items].map(
              ({ icon, label, sub_label, color }, i) => (
                <DraggableIcon
                  key={i}
                  icon={icon}
                  label={label}
                  sub_label={sub_label}
                  color={color}
                  
                />
              ),
            )} */}

            {[...skillCategories, ...skillCategories].map((category,i) => (
              <div
                key={i}
                className="skill-row flex gap-8 sm:gap-12 md:gap-16"
              >
                {[...category.items].map(
                  ({ icon, label, sub_label, color }, i) => (
                    <SnapIcon
                      key={`${category.id}-${label}-${i}`}
                      icon={icon}
                      label={label}
                      sub_label={sub_label}
                      color={color}
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
