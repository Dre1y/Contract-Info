import "./ContractTable.css";
import {
  FaFileContract,
  FaBriefcase,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";

interface ContractData {
  contractType: string;
  serviceType: string;
  description: string;
  validityStart: string;
  validityEnd: string;
  contractorId: string;
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
            <th>
              <FaFileContract /> Tipo
            </th>
            <th>
              <FaBriefcase /> Serviço
            </th>
            <th>Descrição</th>
            <th>
              <FaCalendarAlt /> Início
            </th>
            <th>
              <FaCalendarAlt /> Fim
            </th>
            <th>
              <FaUser /> Contratante
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((contract, index) => (
            <tr key={index}>
              <td>{contract.contractType}</td>
              <td>{contract.serviceType}</td>
              <td title={contract.description}>
                <div className="truncate-text">{contract.description}</div>
              </td>
              <td>{new Date(contract.validityStart).toLocaleDateString()}</td>
              <td>{new Date(contract.validityEnd).toLocaleDateString()}</td>
              <td>{contract.contractorId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractTable;
