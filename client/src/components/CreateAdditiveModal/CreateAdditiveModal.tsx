import { useAdditiveDataMutate } from "@/hooks/useAdditiveDataMutate";
import { useEffect, useState } from "react";
import "./CreateAdditiveModal.css";
import { AdditiveData } from "@/interface/AdditiveData";

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

const CreateAdditiveModal = ({ closeModal }: ModalProps) => {
  const [additiveType, setAdditiveType] = useState("");
  const [adjustedValue, setAdjustedValue] = useState(0);
  const [extendedDeadline, setExtendedDeadline] = useState("");
  const [details, setDetails] = useState("");
  const [changeReason, setChangeReason] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [status, setStatus] = useState("");
  const [contractId, setContractId] = useState("");
  const [attachmentId, setAttachmentId] = useState("");
  const { mutate, isSuccess } = useAdditiveDataMutate();

  const submit = () => {
    const data: AdditiveData = {
      additiveType,
      adjustedValue,
      extendedDeadline,
      details,
      changeReason,
      approvedBy,
      status,
      contractId,
      attachmentId,
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
        <h2>Cadastrar Aditivo</h2>
        <form className="input-container">
          <Input
            label="Tipo de Aditivo:"
            value={additiveType}
            updateValue={setAdditiveType}
          />
          <Input
            label="Valor ajustado:"
            value={adjustedValue}
            updateValue={setAdjustedValue}
          />
          <Input
            label="Prazo estendido:"
            value={extendedDeadline}
            updateValue={setExtendedDeadline}
          />
          <Input label="Detalhes:" value={details} updateValue={setDetails} />
          <Input
            label="Motivo da Mudança:"
            value={changeReason}
            updateValue={setChangeReason}
          />
          <Input
            label="Aprovado por:"
            value={approvedBy}
            updateValue={setApprovedBy}
          />
          <Input label="Status:" value={status} updateValue={setStatus} />
          <Input
            label="Contratante:"
            value={contractId}
            updateValue={setContractId}
          />
          <Input
            label="Anexo:"
            value={attachmentId}
            updateValue={setAttachmentId}
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

export default CreateAdditiveModal;
