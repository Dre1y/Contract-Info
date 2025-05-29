import { useState } from "react";
import { DeliverableData } from "@/interface/DeliverableData";
import { useDeliverableDataMutate } from "@/hooks/useDeliverableDataMutate";
import "./EntregavelForm.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: unknown): void;
}

const Input = ({ label, value, updateValue }: InputProps) => (
  <>
    <label>{label}</label>
    <input
      value={value}
      onChange={(e) => updateValue(e.target.value)}
      required
    />
  </>
);

const EntregavelForm = () => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [attachmentId, setAttachmentId] = useState("");
  const [contractId, setContractId] = useState("");
  const { mutate } = useDeliverableDataMutate();

  const submit = () => {
    const data: DeliverableData = {
      description,
      dueDate: new Date(dueDate),
      status,
      attachmentId,
      contractId,
    };
    mutate(data);
  };

  return (
    <div className="entregavel-form-container">
      <h2>Criar Entregável</h2>
      <form className="input-container">
        <label>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <Input
          label="Data de Entrega"
          value={dueDate}
          updateValue={setDueDate}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecione o status
          </option>
          <option value="PENDENTE">Pendente</option>
          <option value="APROVADO">Aprovado</option>
          <option value="CONCLUIDO">Concluído</option>
          <option value="REJEITADO">Rejeitado</option>
          <option value="CANCELADO">Cancelado</option>
        </select>

        <Input
          label="ID do Anexo"
          value={attachmentId}
          updateValue={setAttachmentId}
        />

        <Input
          label="ID do Contrato"
          value={contractId}
          updateValue={setContractId}
        />

        <div className="buttons-container">
          <button type="button" onClick={submit}>
            Salvar
          </button>
          <button type="button">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EntregavelForm;
