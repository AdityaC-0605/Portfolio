import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import MarqueeDivider from "./components/MarqueeDivider";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SOCIAL_LINKS } from "./utils/constants";

const App = () => {
  return (
    <div className="bg-dark-950 min-h-screen text-cream-50 font-body relative text-balance">
      <div className="grain-overlay pointer-events-none" />
      <CustomCursor />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <MarqueeDivider />
        <About />
        <MarqueeDivider />
        <Skills />
        <MarqueeDivider />
        <Projects />
        <MarqueeDivider />
        <Experience />
        <MarqueeDivider />
        <Contact />
      </main>

      {/* Grand Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-dark-950">
        {/* Big CTA */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 md:py-32">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/30 mb-6">
            [available for work]
          </p>
          <h2 className="font-display text-[clamp(2rem,6vw,5rem)] font-bold uppercase leading-[1] text-cream-50/90 max-w-4xl">
            LET'S BUILD SOMETHING <span className="text-accent">EXTRAORDINARY</span> TOGETHER.
          </h2>

          <div className="mt-12 flex flex-col md:flex-row md:items-center gap-8">
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark-950 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-cream-50 transition-colors duration-500 rounded-full"
            >
              <FaEnvelope /> Get In Touch
            </a>
            <div className="flex gap-6">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-cream-50/30 hover:text-accent transition-colors text-2xl">
                <FaGithub />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-cream-50/30 hover:text-accent transition-colors text-2xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-8">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/20">
              © {new Date().getFullYear()} ADITYA CHOUDHARY
            </p>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/15">
              DESIGNED WITH PASSION • BUILT WITH REACT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
