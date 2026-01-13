import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link } from "react-scroll";
import { HERO_CONTENT, SOCIAL_LINKS } from "../utils/constants";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { useState, useEffect } from "react";

const TypingEffect = ({ words }: { words: string[] }) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [blink, setBlink] = useState(true);

    // Blinking cursor
    useEffect(() => {
        const timeout2 = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(timeout2);
    }, [blink]);

    // Typing logic
    useEffect(() => {
        if (index === words.length) return;

        if (subIndex === words[index].length + 1 && !reverse) {
            setReverse(true);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, parseInt((Math.random() * 350).toString())));

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words]);

    return (
        <span className="text-accent font-bold">
            {`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}
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
