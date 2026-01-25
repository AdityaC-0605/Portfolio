// Type definitions for portfolio data

export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    category: string;
    github: string;
    demo: string;
    image?: string;
    featured?: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface Skills {
    languages: string[];
    frameworks: string[];
    tools: string[];
    concepts: string[];
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    duration: string;
    description: string;
    type: 'work' | 'education';
    createdAt: number;
    updatedAt: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon?: string;
    createdAt: number;
    updatedAt: number;
}

export interface AboutStats {
    label: string;
    value: string;
}

export interface SocialLinks {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
    website?: string;
}

export interface HeroContent {
    name: string;
    roles: string[];
    description: string;
}

export interface NavLink {
    id: string;
    label: string;
}

export interface ContactFormData {
    user_name: string;
    user_email: string;
    message: string;
}

export interface AdminCredentials {
    password: string;
}
