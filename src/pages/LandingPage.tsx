import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ZapIcon, CreditCardIcon, ShieldCheckIcon, SmartphoneIcon, UsersIcon, BuildingIcon, QrCodeIcon } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <WalletIcon className="h-10 w-10 text-zapp-purple" />,
      title: 'Secure Wallet',
      description: 'Store your money securely in your ZappPay wallet for quick and easy transactions.'
    },
    {
      icon: <QrCodeIcon className="h-10 w-10 text-zapp-purple" />,
      title: 'Scan & Pay',
      description: 'Simply scan QR codes to make instant payments to merchants or friends.'
    },
    {
      icon: <UsersIcon className="h-10 w-10 text-zapp-purple" />,
      title: 'Send Money',
      description: 'Send money to anyone instantly, regardless of their bank or wallet provider.'
    },
    {
      icon: <BuildingIcon className="h-10 w-10 text-zapp-purple" />,
      title: 'Bank Transfers',
      description: 'Link your bank accounts for seamless transfers to and from your ZappPay wallet.'
    },
    {
      icon: <SmartphoneIcon className="h-10 w-10 text-zapp-purple" />,
      title: 'Mobile Recharge',
      description: 'Recharge your mobile, pay bills, and more, all from one convenient app.'
    },
    {
      icon: <ShieldCheckIcon className="h-10 w-10 text-zapp-purple" />,
      title: 'Secure Payments',
      description: 'End-to-end encryption and two-factor authentication keep your transactions secure.'
    },
  ];
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ZapIcon className="h-6 w-6 text-zapp-purple" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-zapp-gradient">ZappPay</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-zapp-purple">Features</a>
            <a href="#security" className="text-gray-600 hover:text-zapp-purple">Security</a>
            <a href="#download" className="text-gray-600 hover:text-zapp-purple">Download</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Sign Up</Button>
          </div>
        </div>
      </header>
      
      {/* Hero */}
      <section className="relative">
        <div className="bg-zapp-gradient pt-20 pb-32 md:pb-40">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Fast, Secure & Seamless Payments
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Experience the future of digital transactions with ZappPay. Send money, pay bills, and make purchases - all in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-zapp-purple hover:bg-gray-100"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate('/login')}
              >
                Try Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Phone Mockup */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-24 md:-top-32 w-full max-w-md">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-zapp-purple p-4 text-white flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <ZapIcon className="h-5 w-5" />
                  <span className="font-semibold">ZappPay</span>
                </div>
                <span>9:41 AM</span>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <p className="text-gray-500 text-sm">Your Balance</p>
                  <p className="text-2xl font-bold">₹12,540.50</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <SendIcon className="h-5 w-5 mx-auto text-zapp-purple mb-1" />
                    <p className="text-xs">Send</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <QrCodeIcon className="h-5 w-5 mx-auto text-zapp-purple mb-1" />
                    <p className="text-xs">Scan</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                    <CreditCardIcon className="h-5 w-5 mx-auto text-zapp-purple mb-1" />
                    <p className="text-xs">Pay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="pt-44 md:pt-56 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features that Empower</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ZappPay comes packed with everything you need for a complete digital payment experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-zapp-purple/10 p-3 rounded-full w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Security */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bank-Grade Security</h2>
              <p className="text-lg text-gray-600 mb-6">
                Your security is our priority. ZappPay employs industry-leading security measures to protect your money and data.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">End-to-End Encryption</h4>
                    <p className="text-gray-600">All transactions are encrypted from end to end.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-gray-600">Additional layer of security for sensitive operations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <CheckIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Fraud Detection</h4>
                    <p className="text-gray-600">Advanced algorithms to detect and prevent suspicious activities.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-zapp-gradient p-8 rounded-xl text-white">
                <ShieldCheckIcon className="h-16 w-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Security Guarantee</h3>
                <p className="mb-6">
                  ZappPay guarantees the security of your transactions. Our multi-layered security approach ensures your money stays safe.
                </p>
                <div className="flex items-center space-x-2 text-white/80">
                  <LockIcon className="h-5 w-5" />
                  <span>PCI DSS Level 1 Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Download */}
      <section id="download" className="py-20 bg-zapp-gradient text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join millions of users who trust ZappPay for their digital payment needs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-zapp-purple hover:bg-gray-100"
              onClick={() => navigate('/register')}
            >
              Create Free Account
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate('/login')}
            >
              Login to ZappPay
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ZapIcon className="h-6 w-6 text-zapp-purple" />
                <span className="text-xl font-bold">ZappPay</span>
              </div>
              <p className="text-gray-400">
                Fast, secure, and seamless digital payments for everyone.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-medium mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <TwitterIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <InstagramIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <FacebookIcon className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <LinkedinIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© {new Date().getFullYear()} ZappPay. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <select className="bg-gray-800 text-gray-400 rounded px-2 py-1">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Additional icons for the landing page
const WalletIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" />
    <path d="M2 8v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8" />
    <circle cx="16" cy="12" r="1" />
  </svg>
);

const SendIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const LockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default LandingPage;
