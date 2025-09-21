
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

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  signup: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (data: { name: string; avatarUrl: string }) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cyber-shield-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('cyber-shield-user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const foundUser = await getUserByEmail(email);
      // NOTE: In a real app, you would hash and compare the password securely.
      if (foundUser && foundUser.password === pass) {
        setUser(foundUser);
        localStorage.setItem('cyber-shield-user', JSON.stringify(foundUser));
        toast({ title: 'Login Successful', description: `Welcome back, ${foundUser.name}!` });
        return true;
      } else {
        toast({ variant: 'destructive', title: 'Login Failed', description: 'Invalid email or password.' });
        return false;
      }
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Login Error', description: 'An unexpected error occurred.' });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, pass: string) => {
     setIsLoading(true);
    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        toast({ variant: 'destructive', title: 'Signup Failed', description: 'An account with this email already exists.' });
        return false;
      }
      
      const newUser = await addUser({ name, email, password: pass });
      setUser(newUser);
      localStorage.setItem('cyber-shield-user', JSON.stringify(newUser));
      toast({ title: 'Signup Successful', description: `Welcome, ${newUser.name}!` });
      return true;

    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Signup Error', description: 'An unexpected error occurred.' });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cyber-shield-user');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  };
  
  const updateUserProfile = async (data: { name: string; avatarUrl: string }) => {
    if (!user) return false;
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(user.id, { name: data.name, avatarUrl: data.avatarUrl });
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('cyber-shield-user', JSON.stringify(updatedUser));
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
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading, updateUserProfile }}>
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
