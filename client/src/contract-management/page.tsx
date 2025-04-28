import { useState } from "react";
import "./ContractManagement.css";
import {
  FaFileAlt,
  FaSearch,
  FaFilter,
  FaFilePdf,
  FaFileCsv,
  FaUpload,
  FaTrash,
  FaEdit,
  FaArchive,
} from "react-icons/fa";

export default function ContractManagementPage() {
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

  const exportarPDF = () => {
    // Aqui será implementada a lógica de exportação para PDF
    console.log("Exportando para PDF com filtros:", filtros);
    alert("Exportação para PDF iniciada!");
  };

  const exportarCSV = () => {
    // Aqui será implementada a lógica de exportação para CSV
    console.log("Exportando para CSV com filtros:", filtros);
    alert("Exportação para CSV iniciada!");
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
      <div className="gerenciamento-contratos-header">
        <h2>Gerenciamento de Contratos</h2>
        <p className="gerenciamento-contratos-desc">
          Gerencie seus contratos de forma eficiente e organizada.
        </p>
      </div>

      <div className="gerenciamento-contratos-tabs">
        <button
          className={activeTab === "ativos" ? "active" : ""}
          onClick={() => setActiveTab("ativos")}
        >
          Contratos Ativos
        </button>
        <button
          className={activeTab === "vencidos" ? "active" : ""}
          onClick={() => setActiveTab("vencidos")}
        >
          Contratos Vencidos
        </button>
        <button
          className={activeTab === "novo" ? "active" : ""}
          onClick={() => setActiveTab("novo")}
        >
          Novo Contrato
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
              <button className="btn-export" onClick={exportarPDF}>
                <FaFilePdf /> PDF
              </button>
              <button className="btn-export" onClick={exportarCSV}>
                <FaFileCsv /> CSV
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
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Tipo</th>
                  <th>Contratante</th>
                  <th>Valor</th>
                  <th>Início</th>
                  <th>Término</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>CT-2024-001</td>
                  <td>Público</td>
                  <td>Prefeitura Municipal</td>
                  <td>R$ 150.000,00</td>
                  <td>01/01/2024</td>
                  <td>31/12/2024</td>
                  <td>
                    <span className="status-active">Ativo</span>
                  </td>
                  <td>
                    <button className="btn-action" title="Editar">
                      <FaEdit />
                    </button>
                    <button className="btn-action" title="Arquivar">
                      <FaArchive />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>CT-2024-002</td>
                  <td>Privado</td>
                  <td>Empresa XYZ</td>
                  <td>R$ 75.000,00</td>
                  <td>15/01/2024</td>
                  <td>15/07/2024</td>
                  <td>
                    <span className="status-active">Ativo</span>
                  </td>
                  <td>
                    <button className="btn-action" title="Editar">
                      <FaEdit />
                    </button>
                    <button className="btn-action" title="Arquivar">
                      <FaArchive />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
