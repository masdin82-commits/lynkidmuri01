import { useState, useEffect } from 'react';
import MainLandingPage from './components/MainLandingPage';
import NewLandingPage from './components/NewLandingPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      let path = window.location.pathname;

      // Support fallback hash-routing (e.g. lynkidhub.online/#/newpage or /#/newpage)
      // This is highly useful on static hosting when server-side URL rewriting isn't configured.
      if (window.location.hash) {
        const hashPath = window.location.hash.substring(1); // Remove the '#'
        if (hashPath.startsWith('/')) {
          path = hashPath;
        }
      }
      
      setCurrentPath(path);
    };

    // Listen to standard history popstate & hash change events
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Periodically verify path state to ensure deep link stability inside iframes
    const interval = setInterval(handleLocationChange, 400);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      clearInterval(interval);
    };
  }, []);

  // Simple clean matching router
  if (currentPath === '/newpage' || currentPath === '/newpage/') {
    return <NewLandingPage />;
  }

  // Default fallback route (renders the main Bandung offline class landing page)
  return <MainLandingPage />;
}
