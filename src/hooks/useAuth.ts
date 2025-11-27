// src/hooks/useAuth.ts

import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { AuthCredentials } from '@/types/auth'; 

// Interface yang mendefinisikan bentuk nilai yang disediakan oleh AuthContext
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>;
}

// ✅ KEMBALI KE NAMA ASLI: AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider adalah komponen utama yang menyediakan konteks autentikasi.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscription ke Firebase Auth State
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // [Fungsi login, register, logout, resetPassword, updateUserProfile, dst. tetap sama]
  const login = async (credentials: AuthCredentials) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
    } catch (err: any) {
      setError(err.message);
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: AuthCredentials, displayName: string) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
        setUser({ 
          ...userCredential.user, 
          displayName, 
          photoURL: userCredential.user.photoURL || null
        });
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Registration failed:", err);
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
      setError(err.message);
      console.error("Logout failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err.message);
      console.error("Password reset failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    setLoading(true);
    setError(null);
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName, photoURL });
        setUser({ 
          ...auth.currentUser, 
          displayName, 
          photoURL: photoURL === undefined ? null : photoURL
        });
      } else {
        throw new Error("No user is logged in to update profile.");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Profile update failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user, loading, error, login, register, logout, resetPassword, updateUserProfile,
  };

  // ✅ SOLUSI WRAPPER: Menggunakan Wrapper Komponen dengan nama AuthContext yang benar
  // Ini menghindari Vercel build environment salah menginterpretasikan AuthContext sebagai namespace
  const ProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    // Menggunakan AuthContext.Provider di dalam komponen Wrapper
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };

  // Mengembalikan wrapper
  return <ProviderWrapper>{children}</ProviderWrapper>;
}

// useAuth hook untuk mengonsumsi nilai dari AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext); // Menggunakan AuthContext
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context as AuthContextType; 
};
