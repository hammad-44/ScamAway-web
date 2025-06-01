import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Your existing ProtectedRoute
import { useState,useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ReportScam from "./pages/ReportScam";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CheckWebsite from "./pages/CheckWebsite";
import SafetyTips from "./pages/SafetyTips";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Results from "./pages/Results";
import Disclaimer from "./pages/Disclaimer";
import AdminPage from "./pages/AdminPage";

import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth

const queryClient = new QueryClient();

// New AdminProtectedRoute component
const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        if (user.email === 'admin@gmail.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
      setLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (loadingAuth) {
    return <div>Loading authentication...</div>;
  }

  if (isAuthenticated && isAdmin) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};


const App = () => (
  <AuthProvider >
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminPage />
              </AdminProtectedRoute>
            }
          />
          <Route path="/report" element={<ReportScam />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/check" element={<CheckWebsite />} />
          <Route path="/tips" element={<SafetyTips />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/results" element={<Results />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthProvider>
);

export default App;
