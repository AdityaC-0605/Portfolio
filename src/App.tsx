import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
const App = () => {
  return (
    <div className="bg-primary min-h-screen text-white font-sans">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="py-6 text-center text-gray-500 bg-secondary/30 text-sm">
        <p>© {new Date().getFullYear()} Aditya Choudhary. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
