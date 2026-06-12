import { useState } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import CopyToClipboard from "../utlis/CoptToClipboard";
const socials = [
  {index:1, icon: FiGithub, label: "GitHub", href: "https://github.com/D3cimal0312" },
  {index:2, icon: FiLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anuj-bajracharya-b24b6a415/" },
  {index:3, icon: FaDiscord, label: "Discord", href: "https://discord.com/users/anuj_bajracharya" },
];

const Contact = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full relative z-50 bg-black flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-2 px-4 sm:px-8 md:px-12 lg:px-16 py-4
    border-y-2 border-lux overflow-hidden mt-1">
      {/* Social icons */}
      <div className="flex items-center">

        {socials.map(({ icon: Icon, label, href,index }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center"
          
          data-aos="fade-up"
          data-aos-offset="-10"
          data-aos-delay={(index-1) * 100}
            >
            <div
              className="bg-white p-1.5 sm:p-2 border border-white rounded-full flex items-center justify-center  z-10

        
            "
            >
              <Icon size={20} color="black" />
            </div>
            <div
              className={`
              text-white text-xs md:text-sm font-mono tracking-widest uppercase
              border border-white -ml-4 mr-2 pl-5 pr-3 py-2 rounded-r-full
              transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden
              ${hovered === label ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0 border-transparent"}

              hover:bg-lux
              hover:text-black
              hover:border-lux
            `}
            >
              {label}
            </div>
          </a>
        ))}
      </div>

      {/* Email */}
      <div className="flex items-center" data-aos="slide-left">
        <div className="bg-white p-1.5 sm:p-2 border border-white rounded-full flex items-center justify-center  z-10">
          <IoMdMail size={18} color="black" />
        </div>
        <div className="text-lux text-xs md:text-sm lg:text-base font-mono border border-white px-3 sm:px-4 -ml-4 pl-5 sm:pl-6 py-[4px] rounded-r-full tracking-wide whitespace-nowrap">
        
          <CopyToClipboard text="  anuj.bajracharya0312@gmail.com">
    anuj.bajracharya0312@gmail.com
</CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default Contact;