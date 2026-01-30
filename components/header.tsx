'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    router.push('/profile');
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.replace('/'); // replace avoids back navigation to protected pages
  };

  return (
    <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-8">
          <button
            onClick={handleLogoClick}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExamReady
            </h1>
          </button>

          {/* Dashboard button only when logged in */}
          {isAuthenticated && (
            <Button
              variant="default"
              size="sm"
              onClick={handleDashboardClick}
            >
              Dashboard
            </Button>
          )}
        </div>

        {/* Right section — ONLY when authenticated */}
        {isAuthenticated && user && (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onMouseEnter={() => setDropdownOpen(true)}
              >
                {user.userEmail}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <DropdownMenuItem onClick={handleProfileClick}>
                Your profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
