import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Experience } from '../../types';

interface ExperienceFormProps {
    experience: Experience | null;
    onSubmit: (exp: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

const ExperienceForm = ({ experience, onSubmit, onCancel }: ExperienceFormProps) => {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'work' | 'education'>('work');

    useEffect(() => {
        if (experience) {
            setCompany(experience.company);
            setRole(experience.role);
            setDuration(experience.duration);
            setDescription(experience.description);
            setType(experience.type);
        } else {
            setCompany('');
            setRole('');
            setDuration('');
            setDescription('');
            setType('work');
        }
    }, [experience]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ company, role, duration, description, type });
    };

    const inputClass = "w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors";
    const labelClass = "block text-sm text-gray-400 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                    <label className={labelClass}>Company / Institution</label>
                    <input
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className={inputClass}
                        placeholder="Company name"
                        required
                    />
                </div>

                <div className="col-span-2 sm:col-span-1">
                    <label className={labelClass}>Role / Position</label>
                    <input
                        type="text"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className={inputClass}
                        placeholder="Your role"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Duration</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                        className={inputClass}
                        placeholder="e.g., 2021 - Present"
                        required
                    />
                </div>

                <div>
                    <label className={labelClass}>Type</label>
                    <select
                        value={type}
                        onChange={e => setType(e.target.value as 'work' | 'education')}
                        className={inputClass}
                    >
                        <option value="work">Work Experience</option>
                        <option value="education">Education</option>
                    </select>
                </div>
            </div>

            <div>
                <label className={labelClass}>Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-none`}
                    placeholder="Describe your responsibilities and achievements..."
                    required
                />
            </div>

            <div className="flex gap-4 pt-4">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    {experience ? 'Update Experience' : 'Add Experience'}
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

export default ExperienceForm;
