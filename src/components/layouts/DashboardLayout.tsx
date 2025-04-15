
import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { 
  HomeIcon, 
  SendIcon, 
  HistoryIcon, 
  UserIcon, 
  ScanIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon,
  PlusIcon,
  ZapIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Function to handle resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { to: '/dashboard', label: 'Home', icon: <HomeIcon className="h-5 w-5" /> },
    { to: '/send-money', label: 'Send Money', icon: <SendIcon className="h-5 w-5" /> },
    { to: '/transactions', label: 'Transactions', icon: <HistoryIcon className="h-5 w-5" /> },
    { to: '/scan', label: 'Scan QR', icon: <ScanIcon className="h-5 w-5" /> },
    { to: '/profile', label: 'Profile', icon: <UserIcon className="h-5 w-5" /> },
  ];

  const renderNavigationItems = () => {
    return navigationItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => 
          `flex items-center space-x-2 p-3 rounded-lg transition-colors
          ${isActive 
            ? 'bg-zapp-purple text-white' 
            : 'text-gray-600 hover:bg-zapp-gray hover:text-zapp-purple'}`
        }
        onClick={() => setIsOpen(false)}
      >
        {item.icon}
        <span>{item.label}</span>
      </NavLink>
    ));
  };

  const renderMobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ZapIcon className="h-6 w-6 text-zapp-purple" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-zapp-gradient">ZappPay</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto py-4 px-3 space-y-2">
            {renderNavigationItems()}
          </div>
          
          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full flex items-center space-x-2 text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopNavigation = () => (
    <div className="hidden md:flex md:w-64 p-4 flex-col h-full border-r">
      <div className="flex items-center space-x-2 mb-8">
        <ZapIcon className="h-6 w-6 text-zapp-purple" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-zapp-gradient">ZappPay</span>
      </div>
      
      <div className="flex-1 space-y-2">
        {renderNavigationItems()}
      </div>
      
      <Button 
        variant="ghost" 
        className="w-full mt-8 flex items-center space-x-2 text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOutIcon className="h-5 w-5" />
        <span>Logout</span>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 px-4 border-b flex items-center justify-between bg-white z-10">
        <div className="flex items-center space-x-4">
          {isMobile && renderMobileNavigation()}
          
          <div className="md:hidden flex items-center space-x-2">
            <ZapIcon className="h-6 w-6 text-zapp-purple" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-zapp-gradient">ZappPay</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="default" size="sm" className="rounded-full" onClick={() => navigate('/add-money')}>
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Money
          </Button>
          
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-zapp-purple text-white">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main */}
      <div className="flex flex-1">
        {renderDesktopNavigation()}
        
        <main className="flex-1 p-4 overflow-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
