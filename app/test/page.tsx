'use client';

import { useAuth } from '@/lib/auth-context';

export default function TestPage() {
  const auth = useAuth(); // Moved hook call to the top level

  try {
    console.log('[v0] Auth context available:', auth);
    
    return (
      <div className="p-8 bg-background text-foreground">
        <h1>Auth Context Test</h1>
        <pre className="bg-card p-4 rounded mt-4">
          {JSON.stringify({
            isAuthenticated: auth.isAuthenticated,
            loading: auth.loading,
            hasExamSelected: auth.hasExamSelected,
            error: auth.error,
          }, null, 2)}
        </pre>
      </div>
    );
  } catch (error: any) {
    console.log('[v0] Auth error:', error.message);
    return (
      <div className="p-8 bg-background text-foreground">
        <h1>Auth Context Error</h1>
        <p className="text-destructive">{error.message}</p>
      </div>
    );
  }
}
