import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Projects", id: "projects" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2  w-[95%] md:w-[90%] max-w-5xl z-100"
    data-aos="slide-down">

      <div
        className="relative 
        border border-lux/35 backdrop-blur-xl rounded-3xl lg:rounded-full px-4 sm:px-6 py-3 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(10deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >

        <a href="#hero">
        <span className="text-lux font-bold uppercase tracking-widest text-lg sm:text-xl">
          Anuj
        </span>
        </a>

        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
  <a href={`#${id}`} className="text-white/60 text-xs font-mono tracking-widest uppercase hover:text-lux transition-colors duration-200 bg-transparent border-none cursor-pointer">
  {label}
</a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
            <a
          
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 text-white/60 rounded-full hover:text-lux transition-colors duration-200"
          >
            Resume
          </a>
            <a
          
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 bg-lux text-black rounded-full hover:bg-white transition-colors duration-200"
          >
            CV
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden text-lux"
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div
          className="lg:hidden mt-3 border border-lux/35 backdrop-blur-xl rounded-3xl px-6 py-6 flex flex-col items-center gap-6"
          style={{
            background:
              "linear-gradient(10deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <ul className="flex flex-col items-center gap-5">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
            <a
                
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 text-xs font-mono tracking-widest uppercase hover:text-lux transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
            
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 text-white/60 rounded-full hover:text-lux transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Resume
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold tracking-widest uppercase px-4 py-1.5 bg-lux text-black rounded-full hover:bg-white transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;