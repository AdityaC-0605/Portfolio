import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { SOCIAL_LINKS } from "../utils/constants";
import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace with your actual credentials
const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

const Contact = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const isConfigured = EMAILJS_CONFIG.serviceId && 
                        EMAILJS_CONFIG.templateId && 
                        EMAILJS_CONFIG.publicKey && 
                        !EMAILJS_CONFIG.serviceId.includes('YOUR_');

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setStatus("submitting");
        setErrorMessage("");

        // Check if EmailJS is configured
        if (!isConfigured) {
            setStatus("error");
            setErrorMessage("Email service is not configured. Please contact me directly at the email address above.");
            return;
        }

        try {
            // Get form data
            const formData = new FormData(form.current);
            const templateParams = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message'),
                to_email: 'adityachdhr555@gmail.com'
            };

            console.log('Sending email with params:', templateParams);

            const result = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                {
                    publicKey: EMAILJS_CONFIG.publicKey,
                }
            );
            
            console.log('EmailJS Success:', result);
            setStatus("success");
            form.current.reset();
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus("error");
            if (error instanceof Error) {
                setErrorMessage(`Failed to send message: ${error.message}. Please email me directly at adityachdhr555@gmail.com`);
            } else {
                setErrorMessage("Failed to send message. Please try again or email me directly at adityachdhr555@gmail.com");
            }
        }
    };

    const resetForm = () => {
        setStatus("idle");
        setErrorMessage("");
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
                            <a
                                href={`mailto:${SOCIAL_LINKS.email}`}
                                className="flex items-center gap-4 text-gray-300 group hover:text-white transition-colors"
                            >
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl group-hover:bg-accent group-hover:text-primary transition-colors">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <span className="font-semibold">{SOCIAL_LINKS.email}</span>
                                </div>
                            </a>
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

                        {/* Configuration Notice */}
                        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-blue-400 text-sm">
                                <strong>Having trouble with the form?</strong> You can also email me directly at{' '}
                                <a href="mailto:adityachdhr555@gmail.com" className="underline hover:text-blue-300">
                                    adityachdhr555@gmail.com
                                </a>
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary p-8 rounded-2xl border border-white/5 shadow-xl"
                    >
                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                    <FaCheckCircle className="text-green-400 text-4xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
                                <button
                                    onClick={resetForm}
                                    className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:border-white hover:text-white transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>

                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                                    >
                                        <FaExclamationCircle />
                                        <span className="text-sm">{errorMessage}</span>
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 rounded-lg font-bold transition-all bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
