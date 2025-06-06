import { usePersonDataMutate } from "@/hooks/usePersonDataMutate";
import { useEffect, useState } from "react";
import "./CreatePersonsModal.css";
import { PersonData } from "@/interface/PersonData";

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

const CreatePersonModal = ({ closeModal }: ModalProps) => {
  const [name, setName] = useState("");
  const [cpf_cnpj, setCpfCnpj] = useState("");
  const [rg, setRg] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const { mutate, isSuccess } = usePersonDataMutate();

  const submit = () => {
    const data: PersonData = {
      name,
      cpf_cnpj,
      rg,
      email,
      phone,
      address,
    };
    console.log("data:", data);
    mutate(data);
  };

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [closeModal, isSuccess]);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastrar Colaborador</h2>
        <form className="input-container">
          <Input label="Nome:" value={name} updateValue={setName} />
          <Input label="CPF/CNPJ:" value={cpf_cnpj} updateValue={setCpfCnpj} />
          <Input label="RG:" value={rg} updateValue={setRg} />
          <Input label="Email:" value={email} updateValue={setEmail} />
          <Input label="Telefone:" value={phone} updateValue={setPhone} />
          <Input label="CEP:" value={address} updateValue={setAddress} />
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

export default CreatePersonModal;
