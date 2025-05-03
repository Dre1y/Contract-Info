import { useState } from "react";
import "./ContractManagement.css";
import { FaFileAlt, FaSearch, FaFilter, FaUpload } from "react-icons/fa";
import ContractTable from "@/components/ContractTable/ContractTable";
import { useContractData } from "@/hooks/useContractData";

export default function ContractManagementPage() {
  const { data } = useContractData();
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
    // Aqui será implementada a lógica de envio
    console.log("Dados do formulário:", formData);
  };

  const aplicarFiltros = () => {
    // Aqui será implementada a lógica de filtragem
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

  return (
    <div className="gerenciamento-contratos-page">
      <div className="gerenciamento-contratos-tabs">
        <button
          className={activeTab === "novo" ? "active" : ""}
          onClick={() => setActiveTab("novo")}
        >
          Cadastrar Contrato
        </button>
      </div>

      {activeTab === "novo" && (
        <div className="gerenciamento-contratos-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tipo de Contrato*</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
              </select>
            </div>

            <div className="form-group">
              <label>Contratante*</label>
              <input
                type="text"
                name="contratante"
                value={formData.contratante}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>CNPJ*</label>
              <input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleInputChange}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Data de Início*</label>
                <input
                  type="date"
                  name="dataInicio"
                  value={formData.dataInicio}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Data de Término*</label>
                <input
                  type="date"
                  name="dataFim"
                  value={formData.dataFim}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Valor do Contrato*</label>
              <input
                type="text"
                name="valor"
                value={formData.valor}
                onChange={handleInputChange}
                placeholder="R$ 0,00"
                required
              />
            </div>

            <div className="form-group">
              <label>Entregáveis*</label>
              <textarea
                name="entregaveis"
                value={formData.entregaveis}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Documentos Anexos</label>
              <div className="file-upload">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg"
                  onChange={handleFileUpload}
                />
                <FaUpload className="upload-icon" />
                <span>Arraste arquivos ou clique para selecionar</span>
              </div>
              {formData.documentos.length > 0 && (
                <div className="uploaded-files">
                  {formData.documentos.map((file, index) => (
                    <div key={index} className="file-item">
                      <FaFileAlt />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Salvar Contrato
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setActiveTab("ativos")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

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
            <div className="container">
              <div className="card-grid">
                {data && <ContractTable data={data} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
