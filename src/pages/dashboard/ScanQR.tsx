
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { QrCodeIcon, CameraIcon, ImageIcon, RefreshCwIcon } from 'lucide-react';
import { Transaction } from '@/components/TransactionItem';
import { useAuth } from '@/context/AuthContext';

const ScanQR = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Simulate checking for camera permission
    const checkCameraPermission = async () => {
      try {
        // In a real app, would check for camera permissions
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error checking camera permission:', error);
        setHasCameraPermission(false);
      }
    };
    
    checkCameraPermission();
  }, []);
  
  const createTransaction = (merchantName: string, amount: string) => {
    // Only create transaction if there's an amount
    if (!amount) return;
    
    const numAmount = parseFloat(amount);
    
    // Create new transaction
    const newTransaction: Transaction = {
      id: 'tx' + Date.now(),
      type: 'send',
      amount: numAmount,
      name: merchantName,
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
    transactions.unshift(newTransaction); // Add to beginning of array
    localStorage.setItem('zappTransactions', JSON.stringify(transactions));
  };
  
  const handleStartScanning = () => {
    setIsScanning(true);
    setSelectedImage(null);
    
    // Simulate successful QR code scan after 3 seconds
    setTimeout(() => {
      setIsScanning(false);
      
      // Create mock payment details
      const mockPaymentDetails = {
        recipient: {
          id: 'user123',
          name: 'Coffee Shop',
          upiId: 'coffeeshop@ybl'
        },
        amount: '120.00'
      };
      
      // Create transaction (would normally happen after payment is completed)
      createTransaction(mockPaymentDetails.recipient.name, mockPaymentDetails.amount);
      
      toast.success('QR code scanned successfully');
      navigate('/send-money', { state: mockPaymentDetails });
    }, 3000);
  };
  
  const handleUploadQRCode = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        
        // Simulate QR code processing
        toast.info('Processing QR code...');
        
        // Simulate successful QR code processing after 2 seconds
        setTimeout(() => {
          const mockPaymentDetails = {
            recipient: {
              id: 'user456',
              name: 'Online Store',
              upiId: 'store@ybl'
            },
            amount: ''  // No predefined amount for uploaded QR
          };
          
          toast.success('QR code processed successfully');
          navigate('/send-money', { state: mockPaymentDetails });
        }, 2000);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const handleRequestPermission = async () => {
    try {
      // In a real app, would request camera permission
      setHasCameraPermission(true);
      toast.success('Camera permission granted');
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      toast.error('Could not get camera permission');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Scan QR Code</h1>
      
      <Card className="w-full">
        <CardContent className="p-6">
          {hasCameraPermission === false ? (
            <div className="text-center py-8 space-y-4">
              <CameraIcon className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="text-lg font-medium">Camera access required</h3>
              <p className="text-gray-500">
                Please allow camera access to scan QR codes
              </p>
              <Button onClick={handleRequestPermission}>
                Allow Camera Access
              </Button>
            </div>
          ) : (
            <>
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                {isScanning ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* QR viewfinder */}
                      <div className="w-48 h-48 border-2 border-zapp-purple rounded-lg relative">
                        {/* Corner markers */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zapp-purple"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-zapp-purple"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-zapp-purple"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zapp-purple"></div>
                      </div>
                      
                      {/* Scan animation */}
                      <div className="absolute top-0 left-0 w-48 h-1 bg-zapp-purple opacity-80 animate-[scan_2s_linear_infinite]"></div>
                    </div>
                  </div>
                ) : selectedImage ? (
                  <img 
                    src={selectedImage} 
                    alt="Uploaded QR Code" 
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <QrCodeIcon className="h-16 w-16 text-gray-400" />
                    <p className="text-gray-500 mt-4">Tap to scan a QR code</p>
                  </div>
                )}
              </div>
              
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <div className="space-y-3">
                {isScanning ? (
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => setIsScanning(false)}
                  >
                    <RefreshCwIcon className="h-4 w-4 mr-2" />
                    Cancel Scanning
                  </Button>
                ) : (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={handleStartScanning}
                    >
                      <CameraIcon className="h-4 w-4 mr-2" />
                      Start Scanning
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleUploadQRCode}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload QR Code
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      <p className="text-sm text-gray-500 mt-6 text-center">
        Scan any UPI QR code to make instant payments to merchants or individuals
      </p>
    </div>
  );
};

export default ScanQR;
