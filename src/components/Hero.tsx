import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { useState, useEffect, useCallback, useRef } from "react";
import { HERO_CONTENT, SOCIAL_LINKS } from "../utils/constants";
import { FadeIn, RevealText, MagneticButton } from "./animations";

const TypingEffect = ({ words }: { words: string[] }) => {
    const [displayText, setDisplayText] = useState("");
    const [blink, setBlink] = useState(true);

    const indexRef = useRef(0);
    const subIndexRef = useRef(0);
    const reverseRef = useRef(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

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
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-dark-950"
        >
            {/* Aurora background */}
            <div className="aurora-bg" />

            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.025]" style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "80px 80px"
            }} />

            {/* Decorative floating dots */}
            <div className="floating-dot" style={{ top: "20%", left: "15%", animationDelay: "0s" }} />
            <div className="floating-dot" style={{ top: "60%", left: "80%", animationDelay: "2s" }} />
            <div className="floating-dot" style={{ top: "35%", right: "25%", animationDelay: "4s" }} />
            <div className="floating-dot" style={{ top: "75%", left: "40%", animationDelay: "1s" }} />
            <div className="floating-dot" style={{ top: "10%", right: "10%", animationDelay: "3s" }} />

            {/* Large decorative section number */}
            <div className="section-number">01</div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full pb-24">
                <div className="grid grid-cols-1 gap-8 items-center pt-10">
                    <div className="text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/40 mb-8 flex items-center justify-center md:justify-start gap-4"
                        >
                            <span className="w-12 h-[1px] bg-accent/40 hidden md:block"></span>
                            Hello, I'm
                        </motion.div>

                        <RevealText delay={0.3}>
                            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.85] uppercase tracking-tight">
                                {HERO_CONTENT.name.split(" ")[0]}
                            </h1>
                        </RevealText>
                        <RevealText delay={0.5}>
                            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.85] uppercase tracking-tight text-stroke-accent drop-shadow-[0_0_30px_rgba(245,230,160,0.08)]">
                                {HERO_CONTENT.name.split(" ").slice(1).join(" ")}
                            </h1>
                        </RevealText>

                        <RevealText delay={0.6} className="mt-10 shrink-0 h-10 md:h-12 overflow-visible">
                            <h2 className="font-display text-xl md:text-3xl font-bold uppercase tracking-wide text-cream-50/80 m-0 leading-none">
                                I am a <TypingEffect words={HERO_CONTENT.roles} />
                            </h2>
                        </RevealText>

                        <FadeIn delay={0.7} className="mt-8 max-w-xl mx-auto md:mx-0">
                            <p className="text-cream-50/45 text-base md:text-lg leading-relaxed font-light">
                                {HERO_CONTENT.description}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.9} className="mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-8">
                            <MagneticButton>
                                <Link
                                    to="projects"
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="cursor-none inline-flex items-center gap-3 px-10 py-5 bg-accent text-dark-950 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-cream-50 transition-all duration-500 rounded-full"
                                >
                                    View Work
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-45"><path d="M1 7h12m0 0L7.5 1.5M13 7l-5.5 5.5" stroke="currentColor" strokeWidth="1.5" /></svg>
                                </Link>
                            </MagneticButton>

                            <a
                                href="/resume.pdf"
                                download
                                className="cursor-none font-mono text-xs uppercase tracking-[0.2em] text-cream-50/40 hover:text-accent transition-colors line-through-animated flex flex-row items-center gap-2"
                            >
                                <FaDownload /> Resume
                            </a>
                        </FadeIn>

                        <FadeIn delay={1} className="mt-16 flex justify-center md:justify-start gap-8">
                            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="text-cream-50/20 hover:text-accent text-2xl transition-all duration-500 hover:scale-110">
                                <FaGithub />
                            </a>
                            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-cream-50/20 hover:text-accent text-2xl transition-all duration-500 hover:scale-110">
                                <FaLinkedin />
                            </a>
                        </FadeIn>
                    </div>
                </div>
            </div>

            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            >
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-cream-50/15">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-accent/30 to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
