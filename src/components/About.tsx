import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const ABOUT_STATS = [
    { label: "CGPA", value: "8.39" },
    { label: "Projects", value: "10+" },
    { label: "Certifications", value: "5+" },
];

const About = () => {
    return (
        <section id="about" className="min-h-screen flex items-center bg-secondary py-20 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} // animate once when in view
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row items-center gap-12"
                >
                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center relative">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            <div className="absolute inset-0 bg-accent rounded-2xl rotate-6 opacity-20"></div>
                            <div className="absolute inset-0 bg-accent rounded-2xl -rotate-6 opacity-20"></div>
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-accent/20 shadow-2xl">
                                {/* Placeholder for Profile Image */}
                                <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                                    <span className="text-4xl">Image</span>
                                </div>
                                {/* To replace with real image: <img src="/images/profile.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
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
                            Currently interning at <span className="text-white font-semibold">Commonwealth Bank of Australia</span>, I have a strong foundation in Python, Deep Learning, and Full-stack development.
                            I am passionate about building intelligent solutions that solve real-world problems.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            My journey involves working on diverse projects ranging from NLP-based QA systems to sustainable AI solutions.
                            I am always eager to learn new technologies and contribute to innovative projects.
                        </p>

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            {ABOUT_STATS.map((stat, index) => (
                                <div key={index} className="text-center p-4 bg-primary/50 rounded-xl border border-white/5 hover:border-accent/30 transition-colors">
                                    <h3 className="text-3xl font-bold text-accent mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <a
                            href="/resume.pdf"
                            download
                            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-primary font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            <FaDownload /> Download Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
