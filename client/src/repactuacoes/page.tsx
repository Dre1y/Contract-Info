import React, { useState } from "react";
import {
  FaHome,
  FaListUl,
  FaChartBar,
  FaFileAlt,
  FaTimes,
  FaCheck,
  FaClock,
} from "react-icons/fa";
import { useRepactuacoes } from "./RepactuacoesContext";
import RelatoriosPage from "../relatorios/page";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const menuItems = [
  { label: "Início", icon: <FaHome /> },
  { label: "Repactuações", icon: <FaListUl /> },
  { label: "Relatórios", icon: <FaChartBar /> },
  { label: "Documentos", icon: <FaFileAlt /> },
];

interface Repactuacao {
  id: number;
  cpfCnpj: string;
  numeroContrato: string;
  valorDivida: string;
  novaData: string;
  status: string;
}

function maskCpfCnpj(value: string) {
  // Remove tudo que não for número
  value = value.replace(/\D/g, "");
  if (value.length <= 11) {
    // CPF: 111.111.111-11
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // CNPJ: 11.111.111/1111-11
    value = value.replace(/(\d{2})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1/$2");
    value = value.replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
  return value;
}

function maskOnlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function maskBRL(value: string) {
  // Remove tudo que não for número
  value = value.replace(/\D/g, "");
  if (!value) return "";
  // Converte para centavos
  let intValue = parseInt(value, 10);
  let formatted = (intValue / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatted;
}

const RepactuacoesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    cpfCnpj: "",
    numeroContrato: "",
    valorDivida: "",
    novaData: "",
  });
  const { repactuacoes, setRepactuacoes } = useRepactuacoes();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cpfCnpj") {
      setForm({ ...form, [name]: maskCpfCnpj(value) });
    } else if (name === "numeroContrato") {
      setForm({ ...form, [name]: maskOnlyNumbers(value) });
    } else if (name === "valorDivida") {
      setForm({ ...form, [name]: maskBRL(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRepactuacoes((prev) => [
      ...prev,
      {
        id: Date.now(),
        cpfCnpj: form.cpfCnpj,
        numeroContrato: form.numeroContrato,
        valorDivida: form.valorDivida,
        novaData: form.novaData,
        status: "Em Andamento",
      },
    ]);
    setForm({ cpfCnpj: "", numeroContrato: "", valorDivida: "", novaData: "" });
    setActiveTab(1); // Vai para a aba Repactuações após cadastrar
    toast.success("Repactuação cadastrada com sucesso!");
  };

  const handleDelete = (id: number) => {
    setRepactuacoes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Repactuação excluída com sucesso!");
  };

  const handleConcluir = (id: number) => {
    setRepactuacoes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Concluído" } : r))
    );
    toast.success("Repactuação concluída com sucesso!");
  };

  const handleAtrasado = (id: number) => {
    setRepactuacoes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Atrasado" } : r))
    );
    toast.info("Repactuação marcada como atrasada!");
  };

  // Filtros e contadores
  const filteredRepactuacoes = repactuacoes.filter(
    (r) => r.cpfCnpj.includes(search) || r.numeroContrato.includes(search)
  );
  const total = repactuacoes.length;
  const emAndamento = repactuacoes.filter(
    (r) => r.status === "Em Andamento"
  ).length;
  const atrasados = repactuacoes.filter((r) => r.status === "Atrasado").length;
  const concluidos = repactuacoes.filter(
    (r) => r.status === "Concluído"
  ).length;

  return (
    <div style={{ margin: "0 auto", padding: 24 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Caixa do título + menu */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "24px 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
          Gerenciamento de repactuação
        </h1>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: 32,
              margin: 0,
              padding: 0,
              listStyle: "none",
              alignItems: "center",
            }}
          >
            {menuItems.map((item, idx) => (
              <li
                key={item.label}
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 10,
                    background: activeTab === idx ? "#007bff" : "transparent",
                    color: activeTab === idx ? "#fff" : "#555",
                    fontWeight: activeTab === idx ? 600 : 500,
                    fontSize: 17,
                    textDecoration: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Conteúdo das abas */}
      {activeTab === 0 && (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600 }}>CPF/CNPJ</label>
              <input
                type="text"
                name="cpfCnpj"
                value={form.cpfCnpj}
                onChange={handleChange}
                placeholder="Digite o CPF ou CNPJ"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                  marginTop: 6,
                }}
                maxLength={18}
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600 }}>Número do Contrato</label>
              <input
                type="text"
                name="numeroContrato"
                value={form.numeroContrato}
                onChange={handleChange}
                placeholder="Digite o número do contrato"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                  marginTop: 6,
                }}
                inputMode="numeric"
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600 }}>Valor da Dívida</label>
              <input
                type="text"
                name="valorDivida"
                value={form.valorDivida}
                onChange={handleChange}
                placeholder="Digite o valor da dívida"
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                  marginTop: 6,
                }}
                inputMode="numeric"
                required
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontWeight: 600 }}>Nova Data de Vencimento</label>
              <input
                type="date"
                name="novaData"
                value={form.novaData}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 6,
                  border: "1px solid #ddd",
                  marginTop: 6,
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#007bff",
                color: "#fff",
                fontWeight: 600,
                fontSize: 18,
                border: "none",
                borderRadius: 6,
                padding: "14px 0",
                marginTop: 12,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              Solicitar Repactuação
            </button>
          </form>
        </div>
      )}
      {activeTab === 1 && (
        <>
          {/* Cards de status */}
          <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "#7b7b7b", fontSize: 18, marginBottom: 12 }}
              >
                Total de Repactuações
              </span>
              <span style={{ color: "#232b36", fontWeight: 700, fontSize: 38 }}>
                {total}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "#7b7b7b", fontSize: 18, marginBottom: 12 }}
              >
                Em Andamento
              </span>
              <span style={{ color: "#232b36", fontWeight: 700, fontSize: 38 }}>
                {emAndamento}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "#7b7b7b", fontSize: 18, marginBottom: 12 }}
              >
                Atrasados
              </span>
              <span style={{ color: "#232b36", fontWeight: 700, fontSize: 38 }}>
                {atrasados}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                background: "#fff",
                borderRadius: 20,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                padding: 32,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{ color: "#7b7b7b", fontSize: 18, marginBottom: 12 }}
              >
                Concluídos
              </span>
              <span style={{ color: "#232b36", fontWeight: 700, fontSize: 38 }}>
                {concluidos}
              </span>
            </div>
          </div>
          {/* Lista de repactuações */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              padding: 32,
              marginBottom: 32,
            }}
          >
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                margin: 0,
                marginBottom: 24,
              }}
            >
              Lista de Repactuações
            </h2>
            <input
              type="text"
              placeholder="Buscar por contrato ou CPF/CNPJ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 6,
                border: "1px solid #ddd",
                marginBottom: 24,
                fontSize: 16,
              }}
            />
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 0,
                  background: "transparent",
                }}
              >
                <thead>
                  <tr style={{ background: "#f8fbfc" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        color: "#232b36",
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      Contrato
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        color: "#232b36",
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      CPF/CNPJ
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        color: "#232b36",
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      Valor
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        color: "#232b36",
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      Data de Vencimento
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        color: "#232b36",
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "16px 18px",
                        color: "#232b36",
                        fontWeight: 600,
                        fontSize: 17,
                      }}
                    >
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRepactuacoes.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        style={{
                          textAlign: "center",
                          padding: 32,
                          color: "#7b7b7b",
                          fontSize: 18,
                        }}
                      >
                        Nenhuma repactuação encontrada
                      </td>
                    </tr>
                  ) : (
                    filteredRepactuacoes.map((r) => (
                      <tr key={r.id}>
                        <td style={{ padding: "16px 18px" }}>
                          {r.numeroContrato}
                        </td>
                        <td style={{ padding: "16px 18px" }}>{r.cpfCnpj}</td>
                        <td style={{ padding: "16px 18px" }}>
                          {r.valorDivida}
                        </td>
                        <td style={{ padding: "16px 18px" }}>{r.novaData}</td>
                        <td style={{ padding: "16px 18px" }}>{r.status}</td>
                        <td
                          style={{
                            padding: "16px 18px",
                            display: "flex",
                            gap: 8,
                          }}
                        >
                          <button
                            title="Concluir"
                            onClick={() => handleConcluir(r.id)}
                            disabled={r.status === "Concluído"}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor:
                                r.status === "Concluído"
                                  ? "not-allowed"
                                  : "pointer",
                              color: "#27ae60",
                              fontSize: 18,
                              opacity: r.status === "Concluído" ? 0.5 : 1,
                            }}
                          >
                            <FaCheck />
                          </button>
                          <button
                            title="Marcar como Atrasado"
                            onClick={() => handleAtrasado(r.id)}
                            disabled={r.status === "Atrasado"}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor:
                                r.status === "Atrasado"
                                  ? "not-allowed"
                                  : "pointer",
                              color: "#f39c12",
                              fontSize: 18,
                              opacity: r.status === "Atrasado" ? 0.5 : 1,
                            }}
                          >
                            <FaClock />
                          </button>
                          <button
                            title="Excluir"
                            onClick={() => handleDelete(r.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: "#e74c3c",
                              fontSize: 18,
                            }}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {activeTab === 2 && (
        <div style={{ marginTop: 24 }}>
          <RelatoriosPage />
        </div>
      )}
      {activeTab !== 0 && activeTab !== 1 && activeTab !== 2 && (
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            padding: 32,
            minHeight: 300,
          }}
        />
      )}
    </div>
  );
};

export default RepactuacoesPage;
