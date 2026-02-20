import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { useState, useEffect, useCallback, useRef } from "react";
import { HERO_CONTENT, SOCIAL_LINKS } from "../utils/constants";

const TypingEffect = ({ words }: { words: string[] }) => {
    const [displayText, setDisplayText] = useState("");
    const [blink, setBlink] = useState(true);

    const indexRef = useRef(0);
    const subIndexRef = useRef(0);
    const reverseRef = useRef(false);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Typing logic using refs to avoid setState in effect lint issues
    const tick = useCallback(() => {
        const index = indexRef.current;
        const subIndex = subIndexRef.current;
        const reverse = reverseRef.current;
        const word = words[index];

        if (subIndex === word.length + 1 && !reverse) {
            reverseRef.current = true;
            return;
        }

        if (subIndex === 0 && reverse) {
            reverseRef.current = false;
            indexRef.current = (index + 1) % words.length;
            return;
        }

        subIndexRef.current = subIndex + (reverse ? -1 : 1);
        setDisplayText(words[indexRef.current].substring(0, subIndexRef.current));
    }, [words]);

    useEffect(() => {
        const delay = reverseRef.current
            ? 75
            : subIndexRef.current === words[indexRef.current]?.length
                ? 1000
                : 150 + Math.random() * 100;

        const timeout = setTimeout(tick, delay);
        return () => clearTimeout(timeout);
    }, [displayText, tick, words]);

    return (
        <span className="text-accent font-bold">
            {`${displayText}${blink ? "|" : " "}`}
        </span>
    );
};


const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;
        mouseX.set(moveX);
        mouseY.set(moveY);
    };

    const blob1X = useTransform(mouseX, [-500, 500], [-50, 50]);
    const blob1Y = useTransform(mouseY, [-500, 500], [-50, 50]);
    const blob2X = useTransform(mouseX, [-500, 500], [50, -50]);
    const blob2Y = useTransform(mouseY, [-500, 500], [50, -50]);

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary"
            onMouseMove={handleMouseMove}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 w-full h-full bg-primary z-0">
                <motion.div
                    style={{ x: blob1X, y: blob1Y }}
                    className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
                ></motion.div>
                <motion.div
                    style={{ x: blob2X, y: blob2Y }}
                    className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
                ></motion.div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-6 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                        <h2 className="text-xl md:text-2xl font-light text-gray-300 mb-4">Hello, I'm</h2>
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
                            {HERO_CONTENT.name}
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-semibold text-gray-200 mb-8 h-12">
                            I am a <TypingEffect words={HERO_CONTENT.roles} />
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            {HERO_CONTENT.description}
                        </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link
                            to="projects"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all cursor-pointer"
                        >
                            View Work
                        </Link>
                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="px-8 py-3 rounded-full border border-gray-600 text-gray-300 font-semibold hover:border-white hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        >
                            Contact Me
                        </Link>
                        <a
                            href="/resume.pdf"
                            download
                            className="px-8 py-3 rounded-full border border-gray-600 text-gray-300 font-semibold hover:border-accent hover:text-accent hover:bg-accent/10 transition-all flex items-center gap-2"
                        >
                            <FaDownload /> Resume
                        </a>
                    </div>

                    <div className="mt-12 flex justify-center gap-8 text-3xl text-gray-400">
                        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all">
                            <FaGithub />
                        </a>
                        <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 hover:scale-110 transition-all">
                            <FaLinkedin />
                        </a>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500"
            >
                <Link to="about" smooth={true} offset={-70} className="cursor-pointer">
                    <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
                        <div className="w-1 h-2 bg-gray-500 rounded-full animate-scroll" />
                    </div>
                </Link>
            </motion.div>
        </section>
    );
};

export default Hero;
