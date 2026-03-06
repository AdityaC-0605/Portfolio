import { motion } from "framer-motion";
import { FaDownload, FaUser } from "react-icons/fa";
import { FadeIn, RevealText, MagneticButton } from "./animations";

const ABOUT_STATS = [
    { label: "CGPA", value: "8.50" },
    { label: "Projects", value: "10+" },
    { label: "Certifications", value: "5+" },
];

const PROFILE_IMAGE = {
    src: "/images/profile.jpg",
    alt: "Aditya Choudhary - AI/ML Engineer",
};

const About = () => {
    return (
        <section id="about" className="py-24 bg-dark-800/30 relative overflow-hidden">
            <div className="aurora-bg" />
            <div className="section-number">02</div>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Image */}
                    <div className="lg:col-span-5 relative">
                        <FadeIn>
                            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none">
                                <motion.img
                                    src={PROFILE_IMAGE.src}
                                    alt={PROFILE_IMAGE.alt}
                                    className="w-full h-full object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700"
                                    whileHover={{ scale: 1.02 }}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling;
                                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                    }}
                                />
                                <div
                                    className="absolute inset-0 bg-dark-900 flex-col items-center justify-center text-cream-50/30 rounded-lg border border-white/5 hidden"
                                    style={{ display: 'none' }}
                                >
                                    <FaUser className="text-6xl mx-auto mb-4 opacity-50" />
                                    <span className="font-mono text-xs tracking-[0.2em] uppercase">Add profile.jpg</span>
                                </div>

                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-6 -right-6 w-32 h-32 border border-accent/20 rounded-full flex items-center justify-center hidden md:flex backdrop-blur-sm bg-dark-950/20"
                                >
                                    <svg viewBox="0 0 100 100" className="w-24 h-24">
                                        <defs>
                                            <path id="circlePath" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                        </defs>
                                        <text fill="#F5E6A0" className="text-[10.5px] font-mono uppercase tracking-[0.25em]">
                                            <textPath href="#circlePath">AI • ML • DEVELOPER • DESIGN • </textPath>
                                        </text>
                                    </svg>
                                </motion.div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7">
                        <FadeIn>
                            <span className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/30 mb-4 block">[who I am]</span>
                        </FadeIn>

                        <RevealText delay={0.1}>
                            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mt-2">
                                ABOUT <span className="text-accent">ME</span>
                            </h2>
                        </RevealText>

                        <FadeIn delay={0.3} className="mt-8 space-y-6">
                            <p className="text-lg md:text-xl text-cream-50/60 leading-relaxed font-light">
                                I am a final year B.Tech student specializing in <span className="text-accent font-medium">AI & Machine Learning</span>.
                            </p>
                            <p className="text-cream-50/50 leading-relaxed font-light text-base">
                                Completed internship at <span className="text-cream-50 font-medium">Commonwealth Bank of Australia</span>, I have a strong foundation in Python, Deep Learning, and Full-stack development. I am passionate about building intelligent solutions that solve real-world problems.
                            </p>
                            <p className="text-cream-50/50 leading-relaxed font-light text-base">
                                My journey involves working on diverse projects ranging from NLP-based QA systems to sustainable AI solutions. I am always eager to learn new technologies and contribute to innovative projects.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.5} className="mt-10 grid grid-cols-3 gap-4 md:gap-8">
                            {ABOUT_STATS.map((stat, index) => (
                                <div key={index} className="border-l border-white/10 pl-4 py-1">
                                    <h3 className="text-2xl md:text-4xl font-display font-bold text-accent mb-2">{stat.value}</h3>
                                    <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-cream-50/40">{stat.label}</p>
                                </div>
                            ))}
                        </FadeIn>

                        <FadeIn delay={0.7} className="mt-12">
                            <MagneticButton className="inline-block">
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-dark-950 font-mono text-xs uppercase tracking-[0.2em] hover:bg-cream-50 transition-colors duration-500 rounded-full font-bold"
                                >
                                    <FaDownload /> Download Resume
                                </a>
                            </MagneticButton>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
