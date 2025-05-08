import React from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const ListContainer = styled.div`
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ListTitle = styled.h2`
  color: #2d3a4a;
  font-size: 1.2rem;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 12px 15px;
  text-align: left;
  background-color: #f8f9fa;
  color: #666;
  font-weight: 500;
  font-size: 0.9rem;
  border-bottom: 2px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 1;

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const Td = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
  font-size: 0.9rem;
  vertical-align: middle;
`;

const Tr = styled.tr`
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: ${(props) => {
    switch (props.status) {
      case "pendente":
        return "#fff3cd";
      case "em_andamento":
        return "#cce5ff";
      case "concluido":
        return "#d4edda";
      case "atrasado":
        return "#f8d7da";
      default:
        return "#e2e3e5";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "pendente":
        return "#856404";
      case "em_andamento":
        return "#004085";
      case "concluido":
        return "#155724";
      case "atrasado":
        return "#721c24";
      default:
        return "#383d41";
    }
  }};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background-color: ${(props) => {
    switch (props.priority) {
      case "baixa":
        return "#d4edda";
      case "media":
        return "#fff3cd";
      case "alta":
        return "#f8d7da";
      default:
        return "#e2e3e5";
    }
  }};
  color: ${(props) => {
    switch (props.priority) {
      case "baixa":
        return "#155724";
      case "media":
        return "#856404";
      case "alta":
        return "#721c24";
      default:
        return "#383d41";
    }
  }};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 5px;

  &.edit {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
  }
`;

interface Entregavel {
  id: number;
  titulo: string;
  descricao: string;
  prazo: string;
  status: string;
  prioridade: string;
}

interface EntregavelListProps {
  entregaveis: Entregavel[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const EntregavelList: React.FC<EntregavelListProps> = ({
  entregaveis,
  onEdit,
  onDelete,
}) => {
  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este entregável?")) {
      onDelete(id);
      toast.success("Entregável excluído com sucesso!");
    }
  };

  return (
    <ListContainer>
      <ListTitle>Lista de Entregáveis</ListTitle>
      {entregaveis.length === 0 ? (
        <EmptyState>
          <h3>Nenhum entregável cadastrado</h3>
          <p>Clique em "Novo Entregável" para começar</p>
        </EmptyState>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Descrição</Th>
              <Th>Prazo</Th>
              <Th>Status</Th>
              <Th>Prioridade</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {entregaveis.map((entregavel) => (
              <Tr key={entregavel.id}>
                <Td>{entregavel.titulo}</Td>
                <Td>{entregavel.descricao}</Td>
                <Td>
                  {new Date(entregavel.prazo).toLocaleDateString("pt-BR")}
                </Td>
                <Td>
                  <StatusBadge status={entregavel.status}>
                    {entregavel.status.replace("_", " ")}
                  </StatusBadge>
                </Td>
                <Td>
                  <PriorityBadge priority={entregavel.prioridade}>
                    {entregavel.prioridade}
                  </PriorityBadge>
                </Td>
                <Td>
                  <Button
                    className="edit"
                    onClick={() => onEdit(entregavel.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => handleDelete(entregavel.id)}
                  >
                    Excluir
                  </Button>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </ListContainer>
  );
};

export default EntregavelList;
