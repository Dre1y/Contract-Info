import ContractorTable from "@/components/ContractorsTable/ContractorsTable";
import { useContractorData } from "@/hooks/useContractorData";
import "./Contratantes.css";
import { useState } from "react";
import CreateContractorModal from "@/components/CreateContractorsModal/CreateContractorsModal";

const ContractorsPage = () => {
  const { data } = useContractorData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="contractors-page">
        <div className="contractors-tabs">
          <button onClick={handleOpenModal}>Cadastrar Contratante</button>
        </div>
      </div>
      <div className="contractors-table">
        {data && <ContractorTable data={data} />}
      </div>
      {isModalOpen && <CreateContractorModal closeModal={handleOpenModal} />}
    </>
  );
};

export default ContractorsPage;
