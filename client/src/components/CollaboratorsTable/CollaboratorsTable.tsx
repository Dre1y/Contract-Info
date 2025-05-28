import React, { useState, ChangeEvent } from "react";
import "./CollaboratorsTable.css";

interface CollaboratorData {
  id?: string;
  name: string;
  role: string;
  department: string;
  hireDate: string;
}

const CollaboratorsTable: React.FC = () => {
  const [data, setData] = useState<CollaboratorData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<Omit<CollaboratorData, "id">>({ name: "", role: "", department: "", hireDate: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newEntry: CollaboratorData = { id: String(data.length + 1), ...form };
    setData([...data, newEntry]);
    setForm({ name: "", role: "", department: "", hireDate: "" });
    setShowModal(false);
  };

  const handleRemove = (id?: string) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className="contractors-page-container">
      <div className="page-header">
        <h2>Colaboradores Cadastrados</h2>
        <button className="primary-button" onClick={() => setShowModal(true)}>
          Cadastrar Colaborador
        </button>
      </div>
      <hr />
      {data.length === 0 ? (
        <div className="empty-message-container">
          <p className="empty-message">Nenhum colaborador registrado.</p>
        </div>
      ) : (
        <div className="contractors-table-container">
          <table className="contractors-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Departamento</th>
                <th>Data de Contratação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((collab, idx) => (
                <tr key={idx}>
                  <td>{collab.name}</td>
                  <td>{collab.role}</td>
                  <td>{collab.department}</td>
                  <td>{collab.hireDate}</td>
                  <td>
                    <button className="secondary-button" onClick={() => handleRemove(collab.id)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Cadastrar Colaborador</h3>
            <label>Nome:</label>
            <input name="name" value={form.name} onChange={handleChange} />

            <label>CPF/CNPJ:</label>
            <input name="role" value={form.role} onChange={handleChange} />

            <label>Telefone:</label>
            <input name="department" value={form.department} onChange={handleChange} />

            <label>CEP:</label>
            <input name="hireDate" type="date" value={form.hireDate} onChange={handleChange} />

            <div className="modal-actions">
              <button className="primary-button" onClick={handleAdd}>Cadastrar</button>
              <button className="secondary-button" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratorsTable;