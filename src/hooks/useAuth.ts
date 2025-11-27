// src/hooks/useAuth.ts

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile, // Tambahkan ini
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthCredentials } from '@/types/auth'; // Pastikan path ini benar

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>; // Tambahkan ini
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      setError(null); // Reset error on auth state change
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  const login = async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message);
      throw err; // Re-throw error for component to handle
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      // Opsional: Langsung update display name setelah register
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: credentials.email.split('@')[0] });
        setUser(userCredential.user); // Update local user state
      }
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error("Logout error:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string) => {
    setError(null);
    if (!auth.currentUser) {
      setError('Anda harus login untuk mengupdate profil.');
      throw new Error('User not logged in.');
    }
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      // Update state user secara manual karena onAuthStateChanged mungkin tidak langsung terpicu
      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          displayName: displayName !== undefined ? displayName : prevUser.displayName,
          photoURL: photoURL !== undefined ? photoURL : prevUser.photoURL,
        };
      });
      // Tidak perlu alert di sini, biarkan komponen yang memanggil yang handle feedback
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
