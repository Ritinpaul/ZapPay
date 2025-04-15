
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { ZapIcon } from 'lucide-react';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zapp-purple"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <ZapIcon className="h-6 w-6 text-zapp-purple" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-zapp-gradient">ZappPay</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6 border-t text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} ZappPay. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
