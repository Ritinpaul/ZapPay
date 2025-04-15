
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from '@/components/ui/card';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 text-green-600 p-4 rounded-lg">
              <p className="font-medium">Password reset email sent!</p>
              <p className="text-sm mt-2">Check your inbox for instructions to reset your password.</p>
            </div>
            <Button asChild className="w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                  Sending...
                </span>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-gray-500 mt-2 w-full">
          Remember your password?{' '}
          <Link to="/login" className="text-zapp-purple hover:underline">
            Back to Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ForgotPassword;
