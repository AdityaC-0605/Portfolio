import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS, SOCIAL_LINKS } from "../utils/constants";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-dark-950/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl cursor-pointer">
                    <Link to="home" smooth={true} duration={500} className="font-display font-bold text-lg tracking-tight hover:text-accent transition-colors">
                        AC<span className="text-accent">.</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8">
                        {NAV_LINKS.map((link) => (
                            <li key={link.id}>
                                <Link
                                    to={link.id}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="font-mono text-xs uppercase tracking-[0.2em] transition-colors line-through-animated text-cream-50/60 hover:text-accent cursor-pointer"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-6">
                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream-50/30 hover:text-accent transition-colors flex items-center justify-center">
                            <FaGithub className="text-xl" />
                        </a>
                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] tracking-[0.15em] uppercase text-cream-50/30 hover:text-accent transition-colors flex items-center justify-center">
                            <FaLinkedin className="text-xl" />
                        </a>
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden z-50">
                    <button onClick={toggleMenu} className="w-8 h-8 flex flex-col justify-center items-center gap-1.5 focus:outline-none">
                        <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }} className="block w-6 h-[1.5px] bg-cream-50" />
                        <motion.span animate={{ opacity: isOpen ? 0 : 1 }} className="block w-6 h-[1.5px] bg-cream-50" />
                        <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }} className="block w-6 h-[1.5px] bg-cream-50" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-dark-950/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 md:hidden z-40"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <motion.div
                                key={link.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Link
                                    to={link.id}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    onClick={toggleMenu}
                                    className="font-display text-4xl font-bold uppercase tracking-wide transition-colors text-cream-50 hover:text-accent cursor-pointer"
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                        <div className="flex space-x-8 mt-8">
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-cream-50/60 hover:text-accent text-3xl transition-colors">
                                <FaGithub />
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-cream-50/60 hover:text-accent text-3xl transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-[2px] origin-left"
                style={{
                    scaleX,
                    background: "linear-gradient(90deg, transparent, rgba(245, 230, 160, 0.6), #F5E6A0)",
                    boxShadow: "0 0 12px rgba(245, 230, 160, 0.3)"
                }}
            />
        </nav>
    );
};

export default Navbar;
