// src/contexts/AuthContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '@/lib/authService';
import { UserCredentials } from '@/lib/types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (credentials: UserCredentials) => Promise<void>;
  signup: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== '/login' && pathname !== '/signup') {
        // Allow unauthenticated access to home page for geolocation weather
        if(pathname !== '/') {
            router.push('/login');
        }
    }
  }, [isAuthenticated, loading, router, pathname]);

  const login = async (credentials: UserCredentials) => {
    try {
      const loggedInUser = await apiLogin(credentials);
      setIsAuthenticated(true);
      setUser(loggedInUser);
      router.push('/');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const signup = async (credentials: UserCredentials) => {
    try {
      await apiSignup(credentials);
      router.push('/login');
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
