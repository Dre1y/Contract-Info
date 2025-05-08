import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  color: #2d3a4a;
  font-size: 1.2rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &.submit {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.cancel {
    background-color: #6c757d;
    color: white;

    &:hover {
      background-color: #5a6268;
    }
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

interface Entregavel {
  id: number;
  titulo: string;
  descricao: string;
  prazo: string;
  status: string;
  prioridade: string;
}

interface EntregavelFormProps {
  onSubmit: (data: Omit<Entregavel, "id">) => void;
  editingId: number | null;
  entregaveis: Entregavel[];
}

const EntregavelForm: React.FC<EntregavelFormProps> = ({
  onSubmit,
  editingId,
  entregaveis,
}) => {
  const [formData, setFormData] = useState<Omit<Entregavel, "id">>({
    titulo: "",
    descricao: "",
    prazo: "",
    status: "pendente",
    prioridade: "media",
  });

  useEffect(() => {
    if (editingId) {
      const entregavel = entregaveis.find((e) => e.id === editingId);
      if (entregavel) {
        const { id, ...data } = entregavel;
        setFormData(data);
      }
    }
  }, [editingId, entregaveis]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      titulo: "",
      descricao: "",
      prazo: "",
      status: "pendente",
      prioridade: "media",
    });
    toast.success("Entregável salvo com sucesso!");
  };

  return (
    <FormContainer>
      <FormTitle>
        {editingId ? "Editar Entregável" : "Novo Entregável"}
      </FormTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="titulo">Título</Label>
          <Input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="descricao">Descrição</Label>
          <TextArea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="prazo">Prazo</Label>
          <Input
            type="date"
            id="prazo"
            name="prazo"
            value={formData.prazo}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="concluido">Concluído</option>
            <option value="atrasado">Atrasado</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="prioridade">Prioridade</Label>
          <Select
            id="prioridade"
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            required
          >
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </Select>
        </FormGroup>
        <ButtonGroup>
          <Button type="submit" className="submit">
            {editingId ? "Salvar Alterações" : "Criar Entregável"}
          </Button>
          <Button
            type="button"
            className="cancel"
            onClick={() => {
              setFormData({
                titulo: "",
                descricao: "",
                prazo: "",
                status: "pendente",
                prioridade: "media",
              });
            }}
          >
            Limpar
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default EntregavelForm;
