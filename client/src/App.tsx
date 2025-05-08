import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AdditivesPage from "./additives/page";
import ContractManagementPage from "./contract-management/page";
import RelatoriosPage from "./relatorios/page";
import RepactuacoesPage from "./repactuacoes/page";
import { RepactuacoesProvider } from "./repactuacoes/RepactuacoesContext";
import EntregaveisPage from "./components/Entregaveis/EntregaveisPage";

function App() {
  return (
    <RepactuacoesProvider>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route
                path="/"
                element={
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
                }
              />
              <Route path="/aditivos" element={<AdditivesPage />} />
              <Route
                path="/gerenciamento-contratos"
                element={<ContractManagementPage />}
              />
              <Route path="/entregaveis" element={<EntregaveisPage />} />
              <Route path="/relatorios" element={<RelatoriosPage />} />
              <Route path="/repactuacoes" element={<RepactuacoesPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RepactuacoesProvider>
  );
}

export default App;
