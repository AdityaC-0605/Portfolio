import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTimes } from 'react-icons/fa';
import type { Skills } from '../../types';

interface SkillsFormProps {
    skills: Skills;
    onSubmit: (skills: Skills) => void;
    onCancel: () => void;
}

const SkillsForm = ({ skills, onSubmit, onCancel }: SkillsFormProps) => {
    const [languages, setLanguages] = useState<string[]>(skills.languages);
    const [frameworks, setFrameworks] = useState<string[]>(skills.frameworks);
    const [tools, setTools] = useState<string[]>(skills.tools);
    const [concepts, setConcepts] = useState<string[]>(skills.concepts);

    const [newLanguage, setNewLanguage] = useState('');
    const [newFramework, setNewFramework] = useState('');
    const [newTool, setNewTool] = useState('');
    const [newConcept, setNewConcept] = useState('');

    useEffect(() => {
        setLanguages(skills.languages);
        setFrameworks(skills.frameworks);
        setTools(skills.tools);
        setConcepts(skills.concepts);
    }, [skills]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ languages, frameworks, tools, concepts });
    };

    // Tag handlers
    const addTag = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, clearInput: () => void) => {
        if (value.trim()) {
            setter(prev => [...prev, value.trim()]);
            clearInput();
        }
    };

    const removeTag = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
        setter(prev => prev.filter((_, i) => i !== index));
    };

    const TagSection = ({
        title,
        color,
        tags,
        setTags,
        newValue,
        setNewValue
    }: {
        title: string;
        color: string;
        tags: string[];
        setTags: React.Dispatch<React.SetStateAction<string[]>>;
        newValue: string;
        setNewValue: React.Dispatch<React.SetStateAction<string>>;
    }) => (
        <div className="bg-secondary/30 rounded-xl p-4 border border-white/5">
            <h4 className="text-md font-semibold text-white mb-3 flex items-center gap-2">
                <span className={`w-2 h-6 ${color} rounded-full`}></span>
                {title}
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1 bg-primary rounded-lg text-sm text-gray-300 flex items-center gap-2 border border-white/5"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(setTags, index)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                            <FaTimes size={10} />
                        </button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            addTag(setTags, newValue, () => setNewValue(''));
                        }
                    }}
                    className="flex-1 bg-primary border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                    placeholder={`Add ${title.toLowerCase().slice(0, -1)}...`}
                />
                <button
                    type="button"
                    onClick={() => addTag(setTags, newValue, () => setNewValue(''))}
                    className="px-3 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-colors"
                >
                    <FaPlus size={12} />
                </button>
            </div>
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <TagSection
                title="Languages"
                color="bg-blue-500"
                tags={languages}
                setTags={setLanguages}
                newValue={newLanguage}
                setNewValue={setNewLanguage}
            />

            <TagSection
                title="Frameworks & Libraries"
                color="bg-purple-500"
                tags={frameworks}
                setTags={setFrameworks}
                newValue={newFramework}
                setNewValue={setNewFramework}
            />

            <TagSection
                title="Tools & Platforms"
                color="bg-pink-500"
                tags={tools}
                setTags={setTools}
                newValue={newTool}
                setNewValue={setNewTool}
            />

            <TagSection
                title="Key Concepts"
                color="bg-green-500"
                tags={concepts}
                setTags={setConcepts}
                newValue={newConcept}
                setNewValue={setNewConcept}
            />

            <div className="flex gap-4 pt-4">
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    Save Skills
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

export default SkillsForm;
