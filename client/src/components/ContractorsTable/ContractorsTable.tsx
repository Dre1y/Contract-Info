import "./ContractorsTable.css";

interface ContractorData {
  id?: string;
  name: string;
  cpf_cnpj: string;
  phone: string;
  cep: string;
}

interface ContractorTableProps {
  data: ContractorData[];
}

const ContractorTable = ({ data }: ContractorTableProps) => {
  return (
    <div className="contractors-table-container">
      <table className="contractors-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Telefone</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contractor, index) => (
            <tr key={index}>
              <td>{contractor.name}</td>
              <td>{contractor.cpf_cnpj}</td>
              <td>{contractor.phone}</td>
              <td>{contractor.cep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractorTable;
