import { useRef } from "react";

import { motion } from "framer-motion";

export const SnapIcon = ({
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
      dragElastic={0.4}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 40 }}
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
        style={
          {
            color: "#ffffff",
            transition: "color 0.3s",
            "--icon-color": color,
          } as React.CSSProperties
        }
        className="max-sm:text-(--icon-color)!"
      >
        {Icon ? (
          <Icon
            size={100}
            className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px]"
          />
        ) : (
          <div className="flex flex-col items-center leading-none">
            <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              {label}
            </span>
            {sub_label && (
              <span className="text-xs font-mono tracking-widest uppercase opacity-70 mt-1">
                {sub_label}
              </span>
            )}
          </div>
        )}
      </div>
      <span
        className="text-xs font-mono tracking-tight text-center lg:tracking-widest uppercase md:whitespace-nowrap mt-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200"
        style={{ color }}
      >
        {label}
      </span>
    </motion.div>
  );
};
