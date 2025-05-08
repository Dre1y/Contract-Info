import React from "react";
import { useRepactuacoes } from "../repactuacoes/RepactuacoesContext";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Funções utilitárias para cálculos
function parseBRL(value: string) {
  // Remove R$, pontos e vírgulas, converte para float
  return parseFloat(value.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
}

function getMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.getMonth();
}

const meses = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const RelatoriosPage: React.FC = () => {
  const { repactuacoes } = useRepactuacoes();

  // Cálculos dos cards
  const total = repactuacoes.length;
  const pendentes = repactuacoes.filter(
    (r) => r.status === "Em Andamento"
  ).length;
  const aprovadas = repactuacoes.filter((r) => r.status === "Concluído").length;
  const atrasadas = repactuacoes.filter((r) => r.status === "Atrasado").length;
  const valorTotal = repactuacoes.reduce(
    (acc, r) => acc + parseBRL(r.valorDivida),
    0
  );
  const media = total ? valorTotal / total : 0;

  // Repactuações por mês
  const porMes = Array(12).fill(0);
  repactuacoes.forEach((r) => {
    if (r.novaData) {
      const mes = getMonth(r.novaData);
      porMes[mes]++;
    }
  });

  // Dados para gráfico de status
  const statusData = [aprovadas, pendentes, atrasadas];
  const statusLabels = ["Aprovadas", "Pendentes", "Atrasadas"];
  const statusColors = ["#7be3a7", "#ffe082", "#ffb3b3"];

  const exportExcel = () => {
    const wsData = [
      ["Contrato", "CPF/CNPJ", "Valor", "Data de Vencimento", "Status"],
      ...repactuacoes.map((r) => [
        r.numeroContrato,
        r.cpfCnpj,
        r.valorDivida,
        r.novaData,
        r.status,
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Repactuações");
    XLSX.writeFile(wb, "repactuacoes.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Repactuações", 14, 18);
    autoTable(doc, {
      startY: 24,
      head: [["Contrato", "CPF/CNPJ", "Valor", "Data de Vencimento", "Status"]],
      body: repactuacoes.map((r) => [
        r.numeroContrato,
        r.cpfCnpj,
        r.valorDivida,
        r.novaData,
        r.status,
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 123, 255] },
    });
    doc.save("repactuacoes.pdf");
  };

  return (
    <div style={{ padding: 32, minHeight: "100vh" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        Relatórios
      </h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <button
          onClick={exportPDF}
          style={{
            background: "#ff5a5f",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 22px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Exportar PDF
        </button>
        <button
          onClick={exportExcel}
          style={{
            background: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 22px",
            fontWeight: 600,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          Exportar Excel
        </button>
      </div>
      <div
        style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 32 }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#7b7b7b", fontSize: 16 }}>
            Total de Repactuações
          </div>
          <div style={{ color: "#232b36", fontWeight: 700, fontSize: 28 }}>
            {total}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#7b7b7b", fontSize: 16 }}>
            Repactuações Pendentes
          </div>
          <div style={{ color: "#007bff", fontWeight: 700, fontSize: 28 }}>
            {pendentes}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#7b7b7b", fontSize: 16 }}>
            Repactuações Aprovadas
          </div>
          <div style={{ color: "#27ae60", fontWeight: 700, fontSize: 28 }}>
            {aprovadas}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#7b7b7b", fontSize: 16 }}>
            Repactuações Atrasadas
          </div>
          <div style={{ color: "#e74c3c", fontWeight: 700, fontSize: 28 }}>
            {atrasadas}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#7b7b7b", fontSize: 16 }}>Valor Total</div>
          <div style={{ color: "#007bff", fontWeight: 700, fontSize: 24 }}>
            R${" "}
            {valorTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "#fff",
            borderRadius: 10,
            padding: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ color: "#7b7b7b", fontSize: 16 }}>
            Média por Repactuação
          </div>
          <div style={{ color: "#007bff", fontWeight: 700, fontSize: 24 }}>
            R$ {media.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          marginBottom: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 18 }}>
          Repactuações por Mês
        </h2>
        {/* Placeholder para gráfico de barras */}
        <div
          style={{
            width: "100%",
            height: 260,
            display: "flex",
            alignItems: "flex-end",
            gap: 16,
          }}
        >
          {porMes.slice(0, 6).map((qtd, idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: `${qtd * 12}px`,
                  width: 36,
                  background: "#7ecbff",
                  borderRadius: 6,
                  marginBottom: 8,
                  transition: "height 0.3s",
                }}
              ></div>
              <span style={{ color: "#7b7b7b", fontSize: 15 }}>
                {meses[idx]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 18 }}>
          Status das Repactuações
        </h2>
        {/* Placeholder para gráfico de pizza */}
        <div
          style={{
            width: 400,
            height: 300,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Gráfico de pizza simples em SVG */}
          <svg width="100%" height="100%" viewBox="0 0 400 300">
            {(() => {
              const totalStatus = statusData.reduce((a, b) => a + b, 0) || 1;
              let startAngle = 0;
              return statusData.map((val, i) => {
                const angle = (val / totalStatus) * 360;
                const large = angle > 180 ? 1 : 0;
                const r = 120;
                const x1 = 200 + r * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 150 + r * Math.sin((Math.PI * startAngle) / 180);
                const x2 =
                  200 + r * Math.cos((Math.PI * (startAngle + angle)) / 180);
                const y2 =
                  150 + r * Math.sin((Math.PI * (startAngle + angle)) / 180);
                const d = `M200,150 L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`;
                const el = (
                  <path
                    key={i}
                    d={d}
                    fill={statusColors[i]}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
                startAngle += angle;
                return el;
              });
            })()}
          </svg>
          {/* Legenda */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 18,
            }}
          >
            {statusLabels.map((label, i) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 16,
                    height: 16,
                    background: statusColors[i],
                    borderRadius: 4,
                  }}
                ></span>
                <span style={{ color: "#232b36", fontSize: 15 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatoriosPage;
