import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AdditivesPage from "./additives/page";
import ContractManagementPage from "./contract-management/page";
import RelatoriosPage from "./relatorios/page";
import RepactuacoesPage from "./repactuacoes/page";
import { RepactuacoesProvider } from "./repactuacoes/RepactuacoesContext";
import EntregaveisPage from "./components/Entregaveis/EntregaveisPage";
import Login from "./pages/Login";
import OrdensServicoPage from "./components/OrdensServico/OrdensServicoPage";
import PostosServicoPage from "./components/PostosServico/PostosServicoPage";
import Dashboard from "./pages/Dashboard";

// Componente para rotas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Aqui você pode implementar sua lógica de autenticação
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

// Componente para logout
function Logout() {
  const navigate = useNavigate();
  React.useEffect(() => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);
  return null;
}

function App() {
  return (
    <RepactuacoesProvider>
      <Router>
            <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sair" element={<Logout />} />
              <Route
                path="/"
                element={
              <ProtectedRoute>
                  <>
                    <h1>Bem-vindo ao GetInfo</h1>
                    <p>
                      O GetInfo é uma ferramenta de gerenciamento de contratos e
                      aditivos, desenvolvida para facilitar o acompanhamento e a
                      organização de informações relevantes. Com uma interface
                      intuitiva e recursos avançados, o GetInfo permite que você
                      gerencie seus contratos e aditivos de forma eficiente e
                      prática.
                    </p>
                  </>
              </ProtectedRoute>
                }
              />
          <Route
            path="/aditivos"
            element={
              <ProtectedRoute>
                <AdditivesPage />
              </ProtectedRoute>
            }
          />
              <Route
                path="/gerenciamento-contratos"
            element={
              <ProtectedRoute>
                <ContractManagementPage />
              </ProtectedRoute>
            }
              />
          <Route
            path="/entregaveis"
            element={
              <ProtectedRoute>
                <EntregaveisPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <RelatoriosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/repactuacoes"
            element={
              <ProtectedRoute>
                <RepactuacoesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ordens-servico"
            element={
              <ProtectedRoute>
                <OrdensServicoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postos-servico"
            element={
              <ProtectedRoute>
                <PostosServicoPage />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
      </Router>
    </RepactuacoesProvider>
  );
}

export default App;
