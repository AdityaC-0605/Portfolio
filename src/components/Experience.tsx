import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { FaGraduationCap, FaBriefcase, FaTrophy } from "react-icons/fa";

const Experience = () => {
    const { experience, achievements } = useData();

    const workExperience = experience.filter(e => e.type === 'work');
    const education = experience.filter(e => e.type === 'education');

    return (
        <section id="experience" className="min-h-screen py-20 bg-primary relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    Experience & <span className="text-purple-500">Education</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    {/* Work Experience Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-purple-400">
                            <FaBriefcase /> Professional Journey
                        </h3>
                        <div className="space-y-8 pl-4 border-l-2 border-purple-500/20">
                            {workExperience.length === 0 ? (
                                <p className="text-gray-500 pl-8">No work experience added yet</p>
                            ) : (
                                workExperience.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8"
                                    >
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50"></div>
                                        <span className="text-sm text-purple-300 font-mono mb-2 block">{exp.duration}</span>
                                        <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                                        <h5 className="text-gray-400 mb-2">{exp.company}</h5>
                                        <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Education Column */}
                    <div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-blue-400">
                            <FaGraduationCap /> Education
                        </h3>
                        <div className="space-y-8 pl-4 border-l-2 border-blue-500/20">
                            {education.length === 0 ? (
                                <p className="text-gray-500 pl-8">No education entries added yet</p>
                            ) : (
                                education.map((exp, index) => (
                                    <motion.div
                                        key={exp.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="relative pl-8"
                                    >
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                                        <span className="text-sm text-blue-300 font-mono mb-2 block">{exp.duration}</span>
                                        <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                                        <h5 className="text-gray-400 mb-2">{exp.company}</h5>
                                        <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2 text-yellow-500">
                        <FaTrophy /> Achievements
                    </h3>
                    {achievements.length === 0 ? (
                        <p className="text-gray-500 text-center">No achievements added yet</p>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {achievements.map((ach) => (
                                <div key={ach.id} className="p-6 bg-secondary/30 rounded-xl border border-yellow-500/20 hover:bg-secondary/50 transition-colors">
                                    <h4 className="text-lg font-bold text-yellow-200 mb-2">{ach.title}</h4>
                                    <p className="text-gray-400 text-sm">{ach.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
