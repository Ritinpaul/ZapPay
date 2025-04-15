
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { SearchIcon, UserIcon, UserPlus, SendIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Transaction } from '@/components/TransactionItem';

// Mock data for contacts
const CONTACTS = [
  { id: 'c1', name: 'Rahul Sharma', phoneNumber: '9876543210', avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=3B82F6&color=fff' },
  { id: 'c2', name: 'Priya Patel', phoneNumber: '9876543211', avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=8B5CF6&color=fff' },
  { id: 'c3', name: 'Amit Kumar', phoneNumber: '9876543212', avatar: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=10B981&color=fff' },
  { id: 'c4', name: 'Deepa Singh', phoneNumber: '9876543213', avatar: 'https://ui-avatars.com/api/?name=Deepa+Singh&background=EF4444&color=fff' },
];

const SendMoney = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<typeof CONTACTS[0] | null>(
    location.state?.recipient ? { 
      id: location.state.recipient.id, 
      name: location.state.recipient.name, 
      phoneNumber: location.state.recipient.upiId || '',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(location.state.recipient.name)}&background=8B5CF6&color=fff`
    } : null
  );
  const [amount, setAmount] = useState(location.state?.amount || '');
  const [note, setNote] = useState('');
  const [step, setStep] = useState(selectedContact ? 2 : 1);
  const [isLoading, setIsLoading] = useState(false);

  const filteredContacts = CONTACTS.filter(
    contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phoneNumber.includes(searchQuery)
  );

  const handleContactSelect = (contact: typeof CONTACTS[0]) => {
    setSelectedContact(contact);
    setStep(2);
  };

  const handleSendMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > (user?.balance || 0)) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);
    
    // Create new transaction
    const newTransaction: Transaction = {
      id: 'tx' + Date.now(),
      type: 'send',
      amount: parseFloat(amount),
      name: selectedContact?.name || 'Unknown',
      date: new Date().toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      }),
      status: 'completed'
    };
    
    // Update user balance
    const newBalance = (user?.balance || 0) - parseFloat(amount);
    
    // Save transaction to localStorage
    const savedTransactions = localStorage.getItem('zappTransactions');
    const transactions = savedTransactions ? JSON.parse(savedTransactions) : [];
    transactions.unshift(newTransaction); // Add to beginning of array
    localStorage.setItem('zappTransactions', JSON.stringify(transactions));
    
    // Update user's balance
    if (user) {
      updateProfile({ balance: newBalance });
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`₹${amount} sent to ${selectedContact?.name} successfully`);
      setIsLoading(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Send Money</h1>
      
      {step === 1 ? (
        <Card>
          <CardHeader>
            <CardTitle>Select a recipient</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or phone number"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mt-4 space-y-2">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleContactSelect(contact)}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={contact.avatar} />
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.phoneNumber}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center">
                  <UserIcon className="h-10 w-10 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">No contacts found</p>
                  <Button className="mt-4" variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Contact
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <Avatar className="h-16 w-16 mx-auto">
              <AvatarImage src={selectedContact?.avatar} />
              <AvatarFallback>{selectedContact?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-2">{selectedContact?.name}</CardTitle>
            <p className="text-gray-500">{selectedContact?.phoneNumber}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-4">
              <Label htmlFor="amount" className="sr-only">Amount</Label>
              <div className="relative inline-block">
                <span className="absolute left-3 top-3 text-lg font-bold">₹</span>
                <Input
                  id="amount"
                  type="number"
                  className="pl-8 text-xl font-bold text-center"
                  placeholder="0"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">Available Balance: {user?.balance?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="note">Add a note (optional)</Label>
              <Input
                id="note"
                placeholder="What's this for?"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            
            <div className="space-y-2 pt-4">
              <Button 
                className="w-full"
                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                onClick={handleSendMoney}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                    Processing...
                  </span>
                ) : (
                  <>
                    <SendIcon className="h-4 w-4 mr-2" />
                    Pay ₹{amount || '0'}
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full" onClick={() => setStep(1)}>
                Change Recipient
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SendMoney;
