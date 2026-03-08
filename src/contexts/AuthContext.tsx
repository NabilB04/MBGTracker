import React, { createContext, useContext, useState, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@mbg.id': {
    password: 'admin123',
    user: { id: '1', email: 'admin@mbg.id', name: 'Admin MBG', role: 'admin', organization: 'Kementerian Pendidikan' },
  },
  'sppg@mbg.id': {
    password: 'sppg123',
    user: { id: '2', email: 'sppg@mbg.id', name: 'Operator SPPG Ciputat', role: 'sppg', organization: 'SPPG Ciputat' },
  },
  'sekolah@mbg.id': {
    password: 'sekolah123',
    user: { id: '3', email: 'sekolah@mbg.id', name: 'Admin SDN Ciputat 1', role: 'sekolah', organization: 'SDN Ciputat 1' },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gizitrack_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, _role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const entry = MOCK_USERS[email];
    if (entry && entry.password === password) {
      setUser(entry.user);
      localStorage.setItem('gizitrack_user', JSON.stringify(entry.user));
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('gizitrack_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
