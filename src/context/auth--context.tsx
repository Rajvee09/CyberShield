
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '@/lib/definitions';
import { addUser, getUserByEmail, updateUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  logout: () => void;
  updateUserProfile: (data: { name: string; avatarUrl: string }) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // This is a temporary solution for client-side state hydration.
    // In a real app, the user would be fetched from the server based on a session cookie.
    try {
      const storedUser = localStorage.getItem('cyber-shield-user-client');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('cyber-shield-user-client');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cyber-shield-user-client');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.push('/');
    router.refresh();
  };
  
  const updateUserProfile = async (data: { name: string; avatarUrl: string }) => {
    if (!user) return false;
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(user.id, data);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('cyber-shield-user-client', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <AuthContext.Provider value={{ user, logout, isLoading, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
