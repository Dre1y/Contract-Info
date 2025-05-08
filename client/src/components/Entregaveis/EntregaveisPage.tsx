import { useState } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EntregavelForm from "./EntregavelForm";
import EntregavelList from "./EntregavelList";
import homeIcon from "../../assets/home.png";
import notebookIcon from "../../assets/notebook.png";

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.header`
  background: #fff;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #f0f0f0;
  box-shadow: none;
  border-radius: 0;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  color: #2d3a4a;
  margin: 0;
  margin-left: 8px;
  letter-spacing: 0.5px;
`;

const MainContent = styled.main`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  min-height: calc(100vh - 200px);
`;

const Sidebar = styled.aside`
  background-color: #fff;
  padding: 25px 0 25px 0;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SidebarTitle = styled.h2`
  color: #333;
  font-size: 18px;
  margin-bottom: 16px;
  font-weight: 700;
  width: 80%;
  text-align: left;
  border-bottom: none;
`;

const SidebarDivider = styled.hr`
  width: 80%;
  border: none;
  border-top: 1.5px solid #f0f0f0;
  margin-bottom: 18px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuItem = styled.li<{ active: boolean }>`
  width: 230px;
  min-height: 44px;
  padding: 12px 15px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => (props.active ? "#fff" : "#666")};
  background-color: ${(props) => (props.active ? "#007bff" : "transparent")};
  font-weight: ${(props) => (props.active ? "500" : "normal")};
  font-size: 1rem;
  justify-content: flex-start;

  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#f8f9fa")};
    color: ${(props) => (props.active ? "#fff" : "#333")};
  }
`;

const Content = styled.section`
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatusCardsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatusCard = styled.div`
  flex: 1;
  background: #f5f7fa;
  border-radius: 12px;
  padding: 24px 0 18px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const StatusLabel = styled.span`
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
`;

const StatusValue = styled.span`
  font-size: 2.1rem;
  font-weight: 700;
  color: #2d3a4a;
`;

interface Entregavel {
  id: number;
  titulo: string;
  descricao: string;
  prazo: string;
  status: string;
  prioridade: string;
}

const EntregaveisPage = () => {
  const [entregaveis, setEntregaveis] = useState<Entregavel[]>([]);
  const [activeView, setActiveView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Cálculo dos status
  const total = entregaveis.length;
  const emAndamento = entregaveis.filter(
    (e) => e.status === "em_andamento"
  ).length;
  const atrasados = entregaveis.filter((e) => e.status === "atrasado").length;
  const concluidos = entregaveis.filter((e) => e.status === "concluido").length;

  const handleSubmit = (data: Omit<Entregavel, "id">) => {
    if (editingId) {
      setEntregaveis((prev) =>
        prev.map((entregavel) =>
          entregavel.id === editingId ? { ...entregavel, ...data } : entregavel
        )
      );
    } else {
      const newEntregavel: Entregavel = {
        id: Date.now(),
        ...data,
      };
      setEntregaveis((prev) => [...prev, newEntregavel]);
    }
    setActiveView("list");
    setEditingId(null);
  };

  const handleEdit = (id: number) => {
    setEditingId(id);
    setActiveView("form");
  };

  const handleDelete = (id: number) => {
    setEntregaveis((prev) => prev.filter((entregavel) => entregavel.id !== id));
  };

  return (
    <Container>
      <Header>
        <Title>Gerenciamento de Entregáveis</Title>
      </Header>
      <MainContent>
        <Sidebar>
          <SidebarTitle>Menu</SidebarTitle>
          <SidebarDivider />
          <MenuList>
            <MenuItem
              active={activeView === "list"}
              onClick={() => setActiveView("list")}
            >
              <img
                src={homeIcon}
                alt="Home"
                style={{
                  width: 36,
                  height: 36,
                  filter:
                    activeView === "list"
                      ? "none"
                      : "grayscale(1) opacity(0.5)",
                }}
              />
              Lista de Entregáveis
            </MenuItem>
            <MenuItem
              active={activeView === "form"}
              onClick={() => {
                setEditingId(null);
                setActiveView("form");
              }}
            >
              <img
                src={notebookIcon}
                alt="Novo Entregável"
                style={{
                  width: 36,
                  height: 36,
                  filter:
                    activeView === "form"
                      ? "none"
                      : "grayscale(1) opacity(0.5)",
                }}
              />
              Novo Entregável
            </MenuItem>
          </MenuList>
        </Sidebar>
        <Content>
          {activeView === "list" && (
            <>
              <StatusCardsContainer>
                <StatusCard>
                  <StatusLabel>Total de Entregáveis</StatusLabel>
                  <StatusValue>{total}</StatusValue>
                </StatusCard>
                <StatusCard>
                  <StatusLabel>Em Andamento</StatusLabel>
                  <StatusValue>{emAndamento}</StatusValue>
                </StatusCard>
                <StatusCard>
                  <StatusLabel>Atrasados</StatusLabel>
                  <StatusValue>{atrasados}</StatusValue>
                </StatusCard>
                <StatusCard>
                  <StatusLabel>Concluídos</StatusLabel>
                  <StatusValue>{concluidos}</StatusValue>
                </StatusCard>
              </StatusCardsContainer>
              <EntregavelList
                entregaveis={entregaveis}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </>
          )}
          {activeView === "form" && (
            <EntregavelForm
              onSubmit={handleSubmit}
              editingId={editingId}
              entregaveis={entregaveis}
            />
          )}
        </Content>
      </MainContent>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default EntregaveisPage;
