
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from '@/components/ui/card';
import { toast } from 'sonner';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { verifyOTP, isLoading } = useAuth();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  // Mock function to resend OTP
  const handleResendOTP = () => {
    setTimeLeft(30);
    toast.success('New OTP sent to your phone');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp) {
      toast.error('Please enter the OTP');
      return;
    }
    
    const success = await verifyOTP(otp);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Verify OTP</CardTitle>
        <CardDescription className="text-center">
          We've sent a 6-digit code to your phone number. Enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-center">
              <Input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="text-center text-lg tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                disabled={isLoading}
                required
              />
            </div>
            <p className="text-center text-sm text-gray-500">
              For demo purposes, use: <span className="font-medium">123456</span>
            </p>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                Verifying...
              </span>
            ) : (
              'Verify & Proceed'
            )}
          </Button>
          
          <div className="text-center">
            <Button 
              variant="link" 
              type="button"
              className="text-zapp-purple"
              onClick={handleResendOTP}
              disabled={timeLeft > 0 || isLoading}
            >
              {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : 'Resend OTP'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyOTP;
