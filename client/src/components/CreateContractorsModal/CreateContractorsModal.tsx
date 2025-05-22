import { useContractorDataMutate } from "@/hooks/useContractorDataMutate";
import { useEffect, useState } from "react";
import "./CreateContractorsModal.css";
import { ContractorData } from "@/interface/ContractorData";

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

const CreateContractorModal = ({ closeModal }: ModalProps) => {
  const [name, setName] = useState("");
  const [cpf_cnpj, setCpfCnpj] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const { mutate, isSuccess } = useContractorDataMutate();

  const submit = () => {
    const data: ContractorData = {
      name,
      cpf_cnpj,
      phone,
      cep,
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
        <h2>Cadastrar Contratante</h2>
        <form className="input-container">
          <Input label="Nome:" value={name} updateValue={setName} />
          <Input label="CPF/CNPJ:" value={cpf_cnpj} updateValue={setCpfCnpj} />
          <Input label="Telefone:" value={phone} updateValue={setPhone} />
          <Input label="CEP:" value={cep} updateValue={setCep} />
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

export default CreateContractorModal;
