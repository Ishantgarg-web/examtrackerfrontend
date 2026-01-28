// Main Page Component
// Server component that renders the home page content
// This component is a server component to allow the Providers wrapper
// to properly set up the AuthProvider context before HomeContent is rendered

import { HomeContent } from '@/components/home-content';

/**
 * HomePage
 * Server component that wraps and renders the HomeContent client component
 * This separation ensures AuthProvider is available when useAuth hook is called
 */
export default function HomePage() {
  return <HomeContent />;
}
