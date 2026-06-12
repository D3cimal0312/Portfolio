import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SkillCategory } from "../data/SkillPreview";
import { FaArrowDown } from "react-icons/fa";

interface SkillCategoryViewProps {
  categories: SkillCategory[];
}

export default function SkillCategoryView({
  categories,
}: SkillCategoryViewProps) {
  const [active, setActive] = useState(categories[0].id);
  const activeItems = categories.find((c) => c.id === active)?.items ?? [];

  return (
    <div className="flex flex-col md:flex-row border border-lux/15 bg-black min-h-68">
      {/* ── Side tags ── */}
      <div className="flex flex-row md:flex-col shrink-0 border-b md:border-b-0 md:border-r border-lux/15">
        {categories.map((cat) => {
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className="relative flex flex-col md:flex-row justify-between items-center md:gap-4 md:px-5 py-4 md:py-5
                         font-mono text-sm uppercase tracking-widest cursor-pointer w-full
                         border-r md:border-r-0 md:border-b border-lux/10
                         last:border-0 transition-colors duration-200 text-left"
              style={{
                color: isActive ? "#c8f500" : "rgba(255,255,255,0.3)",
                border: isActive
                  ? "1px solid #c8f500"
                  : "1px solid rgba(255,255,255,0.1)",
                background: isActive ? "rgba(200,245,0,0.03)" : "transparent",
              }}
            >
             
                <span className="text-center"> {cat.label}</span>
                {/* arrow indicator */}
                <motion.span
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -6 }}
                  transition={{ duration: 0.5 }}
                  className=" flex justify-center items-center  md:-rotate-90  w-4 h-4   border-lux shrink-0"
                >
                  <FaArrowDown />
                </motion.span>
             
            </button>
          );
        })}
      </div>

      {/* ── Icon grid ── */}
      <div className="flex-1 p-6 md:p-8 ">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {activeItems.map(({ icon: Icon, label, sub_label, color }) => (
              <motion.div
                key={label}
                layout
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.18 }}
                className="group flex flex-col items-center gap-2"
                style={{ ["--c" as any]: color }}
              >
                <div className="text-white  transition-colors duration-300">
                  {Icon ? (
                    <Icon
                      size={44}
                      className="w-9 h-9 md:w-11 md:h-11 text-white  transition-colors duration-300"
                      color={color}
                    />
                  ) : (
                    <div className="flex flex-col items-center leading-none text-white  transition-colors duration-300">
                      <span className="text-xl font-black tracking-tight">
                        {label}
                      </span>
                      {sub_label && (
                        <span className="text-xl font-mono tracking-widest uppercase opacity-60">
                          {sub_label}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <span className="font-mono text-[10px] tracking-widest uppercase text-white/35 group-hover:text-white/70 transition-colors duration-200 text-center">
                  {label}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
