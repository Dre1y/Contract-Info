import { useState } from "react";
import { DeliverableData } from "@/interface/DeliverableData";
import { useDeliverableDataMutate } from "@/hooks/useDeliverableDataMutate";

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
  const [due_date, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [attachment_id, setAttachmentId] = useState("");
  const [contract_id, setContractId] = useState("");
  const { mutate } = useDeliverableDataMutate();

  const submit = () => {
    const data: DeliverableData = {
      description,
      due_date: new Date(due_date),
      status,
      attachment_id,
      contract_id,
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
          value={due_date}
          updateValue={setDueDate}
        />

        <label>Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="pendente">Pendente</option>
          <option value="em_andamento">Em Andamento</option>
          <option value="concluido">Concluído</option>
          <option value="atrasado">Atrasado</option>
        </select>

        <Input
          label="ID do Anexo"
          value={attachment_id}
          updateValue={setAttachmentId}
        />

        <Input
          label="ID do Contrato"
          value={contract_id}
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
