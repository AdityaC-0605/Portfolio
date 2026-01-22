import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    projectTitle: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmModal = ({ isOpen, projectTitle, onConfirm, onCancel }: DeleteConfirmModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="bg-secondary rounded-2xl p-6 w-full max-w-md border border-white/10 shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                                <FaExclamationTriangle className="text-red-400 text-2xl" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2">Delete Project?</h3>

                            <p className="text-gray-400 mb-6">
                                Are you sure you want to delete{' '}
                                <span className="text-white font-semibold">"{projectTitle}"</span>?
                                This action cannot be undone.
                            </p>

                            <div className="flex gap-4 w-full">
                                <button
                                    onClick={onCancel}
                                    className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-white/5 hover:border-white transition-all"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    onClick={onConfirm}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                                >
                                    Delete
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DeleteConfirmModal;
