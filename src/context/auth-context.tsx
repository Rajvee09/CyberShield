
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { User } from '@/lib/definitions';
import { updateUser } from '@/lib/data';
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
    // This function runs when the component mounts to check for a logged-in user
    // in localStorage. This is part of how we keep the user logged in across page loads.
    const checkUser = () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem('cyber-shield-user-client');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
        localStorage.removeItem('cyber-shield-user-client');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();

    // After a server action (login/signup), the page refreshes.
    // The new user cookie should be set, but our client-side state needs to sync.
    // This event listener helps sync state without a full page reload if we were
    // doing client-side routing. With server-side redirects, `checkUser` on mount is key.
    window.addEventListener('storage', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
    };
  }, []);

  const logout = () => {
    setUser(null);
    // Also clear the cookie by setting its expiration to the past
    document.cookie = 'cyber-shield-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('cyber-shield-user-client');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.push('/');
    router.refresh(); // Ensures server components re-render with the user logged out
  };
  
  const updateUserProfile = async (data: { name: string; avatarUrl: string }) => {
    if (!user) return false;
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(user.id, data);
      if (updatedUser) {
        setUser(updatedUser);
        // Also update the local storage to persist the changes
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
