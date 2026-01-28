// Client-side Providers Wrapper
// This component wraps all client-side providers (AuthProvider, etc.)
// It must be marked as 'use client' because it contains client-side state management

'use client';

import { AuthProvider } from '@/lib/auth-context';
import React from 'react';

/**
 * Providers Component
 * Wraps the application with all necessary client-side providers
 * This is necessary because providers need to be client components,
 * but the root layout is a server component
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
