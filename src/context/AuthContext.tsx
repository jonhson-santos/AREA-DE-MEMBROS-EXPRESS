import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_KEYS = {
  'desbloquear27': { 
    accessLevel: 'basic' as const, 
    productAccess: ['mente-milionaria'],
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias atrás para teste
  },
  'menteblindada97': { 
    accessLevel: 'premium' as const, 
    productAccess: ['mente-milionaria', 'mente-blindada'],
    purchaseDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias atrás para teste
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [completedModules, setCompletedModules] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const savedUser = localStorage.getItem('menteimparavel_user');
    const savedProgress = localStorage.getItem('menteimparavel_progress');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedProgress) {
      setCompletedModules(JSON.parse(savedProgress));
    }
  }, []);

  const login = (key: string): boolean => {
    const accessData = ACCESS_KEYS[key as keyof typeof ACCESS_KEYS];
    if (accessData) {
      const newUser = accessData;
      setUser(newUser);
      localStorage.setItem('menteimparavel_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('menteimparavel_user');
    localStorage.removeItem('menteimparavel_progress');
  };

  const toggleModuleComplete = (productId: string, moduleId: string) => {
    const newProgress = { ...completedModules };
    if (!newProgress[productId]) {
      newProgress[productId] = [];
    }
    
    const moduleIndex = newProgress[productId].indexOf(moduleId);
    if (moduleIndex > -1) {
      newProgress[productId].splice(moduleIndex, 1);
    } else {
      newProgress[productId].push(moduleId);
    }
    
    setCompletedModules(newProgress);
    localStorage.setItem('menteimparavel_progress', JSON.stringify(newProgress));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleModuleComplete }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};