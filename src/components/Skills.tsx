
import { SKILLS } from "../utils/constants";
import { FadeIn, RevealText } from "./animations";

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-dark-950 relative overflow-hidden">
            <div className="aurora-bg" />
            <div className="section-number">03</div>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 70% 50%, rgba(245, 230, 160, 0.15), transparent 60%)`
                }}></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16 md:mb-24">
                    <FadeIn>
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/30 mb-4 block">[my toolkit]</span>
                    </FadeIn>
                    <RevealText delay={0.1}>
                        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mt-2">
                            CORE <span className="text-accent">SKILLS</span>
                        </h2>
                    </RevealText>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {/* Languages */}
                    <FadeIn delay={0.2}>
                        <div className="border border-white/5 rounded-2xl p-8 bg-dark-900/40 backdrop-blur-sm hover:border-accent/20 transition-colors duration-500 group">
                            <h3 className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-cream-50/60 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-accent/30 group-hover:w-12 group-hover:bg-accent transition-all duration-500"></span>
                                Languages
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.languages.map((skill: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-dark-800 text-cream-50/80 rounded border border-white/5 text-sm font-light hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Frameworks & Libraries */}
                    <FadeIn delay={0.3}>
                        <div className="border border-white/5 rounded-2xl p-8 bg-dark-900/40 backdrop-blur-sm hover:border-accent/20 transition-colors duration-500 group">
                            <h3 className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-cream-50/60 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-accent/30 group-hover:w-12 group-hover:bg-accent transition-all duration-500"></span>
                                Frameworks
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.frameworks.map((skill: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-dark-800 text-cream-50/80 rounded border border-white/5 text-sm font-light hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Tools & Platforms */}
                    <FadeIn delay={0.4}>
                        <div className="border border-white/5 rounded-2xl p-8 bg-dark-900/40 backdrop-blur-sm hover:border-accent/20 transition-colors duration-500 group">
                            <h3 className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-cream-50/60 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-accent/30 group-hover:w-12 group-hover:bg-accent transition-all duration-500"></span>
                                Tools & Cloud
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.tools.map((skill: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-dark-800 text-cream-50/80 rounded border border-white/5 text-sm font-light hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Key Concepts */}
                    <FadeIn delay={0.5}>
                        <div className="border border-white/5 rounded-2xl p-8 bg-dark-900/40 backdrop-blur-sm hover:border-accent/20 transition-colors duration-500 group">
                            <h3 className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-cream-50/60 mb-8 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-accent/30 group-hover:w-12 group-hover:bg-accent transition-all duration-500"></span>
                                Key Concepts
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {SKILLS.concepts.map((skill: string, index: number) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-dark-800 text-cream-50/80 rounded border border-white/5 text-sm font-light hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
};

export default Skills;
