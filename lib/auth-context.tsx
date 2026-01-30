// Auth Context Module
// This module manages authentication state across the entire application
// It handles Google OAuth login, user data fetching, and session management

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from './api-client';

/**
 * Exam Interface
 * Represents an exam selected by the user
 */
interface Exam {
  examId: string;
  examCode: string; // e.g., 'CAT'
  attemptType: string; // FIRST_ATTEMPT or REPEAT_ATTEMPT
  currentStreak: number; // Current consecutive days completed
  longestStreak: number; // Longest streak ever achieved
}

/**
 * User Interface
 * Represents a user's complete profile
 */
interface User {
  userId: string;
  userName: string;
  userEmail: string;
  phoneNumber: string;
  workingStatus: string; // e.g., WORKING, STUDENT
  bachelorDegree: string; // e.g., ENGINEERING, COMMERCE
  timeZone?: string; // e.g., Asia/Kolkata
  exams: Exam[]; // Array of exams user has selected
}

/**
 * AuthContextType Interface
 * Defines the shape of the authentication context
 */
interface AuthContextType {
  user: User | null; // Current user data or null if not authenticated
  loading: boolean; // Whether auth state is still being loaded
  error: string | null; // Error message if auth failed
  isAuthenticated: boolean; // Whether user is logged in
  hasExamSelected: boolean; // Whether user has selected an exam
  logout: () => void; // Function to clear session and logout
  refetchUser: () => Promise<void>; // Function to refresh user data from backend
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider Component
 * Wraps the entire application to provide authentication state
 * Handles:
 * - Initial user data fetching on app load
 * - Session validation via JWT cookies
 * - Global state management for auth
 * - Auto-redirect logic for unauthenticated users
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State management
  const [user, setUser] = useState<User | null>(null); // Current authenticated user
  const [loading, setLoading] = useState(true); // Loading state for initial fetch
  const [error, setError] = useState<string | null>(null); // Error message if auth fails

  /**
   * Fetch user profile from backend
   * Called on app load and when user refetches their data
   * Validates session via JWT cookie authentication
   */
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: User = await apiClient.getProfile();
    setUser(response);
    } catch (err: any) {
      console.log('[v0] Auth error:', err);
      // 401 means session expired or user not authenticated - this is expected for unauthenticated users
      if (err.status === 401) {
        setUser(null);
        setError(null); // Clear error for unauthenticated state
      } else {
        // Log other errors but don't block app loading
        console.error('[v0] Failed to fetch user profile:', err);
        setError(null); // Don't show error to user, let them proceed
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Load user data on component mount
   * This validates the user's session and loads their profile
   */
  useEffect(() => {
    fetchUser();
  }, []);

  /**
   * Handle user logout
   * Calls backend logout endpoint and clears local state
   */
  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (err) {
      console.error('[v0] Logout error:', err);
    } finally {
      setUser(null);
      // JWT cookie is automatically cleared by backend when logout endpoint is called
    }
  };

  // Create context value with all auth state and methods
  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user, // True if user object exists
    hasExamSelected: user
      ? Array.isArray(user.exams) &&
        user.exams.length > 0 &&
        user.exams.some((ex: Exam) => ex?.examId || ex?.examCode)
      : false,
    logout: handleLogout,
    refetchUser: fetchUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * Use this hook to access authentication state anywhere in the app
 * Must be used within an AuthProvider wrapper
 * @throws Error if used outside AuthProvider
 * @example
 * const { user, isAuthenticated, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
