import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../../types';

interface ProjectFormProps {
    project?: Project | null;
    onSubmit: (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

const CATEGORIES = ['AI/ML', 'NLP', 'Full-stack', 'Web', 'Mobile', 'Data Science', 'DevOps', 'Other'];

const ProjectForm = ({ project, onSubmit, onCancel }: ProjectFormProps) => {
    // Memoize initial form data to avoid recreation on every render
    const initialFormData = useMemo(() => ({
        title: project?.title || '',
        description: project?.description || '',
        category: project?.category || 'AI/ML',
        tech: project?.tech.join(', ') || '',
        github: project?.github || '',
        demo: project?.demo || '',
        image: project?.image || '',
    }), [project]);

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }
        if (!formData.tech.trim()) {
            newErrors.tech = 'At least one technology is required';
        }
        if (formData.github && !formData.github.startsWith('http')) {
            newErrors.github = 'Please enter a valid URL';
        }
        if (formData.demo && !formData.demo.startsWith('http')) {
            newErrors.demo = 'Please enter a valid URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) return;

        const techArray = formData.tech
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0);

        onSubmit({
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category,
            tech: techArray,
            github: formData.github.trim(),
            demo: formData.demo.trim(),
            image: formData.image.trim(),
        });
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">
                    Project Title <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={e => handleChange('title', e.target.value)}
                    placeholder="e.g., AI Career Recommender"
                    className={`w-full bg-primary border ${errors.title ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">
                    Description <span className="text-red-400">*</span>
                </label>
                <textarea
                    value={formData.description}
                    onChange={e => handleChange('description', e.target.value)}
                    placeholder="Describe what the project does..."
                    rows={4}
                    className={`w-full bg-primary border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors resize-none`}
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => handleChange('category', cat)}
                            className={`px-4 py-2 rounded-full border text-sm transition-all ${formData.category === cat
                                ? 'bg-accent text-primary border-accent font-semibold'
                                : 'border-gray-600 text-gray-400 hover:border-white hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Technologies */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">
                    Technologies <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    value={formData.tech}
                    onChange={e => handleChange('tech', e.target.value)}
                    placeholder="e.g., Python, React, TensorFlow (comma-separated)"
                    className={`w-full bg-primary border ${errors.tech ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.tech && <p className="text-red-400 text-xs mt-1">{errors.tech}</p>}
                <p className="text-gray-500 text-xs mt-1">Separate technologies with commas</p>
            </div>

            {/* GitHub URL */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">GitHub URL</label>
                <input
                    type="url"
                    value={formData.github}
                    onChange={e => handleChange('github', e.target.value)}
                    placeholder="https://github.com/username/repo"
                    className={`w-full bg-primary border ${errors.github ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.github && <p className="text-red-400 text-xs mt-1">{errors.github}</p>}
            </div>

            {/* Demo URL */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Demo URL</label>
                <input
                    type="url"
                    value={formData.demo}
                    onChange={e => handleChange('demo', e.target.value)}
                    placeholder="https://your-demo-link.com"
                    className={`w-full bg-primary border ${errors.demo ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors`}
                />
                {errors.demo && <p className="text-red-400 text-xs mt-1">{errors.demo}</p>}
            </div>

            {/* Image URL */}
            <div>
                <label className="block text-sm text-gray-400 mb-2">Image URL (optional)</label>
                <input
                    type="url"
                    value={formData.image}
                    onChange={e => handleChange('image', e.target.value)}
                    placeholder="https://example.com/project-screenshot.png"
                    className="w-full bg-primary border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent transition-colors"
                />
                <p className="text-gray-500 text-xs mt-1">Add a screenshot or thumbnail for your project</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-white/5 hover:border-white transition-all"
                >
                    Cancel
                </button>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    {project ? 'Update Project' : 'Add Project'}
                </motion.button>
            </div>
        </form>
    );
};

export default ProjectForm;
