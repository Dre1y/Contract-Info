import { useState } from "react";
import EntregavelForm from "./EntregavelForm";
import EntregaveisList from "./EntregavelList";
import { useDeliverableData } from "@/hooks/useDeliverableData";
import "./EntregaveisPage.css";

const DeliverablesPage = () => {
  const { data, isLoading, isError } = useDeliverableData();
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => setShowForm((prev) => !prev);

  return (
    <div className="deliverables-page">
      <div className="deliverables-tabs">
        <button onClick={toggleForm}>
          {showForm ? "Fechar Formulário" : "Cadastrar Entregável"}
        </button>
      </div>

      {showForm && <EntregavelForm />}

      <div className="deliverables-table">
        {isLoading && <p>Carregando entregáveis...</p>}
        {isError && <p>Erro ao carregar entregáveis.</p>}
        {!isLoading && data?.length === 0 && (
          <p>Nenhum entregável encontrado.</p>
        )}
        {!isLoading && data?.length > 0 && <EntregaveisList data={data} />}
      </div>
    </div>
  );
};

export default DeliverablesPage;
