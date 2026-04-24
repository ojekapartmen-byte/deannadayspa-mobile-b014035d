import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminBookings from "./pages/admin/AdminBookings.tsx";
import AdminContent from "./pages/admin/AdminContent.tsx";
import AdminPremium from "./pages/admin/AdminPremium.tsx";
import AdminPamper from "./pages/admin/AdminPamper.tsx";
import AdminHero from "@/pages/admin/AdminHero";
import AdminBrochure from "@/pages/admin/AdminBrochure";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="premium" element={<AdminPremium />} />
              <Route path="pamper" element={<AdminPamper />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="hero" element={<AdminHero />} />
              <Route path="brochure" element={<AdminBrochure />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
