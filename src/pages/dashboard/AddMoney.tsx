
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  CreditCard, BuildingIcon, Wallet, AlertCircle, 
  CheckCircle2, ArrowRight, Banknote
} from 'lucide-react';

const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000];

const AddMoney = () => {
  const { user, addMoney } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleQuickAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleAddMoney = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsProcessing(true);

    try {
      // Call the addMoney function from AuthContext
      const success = await addMoney(parseFloat(amount));
      
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error('Failed to add money. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while processing your request');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderSuccessScreen = () => (
    <div className="py-6 text-center space-y-4">
      <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
        <CheckCircle2 className="w-12 h-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold">Money Added Successfully!</h2>
      <p className="text-gray-600">₹{amount} has been added to your ZappPay wallet</p>
      <Button 
        className="mt-4" 
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const renderAddMoneyForm = () => (
    <>
      <div className="mb-6">
        <Label htmlFor="amount" className="text-lg mb-2 block">Enter Amount</Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-lg font-bold">₹</span>
          <Input
            id="amount"
            type="number"
            className="pl-8 text-xl font-bold"
            placeholder="0"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {QUICK_AMOUNTS.map((value) => (
            <Button
              key={value}
              variant="outline"
              className="flex-1"
              onClick={() => handleQuickAmountSelect(value)}
            >
              ₹{value}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <Label className="text-lg mb-2 block">Payment Method</Label>
        <Tabs defaultValue="upi" onValueChange={setPaymentMethod}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="upi">UPI</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upi" className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-center text-gray-600">
                Use your favorite UPI app to add money to your wallet
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="card" className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-center text-gray-600">
                Add money using credit or debit card
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="bank" className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <p className="text-center text-gray-600">
                Add money directly from your bank account
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex items-center p-3 bg-orange-50 rounded-md mb-6">
        <AlertCircle className="text-orange-500 mr-2" />
        <p className="text-sm text-orange-700">
          For demo purposes, money will be added instantly without actual payment processing.
        </p>
      </div>
      
      <Button 
        className="w-full" 
        size="lg" 
        onClick={handleAddMoney}
        disabled={isProcessing || !amount || parseFloat(amount) <= 0}
      >
        {isProcessing ? (
          <>
            <span className="mr-2 animate-spin">●</span>
            Processing...
          </>
        ) : (
          <>
            <Banknote className="mr-2 h-4 w-4" />
            Add ₹{amount || '0'}
          </>
        )}
      </Button>
    </>
  );

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Money</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Add Money to Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          {isSuccess ? renderSuccessScreen() : renderAddMoneyForm()}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMoney;
