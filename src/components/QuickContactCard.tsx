import { FiGithub, FiLinkedin } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

const socials = [
  {
    index: 1,
    icon: FiGithub,
    label: "GitHub",
    sublabel: "github.com/D3cimal0312",
    href: "https://github.com/D3cimal0312",
  },
  {
    index: 2,
    icon: FiLinkedin,
    label: "LinkedIn",
    sublabel: "linkedin.com/in/anuj-bajracharya",
    href: "https://www.linkedin.com/in/anuj-bajracharya-b24b6a415/",
  },
  {
    index: 3,
    icon: IoMdMail,
    label: "Email",
    sublabel: "anuj.bajracharya0312@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&to=anuj.bajracharya0312@gmail.com",
  },
];

const iconBg: Record<string, string> = {
  GitHub: "bg-[#1e1e1e]",
  LinkedIn: "bg-[#0A66C2]",
  Email: "bg-[#1a2e3b]",
};

const QuickContactCard = () => {
  return (
 <div className="flex flex-col gap-3 w-full py-4">
      {socials.map(({ index, icon: Icon, label, sublabel, href }) => (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 sm:gap-4 bg-[#1c1c1e] hover:bg-[#26262a] transition-colors duration-200 rounded-2xl px-3 sm:px-4 py-3 sm:py-4 group overflow-hidden w-full"
        >
         
          <div
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${iconBg[label]} shrink-0`}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>

          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              {label}
            </span>
            <span className="text-[9px] sm:text-sm text-gray-200 truncate block w-full">
              {sublabel}
            </span>
          </div>


<span className="text-gray-500 group-hover:text-gray-300 transition-colors shrink-0 ml-auto arrow-icon">
  <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
</span>
        </a>
      ))}
    </div>
  );
};

export default QuickContactCard;