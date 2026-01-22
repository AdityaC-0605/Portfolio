import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { HeroContent, SocialLinks } from '../../types';

interface HeroFormProps {
    heroContent: HeroContent;
    socialLinks: SocialLinks;
    onSubmit: (hero: HeroContent, social: SocialLinks) => void;
    onCancel: () => void;
}

const HeroForm = ({ heroContent, socialLinks, onSubmit, onCancel }: HeroFormProps) => {
    const [name, setName] = useState(heroContent.name);
    const [roles, setRoles] = useState(heroContent.roles.join(', '));
    const [description, setDescription] = useState(heroContent.description);
    const [github, setGithub] = useState(socialLinks.github);
    const [linkedin, setLinkedin] = useState(socialLinks.linkedin);
    const [email, setEmail] = useState(socialLinks.email);

    useEffect(() => {
        setName(heroContent.name);
        setRoles(heroContent.roles.join(', '));
        setDescription(heroContent.description);
        setGithub(socialLinks.github);
        setLinkedin(socialLinks.linkedin);
        setEmail(socialLinks.email);
    }, [heroContent, socialLinks]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const rolesArray = roles.split(',').map(r => r.trim()).filter(r => r);
        onSubmit(
            { name, roles: rolesArray, description },
            { github, linkedin, email }
        );
    };

    const inputClass = "w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors";
    const labelClass = "block text-sm text-gray-400 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className={labelClass}>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Roles (comma-separated)</label>
                <input
                    type="text"
                    value={roles}
                    onChange={e => setRoles(e.target.value)}
                    className={inputClass}
                    placeholder="AI/ML Engineer, Full Stack Developer"
                    required
                />
                <p className="text-xs text-gray-500 mt-1">These will animate in the hero section</p>
            </div>

            <div>
                <label className={labelClass}>Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className={`${inputClass} min-h-[100px] resize-none`}
                    placeholder="A brief description about yourself"
                    required
                />
            </div>

            <div className="border-t border-gray-700 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Social Links</h4>

                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>GitHub URL</label>
                        <input
                            type="url"
                            value={github}
                            onChange={e => setGithub(e.target.value)}
                            className={inputClass}
                            placeholder="https://github.com/username"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>LinkedIn URL</label>
                        <input
                            type="url"
                            value={linkedin}
                            onChange={e => setLinkedin(e.target.value)}
                            className={inputClass}
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={inputClass}
                            placeholder="your@email.com"
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    Save Changes
                </motion.button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default HeroForm;
