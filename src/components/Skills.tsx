import { motion } from "framer-motion";
import { useData } from "../context/DataContext";

const Skills = () => {
    const { skills } = useData();

    return (
        <section id="skills" className="min-h-screen py-20 bg-primary relative">
            {/* Background gradient */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    My <span className="text-blue-500">Skills</span>
                </motion.h2>

                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Programming Languages */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-secondary/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                            Languages
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.languages.map((skill: string, index: number) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(59, 130, 246, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-primary/80 rounded-lg text-gray-300 border border-white/5 hover:text-blue-400 transition-colors cursor-default inline-block"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Frameworks */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-secondary/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            Frameworks & Libraries
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.frameworks.map((skill: string, index: number) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-primary/80 rounded-lg text-gray-300 border border-white/5 hover:text-purple-400 transition-colors cursor-default inline-block"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tools */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-secondary/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-pink-500 rounded-full"></span>
                            Tools & Platforms
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.tools.map((skill: string, index: number) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(236, 72, 153, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-primary/80 rounded-lg text-gray-300 border border-white/5 hover:text-pink-400 transition-colors cursor-default inline-block"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Concepts */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-secondary/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
                    >
                        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                            <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                            Key Concepts
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.concepts.map((skill: string, index: number) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.05, borderColor: "rgba(34, 197, 94, 0.5)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-primary/80 rounded-lg text-gray-300 border border-white/5 hover:text-green-400 transition-colors cursor-default inline-block"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Skills;
