import { FiGithub, FiLinkedin } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { FaArrowRight, FaRegCopy, FaCheck } from "react-icons/fa";
import { useState } from "react";
import type { IconType } from "react-icons";

const socials: { icon: IconType; label: string; sublabel: string; href: string }[] = [
  {
    icon: FiGithub,
    label: "GitHub",
    sublabel: "github.com/D3cimal0312",
    href: "https://github.com/D3cimal0312",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    sublabel: "linkedin.com/in/anuj-bajracharya",
    href: "https://www.linkedin.com/in/anuj-bajracharya-b24b6a415/",
  },
  {
    icon: IoMdMail,
    label: "Email",
    sublabel: "anuj.bajracharya0312@gmail.com",
    href: "",
  },
];

const iconBg: Record<string, string> = {
  GitHub: "bg-[#1e1e1e]",
  LinkedIn: "bg-[#0A66C2]",
  Email: "bg-[#1a2e3b]",
};

const cardClass =
  "flex items-center gap-3 sm:gap-4 bg-[#1c1c1e] hover:bg-[#26262a] transition-colors duration-200 rounded-2xl px-3 sm:px-4 py-3 sm:py-4 group overflow-hidden w-full";

const QuickContactCard = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("anuj.bajracharya0312@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderInner = (Icon: IconType, label: string, sublabel: string) => (
    <>
      <div
        className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${iconBg[label]} `}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          {label}
        </span>
        <span className="text-md sm:text-sm text-gray-200 block w-full">
          {sublabel}
        </span>
      </div>
      
{/* email copy option */}
      {label === "Email" ? (
        <span className="shrink-0 ml-auto flex items-center gap-2 text-xs font-mono px-2 py-1 rounded-lg bg-white/15 group-hover:bg-white/10 transition-colors">
          {copied ? (
            <>
              <FaCheck className="w-3 h-3 text-lux" />
              <span className="text-lux">Copied</span>
            </>
          ) : (
            <>
              <FaRegCopy className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Copy</span>
            </>
          )}
        </span>
      ) : (
        <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </span>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-3 w-full py-4">
      {socials.map(({ icon, label, sublabel, href }) =>
        label === "Email" ? (
          <div
            key={label}
            onClick={handleCopy}
            className={`${cardClass} cursor-pointer`}
          >
            {renderInner(icon, label, sublabel)}
          </div>
        ) : (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cardClass}
          >
            {renderInner(icon, label, sublabel)}
          </a>
        )
      )}
    </div>
  );
};

export default QuickContactCard;