
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { UserIcon, KeyIcon, ShieldIcon, CreditCardIcon } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const success = await updateProfile({ name, email, phone });
    if (success) {
      toast.success('Profile updated successfully');
    }
  };
  
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    // Simulate API call
    toast.success('Password updated successfully');
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-3">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-zapp-purple text-white text-xl">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <p className="text-gray-500">{user?.phone}</p>
              </div>
              
              <div className="flex-1 md:text-right">
                <Button>Change Avatar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs Card */}
        <Card className="md:col-span-3">
          <Tabs defaultValue="personal">
            <CardHeader>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="personal" className="flex items-center">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center">
                  <KeyIcon className="h-4 w-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center">
                  <CreditCardIcon className="h-4 w-4 mr-2" />
                  Payment Methods
                </TabsTrigger>
              </TabsList>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="personal" className="space-y-4">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <ShieldIcon className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-800">Security Recommendation</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Use a strong password and enable two-factor authentication for added security.
                      </p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit">Update Password</Button>
                </form>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-4">
                <div className="text-center py-8">
                  <CreditCardIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No payment methods added yet</h3>
                  <p className="text-gray-500 mb-4">Add a payment method to easily add money to your wallet</p>
                  <Button>Add Payment Method</Button>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
