/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AuthContextType {
    isAdmin: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_PASSWORD = 'Aditya@0605'; // Change this to your preferred password
const AUTH_STORAGE_KEY = 'portfolio_admin_auth';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Use sessionStorage instead of localStorage - session ends when browser closes
    const [isAdmin, setIsAdmin] = useState<boolean>(() => {
        try {
            const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
            return stored === 'authenticated';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            if (isAdmin) {
                sessionStorage.setItem(AUTH_STORAGE_KEY, 'authenticated');
            } else {
                sessionStorage.removeItem(AUTH_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error persisting auth state:', error);
        }
    }, [isAdmin]);

    const login = (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
