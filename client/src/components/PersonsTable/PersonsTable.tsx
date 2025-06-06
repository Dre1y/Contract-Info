import "./PersonsTable.css";

interface PersonData {
  id?: string;
  name: string;
  cpf_cnpj: string;
  rg: string;
  email: string;
  phone: string;
  address: string;
}

interface PersonTableProps {
  data: PersonData[];
}

const PersonTable = ({ data }: PersonTableProps) => {
  if (!data || data.length === 0) {
    return (
        <div className="empty-message-container">
          <p className="empty-message">Nenhum colaborador registrado.</p>
        </div>
    );
  }

  return (
      <div className="persons-table-container">
        <table className="persons-table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>RG</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CEP</th>
          </tr>
          </thead>
          <tbody>
          {data.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.cpf_cnpj}</td>
                <td>{person.rg}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
                <td>{person.address}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default PersonTable;

//
// const PersonsTable: React.FC = () => {
//   const [data, setData] = useState<CollaboratorData[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState<Omit<CollaboratorData, "id">>({ name: "", cpf_cnpj: "", rg: "", phone: "", address: "" });
//
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
//
//   const handleAdd = () => {
//     const newEntry: CollaboratorData = { id: String(data.length + 1), ...form };
//     setData([...data, newEntry]);
//     setForm({ name: "", cpf_cnpj: "", rg: "", phone: "", address: "" });
//     setShowModal(false);
//   };
//
//   const handleRemove = (id?: string) => {
//     setData(data.filter(item => item.id !== id));
//   };
//
//   return (
//     <div className="persons-page-container">
//       <div className="page-header">
//         <h2>Colaboradores Cadastrados</h2>
//         <button className="primary-button" onClick={() => setShowModal(true)}>
//           Cadastrar Colaborador
//         </button>
//       </div>
//       <hr />
//       {data.length === 0 ? (
//         <div className="empty-message-container">
//           <p className="empty-message">Nenhum colaborador registrado.</p>
//         </div>
//       ) : (
//         <div className="persons-table-container">
//           <table className="persons-table">
//             <thead>
//               <tr>
//                 <th>Nome</th>
//                 <th>CPF/CNPJ</th>
//                 <th>RG</th>
//                 <th>Telefone</th>
//                 <th>Endereço</th>
//                 <th>Ações</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((person, idx) => (
//                 <tr key={idx}>
//                   <td>{person.name}</td>
//                   <td>{person.cpf_cnpj}</td>
//                   <td>{person.rg}</td>
//                   <td>{person.phone}</td>
//                   <td>{person.address}</td>
//                   <td>
//                     <button className="secondary-button" onClick={() => handleRemove(person.id)}>
//                       Remover
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal-box">
//             <h3>Cadastrar Colaborador</h3>
//             <label>Nome:</label>
//             <input name="name" value={form.name} onChange={handleChange} />
//
//             <label>CPF/CNPJ:</label>
//             <input name="cpf_cnpj" value={form.cpf_cnpj} onChange={handleChange} />
//
//             <label>RG:</label>
//             <input name="rg" value={form.rg} onChange={handleChange} />
//
//             <label>Telefone:</label>
//             <input name="phone" value={form.phone} onChange={handleChange} />
//
//             <label>CEP:</label>
//             <input name="address" value={form.address} onChange={handleChange} />
//
//             <div className="modal-actions">
//               <button className="primary-button" onClick={handleAdd}>Cadastrar</button>
//               <button className="secondary-button" onClick={() => setShowModal(false)}>Cancelar</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default PersonsTable;