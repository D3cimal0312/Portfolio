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
import DotGrid from "./components/DotGrid";
AOS.init({
  duration: 1000,
  easing: "ease-in-out",
  once: true,
  startEvent: "DOMContentLoaded",
});

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const snapTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    snapTop();
    const raf = requestAnimationFrame(snapTop);
    const t1 = window.setTimeout(snapTop, 100);
    const t2 = window.setTimeout(snapTop, 900);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
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
        <div className="fixed inset-0 pointer-events-none bg-surface -z-20">
          <DotGrid
            dotSize={3}
            gap={32}
            baseColor="#3a3a4a"
            activeColor="#20bcc7"
            proximity={150}
            shockRadius={250}
            shockStrength={7}
            resistance={800}
            returnDuration={1}
          />
        </div>

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
