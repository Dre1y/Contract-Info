import { useState } from "react";
import "./ContractManagement.css";
import { FaSearch, FaFilter } from "react-icons/fa";
import ContractTable from "@/components/ContractTable/ContractTable";
import { useContractData } from "@/hooks/useContractData";
import CreateContractModal from "@/components/CreateContractModal/CreateContractModal";

export default function ContractManagementPage() {
  const { data } = useContractData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ativos");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tipo: "",
    dataInicio: "",
    dataFim: "",
    valor: "",
    contratante: "",
    cnpj: "",
    entregaveis: "",
    documentos: [],
  });

  const [filtros, setFiltros] = useState({
    tipo: "",
    status: "",
    dataInicio: "",
    dataFim: "",
    contratante: "",
    valorMin: "",
    valorMax: "",
  });

  const [showFiltros, setShowFiltros] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      documentos: [...prev.documentos, ...files],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  const aplicarFiltros = () => {
    console.log("Aplicando filtros:", filtros);
    setShowFiltros(false);
  };

  const limparFiltros = () => {
    setFiltros({
      tipo: "",
      status: "",
      dataInicio: "",
      dataFim: "",
      contratante: "",
      valorMin: "",
      valorMax: "",
    });
    setShowFiltros(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="gerenciamento-contratos-page">
      <div className="gerenciamento-contratos-tabs">
        <button onClick={handleOpenModal}>Cadastrar Contrato</button>
      </div>

      {(activeTab === "ativos" || activeTab === "vencidos") && (
        <div className="gerenciamento-contratos-list">
          <div className="list-header">
            <div className="search-box">
              <FaSearch />
              <input type="text" placeholder="Buscar contratos..." />
            </div>
            <div className="filters">
              <button
                className="btn-filter"
                onClick={() => setShowFiltros(!showFiltros)}
              >
                <FaFilter /> Filtrar
              </button>
            </div>
          </div>

          {showFiltros && (
            <div className="filtros-modal">
              <div className="filtros-content">
                <h3>Filtros Avançados</h3>
                <div className="filtros-grid">
                  <div className="form-group">
                    <label>Tipo de Contrato</label>
                    <select
                      name="tipo"
                      value={filtros.tipo}
                      onChange={handleFiltroChange}
                    >
                      <option value="">Todos</option>
                      <option value="publico">Público</option>
                      <option value="privado">Privado</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      value={filtros.status}
                      onChange={handleFiltroChange}
                    >
                      <option value="">Todos</option>
                      <option value="ativo">Ativo</option>
                      <option value="vencido">Vencido</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Data Início</label>
                    <input
                      type="date"
                      name="dataInicio"
                      value={filtros.dataInicio}
                      onChange={handleFiltroChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Data Fim</label>
                    <input
                      type="date"
                      name="dataFim"
                      value={filtros.dataFim}
                      onChange={handleFiltroChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Contratante</label>
                    <input
                      type="text"
                      name="contratante"
                      value={filtros.contratante}
                      onChange={handleFiltroChange}
                      placeholder="Nome do contratante"
                    />
                  </div>

                  <div className="form-group">
                    <label>Valor Mínimo</label>
                    <input
                      type="number"
                      name="valorMin"
                      value={filtros.valorMin}
                      onChange={handleFiltroChange}
                      placeholder="R$ 0,00"
                    />
                  </div>

                  <div className="form-group">
                    <label>Valor Máximo</label>
                    <input
                      type="number"
                      name="valorMax"
                      value={filtros.valorMax}
                      onChange={handleFiltroChange}
                      placeholder="R$ 0,00"
                    />
                  </div>
                </div>

                <div className="filtros-actions">
                  <button className="btn-primary" onClick={aplicarFiltros}>
                    Aplicar Filtros
                  </button>
                  <button className="btn-secondary" onClick={limparFiltros}>
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="contracts-table">
            {data && data.length > 0 ? (
              <ContractTable data={data} />
            ) : (
              <div className="sem-contratos-msg">
                <p>Nenhum contrato registrado no momento.</p>
              </div>
            )}
          </div>

          {isModalOpen && <CreateContractModal closeModal={handleOpenModal} />}
        </div>
      )}
    </div>
  );
}
