import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { PROJECTS } from "../utils/constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FadeIn, RevealText } from "./animations";

const TiltCard = ({ project }: { project: (typeof PROJECTS)[number] }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;
        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group perspective-1000 relative"
        >
            <div className="border border-white/5 rounded-2xl overflow-hidden bg-dark-900/40 backdrop-blur-sm hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 h-full flex flex-col">
                <div
                    className="h-48 flex items-center justify-center relative overflow-hidden transition-colors border-b border-white/5 bg-dark-950/50"
                    style={{ transform: "translateZ(20px)" }}
                >
                    <span className="text-cream-50/20 font-display text-4xl font-bold group-hover:scale-110 group-hover:text-cream-50/40 transition-all duration-500 uppercase tracking-tight px-4 text-center">{project.title.substring(0, 10)}.</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-500" />
                </div>

                <div className="p-8 flex flex-col flex-grow" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-accent transition-colors text-cream-50">{project.title}</h3>
                    <p className="text-cream-50/50 font-light text-sm mb-6 flex-grow leading-relaxed">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {project.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] border border-white/10 rounded-full text-cream-50/40 group-hover:border-accent/20 group-hover:text-accent/80 transition-colors">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-6 mt-auto">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cream-50/40 hover:text-accent transition-colors line-through-animated">
                                <FaGithub /> Code
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cream-50/40 hover:text-accent transition-colors line-through-animated">
                                <FaExternalLinkAlt /> Live
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [filter, setFilter] = useState("All");

    const projectCategories = Array.from(new Set(PROJECTS.map((p) => p.category)));
    const categories = ["All", ...projectCategories.filter((c) => c !== "All")];

    const filteredProjects = filter === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category.includes(filter) || (filter === "Full-stack" && project.tech.includes("React")));

    return (
        <section id="projects" className="py-24 bg-dark-800/30 relative overflow-hidden">
            <div className="aurora-bg" />
            <div className="section-number">04</div>
            <div className="max-w-[1440px] mx-auto px-6 md:px-12">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-2">
                    <div>
                        <FadeIn>
                            <span className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/30 mb-4 block">[selected works]</span>
                        </FadeIn>
                        <RevealText delay={0.1}>
                            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase">
                                FEATURED <span className="text-accent">PROJECTS</span>
                            </h2>
                        </RevealText>
                    </div>

                    <FadeIn delay={0.3} className="flex flex-wrap gap-4">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 ${filter === cat
                                    ? "text-accent border-b border-accent pb-1"
                                    : "text-cream-50/40 hover:text-cream-50 pb-1 border-b border-transparent"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </FadeIn>
                </div>

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <TiltCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <FadeIn className="text-center py-20 text-cream-50/30">
                        <p className="font-mono text-sm uppercase tracking-[0.2em]">No projects in this category.</p>
                    </FadeIn>
                )}
            </div>
        </section>
    );
};

export default Projects;
