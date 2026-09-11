import { useState } from "react";

interface ProjectImageProps {
  images?: string[];
  alt: string;
  className?: string;
}

const PLACEHOLDER = "/image_not_available_placeholder.png";

const ProjectImage = ({ images = [], alt, className }: ProjectImageProps) => {
  const available = images.filter(Boolean);
  const key = available.join("|");
  const [state, setState] = useState<{ key: string; attempt: number }>({
    key: "",
    attempt: 0,
  });

  const attempt = state.key === key ? state.attempt : 0;
  const src =
    attempt < available.length ? available[attempt] : PLACEHOLDER;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() =>
        setState((s) =>
          s.key === key
            ? { key, attempt: s.attempt + 1 }
            : { key, attempt: 1 },
        )
      }
    />
  );
};

export default ProjectImage;