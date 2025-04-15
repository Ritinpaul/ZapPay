
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { ZapIcon } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <ZapIcon className="h-8 w-8 text-zapp-purple" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-zapp-gradient">ZappPay</span>
        </div>
        
        <h1 className="text-8xl font-bold text-zapp-purple mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Button asChild size="lg">
          <Link to="/">
            Return to Home
          </Link>
        </Button>
      </div>
      
      <div className="mt-12 text-sm text-gray-400">
        Error ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
      </div>
    </div>
  );
};

export default NotFound;
