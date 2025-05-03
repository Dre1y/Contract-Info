import "./ContractTable.css";

interface ContractData {
  contractType: string;
  serviceType: string;
  description: string;
  validityStart: string;
  validityEnd: string;
  contractorName: string;
}

interface ContractTableProps {
  data: ContractData[];
}

const ContractTable = ({ data }: ContractTableProps) => {
  return (
    <div className="contracts-table-container">
      <table className="contracts-table">
        <thead>
          <tr>
            <th>Tipo do Contrato</th>
            <th>Tipo do Serviço</th>
            <th>Descrição</th>
            <th>Data de Início</th>
            <th>Data de Fim</th>
            <th>Nome do Contratante</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contract, index) => (
            <tr key={index}>
              <td>{contract.contractType}</td>
              <td>{contract.serviceType}</td>
              <td>{contract.description}</td>
              <td>{contract.validityStart}</td>
              <td>{contract.validityEnd}</td>
              <td>{contract.contractorName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;
