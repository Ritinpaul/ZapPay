import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TransactionItem, { Transaction } from '@/components/TransactionItem';
import { SearchIcon, DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionType, setTransactionType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch transactions from localStorage
    const fetchTransactions = async () => {
      setIsLoading(true);
      
      // Get transactions from localStorage
      const savedTransactions = localStorage.getItem('zappTransactions');
      
      if (savedTransactions) {
        const loadedTransactions = JSON.parse(savedTransactions);
        setTransactions(loadedTransactions);
        setFilteredTransactions(loadedTransactions);
      } else {
        // If no transactions exist, initialize with empty array
        localStorage.setItem('zappTransactions', JSON.stringify([]));
        setTransactions([]);
        setFilteredTransactions([]);
      }
      
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    let result = transactions;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(tx => 
        tx.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by transaction type
    if (transactionType !== 'all') {
      result = result.filter(tx => tx.type === transactionType);
    }
    
    setFilteredTransactions(result);
  }, [searchQuery, transactionType, transactions]);

  const handleDownloadStatement = () => {
    toast.success('Transaction statement downloaded');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Button variant="outline" size="sm" onClick={handleDownloadStatement}>
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select
                value={transactionType}
                onValueChange={setTransactionType}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Transactions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="send">Money Sent</SelectItem>
                  <SelectItem value="receive">Money Received</SelectItem>
                  <SelectItem value="add">Added Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="incoming">Incoming</TabsTrigger>
                <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {renderTransactionsList(filteredTransactions, isLoading)}
              </TabsContent>
              
              <TabsContent value="incoming">
                {renderTransactionsList(
                  filteredTransactions.filter(tx => tx.type === 'receive'),
                  isLoading
                )}
              </TabsContent>
              
              <TabsContent value="outgoing">
                {renderTransactionsList(
                  filteredTransactions.filter(tx => tx.type === 'send'),
                  isLoading
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to render transactions list
const renderTransactionsList = (transactions: Transaction[], isLoading: boolean) => {
  if (isLoading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zapp-purple"></div>
      </div>
    );
  }
  
  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }
  
  return (
    <div className="border rounded-md mt-4">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
};

export default Transactions;
