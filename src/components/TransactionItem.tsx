
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'add';
  amount: number;
  name: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const { type, amount, name, date, status } = transaction;
  
  const iconMap = {
    send: <ArrowUpRight className="h-5 w-5 text-red-500" />,
    receive: <ArrowDownLeft className="h-5 w-5 text-green-500" />,
    add: <CreditCard className="h-5 w-5 text-blue-500" />
  };
  
  const amountPrefix = type === 'send' ? '- ₹' : '+ ₹';
  const amountColor = type === 'send' ? 'text-red-500' : 'text-green-500';
  
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-0">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-100 rounded-full">
          {iconMap[type]}
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={cn("font-semibold", amountColor)}>
          {amountPrefix}{amount.toFixed(2)}
        </p>
        <p className={cn("text-xs", {
          "text-green-500": status === 'completed',
          "text-yellow-500": status === 'pending',
          "text-red-500": status === 'failed'
        })}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;
