import { FaGraduationCap, FaBriefcase, FaTrophy } from "react-icons/fa";
import { EXPERIENCE, ACHIEVEMENTS } from "../utils/constants";
import { FadeIn, RevealText } from "./animations";

const Experience = () => {
    const workExperience = EXPERIENCE.filter(e => !('type' in e) || e.type === 'work');
    const education = EXPERIENCE.filter(e => 'type' in e && e.type === 'education');

    return (
        <section id="experience" className="py-24 bg-dark-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="aurora-bg" />
            <div className="section-number">05</div>
            <div className="absolute top-0 left-0 w-1/2 h-full opacity-10 pointer-events-none">
                <div className="w-full h-full" style={{
                    backgroundImage: `radial-gradient(circle at 30% 50%, rgba(245, 230, 160, 0.1), transparent 60%)`
                }}></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16 md:mb-24 text-center md:text-left">
                    <FadeIn>
                        <span className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/30 mb-4 block">[my background]</span>
                    </FadeIn>
                    <RevealText delay={0.1}>
                        <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mt-2">
                            EXPERIENCE & <span className="text-accent">EDUCATION</span>
                        </h2>
                    </RevealText>
                </div>

                <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-24">
                    {/* Work Experience */}
                    <div>
                        <FadeIn delay={0.2}>
                            <h3 className="text-xl md:text-2xl font-display font-bold mb-10 flex items-center gap-4 text-cream-50 uppercase tracking-widest">
                                <FaBriefcase className="text-accent" /> Professional
                            </h3>
                        </FadeIn>

                        <div className="space-y-12">
                            {workExperience.length === 0 ? (
                                <FadeIn><p className="text-cream-50/40 font-mono text-xs uppercase tracking-[0.2em] pl-8">No work experience added yet</p></FadeIn>
                            ) : (
                                workExperience.map((exp, index) => (
                                    <FadeIn
                                        key={`${exp.role}-${exp.company}-${index}`}
                                        delay={0.3 + index * 0.1}
                                        className="relative pl-10 group"
                                    >
                                        <div className="absolute left-0 top-1.5 w-[5px] h-[5px] rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></div>
                                        <div className="absolute left-[2px] top-4 bottom-[-40px] w-[1px] bg-white/5 last:hidden"></div>

                                        <span className="text-[10px] md:text-xs text-accent font-mono tracking-[0.2em] uppercase mb-3 block">{exp.duration}</span>
                                        <h4 className="text-xl md:text-2xl font-display font-bold text-cream-50 mb-1 leading-tight">{exp.role}</h4>
                                        <h5 className="text-cream-50/60 font-medium mb-4">{exp.company}</h5>
                                        <p className="text-cream-50/40 text-sm leading-relaxed font-light">{exp.description}</p>
                                    </FadeIn>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <FadeIn delay={0.3}>
                            <h3 className="text-xl md:text-2xl font-display font-bold mb-10 flex items-center gap-4 text-cream-50 uppercase tracking-widest">
                                <FaGraduationCap className="text-accent" /> Education
                            </h3>
                        </FadeIn>

                        <div className="space-y-12">
                            {education.length === 0 ? (
                                <FadeIn><p className="text-cream-50/40 font-mono text-xs uppercase tracking-[0.2em] pl-8">No education entries added yet</p></FadeIn>
                            ) : (
                                education.map((exp, index) => (
                                    <FadeIn
                                        key={`${exp.role}-${exp.company}-${index}`}
                                        delay={0.4 + index * 0.1}
                                        className="relative pl-10 group"
                                    >
                                        <div className="absolute left-0 top-1.5 w-[5px] h-[5px] rounded-full bg-accent group-hover:scale-150 transition-transform duration-300"></div>
                                        <div className="absolute left-[2px] top-4 bottom-[-40px] w-[1px] bg-white/5 last:hidden"></div>

                                        <span className="text-[10px] md:text-xs text-accent font-mono tracking-[0.2em] uppercase mb-3 block">{exp.duration}</span>
                                        <h4 className="text-xl md:text-2xl font-display font-bold text-cream-50 mb-1 leading-tight">{exp.role}</h4>
                                        <h5 className="text-cream-50/60 font-medium mb-4">{exp.company}</h5>
                                        <p className="text-cream-50/40 text-sm leading-relaxed font-light">{exp.description}</p>
                                    </FadeIn>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="pt-16 border-t border-white/5">
                    <FadeIn delay={0.4}>
                        <h3 className="text-xl md:text-2xl font-display font-bold mb-12 flex items-center justify-center md:justify-start gap-4 text-cream-50 uppercase tracking-widest">
                            <FaTrophy className="text-accent" /> Achievements
                        </h3>
                    </FadeIn>

                    {ACHIEVEMENTS.length === 0 ? (
                        <FadeIn><p className="text-cream-50/40 font-mono text-xs uppercase tracking-[0.2em] text-center md:text-left">No achievements added yet</p></FadeIn>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {ACHIEVEMENTS.map((ach, index) => (
                                <FadeIn key={`${ach.title}-${index}`} delay={0.5 + index * 0.1}>
                                    <div className="p-8 bg-dark-900/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-accent/20 transition-all duration-500 h-full group">
                                        <h4 className="text-lg md:text-xl font-display font-bold text-cream-50 mb-4 group-hover:text-accent transition-colors">{ach.title}</h4>
                                        <p className="text-cream-50/40 text-sm leading-relaxed font-light">{ach.description}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experience;
