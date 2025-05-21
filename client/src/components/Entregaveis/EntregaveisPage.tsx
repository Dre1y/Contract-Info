import EntregavelForm from "./EntregavelForm";
import EntregaveisList from "./EntregavelList";
import { useDeliverableData } from "@/hooks/useDeliverableData";

const DeliverablesPage = () => {
  const { data } = useDeliverableData();

  return (
    <>
      <div className="deliverables-page">
        <div className="deliverables-tabs">
          <button>Cadastrar Entregável</button>
        </div>
      </div>
      <div className="deliverables-table">
        {data && <EntregaveisList data={data} />}
      </div>
      <EntregavelForm />
    </>
  );
};

export default DeliverablesPage;
