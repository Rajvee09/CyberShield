
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  startTransition,
  useCallback,
} from 'react';
import type { User } from '@/lib/definitions';
import { updateUser } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/app/auth/actions';

interface AuthContextType {
  user: User | null;
  logout: () => void;
  updateUserProfile: (data: { name: string; avatarUrl: string }) => Promise<boolean>;
  syncUser: (user: User) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// A helper function to get a cookie by name
const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
};


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUserCookie = getCookie('cyber-shield-user-client');
      if (storedUserCookie) {
        const parsedUser = JSON.parse(decodeURIComponent(storedUserCookie));
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Failed to parse user from cookie', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const syncUser = useCallback((user: User) => {
    setUser(user);
    router.refresh();
  }, [router]);


  const logout = () => {
    startTransition(() => {
      logoutAction().then(() => {
        setUser(null);
        toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
        // The redirect in logoutAction handles the page change
      });
    });
  };
  
  const updateUserProfile = async (data: { name: string; avatarUrl: string }) => {
    if (!user) return false;
    setIsLoading(true);
    try {
      const updatedUser = await updateUser(user.id, data);
      if (updatedUser) {
        setUser(updatedUser);
        
        // Update the client-side cookie after profile update
        const userString = JSON.stringify(updatedUser);
        document.cookie = `cyber-shield-user-client=${encodeURIComponent(userString)}; max-age=${60 * 60 * 24 * 7}; path=/`;

        router.refresh();
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
    <AuthContext.Provider value={{ user, logout, isLoading, updateUserProfile, syncUser }}>
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
