import { motion } from "framer-motion";
import { FaDownload, FaUser } from "react-icons/fa";

const ABOUT_STATS = [
    { label: "CGPA", value: "8.50" },
    { label: "Projects", value: "10+" },
    { label: "Certifications", value: "5+" },
];

// Profile image configuration
const PROFILE_IMAGE = {
    src: "/images/profile.jpg", // Place your profile image at public/images/profile.jpg
    alt: "Aditya Choudhary - AI/ML Engineer",
};

const About = () => {
    return (
        <section id="about" className="min-h-screen flex items-center bg-secondary py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-accent rounded-2xl rotate-6 opacity-20"></div>
                            <div className="absolute inset-0 bg-accent rounded-2xl -rotate-6 opacity-20"></div>
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-accent/20 shadow-2xl bg-gray-800">
                                <img
                                    src={PROFILE_IMAGE.src}
                                    alt={PROFILE_IMAGE.alt}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Hide the image and show fallback
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const fallback = target.nextElementSibling;
                                        if (fallback) (fallback as HTMLElement).style.display = 'flex';
                                    }}
                                />
                                {/* Fallback placeholder */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 items-center justify-center text-gray-500 hidden"
                                    style={{ display: 'none' }}
                                >
                                    <div className="text-center">
                                        <FaUser className="text-6xl mx-auto mb-2 text-gray-600" />
                                        <span className="text-sm">Add profile.jpg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white min-h-[60px]">
                            About <span className="text-accent">Me</span>
                        </h2>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I am a final year B.Tech student specializing in <span className="text-accent font-semibold">AI & Machine Learning</span>.
                            Completed internship at <span className="text-white font-semibold">Commonwealth Bank of Australia</span>, I have a strong foundation in Python, Deep Learning, and Full-stack development.
                            I am passionate about building intelligent solutions that solve real-world problems.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            My journey involves working on diverse projects ranging from NLP-based QA systems to sustainable AI solutions.
                            I am always eager to learn new technologies and contribute to innovative projects.
                        </p>

                        <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8">
                            {ABOUT_STATS.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="text-center p-4 bg-primary/50 rounded-xl border border-white/5 hover:border-accent/30 transition-all cursor-default"
                                >
                                    <h3 className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</h3>
                                    <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            href="/resume.pdf"
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            <FaDownload /> Download Resume
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
