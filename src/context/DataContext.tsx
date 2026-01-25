/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Project, Experience, Achievement, Skills, HeroContent, SocialLinks, AboutStats } from '../types';
import { PROJECTS, HERO_CONTENT, SKILLS, EXPERIENCE, ACHIEVEMENTS, SOCIAL_LINKS } from '../utils/constants';

// Storage keys
const STORAGE_KEYS = {
    projects: 'portfolio_projects',
    hero: 'portfolio_hero',
    skills: 'portfolio_skills',
    experience: 'portfolio_experience',
    achievements: 'portfolio_achievements',
    socialLinks: 'portfolio_social',
    aboutStats: 'portfolio_about_stats',
    version: 'portfolio_version',
};

// Version to track constants updates
const CONSTANTS_VERSION = '1.2.3'; // Increment this when you update constants

// Default about stats
const DEFAULT_ABOUT_STATS: AboutStats[] = [
    { label: "CGPA", value: "8.39" },
    { label: "Projects", value: "10+" },
    { label: "Certifications", value: "5+" },
];

interface DataContextType {
    // Projects
    projects: Project[];
    addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    deleteProject: (id: string) => void;

    // Hero
    heroContent: HeroContent;
    updateHeroContent: (content: Partial<HeroContent>) => void;

    // Social Links
    socialLinks: SocialLinks;
    updateSocialLinks: (links: Partial<SocialLinks>) => void;

    // About Stats
    aboutStats: AboutStats[];
    updateAboutStats: (stats: AboutStats[]) => void;

    // Skills
    skills: Skills;
    updateSkills: (skills: Partial<Skills>) => void;

    // Experience
    experience: Experience[];
    addExperience: (exp: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateExperience: (id: string, exp: Partial<Experience>) => void;
    deleteExperience: (id: string) => void;

    // Achievements
    achievements: Achievement[];
    addAchievement: (ach: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateAchievement: (id: string, ach: Partial<Achievement>) => void;
    deleteAchievement: (id: string) => void;

    // Reset
    resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Legacy conversion helpers
interface LegacyProject {
    id?: number | string;
    title: string;
    description: string;
    tech?: string[];
    category?: string;
    github?: string;
    demo?: string;
    image?: string;
    createdAt?: number;
    updatedAt?: number;
}

interface LegacyExperience {
    id?: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    type?: 'work' | 'education';
    createdAt?: number;
    updatedAt?: number;
}

interface LegacyAchievement {
    id?: string;
    title: string;
    description: string;
    icon?: string;
    createdAt?: number;
    updatedAt?: number;
}

const convertLegacyProjects = (projects: LegacyProject[]): Project[] => {
    return projects.map((p, index) => ({
        id: p.id?.toString() || `project-${Date.now()}-${index}`,
        title: p.title,
        description: p.description,
        tech: p.tech || [],
        category: p.category || 'AI/ML',
        github: p.github || '',
        demo: p.demo || '',
        image: p.image || '',
        createdAt: p.createdAt || Date.now(),
        updatedAt: p.updatedAt || Date.now(),
    }));
};

const convertLegacyExperience = (experiences: LegacyExperience[]): Experience[] => {
    return experiences.map((e, index) => ({
        id: e.id || `exp-${Date.now()}-${index}`,
        company: e.company,
        role: e.role,
        duration: e.duration,
        description: e.description,
        type: e.type || (e.role.includes('Student') ? 'education' : 'work'),
        createdAt: e.createdAt || Date.now(),
        updatedAt: e.updatedAt || Date.now(),
    }));
};

const convertLegacyAchievements = (achievements: LegacyAchievement[]): Achievement[] => {
    return achievements.map((a, index) => ({
        id: a.id || `ach-${Date.now()}-${index}`,
        title: a.title,
        description: a.description,
        icon: a.icon,
        createdAt: a.createdAt || Date.now(),
        updatedAt: a.updatedAt || Date.now(),
    }));
};

// Initialize helpers
const getInitialProjects = (): Project[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.projects);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                // Check if constants have more projects than localStorage (indicating updates)
                if (PROJECTS.length > parsed.length) {
                    console.log('Constants updated with new projects, using constants');
                    return convertLegacyProjects(PROJECTS);
                }
                return convertLegacyProjects(parsed);
            }
        }
    } catch (error) {
        console.error('Error loading projects from localStorage:', error);
    }
    return convertLegacyProjects(PROJECTS);
};

const getInitialHeroContent = (): HeroContent => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.hero);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading hero content:', error);
    }
    return HERO_CONTENT;
};

const getInitialSocialLinks = (): SocialLinks => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.socialLinks);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading social links:', error);
    }
    return SOCIAL_LINKS;
};

const getInitialAboutStats = (): AboutStats[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.aboutStats);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading about stats:', error);
    }
    return DEFAULT_ABOUT_STATS;
};

const getInitialSkills = (): Skills => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.skills);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Check if the stored skills structure matches current constants structure
            if (parsed && typeof parsed === 'object' && 
                Array.isArray(parsed.languages) && 
                typeof parsed.languages[0] === 'string') {
                return parsed;
            } else {
                // Structure changed, use constants
                console.log('Skills structure updated, using constants');
                return SKILLS;
            }
        }
    } catch (error) {
        console.error('Error loading skills:', error);
    }
    return SKILLS;
};

const getInitialExperience = (): Experience[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.experience);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return convertLegacyExperience(parsed);
            }
        }
    } catch (error) {
        console.error('Error loading experience:', error);
    }
    return convertLegacyExperience(EXPERIENCE);
};

const getInitialAchievements = (): Achievement[] => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.achievements);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return convertLegacyAchievements(parsed);
            }
        }
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
    return convertLegacyAchievements(ACHIEVEMENTS);
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Check if constants have been updated
    const checkConstantsVersion = () => {
        const storedVersion = localStorage.getItem(STORAGE_KEYS.version);
        if (storedVersion !== CONSTANTS_VERSION) {
            console.log('Constants updated, clearing localStorage to use new data');
            // Clear all portfolio data to use updated constants
            Object.values(STORAGE_KEYS).forEach(key => {
                if (key !== STORAGE_KEYS.version) {
                    localStorage.removeItem(key);
                }
            });
            localStorage.setItem(STORAGE_KEYS.version, CONSTANTS_VERSION);
            return true;
        }
        return false;
    };

    // Check version on initialization
    checkConstantsVersion();

    // State
    const [projects, setProjects] = useState<Project[]>(() => getInitialProjects());
    const [heroContent, setHeroContent] = useState<HeroContent>(() => getInitialHeroContent());
    const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => getInitialSocialLinks());
    const [aboutStats, setAboutStats] = useState<AboutStats[]>(() => getInitialAboutStats());
    const [skills, setSkills] = useState<Skills>(() => getInitialSkills());
    const [experience, setExperience] = useState<Experience[]>(() => getInitialExperience());
    const [achievements, setAchievements] = useState<Achievement[]>(() => getInitialAchievements());

    // Persist to localStorage
    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects)); }
        catch (e) { console.error('Error saving projects:', e); }
    }, [projects]);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.hero, JSON.stringify(heroContent)); }
        catch (e) { console.error('Error saving hero:', e); }
    }, [heroContent]);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.socialLinks, JSON.stringify(socialLinks)); }
        catch (e) { console.error('Error saving social links:', e); }
    }, [socialLinks]);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.aboutStats, JSON.stringify(aboutStats)); }
        catch (e) { console.error('Error saving about stats:', e); }
    }, [aboutStats]);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills)); }
        catch (e) { console.error('Error saving skills:', e); }
    }, [skills]);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.experience, JSON.stringify(experience)); }
        catch (e) { console.error('Error saving experience:', e); }
    }, [experience]);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEYS.achievements, JSON.stringify(achievements)); }
        catch (e) { console.error('Error saving achievements:', e); }
    }, [achievements]);

    // Project operations
    const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newProject: Project = {
            ...projectData,
            id: `project-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setProjects(prev => [newProject, ...prev]);
    };

    const updateProject = (id: string, projectData: Partial<Project>) => {
        setProjects(prev =>
            prev.map(p => p.id === id ? { ...p, ...projectData, updatedAt: Date.now() } : p)
        );
    };

    const deleteProject = (id: string) => {
        setProjects(prev => prev.filter(p => p.id !== id));
    };

    // Hero operations
    const updateHeroContent = (content: Partial<HeroContent>) => {
        setHeroContent(prev => ({ ...prev, ...content }));
    };

    // Social Links operations
    const updateSocialLinks = (links: Partial<SocialLinks>) => {
        setSocialLinks(prev => ({ ...prev, ...links }));
    };

    // About Stats operations
    const updateAboutStats = (stats: AboutStats[]) => {
        setAboutStats(stats);
    };

    // Skills operations
    const updateSkills = (newSkills: Partial<Skills>) => {
        setSkills(prev => ({ ...prev, ...newSkills }));
    };

    // Experience operations
    const addExperience = (expData: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newExp: Experience = {
            ...expData,
            id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setExperience(prev => [newExp, ...prev]);
    };

    const updateExperience = (id: string, expData: Partial<Experience>) => {
        setExperience(prev =>
            prev.map(e => e.id === id ? { ...e, ...expData, updatedAt: Date.now() } : e)
        );
    };

    const deleteExperience = (id: string) => {
        setExperience(prev => prev.filter(e => e.id !== id));
    };

    // Achievement operations
    const addAchievement = (achData: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newAch: Achievement = {
            ...achData,
            id: `ach-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        setAchievements(prev => [newAch, ...prev]);
    };

    const updateAchievement = (id: string, achData: Partial<Achievement>) => {
        setAchievements(prev =>
            prev.map(a => a.id === id ? { ...a, ...achData, updatedAt: Date.now() } : a)
        );
    };

    const deleteAchievement = (id: string) => {
        setAchievements(prev => prev.filter(a => a.id !== id));
    };

    // Reset all to defaults
    const resetToDefaults = () => {
        setProjects(convertLegacyProjects(PROJECTS));
        setHeroContent(HERO_CONTENT);
        setSocialLinks(SOCIAL_LINKS);
        setAboutStats(DEFAULT_ABOUT_STATS);
        setSkills(SKILLS);
        setExperience(convertLegacyExperience(EXPERIENCE));
        setAchievements(convertLegacyAchievements(ACHIEVEMENTS));
    };

    return (
        <DataContext.Provider value={{
            projects, addProject, updateProject, deleteProject,
            heroContent, updateHeroContent,
            socialLinks, updateSocialLinks,
            aboutStats, updateAboutStats,
            skills, updateSkills,
            experience, addExperience, updateExperience, deleteExperience,
            achievements, addAchievement, updateAchievement, deleteAchievement,
            resetToDefaults,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
