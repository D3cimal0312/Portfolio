import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "./loader/Loader";
import Hero from "./components/Hero";
import AOS from "aos";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import "aos/dist/aos.css";
import Project from "./components/Project";
import TechStack from "./components/TechStack";
import Certifications from "./components/Certifications";
import Message from "./components/Message";
import Footer from "./components/Footer";

AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  startEvent: "DOMContentLoaded",
});

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      <motion.main
        className="relative min-h-[200vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
      >
        <div
          className="fixed inset-0 pointer-events-none bg-[#0a0a0a] -z-20"
          style={{
            backgroundImage: "radial-gradient(#ffffff18 2px, transparent 2px)",
            backgroundSize: "40px 40px",
          }}
        />
        <Hero />
        <Navbar />
        <Contact />
        <Project />
        <TechStack />
        <Certifications />
        <Message />
        <Footer />
      </motion.main>
    </>
  );
}
