
interface TitleProps {
  heading: string;
  sub_heading?: string;
}
const Title = ({ heading, sub_heading }: TitleProps) => {
  return       <div className="py-4 mb-8" 
  data-aos="fade-up">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-7 h-px bg-lux" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lux/60">
            {sub_heading}
          </span>
        </div>
        <h3
          className="text-5xl font-extrabold tracking-tight text-lux
          "
        >
          {heading}
        </h3>
      </div>;
};

export default Title