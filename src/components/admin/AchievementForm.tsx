import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Achievement } from '../../types';

interface AchievementFormProps {
    achievement: Achievement | null;
    onSubmit: (ach: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

const AchievementForm = ({ achievement, onSubmit, onCancel }: AchievementFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (achievement) {
            setTitle(achievement.title);
            setDescription(achievement.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [achievement]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description });
    };

    const inputClass = "w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors";
    const labelClass = "block text-sm text-gray-400 mb-2";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className={labelClass}>Achievement Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className={inputClass}
                    placeholder="e.g., Hackathon Winner"
                    required
                />
            </div>

            <div>
                <label className={labelClass}>Description</label>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className={`${inputClass} min-h-[100px] resize-none`}
                    placeholder="Describe the achievement..."
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
                    {achievement ? 'Update Achievement' : 'Add Achievement'}
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

export default AchievementForm;
