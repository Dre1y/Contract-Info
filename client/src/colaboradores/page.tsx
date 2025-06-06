import PersonTable from "@/components/PersonsTable/PersonsTable";
import { usePersonData } from "@/hooks/usePersonData";
import "./Colaboradores.css";
import { useState } from "react";
import CreatePersonsModal from "@/components/CreatePersonsModal/CreatePersonsModal";

const PersonsPage = () => {
  const { data } = usePersonData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  console.log("data:", data);

  return (
    <>
      <div className="persons-page">
        <h2>Colaboradores Cadastrados</h2>
        <div className="persons-tabs">
          <button className="btn-primary" onClick={toggleModal}>
            Cadastrar Colaborador
          </button>
        </div>
        <div className="persons-table">
          {data && data.length > 0 ? (
            <PersonTable data={data} />
          ) : (
            <p className="empty-message">Nenhum colaborador registrado.</p>
          )}
        </div>
      </div>
      {isModalOpen && <CreatePersonsModal closeModal={toggleModal} />}
    </>
  );
};

export default PersonsPage;
