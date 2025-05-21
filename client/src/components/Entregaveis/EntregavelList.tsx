interface DeliverableData {
  id?: string;
  description: string;
  due_date: Date;
  status: string;
  attachment_id: string;
  contract_id: string;
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
              <td>{item.due_date.toLocaleDateString()}</td>
              <td>{item.status}</td>
              <td>{item.attachment_id}</td>
              <td>{item.contract_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntregaveisList;
