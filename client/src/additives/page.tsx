import { useState } from "react";
import "./Additives.css";
import AdditiveTable from "@/components/AdditivesTable/AdditivesTable";
import { useAdditiveData } from "@/hooks/useAdditiveData";
import CreateAdditiveModal from "@/components/CreateAdditiveModal/CreateAdditiveModal";

export default function AdditivesPage() {
  const { data } = useAdditiveData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="aditivos-page">
      <div className="buttons-container">
        <button onClick={handleOpenModal}>Cadastrar Aditivo</button>
      </div>
      <div className="aditivos-lista">
        <h3>Aditivos Cadastrados</h3>
        {data && data.length > 0 ? (
          <AdditiveTable data={data} />
        ) : (
          <div className="empty-message-container">
            Nenhum aditivo cadastrado.
          </div>
        )}
        {isModalOpen && <CreateAdditiveModal closeModal={handleOpenModal} />}
      </div>
    </div>
  );
}
