import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import type { Project } from "../types";
import { FaGithub, FaExternalLinkAlt, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ProjectForm from "./admin/ProjectForm";
import DeleteConfirmModal from "./admin/DeleteConfirmModal";

const TiltCard = ({
    project,
    isAdmin,
    onEdit,
    onDelete
}: {
    project: Project;
    isAdmin: boolean;
    onEdit: () => void;
    onDelete: () => void;
}) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-primary rounded-xl overflow-hidden border border-white/5 hover:border-accent/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all group perspective-1000 relative"
        >
            {/* Admin Controls */}
            {isAdmin && (
                <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit();
                        }}
                        className="p-2 bg-blue-500/80 hover:bg-blue-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                        title="Edit project"
                    >
                        <FaEdit size={14} />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                        className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors"
                        title="Delete project"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
            )}

            {/* Image Placeholder or Actual Image */}
            <div
                className="h-48 bg-gray-800 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-750 transition-colors"
                style={{ transform: "translateZ(20px)" }}
            >
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                ) : (
                    <span className="text-gray-600 text-2xl font-bold group-hover:scale-110 transition-transform duration-500">{project.title}</span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80" />
            </div>

            <div className="p-6" style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech: string) => (
                        <span key={tech} className="px-3 py-1 bg-secondary text-xs rounded-full text-blue-300 border border-blue-500/20">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4">
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                            <FaGithub /> Code
                        </a>
                    )}
                    {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-accent transition-colors">
                            <FaExternalLinkAlt /> Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const { isAdmin } = useAuth();
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

    // Get unique categories from projects
    const projectCategories = Array.from(new Set(projects.map(p => p.category)));
    const categories = ["All", ...projectCategories.filter(c => !["All"].includes(c))];

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(project => project.category.includes(filter) || (filter === "Full-stack" && project.tech.includes("React")));

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setShowForm(true);
    };

    const handleFormSubmit = (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (editingProject) {
            updateProject(editingProject.id, data);
        } else {
            addProject(data);
        }
        setShowForm(false);
        setEditingProject(null);
    };

    const handleDeleteConfirm = () => {
        if (deleteTarget) {
            deleteProject(deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    return (
        <section id="projects" className="min-h-screen py-20 bg-secondary relative">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12"
                >
                    Featured <span className="text-accent">Projects</span>
                </motion.h2>

                {/* Filters */}
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full border transition-all ${filter === cat
                                ? "bg-accent text-primary border-accent font-bold"
                                : "border-gray-600 text-gray-400 hover:border-white hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}

                    {/* Add Project Button (Admin Only) */}
                    {isAdmin && (
                        <motion.button
                            onClick={() => {
                                setEditingProject(null);
                                setShowForm(true);
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                        >
                            <FaPlus /> Add Project
                        </motion.button>
                    )}
                </div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <TiltCard
                                key={project.id}
                                project={project}
                                isAdmin={isAdmin}
                                onEdit={() => handleEdit(project)}
                                onDelete={() => setDeleteTarget(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-xl">No projects in this category</p>
                        {isAdmin && (
                            <p className="text-sm mt-2">Click "Add Project" to create one!</p>
                        )}
                    </div>
                )}
            </div>

            {/* Project Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-auto"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="bg-secondary rounded-2xl p-8 w-full max-w-2xl border border-white/10 shadow-2xl max-h-[90vh] overflow-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <ProjectForm
                                project={editingProject}
                                onSubmit={handleFormSubmit}
                                onCancel={() => setShowForm(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                isOpen={!!deleteTarget}
                projectTitle={deleteTarget?.title || ''}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />
        </section>
    );
};

export default Projects;
