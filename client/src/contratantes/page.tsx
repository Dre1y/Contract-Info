import ContractorTable from "@/components/ContractorsTable/ContractorsTable";
import { useContractorData } from "@/hooks/useContractorData";
import "./Contratantes.css";
import { useState } from "react";
import CreateContractorModal from "@/components/CreateContractorsModal/CreateContractorsModal";

const ContractorsPage = () => {
  const { data } = useContractorData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div className="contractors-page">
        <h2>Contratantes Cadastrados</h2>
        <div className="contractors-tabs">
          <button className="btn-primary" onClick={toggleModal}>
            Cadastrar Contratante
          </button>
        </div>
        <div className="contractors-table">
          {data && data.length > 0 ? (
            <ContractorTable data={data} />
          ) : (
            <p className="empty-message">Nenhum contratante registrado.</p>
          )}
        </div>
      </div>
      {isModalOpen && <CreateContractorModal closeModal={toggleModal} />}
    </>
  );
};

export default ContractorsPage;
