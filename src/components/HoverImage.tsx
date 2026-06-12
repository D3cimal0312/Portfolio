import { motion } from "framer-motion";

interface HoverImageProps {
  image: string;
  x: number;
  y: number;
  visible: boolean;
}

const HoverImage = ({ image, x, y, visible }: HoverImageProps) => {
  return (
    <motion.div
      className="pointer-events-none fixed z-50 overflow-hidden rounded-xl"
      style={{
        left: 0,
        top: 0,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        left: x + 20,
        top: y + 20,
        scale: visible ? 1 : 0.85,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <img src={image} alt="project_oimage" className="w-100 h-75  object-cover  object-top" />
    </motion.div>
  );
};

export default HoverImage;
