
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';
import { Transaction } from '@/components/TransactionItem';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  addMoney: (amount: number) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data - In a real app, this would come from a backend
const MOCK_USER: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  balance: 5000.00,
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=8B5CF6&color=fff',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingOTPVerification, setPendingOTPVerification] = useState(false);
  const [pendingUserData, setPendingUserData] = useState<Partial<User> | null>(null);

  useEffect(() => {
    // Check if user is already logged in (e.g., from localStorage)
    const storedUser = localStorage.getItem('zappUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('zappUser');
      }
    }
    
    // Initialize transactions if not exists
    if (!localStorage.getItem('zappTransactions')) {
      localStorage.setItem('zappTransactions', JSON.stringify([]));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify credentials with a backend
      if (email === 'demo@zapppay.com' && password === 'demo123') {
        // For demo purposes, we'll use our mock user
        localStorage.setItem('zappUser', JSON.stringify(MOCK_USER));
        setUser(MOCK_USER);
        toast.success('Login successful!');
        return true;
      } else {
        // Normally would start OTP verification here
        setPendingOTPVerification(true);
        setPendingUserData({ email });
        toast.info('OTP sent to your registered mobile number');
        return true; // Redirect to OTP verification
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, phone: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a user in the backend
      setPendingOTPVerification(true);
      setPendingUserData({ name, email, phone });
      toast.info('OTP sent to your mobile number for verification');
      return true; // Redirect to OTP verification
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the OTP with a backend
      if (otp === '123456') {
        // Create a new user or log them in
        const newUser: User = {
          ...MOCK_USER,
          ...(pendingUserData || {}),
          id: 'user-' + Math.random().toString(36).substr(2, 9),
        };
        
        localStorage.setItem('zappUser', JSON.stringify(newUser));
        setUser(newUser);
        setPendingOTPVerification(false);
        setPendingUserData(null);
        toast.success('Verification successful!');
        return true;
      } else {
        toast.error('Invalid OTP. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Verification failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('zappUser');
    setUser(null);
    toast.info('You have been logged out');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        localStorage.setItem('zappUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const addMoney = async (amount: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        // Update balance
        const newBalance = user.balance + amount;
        const updatedUser = { ...user, balance: newBalance };
        localStorage.setItem('zappUser', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        // Create transaction record
        const newTransaction: Transaction = {
          id: 'tx' + Date.now(),
          type: 'add',
          amount: amount,
          name: 'Added via UPI',
          date: new Date().toLocaleString('en-IN', { 
            day: '2-digit', 
            month: 'short',
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
          }),
          status: 'completed'
        };
        
        // Save transaction to localStorage
        const savedTransactions = localStorage.getItem('zappTransactions');
        const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
        transactions.unshift(newTransaction);
        localStorage.setItem('zappTransactions', JSON.stringify(transactions));
        
        toast.success(`Added ₹${amount} to your wallet`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Add money error:', error);
      toast.error('Failed to add money. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOTP,
        logout,
        updateProfile,
        addMoney,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
