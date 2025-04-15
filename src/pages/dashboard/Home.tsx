
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TransactionItem, { Transaction } from '@/components/TransactionItem';
import { PlusCircle, SendIcon, QrCodeIcon, ArrowRight } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch transactions from localStorage
    const fetchTransactions = async () => {
      setIsLoading(true);
      
      // Get transactions from localStorage
      const savedTransactions = localStorage.getItem('zappTransactions');
      
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        // If no transactions exist, initialize with empty array
        localStorage.setItem('zappTransactions', JSON.stringify([]));
      }
      
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  const formattedBalance = user?.balance?.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }) || '₹0.00';

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="bg-white overflow-hidden">
        <div className="bg-zapp-gradient p-6 rounded-t-xl">
          <p className="text-white/80 text-sm">Total Balance</p>
          <h2 className="text-3xl font-bold text-white mt-1">{formattedBalance}</h2>
          
          <div className="flex justify-center mt-4 space-x-4">
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-none"
              onClick={() => navigate('/add-money')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Money
            </Button>
            
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-none"
              onClick={() => navigate('/send-money')}
            >
              <SendIcon className="h-4 w-4 mr-2" />
              Send Money
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="p-4 grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 text-zapp-dark-gray"
            onClick={() => navigate('/scan')}
          >
            <QrCodeIcon className="h-6 w-6 mb-2 text-zapp-purple" />
            <span>Scan & Pay</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col items-center justify-center h-24 text-zapp-dark-gray"
            onClick={() => navigate('/send-money')}
          >
            <SendIcon className="h-6 w-6 mb-2 text-zapp-blue" />
            <span>Send to Contact</span>
          </Button>
        </div>
      </Card>
      
      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
          <Button 
            variant="ghost" 
            className="text-zapp-purple font-medium" 
            onClick={() => navigate('/transactions')}
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zapp-purple"></div>
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">No transactions yet</p>
            </div>
          ) : (
            <div>
              {transactions.slice(0, 3).map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
