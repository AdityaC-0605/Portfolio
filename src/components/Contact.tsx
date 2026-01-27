import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { SOCIAL_LINKS } from "../utils/constants";

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  // Detect Netlify success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      setShowSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-secondary relative overflow-hidden"
    >
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

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
            <h3 className="text-2xl font-bold">Let's Talk!</h3>

            <p className="text-gray-400 leading-relaxed">
              I'm currently looking for new opportunities. Whether you have a
              question or just want to say hi, I’ll try my best to get back to
              you!
            </p>

            <div className="space-y-4">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-4 text-gray-300 hover:text-white transition"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl">
                  <FaEnvelope />
                </div>
                <span className="font-semibold">{SOCIAL_LINKS.email}</span>
              </a>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl">
                  <FaPhone />
                </div>
                <span className="font-semibold">+91 9972790280</span>
              </div>

              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-accent text-xl">
                  <FaMapMarkerAlt />
                </div>
                <span className="font-semibold">
                  Bengaluru, Karnataka
                </span>
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
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <FaCheckCircle className="text-green-400 text-4xl" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-400 mb-6">
                  Thank you for reaching out. I’ll get back to you soon.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 border border-gray-600 rounded-lg text-gray-300 hover:text-white hover:border-white transition"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                name="contact"
                method="POST"
                action="/?success=true"
                data-netlify="true"
                netlify-honeypot="bot-field"
                className="space-y-6"
              >
                {/* Netlify required fields */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-secondary border border-gray-700 rounded-lg px-4 py-3 text-white resize-none focus:outline-none focus:border-accent"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send Message
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
