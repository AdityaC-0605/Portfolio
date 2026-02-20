import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { PROJECTS } from "../utils/constants";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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
            className="bg-primary rounded-xl overflow-hidden border border-white/5 hover:border-accent/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group perspective-1000 relative"
        >
            <div
                className="h-48 bg-gray-800 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-750 transition-colors"
                style={{ transform: "translateZ(20px)" }}
            >
                <span className="text-gray-600 text-2xl font-bold group-hover:scale-110 transition-transform duration-500">{project.title}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80" />
            </div>

            <div className="p-6" style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-secondary text-xs rounded-full text-blue-300 border border-blue-500/20">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <FaGithub /> Code
                        </a>
                    )}
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-accent transition-colors">
                            <FaExternalLinkAlt /> Demo
                        </a>
                    )}
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
        <section id="projects" className="min-h-screen py-20 bg-secondary relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12"
                >
                    Featured <span className="text-accent">Projects</span>
                </motion.h2>

                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border transition-all ${filter === cat
                                ? "bg-accent text-primary border-accent font-bold"
                                : "border-gray-600 text-gray-400 hover:border-white hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <TiltCard key={project.id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl">No projects in this category</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
