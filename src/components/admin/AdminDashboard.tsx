import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaTimes, FaRedo, FaHome, FaCode, FaBriefcase, FaTrophy, FaProjectDiagram } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { Project, Experience, Achievement } from '../../types';
import ProjectForm from './ProjectForm';
import HeroForm from './HeroForm';
import SkillsForm from './SkillsForm';
import ExperienceForm from './ExperienceForm';
import AchievementForm from './AchievementForm';
import DeleteConfirmModal from './DeleteConfirmModal';

interface AdminDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

type TabType = 'projects' | 'hero' | 'skills' | 'experience';

const TABS: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'hero', label: 'Hero & About', icon: <FaHome /> },
    { id: 'skills', label: 'Skills', icon: <FaCode /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
];

const AdminDashboard = ({ isOpen, onClose }: AdminDashboardProps) => {
    const { logout } = useAuth();
    const {
        projects, addProject, updateProject, deleteProject,
        heroContent, updateHeroContent,
        socialLinks, updateSocialLinks,
        skills, updateSkills,
        experience, addExperience, updateExperience, deleteExperience,
        achievements, addAchievement, updateAchievement, deleteAchievement,
        resetToDefaults
    } = useData();

    const [activeTab, setActiveTab] = useState<TabType>('projects');
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
    const [showAchievementForm, setShowAchievementForm] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<{ type: 'project' | 'experience' | 'achievement'; item: Project | Experience | Achievement } | null>(null);
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    // Project handlers
    const handleAddProject = () => {
        setEditingProject(null);
        setShowProjectForm(true);
    };

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setShowProjectForm(true);
    };

    const handleProjectSubmit = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (editingProject) {
            updateProject(editingProject.id, data);
            showNotification('success', 'Project updated successfully!');
        } else {
            addProject(data);
            showNotification('success', 'Project added successfully!');
        }
        setShowProjectForm(false);
        setEditingProject(null);
    };

    // Experience handlers
    const handleAddExperience = () => {
        setEditingExperience(null);
        setShowExperienceForm(true);
    };

    const handleEditExperience = (exp: Experience) => {
        setEditingExperience(exp);
        setShowExperienceForm(true);
    };

    const handleExperienceSubmit = (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (editingExperience) {
            updateExperience(editingExperience.id, data);
            showNotification('success', 'Experience updated successfully!');
        } else {
            addExperience(data);
            showNotification('success', 'Experience added successfully!');
        }
        setShowExperienceForm(false);
        setEditingExperience(null);
    };

    // Achievement handlers
    const handleAddAchievement = () => {
        setEditingAchievement(null);
        setShowAchievementForm(true);
    };

    const handleEditAchievement = (ach: Achievement) => {
        setEditingAchievement(ach);
        setShowAchievementForm(true);
    };

    const handleAchievementSubmit = (data: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (editingAchievement) {
            updateAchievement(editingAchievement.id, data);
            showNotification('success', 'Achievement updated successfully!');
        } else {
            addAchievement(data);
            showNotification('success', 'Achievement added successfully!');
        }
        setShowAchievementForm(false);
        setEditingAchievement(null);
    };

    // Delete handlers
    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            if (deleteTarget.type === 'project') {
                deleteProject(deleteTarget.item.id);
                showNotification('success', 'Project deleted successfully!');
            } else if (deleteTarget.type === 'experience') {
                deleteExperience(deleteTarget.item.id);
                showNotification('success', 'Experience deleted successfully!');
            } else if (deleteTarget.type === 'achievement') {
                deleteAchievement(deleteTarget.item.id);
                showNotification('success', 'Achievement deleted successfully!');
            }
            setDeleteTarget(null);
        }
    };

    const handleLogout = () => {
        logout();
        onClose();
    };

    const handleReset = () => {
        if (window.confirm('This will reset ALL data to the original defaults. Are you sure?')) {
            resetToDefaults();
            showNotification('success', 'All data reset to defaults!');
        }
    };

    // Render Projects Tab
    const renderProjectsTab = () => (
        <div>
            <div className="mb-6">
                <motion.button
                    onClick={handleAddProject}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                >
                    <FaPlus /> Add New Project
                </motion.button>
            </div>

            <div className="text-gray-400 text-sm mb-4">Total: {projects.length} projects</div>

            {projects.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-xl mb-2">No projects yet</p>
                    <p className="text-sm">Click "Add New Project" to get started</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-secondary/50 rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-white">{project.title}</h3>
                                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 4).map((tech, i) => (
                                            <span key={i} className="px-2 py-1 bg-primary text-xs text-gray-300 rounded">{tech}</span>
                                        ))}
                                        {project.tech.length > 4 && (
                                            <span className="px-2 py-1 text-xs text-gray-500">+{project.tech.length - 4} more</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditProject(project)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all">
                                        <FaEdit /> Edit
                                    </button>
                                    <button onClick={() => setDeleteTarget({ type: 'project', item: project })} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all">
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );

    // Render Hero Tab
    const renderHeroTab = () => (
        <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Edit Hero Section & Social Links</h3>
            <HeroForm
                heroContent={heroContent}
                socialLinks={socialLinks}
                onSubmit={(hero, social) => {
                    updateHeroContent(hero);
                    updateSocialLinks(social);
                    showNotification('success', 'Hero content updated!');
                }}
                onCancel={onClose}
            />
        </div>
    );

    // Render Skills Tab
    const renderSkillsTab = () => (
        <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-white mb-6">Edit Skills</h3>
            <SkillsForm
                skills={skills}
                onSubmit={(newSkills) => {
                    updateSkills(newSkills);
                    showNotification('success', 'Skills updated!');
                }}
                onCancel={onClose}
            />
        </div>
    );

    // Render Experience Tab
    const renderExperienceTab = () => (
        <div>
            {/* Experience Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaBriefcase className="text-purple-400" /> Experience & Education
                    </h3>
                    <motion.button
                        onClick={handleAddExperience}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-all"
                    >
                        <FaPlus /> Add Experience
                    </motion.button>
                </div>

                {experience.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No experience entries yet</p>
                ) : (
                    <div className="space-y-4">
                        {experience.map((exp) => (
                            <div key={exp.id} className="bg-secondary/50 rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-white">{exp.role}</h4>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${exp.type === 'work' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                                {exp.type === 'work' ? 'Work' : 'Education'}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{exp.company} • {exp.duration}</p>
                                        <p className="text-gray-500 text-sm mt-2">{exp.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditExperience(exp)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => setDeleteTarget({ type: 'experience', item: exp })} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Achievements Section */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <FaTrophy className="text-yellow-400" /> Achievements
                    </h3>
                    <motion.button
                        onClick={handleAddAchievement}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-all"
                    >
                        <FaPlus /> Add Achievement
                    </motion.button>
                </div>

                {achievements.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No achievements yet</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {achievements.map((ach) => (
                            <div key={ach.id} className="bg-secondary/50 rounded-xl p-5 border border-yellow-500/10 hover:border-yellow-500/20 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-yellow-200 mb-1">{ach.title}</h4>
                                        <p className="text-gray-400 text-sm">{ach.description}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button onClick={() => handleEditAchievement(ach)} className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                                            <FaEdit size={14} />
                                        </button>
                                        <button onClick={() => setDeleteTarget({ type: 'achievement', item: ach })} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-primary z-50 overflow-auto"
                >
                    {/* Header */}
                    <header className="sticky top-0 bg-secondary/90 backdrop-blur-md border-b border-white/5 z-10">
                        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                                Admin Dashboard
                            </h1>
                            <div className="flex items-center gap-4">
                                <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all text-sm">
                                    <FaRedo size={12} /> Reset All
                                </button>
                                <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all">
                                    <FaSignOutAlt /> Logout
                                </button>
                                <button onClick={onClose} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                                    <FaTimes size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="container mx-auto px-6">
                            <div className="flex gap-1 border-b border-white/5">
                                {TABS.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all border-b-2 -mb-[1px] ${activeTab === tab.id
                                                ? 'text-accent border-accent'
                                                : 'text-gray-400 border-transparent hover:text-white'
                                            }`}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </header>

                    {/* Notification */}
                    <AnimatePresence>
                        {notification && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`fixed top-20 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
                                    }`}
                            >
                                {notification.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Content */}
                    <main className="container mx-auto px-6 py-8">
                        {activeTab === 'projects' && renderProjectsTab()}
                        {activeTab === 'hero' && renderHeroTab()}
                        {activeTab === 'skills' && renderSkillsTab()}
                        {activeTab === 'experience' && renderExperienceTab()}
                    </main>

                    {/* Project Form Modal */}
                    <AnimatePresence>
                        {showProjectForm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
                                onClick={() => setShowProjectForm(false)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-secondary rounded-2xl p-8 w-full max-w-2xl border border-white/10 shadow-2xl max-h-[90vh] overflow-auto"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-white">
                                            {editingProject ? 'Edit Project' : 'Add New Project'}
                                        </h2>
                                        <button onClick={() => setShowProjectForm(false)} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                            <FaTimes size={20} />
                                        </button>
                                    </div>
                                    <ProjectForm
                                        project={editingProject}
                                        onSubmit={handleProjectSubmit}
                                        onCancel={() => setShowProjectForm(false)}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Experience Form Modal */}
                    <AnimatePresence>
                        {showExperienceForm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
                                onClick={() => setShowExperienceForm(false)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-secondary rounded-2xl p-8 w-full max-w-xl border border-white/10 shadow-2xl"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-white">
                                            {editingExperience ? 'Edit Experience' : 'Add Experience'}
                                        </h2>
                                        <button onClick={() => setShowExperienceForm(false)} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                            <FaTimes size={20} />
                                        </button>
                                    </div>
                                    <ExperienceForm
                                        experience={editingExperience}
                                        onSubmit={handleExperienceSubmit}
                                        onCancel={() => setShowExperienceForm(false)}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Achievement Form Modal */}
                    <AnimatePresence>
                        {showAchievementForm && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
                                onClick={() => setShowAchievementForm(false)}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="bg-secondary rounded-2xl p-8 w-full max-w-xl border border-white/10 shadow-2xl"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-white">
                                            {editingAchievement ? 'Edit Achievement' : 'Add Achievement'}
                                        </h2>
                                        <button onClick={() => setShowAchievementForm(false)} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                            <FaTimes size={20} />
                                        </button>
                                    </div>
                                    <AchievementForm
                                        achievement={editingAchievement}
                                        onSubmit={handleAchievementSubmit}
                                        onCancel={() => setShowAchievementForm(false)}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmModal
                        isOpen={!!deleteTarget}
                        projectTitle={deleteTarget?.item ? ('title' in deleteTarget.item ? deleteTarget.item.title : deleteTarget.item.role) : ''}
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setDeleteTarget(null)}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AdminDashboard;
