import "./EntregavelList.css";

interface DeliverableData {
  id?: string;
  description: string;
  dueDate: Date;
  status: string;
  attachmentId: string;
  contractId: string;
}

interface EntregaveisTableProps {
  data: DeliverableData[];
}

const EntregaveisList = ({ data }: EntregaveisTableProps) => {
  return (
    <div className="entregaveis-table-container">
      <table className="entregaveis-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Data de Entrega</th>
            <th>Status</th>
            <th>ID do Anexo</th>
            <th>ID do Contrato</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>
                {item.dueDate
                  ? new Date(item.dueDate).toLocaleDateString()
                  : "Não especificada"}
              </td>
              <td>{item.status}</td>
              <td>{item.attachmentId}</td>
              <td>{item.contractId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntregaveisList;
