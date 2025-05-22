import { useContractDataMutate } from "@/hooks/useContractDataMutate";
import { useEffect, useState } from "react";
import "./CreateContractModal.css";
import { ContractData } from "@/interface/ContractData";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: unknown): void;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      ></input>
    </>
  );
};

const CreateContractModal = ({ closeModal }: ModalProps) => {
  const [contractType, setContractType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [validityStart, setValidityStart] = useState("");
  const [validityEnd, setValidityEnd] = useState("");
  const [contractorId, setContractorId] = useState("");
  const { mutate, isSuccess } = useContractDataMutate();

  const submit = () => {
    const data: ContractData = {
      contractType,
      serviceType,
      description,
      validityStart,
      validityEnd,
      contractorId,
    };
    mutate(data);
  };

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [closeModal, isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastrar Contrato</h2>
        <form className="input-container">
          <Input
            label="Tipo de Contrato"
            value={contractType}
            updateValue={setContractType}
          />
          <Input
            label="Tipo de Serviço"
            value={serviceType}
            updateValue={setServiceType}
          />
          <Input
            label="Descrição"
            value={description}
            updateValue={setDescription}
          />
          <Input
            label="Data de Início"
            value={validityStart}
            updateValue={setValidityStart}
          />
          <Input
            label="Data de Término"
            value={validityEnd}
            updateValue={setValidityEnd}
          />
          <Input
            label="Contratante"
            value={contractorId}
            updateValue={setContractorId}
          />
          <div className="buttons-container">
            <button type="button" onClick={submit}>
              Cadastrar
            </button>
            <button type="button" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContractModal;
