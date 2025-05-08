import "./AdditivesTable.css";

interface AdditiveData {
  additiveType: string;
  adjustedValue: number;
  extendedDeadline: string;
  details: string;
  changeReason: string;
  approvedBy: string;
  status: string;
  contractId: string;
  attachmentId: string;
}

interface AdditiveTableProps {
  data: AdditiveData[];
}

const AdditiveTable = ({ data }: AdditiveTableProps) => {
  return (
    <div className="additives-table-container">
      <table className="additives-table">
        <thead>
          <tr>
            <th>Tipo do Aditivo</th>
            <th>Valor ajustado</th>
            <th>Prazo estendido</th>
            <th>Detalhes</th>
            <th>Motivo da Mudança</th>
            <th>Aprovado por</th>
            <th>Status</th>
            <th>ID do Contrato</th>
            <th>ID do Anexo</th>
          </tr>
        </thead>
        <tbody>
          {data.map((additive, index) => (
            <tr key={index}>
              <td>{additive.additiveType}</td>
              <td>{additive.adjustedValue}</td>
              <td>{additive.extendedDeadline}</td>
              <td>{additive.details}</td>
              <td>{additive.changeReason}</td>
              <td>{additive.approvedBy}</td>
              <td>{additive.status}</td>
              <td>{additive.contractId}</td>
              <td>{additive.attachmentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdditiveTable;
