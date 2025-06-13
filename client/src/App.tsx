
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContractProvider } from "./contexts/ContractContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Colaboradores from "./pages/Colaboradores";
import Empresas from "./pages/Empresas";
import Contratos from "./pages/Contratos";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ContractProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* todas as outras rotas ficam dentro do Layout */}
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/colaboradores" element={<Colaboradores />} />
                    <Route path="/empresas" element={<Empresas />} />
                    <Route path="/contratos" element={<Contratos />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ContractProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
