import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import { SOCIAL_LINKS } from "../utils/constants";
import { FadeIn, RevealText, MagneticButton } from "./animations";

const Contact = () => {
  const [showSuccess, setShowSuccess] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("success") === "true";
  });

  // Clean up query params after showing success state.
  useEffect(() => {
    if (showSuccess) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [showSuccess]);

  return (
    <section
      id="contact"
      className="py-24 bg-dark-800/30 relative overflow-hidden flex flex-col items-center justify-center min-h-screen"
    >
      <div className="aurora-bg" />
      <div className="section-number">06</div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 w-full mb-20 md:mb-32">
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <FadeIn>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-cream-50/30 mb-4 block">[let's connect]</span>
          </FadeIn>
          <RevealText delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mt-2">
              GET IN <span className="text-accent">TOUCH</span>
            </h2>
          </RevealText>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 w-full">
          {/* Contact Info */}
          <div className="space-y-12">
            <FadeIn delay={0.2}>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-cream-50 uppercase tracking-widest mb-6">Let's Talk!</h3>
              <p className="text-cream-50/50 leading-relaxed font-light text-lg">
                I'm currently looking for new opportunities. Whether you have a
                question or just want to say hi, I’ll try my best to get back to
                you!
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="space-y-8">
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 bg-dark-900/50 rounded-full flex items-center justify-center text-accent text-xl border border-white/5 group-hover:bg-accent group-hover:text-dark-950 transition-all duration-500">
                  <FaEnvelope />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 mb-1">Email</span>
                  <span className="font-display text-lg tracking-wide text-cream-50/80 group-hover:text-cream-50 transition-colors">{SOCIAL_LINKS.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-dark-900/50 rounded-full flex items-center justify-center text-accent text-xl border border-white/5 transition-all duration-500">
                  <FaPhone />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 mb-1">Phone</span>
                  <span className="font-display text-lg tracking-wide text-cream-50/80">+91 9972790280</span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-dark-900/50 rounded-full flex items-center justify-center text-accent text-xl border border-white/5 transition-all duration-500">
                  <FaMapMarkerAlt />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 mb-1">Location</span>
                  <span className="font-display text-lg tracking-wide text-cream-50/80">Bengaluru, Karnataka</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <FadeIn delay={0.4}>
            <div className="bg-dark-900/40 backdrop-blur-sm p-10 rounded-2xl border border-white/5">
              {showSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-8 border border-accent/20">
                    <FaCheckCircle className="text-accent text-5xl" />
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase mb-4 text-cream-50">
                    Message Sent!
                  </h3>
                  <p className="text-cream-50/50 font-light mb-10">
                    Thank you for reaching out. I’ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 border border-white/10 rounded-full text-cream-50 hover:bg-white/5 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  action="/?success=true"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="space-y-8"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  <div style={{ display: 'none' }}>
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 mb-3 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-transparent border border-white/10 rounded-none border-b-2 border-b-white/10 px-0 py-4 text-cream-50 focus:outline-none focus:border-b-accent transition-colors font-display text-lg bg-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 mb-3 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-transparent border border-white/10 rounded-none border-b-2 border-b-white/10 px-0 py-4 text-cream-50 focus:outline-none focus:border-b-accent transition-colors font-display text-lg bg-transparent"
                      placeholder="Your email address"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 mb-3 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-dark-950/50 border border-white/10 rounded-none border-b-2 border-b-white/10 px-0 py-4 text-cream-50 resize-none focus:outline-none focus:border-b-accent transition-colors font-display text-lg bg-transparent"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <MagneticButton className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-5 bg-accent text-dark-950 font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-cream-50 transition-colors duration-500 rounded-full flex items-center justify-center gap-3"
                    >
                      <FaPaperPlane />
                      Send Message
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
