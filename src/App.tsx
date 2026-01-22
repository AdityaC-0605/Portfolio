import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import { DataProvider } from "./context/DataContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog } from "react-icons/fa";

const AdminButton = ({ onClick }: { onClick: () => void }) => {
  const { isAdmin } = useAuth();

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      className={`fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-40 transition-colors ${isAdmin
          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
          : 'bg-secondary/80 backdrop-blur-sm text-gray-400 hover:text-white border border-white/10'
        }`}
      title={isAdmin ? "Open Dashboard" : "Admin Login"}
    >
      <FaCog size={20} />
    </motion.button>
  );
};

const AppContent = () => {
  const { isAdmin } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAdminButtonClick = () => {
    if (isAdmin) {
      setShowDashboard(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="bg-primary min-h-screen text-white font-sans">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <footer className="py-6 text-center text-gray-500 bg-secondary/30 text-sm">
        <p>© {new Date().getFullYear()} Aditya Choudhary. All rights reserved.</p>
      </footer>

      {/* Admin Access Button */}
      <AdminButton onClick={handleAdminButtonClick} />

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Admin Dashboard */}
      <AnimatePresence>
        {isAdmin && showDashboard && (
          <AdminDashboard
            isOpen={showDashboard}
            onClose={() => setShowDashboard(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
