
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { EyeIcon, EyeOffIcon, KeyIcon } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  const handleDemoLogin = async () => {
    const success = await login('demo@zapppay.com', 'demo123');
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login to ZappPay</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-zapp-purple hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
        </form>
        
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          className="w-full"
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          <KeyIcon className="mr-2 h-4 w-4" />
          Try Demo Account
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-gray-500 mt-2 w-full">
          Don't have an account?{' '}
          <Link to="/register" className="text-zapp-purple hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
