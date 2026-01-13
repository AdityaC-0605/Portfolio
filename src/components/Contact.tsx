import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { SOCIAL_LINKS } from "../utils/constants";
// import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setStatus("submitting");

        // Replace with your actual EmailJS credentials
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <section id="contact" className="min-h-screen py-20 bg-secondary relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl mx-auto"></div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-16"
                >
                    Get In <span className="text-accent">Touch</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold mb-6">Let's Talk!</h3>
                        <p className="text-gray-400 leading-relaxed mb-8">
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="font-semibold hover:text-accent transition-colors">{SOCIAL_LINKS.email}</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl">
                                    <FaPhone />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <span className="font-semibold">+91 9972790280</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <span className="font-semibold">Bengaluru, Karnataka</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary p-8 rounded-2xl border border-white/5 shadow-xl"
                    >
                        <form ref={form} onSubmit={sendEmail} className="space-y-6">
                            <div>
                                <label htmlFor="user_name" className="block text-sm text-gray-400 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="user_email" className="block text-sm text-gray-400 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === "submitting" || status === "success"}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full py-3 rounded-lg font-bold transition-all ${status === "success"
                                    ? "bg-green-500 text-white"
                                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/20"
                                    }`}
                            >
                                {status === "submitting" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
                            </motion.button>
                            {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
