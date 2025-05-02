import { useState } from "react";
import "./Additives.css";
import { FaCheck, FaTimes, FaHistory, FaBell } from "react-icons/fa";

const aditivosExemplo = [];

export default function AdditivesPage() {
  const [aditivos, setAditivos] = useState(aditivosExemplo);
  const [form, setForm] = useState({
    motivo: "",
    valor: "",
    prazo: "",
    responsaveis: "",
  });
  const [erro, setErro] = useState("");
  const [modal, setModal] = useState({
    aberto: false,
    aditivo: null,
    acao: "",
  });
  const [justificativa, setJustificativa] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.motivo || !form.valor || !form.prazo || !form.responsaveis) {
      setErro("Preencha todos os campos obrigatórios.");
      return;
    }
    setAditivos([
      ...aditivos,
      { ...form, id: Date.now(), status: "Pendente", historico: [] },
    ]);
    setForm({ motivo: "", valor: "", prazo: "", responsaveis: "" });
    setErro("");
  }

  function abrirModal(aditivo, acao) {
    setModal({ aberto: true, aditivo, acao });
    setJustificativa("");
  }

  function fecharModal() {
    setModal({ aberto: false, aditivo: null, acao: "" });
    setJustificativa("");
  }

  function aprovarOuRejeitar() {
    setAditivos(
      aditivos.map((a) =>
        a.id === modal.aditivo.id
          ? {
              ...a,
              status: modal.acao === "aprovar" ? "Aprovado" : "Rejeitado",
              justificativa: justificativa,
            }
          : a
      )
    );
    fecharModal();
  }

  return (
    <div className="aditivos-page">
      <form className="aditivos-form" onSubmit={handleSubmit}>
        <div>
          <label>Motivo da alteração*</label>
          <input name="motivo" value={form.motivo} onChange={handleChange} />
        </div>
        <div>
          <label>Valor ajustado*</label>
          <input name="valor" value={form.valor} onChange={handleChange} />
        </div>
        <div>
          <label>Prazo estendido*</label>
          <input name="prazo" value={form.prazo} onChange={handleChange} />
        </div>
        <div>
          <label>Responsáveis pela aprovação*</label>
          <input
            name="responsaveis"
            value={form.responsaveis}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Cadastrar Aditivo</button>
        {erro && <span className="aditivos-erro">{erro}</span>}
      </form>

      <div className="aditivos-lista">
        <h3>Aditivos Vinculados</h3>
        <table>
          <thead>
            <tr>
              <th>Motivo</th>
              <th>Valor</th>
              <th>Prazo</th>
              <th>Responsáveis</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {aditivos.map((aditivo) => (
              <tr
                key={aditivo.id}
                className={
                  aditivo.status === "Pendente" ? "aditivo-pendente" : ""
                }
              >
                <td>{aditivo.motivo}</td>
                <td>{aditivo.valor}</td>
                <td>{aditivo.prazo}</td>
                <td>{aditivo.responsaveis}</td>
                <td>
                  {aditivo.status === "Pendente" && (
                    <span className="status-pendente">
                      <FaBell /> Pendente
                    </span>
                  )}
                  {aditivo.status === "Aprovado" && (
                    <span className="status-aprovado">
                      <FaCheck /> Aprovado
                    </span>
                  )}
                  {aditivo.status === "Rejeitado" && (
                    <span className="status-rejeitado">
                      <FaTimes /> Rejeitado
                    </span>
                  )}
                </td>
                <td>
                  {aditivo.status === "Pendente" && (
                    <>
                      <button
                        className="btn-aprovar"
                        onClick={() => abrirModal(aditivo, "aprovar")}
                        title="Aprovar"
                      >
                        <FaCheck />
                      </button>
                      <button
                        className="btn-rejeitar"
                        onClick={() => abrirModal(aditivo, "rejeitar")}
                        title="Rejeitar"
                      >
                        <FaTimes />
                      </button>
                    </>
                  )}
                  <button className="btn-historico" title="Ver histórico">
                    <FaHistory />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal.aberto && (
        <div className="aditivos-modal-bg">
          <div className="aditivos-modal">
            <h4>{modal.acao === "aprovar" ? "Aprovar" : "Rejeitar"} aditivo</h4>
            {modal.acao === "rejeitar" && (
              <textarea
                placeholder="Justificativa da rejeição (obrigatório)"
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
              />
            )}
            <div className="aditivos-modal-botoes">
              <button onClick={aprovarOuRejeitar} className="btn-confirmar">
                {modal.acao === "aprovar" ? "Aprovar" : "Rejeitar"}
              </button>
              <button onClick={fecharModal} className="btn-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
