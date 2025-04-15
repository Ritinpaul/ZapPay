import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/layouts/AuthLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";

// Auth pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard pages
import Home from "./pages/dashboard/Home";
import SendMoney from "./pages/dashboard/SendMoney";
import Transactions from "./pages/dashboard/Transactions";
import Profile from "./pages/dashboard/Profile";
import ScanQR from "./pages/dashboard/ScanQR";
import AddMoney from "./pages/dashboard/AddMoney";

// Others
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";

// Context provider
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* Protected dashboard routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Home />} />
              <Route path="/send-money" element={<SendMoney />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/scan" element={<ScanQR />} />
              <Route path="/add-money" element={<AddMoney />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
