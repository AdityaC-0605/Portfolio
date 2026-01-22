import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
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
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-primary/80 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent cursor-pointer">
                    <Link to="home" smooth={true} duration={500}>
                        AC
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-6">
                        {NAV_LINKS.map((link) => (
                            <li key={link.id}>
                                <Link
                                    to={link.id}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="text-gray-300 hover:text-accent cursor-pointer transition-colors font-medium relative group"
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-4">
                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-xl transition-colors hover:scale-110">
                            <FaGithub />
                        </a>
                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 text-xl transition-colors hover:scale-110">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden z-50">
                    <button onClick={toggleMenu} className="text-white text-2xl focus:outline-none">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-primary flex flex-col items-center justify-center space-y-8 md:hidden z-40"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.id}
                                to={link.id}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                onClick={toggleMenu}
                                className="text-2xl text-gray-300 hover:text-accent font-semibold cursor-pointer"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex space-x-8 mt-8">
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-3xl transition-colors">
                                <FaGithub />
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 text-3xl transition-colors">
                                <FaLinkedin />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll Progress Bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 origin-left"
                style={{ scaleX }}
            />
        </nav>
    );
};

export default Navbar;
