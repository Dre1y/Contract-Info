import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaHome, 
  FaUsers, 
  FaProjectDiagram, 
  FaBuilding, 
  FaTools, 
  FaMoneyBillWave, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaInfoCircle, 
  FaUpload, 
  FaCode, 
  FaRegCalendarAlt 
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const menuItems = [
  { label: "Início", icon: <FaHome /> },
  { label: "Prestadores", icon: <FaUsers /> },
  { label: "Projetos", icon: <FaProjectDiagram /> },
  { label: "Clientes", icon: <FaBuilding /> },
  { label: "Serviços", icon: <FaTools /> },
  { label: "Financeiro", icon: <FaMoneyBillWave /> },
];

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
`;

const FlexHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const NewButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 12px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 0 12px 8px;
  color: #222;
  font-weight: 600;
  font-size: 1.1rem;
`;

const Tr = styled.tr``;
const Td = styled.td`
  padding: 12px 0 12px 8px;
  font-size: 1rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ececec;
  margin: 0 0 8px 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px 28px;
  min-width: 350px;
  max-width: 95vw;
  box-shadow: 0 4px 24px rgba(0,0,0,0.13);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  font-size: 1.4rem;
  font-weight: 700;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ModalInput = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
`;

const ModalSelect = styled.select`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 1rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  background: #eee;
  color: #333;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 700;
  cursor: pointer;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button<{ danger?: boolean }>`
  background: none;
  border: none;
  color: ${({ danger }) => (danger ? '#e74c3c' : '#007bff')};
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  border-radius: 5px;
  transition: background 0.15s, color 0.15s;
  &:hover {
    background: ${({ danger }) => (danger ? '#fdeaea' : '#f0f4ff')};
    color: ${({ danger }) => (danger ? '#c0392b' : '#0056b3')};
  }
`;

const InfoRow = styled.div`
  margin-bottom: 10px;
  font-size: 1.05rem;
  strong {
    display: inline-block;
    width: 130px;
    color: #222;
  }
`;

const UploadInput = styled.input`
  margin-top: 12px;
`;

const menuContent = [
  null, // Prestadores será implementado abaixo
  <div>
    <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
      Gerenciamento de Projetos
    </h2>
    <p>Conteúdo da página de projetos em desenvolvimento...</p>
  </div>,
  <div>
    <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
      Gerenciamento de Clientes
    </h2>
    <p>Conteúdo da página de clientes em desenvolvimento...</p>
  </div>,
  <div>
    <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
      Gerenciamento de Serviços
    </h2>
    <p>Conteúdo da página de serviços em desenvolvimento...</p>
  </div>,
  <div>
    <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>
      Gerenciamento Financeiro
    </h2>
    <p>Conteúdo da página financeira em desenvolvimento...</p>
  </div>,
];

const initialForm = {
  nome: '',
  especialidade: '',
  nivel: '',
  tecnologias: '',
  disponibilidade: '',
};

const initialProjeto = {
  nome: '',
  cliente: '',
  responsavel: '',
  status: '',
  tecnologias: '',
};
const initialCliente = {
  nome: '',
  documento: '',
  responsavel: '',
  email: '',
  telefone: '',
};
const initialServico = {
  nome: '',
  projeto: '',
  responsavel: '',
  status: '',
  descricao: '',
};

const DashboardGrid = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;
const DashboardCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 28px 32px 18px 32px;
  min-width: 210px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const DashLabel = styled.div`
  color: #0070f3;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
`;
const DashValue = styled.div`
  font-size: 2.3rem;
  font-weight: 800;
  color: #222;
`;
const RecentBox = styled.div`
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 22px 28px;
`;
const RecentTitle = styled.div`
  color: #0070f3;
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 10px;
`;

const PostosServicoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [prestadores, setPrestadores] = useState<any[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [showInfoIdx, setShowInfoIdx] = useState<number | null>(null);
  const [showDeleteIdx, setShowDeleteIdx] = useState<number | null>(null);
  const [showUploadIdx, setShowUploadIdx] = useState<number | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  // Projetos
  const [showModalProjeto, setShowModalProjeto] = useState(false);
  const [formProjeto, setFormProjeto] = useState(initialProjeto);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [editProjetoIdx, setEditProjetoIdx] = useState<number | null>(null);
  const [showInfoProjetoIdx, setShowInfoProjetoIdx] = useState<number | null>(null);
  const [showDeleteProjetoIdx, setShowDeleteProjetoIdx] = useState<number | null>(null);
  const [showUploadProjetoIdx, setShowUploadProjetoIdx] = useState<number | null>(null);
  const [uploadFileProjeto, setUploadFileProjeto] = useState<File | null>(null);

  // Clientes
  const [showModalCliente, setShowModalCliente] = useState(false);
  const [formCliente, setFormCliente] = useState(initialCliente);
  const [clientes, setClientes] = useState<any[]>([]);
  const [editClienteIdx, setEditClienteIdx] = useState<number | null>(null);
  const [showInfoClienteIdx, setShowInfoClienteIdx] = useState<number | null>(null);
  const [showDeleteClienteIdx, setShowDeleteClienteIdx] = useState<number | null>(null);
  const [showUploadClienteIdx, setShowUploadClienteIdx] = useState<number | null>(null);
  const [uploadFileCliente, setUploadFileCliente] = useState<File | null>(null);

  // Serviços
  const [showModalServico, setShowModalServico] = useState(false);
  const [formServico, setFormServico] = useState(initialServico);
  const [servicos, setServicos] = useState<any[]>([]);
  const [editServicoIdx, setEditServicoIdx] = useState<number | null>(null);
  const [showInfoServicoIdx, setShowInfoServicoIdx] = useState<number | null>(null);
  const [showDeleteServicoIdx, setShowDeleteServicoIdx] = useState<number | null>(null);
  const [showUploadServicoIdx, setShowUploadServicoIdx] = useState<number | null>(null);
  const [uploadFileServico, setUploadFileServico] = useState<File | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx !== null) {
      const updated = [...prestadores];
      updated[editIdx] = form;
      setPrestadores(updated);
      setEditIdx(null);
      toast.success('Prestador editado com sucesso!');
    } else {
      setPrestadores([...prestadores, form]);
      toast.success('Prestador cadastrado com sucesso!');
    }
    setForm(initialForm);
    setShowModal(false);
  };

  const handleEdit = (idx: number) => {
    setForm(prestadores[idx]);
    setEditIdx(idx);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (showDeleteIdx !== null) {
      setPrestadores(prestadores.filter((_, i) => i !== showDeleteIdx));
      toast.success('Prestador excluído com sucesso!');
      setShowDeleteIdx(null);
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFile(e.target.files[0]);
      toast.success('Arquivo selecionado para upload!');
    }
  };

  // Projetos
  const handleInputProjeto = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormProjeto({ ...formProjeto, [e.target.name]: e.target.value });
  };
  const handleSaveProjeto = (e: React.FormEvent) => {
    e.preventDefault();
    if (editProjetoIdx !== null) {
      const updated = [...projetos];
      updated[editProjetoIdx] = formProjeto;
      setProjetos(updated);
      setEditProjetoIdx(null);
      toast.success('Projeto editado com sucesso!');
    } else {
      setProjetos([...projetos, formProjeto]);
      toast.success('Projeto cadastrado com sucesso!');
    }
    setFormProjeto(initialProjeto);
    setShowModalProjeto(false);
  };
  const handleEditProjeto = (idx: number) => {
    setFormProjeto(projetos[idx]);
    setEditProjetoIdx(idx);
    setShowModalProjeto(true);
  };
  const handleDeleteProjeto = () => {
    if (showDeleteProjetoIdx !== null) {
      setProjetos(projetos.filter((_, i) => i !== showDeleteProjetoIdx));
      toast.success('Projeto excluído com sucesso!');
      setShowDeleteProjetoIdx(null);
    }
  };
  const handleUploadProjeto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileProjeto(e.target.files[0]);
      toast.success('Arquivo selecionado para upload!');
    }
  };

  // Clientes
  const handleInputCliente = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormCliente({ ...formCliente, [e.target.name]: e.target.value });
  };
  const handleSaveCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (editClienteIdx !== null) {
      const updated = [...clientes];
      updated[editClienteIdx] = formCliente;
      setClientes(updated);
      setEditClienteIdx(null);
      toast.success('Cliente editado com sucesso!');
    } else {
      setClientes([...clientes, formCliente]);
      toast.success('Cliente cadastrado com sucesso!');
    }
    setFormCliente(initialCliente);
    setShowModalCliente(false);
  };
  const handleEditCliente = (idx: number) => {
    setFormCliente(clientes[idx]);
    setEditClienteIdx(idx);
    setShowModalCliente(true);
  };
  const handleDeleteCliente = () => {
    if (showDeleteClienteIdx !== null) {
      setClientes(clientes.filter((_, i) => i !== showDeleteClienteIdx));
      toast.success('Cliente excluído com sucesso!');
      setShowDeleteClienteIdx(null);
    }
  };
  const handleUploadCliente = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileCliente(e.target.files[0]);
      toast.success('Arquivo selecionado para upload!');
    }
  };

  // Serviços
  const handleInputServico = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormServico({ ...formServico, [e.target.name]: e.target.value });
  };
  const handleSaveServico = (e: React.FormEvent) => {
    e.preventDefault();
    if (editServicoIdx !== null) {
      const updated = [...servicos];
      updated[editServicoIdx] = formServico;
      setServicos(updated);
      setEditServicoIdx(null);
      toast.success('Serviço editado com sucesso!');
    } else {
      setServicos([...servicos, formServico]);
      toast.success('Serviço cadastrado com sucesso!');
    }
    setFormServico(initialServico);
    setShowModalServico(false);
  };
  const handleEditServico = (idx: number) => {
    setFormServico(servicos[idx]);
    setEditServicoIdx(idx);
    setShowModalServico(true);
  };
  const handleDeleteServico = () => {
    if (showDeleteServicoIdx !== null) {
      setServicos(servicos.filter((_, i) => i !== showDeleteServicoIdx));
      toast.success('Serviço excluído com sucesso!');
      setShowDeleteServicoIdx(null);
    }
  };
  const handleUploadServico = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadFileServico(e.target.files[0]);
      toast.success('Arquivo selecionado para upload!');
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: "24px 28px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          marginBottom: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
          Gerenciamento de Postos de Serviço
        </h1>
        <nav>
          <ul
            style={{
              display: "flex",
              gap: 32,
              margin: 0,
              padding: 0,
              listStyle: "none",
              alignItems: "center",
            }}
          >
            {menuItems.map((item, idx) => (
              <li
                key={item.label}
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 18px",
                    borderRadius: 10,
                    background: activeTab === idx ? "#007bff" : "transparent",
                    color: activeTab === idx ? "#fff" : "#555",
                    fontWeight: activeTab === idx ? 600 : 500,
                    fontSize: 17,
                    textDecoration: "none",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Card>
        {activeTab === 0 && (
          <>
            <h2 style={{ fontSize: 2.1 + 'rem', fontWeight: 800, marginBottom: 28 }}>
              Painel de Controle
            </h2>
            <DashboardGrid>
              <DashboardCard>
                <DashLabel><FaUsers /> Prestadores Ativos</DashLabel>
                <DashValue>{prestadores.length}</DashValue>
              </DashboardCard>
              <DashboardCard>
                <DashLabel><FaCode /> Projetos em Andamento</DashLabel>
                <DashValue>{projetos.filter(p => p.status === 'Em andamento').length}</DashValue>
              </DashboardCard>
              <DashboardCard>
                <DashLabel><FaBuilding /> Clientes Atendidos</DashLabel>
                <DashValue>{clientes.length}</DashValue>
              </DashboardCard>
              <DashboardCard>
                <DashLabel><FaRegCalendarAlt /> Serviços em Andamento</DashLabel>
                <DashValue>{servicos.filter(s => s.status === 'Em andamento').length}</DashValue>
              </DashboardCard>
            </DashboardGrid>
            <RecentBox>
              <RecentTitle>Projetos Recentes</RecentTitle>
              {projetos.length === 0 ? (
                <div style={{ color: '#666' }}>Nenhum projeto recente para exibir.</div>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {projetos.slice(-3).reverse().map((projeto, idx) => (
                    <li key={idx}>
                      <strong>{projeto.nome}</strong> - {projeto.status}
                    </li>
                  ))}
                </ul>
              )}
            </RecentBox>
          </>
        )}
        {activeTab === 1 ? (
          <>
            <FlexHeader>
              <Title>Gerenciamento de Prestadores</Title>
              <NewButton onClick={() => { setShowModal(true); setEditIdx(null); setForm(initialForm); }}>
                <FaPlus /> NOVO PRESTADOR
              </NewButton>
            </FlexHeader>
            <Table>
              <thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Especialidade</Th>
                  <Th>Nível</Th>
                  <Th>Tecnologias</Th>
                  <Th>Disponibilidade</Th>
                  <Th>Ações</Th>
                </Tr>
              </thead>
              <tbody>
                {prestadores.length === 0 ? (
                  <Tr>
                    <Td colSpan={6} style={{ color: '#888', textAlign: 'center', padding: 32 }}>
                      Nenhum prestador cadastrado
                    </Td>
                  </Tr>
                ) : (
                  prestadores.map((p, idx) => (
                    <Tr key={idx}>
                      <Td>{p.nome}</Td>
                      <Td>{p.especialidade}</Td>
                      <Td>{p.nivel}</Td>
                      <Td>{p.tecnologias}</Td>
                      <Td>{p.disponibilidade}</Td>
                      <Td>
                        <ActionGroup>
                          <ActionButton title="Editar" onClick={() => handleEdit(idx)}><FaEdit /></ActionButton>
                          <ActionButton danger title="Excluir" onClick={() => setShowDeleteIdx(idx)}><FaTrash /></ActionButton>
                          <ActionButton title="Visualizar Informações" onClick={() => setShowInfoIdx(idx)}><FaInfoCircle /></ActionButton>
                          <ActionButton title="Upload de Documentos" onClick={() => setShowUploadIdx(idx)}><FaUpload /></ActionButton>
                        </ActionGroup>
                      </Td>
                    </Tr>
                  ))
                )}
              </tbody>
            </Table>
            <Divider />
            {showModal && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>{editIdx !== null ? 'Editar Prestador' : 'Novo Prestador'}</ModalTitle>
                  <ModalForm onSubmit={handleSave}>
                    <ModalInput
                      name="nome"
                      placeholder="Nome completo"
                      value={form.nome}
                      onChange={handleInput}
                      required
                    />
                    <ModalInput
                      name="especialidade"
                      placeholder="Especialidade (ex: Backend, Frontend, DevOps...)"
                      value={form.especialidade}
                      onChange={handleInput}
                      required
                    />
                    <ModalSelect
                      name="nivel"
                      value={form.nivel}
                      onChange={handleInput}
                      required
                    >
                      <option value="">Selecione o nível</option>
                      <option value="Júnior">Júnior</option>
                      <option value="Pleno">Pleno</option>
                      <option value="Sênior">Sênior</option>
                      <option value="Especialista">Especialista</option>
                    </ModalSelect>
                    <ModalInput
                      name="tecnologias"
                      placeholder="Tecnologias (ex: React, Node.js, AWS...)"
                      value={form.tecnologias}
                      onChange={handleInput}
                      required
                    />
                    <ModalInput
                      name="disponibilidade"
                      placeholder="Disponibilidade (ex: 20h/semana, integral, PJ, CLT...)"
                      value={form.disponibilidade}
                      onChange={handleInput}
                      required
                    />
                    <ModalActions>
                      <CancelButton type="button" onClick={() => { setShowModal(false); setEditIdx(null); }}>
                        Cancelar
                      </CancelButton>
                      <SaveButton type="submit">Salvar</SaveButton>
                    </ModalActions>
                  </ModalForm>
                </ModalContent>
              </ModalOverlay>
            )}
            {showDeleteIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Confirmar Exclusão</ModalTitle>
                  <p>Tem certeza que deseja excluir o prestador <b>{prestadores[showDeleteIdx].nome}</b>?</p>
                  <ModalActions>
                    <CancelButton type="button" onClick={() => setShowDeleteIdx(null)}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={handleDelete}>
                      Excluir
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showInfoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Informações do Prestador</ModalTitle>
                  <InfoRow><strong>Nome:</strong> {prestadores[showInfoIdx].nome}</InfoRow>
                  <InfoRow><strong>Especialidade:</strong> {prestadores[showInfoIdx].especialidade}</InfoRow>
                  <InfoRow><strong>Nível:</strong> {prestadores[showInfoIdx].nivel}</InfoRow>
                  <InfoRow><strong>Tecnologias:</strong> {prestadores[showInfoIdx].tecnologias}</InfoRow>
                  <InfoRow><strong>Disponibilidade:</strong> {prestadores[showInfoIdx].disponibilidade}</InfoRow>
                  <ModalActions>
                    <SaveButton type="button" onClick={() => setShowInfoIdx(null)}>
                      Fechar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showUploadIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Upload de Documentos</ModalTitle>
                  <p>Selecione um arquivo para upload para o prestador <b>{prestadores[showUploadIdx].nome}</b>:</p>
                  <UploadInput type="file" onChange={handleUpload} />
                  {uploadFile && <p style={{ marginTop: 8 }}>Arquivo selecionado: <b>{uploadFile.name}</b></p>}
                  <ModalActions>
                    <CancelButton type="button" onClick={() => { setShowUploadIdx(null); setUploadFile(null); }}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={() => { setShowUploadIdx(null); setUploadFile(null); }}>
                      Enviar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
          </>
        ) : activeTab === 2 ? (
          <>
            <FlexHeader>
              <Title>Gerenciamento de Projetos</Title>
              <NewButton onClick={() => { setShowModalProjeto(true); setEditProjetoIdx(null); setFormProjeto(initialProjeto); }}>
                <FaPlus /> NOVO PROJETO
              </NewButton>
            </FlexHeader>
            <Table>
              <thead>
                <Tr>
                  <Th>Nome do Projeto</Th>
                  <Th>Cliente</Th>
                  <Th>Responsável</Th>
                  <Th>Status</Th>
                  <Th>Tecnologias</Th>
                  <Th>Ações</Th>
                </Tr>
              </thead>
              <tbody>
                {projetos.length === 0 ? (
                  <Tr>
                    <Td colSpan={6} style={{ color: '#888', textAlign: 'center', padding: 32 }}>
                      Nenhum projeto cadastrado
                    </Td>
                  </Tr>
                ) : (
                  projetos.map((p, idx) => (
                    <Tr key={idx}>
                      <Td>{p.nome}</Td>
                      <Td>{p.cliente}</Td>
                      <Td>{p.responsavel}</Td>
                      <Td>{p.status}</Td>
                      <Td>{p.tecnologias}</Td>
                      <Td>
                        <ActionGroup>
                          <ActionButton title="Editar" onClick={() => handleEditProjeto(idx)}><FaEdit /></ActionButton>
                          <ActionButton danger title="Excluir" onClick={() => setShowDeleteProjetoIdx(idx)}><FaTrash /></ActionButton>
                          <ActionButton title="Visualizar Informações" onClick={() => setShowInfoProjetoIdx(idx)}><FaInfoCircle /></ActionButton>
                          <ActionButton title="Upload de Documentos" onClick={() => setShowUploadProjetoIdx(idx)}><FaUpload /></ActionButton>
                        </ActionGroup>
                      </Td>
                    </Tr>
                  ))
                )}
              </tbody>
            </Table>
            <Divider />
            {showModalProjeto && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>{editProjetoIdx !== null ? 'Editar Projeto' : 'Novo Projeto'}</ModalTitle>
                  <ModalForm onSubmit={handleSaveProjeto}>
                    <ModalInput
                      name="nome"
                      placeholder="Nome do Projeto"
                      value={formProjeto.nome}
                      onChange={handleInputProjeto}
                      required
                    />
                    <ModalInput
                      name="cliente"
                      placeholder="Cliente"
                      value={formProjeto.cliente}
                      onChange={handleInputProjeto}
                      required
                    />
                    <ModalInput
                      name="responsavel"
                      placeholder="Responsável"
                      value={formProjeto.responsavel}
                      onChange={handleInputProjeto}
                      required
                    />
                    <ModalSelect
                      name="status"
                      value={formProjeto.status}
                      onChange={handleInputProjeto}
                      required
                    >
                      <option value="">Selecione o status</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Pendente">Pendente</option>
                    </ModalSelect>
                    <ModalInput
                      name="tecnologias"
                      placeholder="Tecnologias (ex: React, Node.js, AWS...)"
                      value={formProjeto.tecnologias}
                      onChange={handleInputProjeto}
                      required
                    />
                    <ModalActions>
                      <CancelButton type="button" onClick={() => { setShowModalProjeto(false); setEditProjetoIdx(null); }}>
                        Cancelar
                      </CancelButton>
                      <SaveButton type="submit">Salvar</SaveButton>
                    </ModalActions>
                  </ModalForm>
                </ModalContent>
              </ModalOverlay>
            )}
            {showDeleteProjetoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Confirmar Exclusão</ModalTitle>
                  <p>Tem certeza que deseja excluir o projeto <b>{projetos[showDeleteProjetoIdx].nome}</b>?</p>
                  <ModalActions>
                    <CancelButton type="button" onClick={() => setShowDeleteProjetoIdx(null)}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={handleDeleteProjeto}>
                      Excluir
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showInfoProjetoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Informações do Projeto</ModalTitle>
                  <InfoRow><strong>Nome:</strong> {projetos[showInfoProjetoIdx].nome}</InfoRow>
                  <InfoRow><strong>Cliente:</strong> {projetos[showInfoProjetoIdx].cliente}</InfoRow>
                  <InfoRow><strong>Responsável:</strong> {projetos[showInfoProjetoIdx].responsavel}</InfoRow>
                  <InfoRow><strong>Status:</strong> {projetos[showInfoProjetoIdx].status}</InfoRow>
                  <InfoRow><strong>Tecnologias:</strong> {projetos[showInfoProjetoIdx].tecnologias}</InfoRow>
                  <ModalActions>
                    <SaveButton type="button" onClick={() => setShowInfoProjetoIdx(null)}>
                      Fechar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showUploadProjetoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Upload de Documentos</ModalTitle>
                  <p>Selecione um arquivo para upload para o projeto <b>{projetos[showUploadProjetoIdx].nome}</b>:</p>
                  <UploadInput type="file" onChange={handleUploadProjeto} />
                  {uploadFileProjeto && <p style={{ marginTop: 8 }}>Arquivo selecionado: <b>{uploadFileProjeto.name}</b></p>}
                  <ModalActions>
                    <CancelButton type="button" onClick={() => { setShowUploadProjetoIdx(null); setUploadFileProjeto(null); }}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={() => { setShowUploadProjetoIdx(null); setUploadFileProjeto(null); }}>
                      Enviar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
          </>
        ) : activeTab === 3 ? (
          <>
            <FlexHeader>
              <Title>Gerenciamento de Clientes</Title>
              <NewButton onClick={() => { setShowModalCliente(true); setEditClienteIdx(null); setFormCliente(initialCliente); }}>
                <FaPlus /> NOVO CLIENTE
              </NewButton>
            </FlexHeader>
            <Table>
              <thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>CNPJ/CPF</Th>
                  <Th>Responsável</Th>
                  <Th>E-mail</Th>
                  <Th>Telefone</Th>
                  <Th>Ações</Th>
                </Tr>
              </thead>
              <tbody>
                {clientes.length === 0 ? (
                  <Tr>
                    <Td colSpan={6} style={{ color: '#888', textAlign: 'center', padding: 32 }}>
                      Nenhum cliente cadastrado
                    </Td>
                  </Tr>
                ) : (
                  clientes.map((c, idx) => (
                    <Tr key={idx}>
                      <Td>{c.nome}</Td>
                      <Td>{c.documento}</Td>
                      <Td>{c.responsavel}</Td>
                      <Td>{c.email}</Td>
                      <Td>{c.telefone}</Td>
                      <Td>
                        <ActionGroup>
                          <ActionButton title="Editar" onClick={() => handleEditCliente(idx)}><FaEdit /></ActionButton>
                          <ActionButton danger title="Excluir" onClick={() => setShowDeleteClienteIdx(idx)}><FaTrash /></ActionButton>
                          <ActionButton title="Visualizar Informações" onClick={() => setShowInfoClienteIdx(idx)}><FaInfoCircle /></ActionButton>
                          <ActionButton title="Upload de Documentos" onClick={() => setShowUploadClienteIdx(idx)}><FaUpload /></ActionButton>
                        </ActionGroup>
                      </Td>
                    </Tr>
                  ))
                )}
              </tbody>
            </Table>
            <Divider />
            {showModalCliente && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>{editClienteIdx !== null ? 'Editar Cliente' : 'Novo Cliente'}</ModalTitle>
                  <ModalForm onSubmit={handleSaveCliente}>
                    <ModalInput
                      name="nome"
                      placeholder="Nome do Cliente"
                      value={formCliente.nome}
                      onChange={handleInputCliente}
                      required
                    />
                    <ModalInput
                      name="documento"
                      placeholder="CNPJ/CPF"
                      value={formCliente.documento}
                      onChange={handleInputCliente}
                      required
                    />
                    <ModalInput
                      name="responsavel"
                      placeholder="Responsável"
                      value={formCliente.responsavel}
                      onChange={handleInputCliente}
                      required
                    />
                    <ModalInput
                      name="email"
                      placeholder="E-mail"
                      value={formCliente.email}
                      onChange={handleInputCliente}
                      required
                    />
                    <ModalInput
                      name="telefone"
                      placeholder="Telefone"
                      value={formCliente.telefone}
                      onChange={handleInputCliente}
                      required
                    />
                    <ModalActions>
                      <CancelButton type="button" onClick={() => { setShowModalCliente(false); setEditClienteIdx(null); }}>
                        Cancelar
                      </CancelButton>
                      <SaveButton type="submit">Salvar</SaveButton>
                    </ModalActions>
                  </ModalForm>
                </ModalContent>
              </ModalOverlay>
            )}
            {showDeleteClienteIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Confirmar Exclusão</ModalTitle>
                  <p>Tem certeza que deseja excluir o cliente <b>{clientes[showDeleteClienteIdx].nome}</b>?</p>
                  <ModalActions>
                    <CancelButton type="button" onClick={() => setShowDeleteClienteIdx(null)}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={handleDeleteCliente}>
                      Excluir
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showInfoClienteIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Informações do Cliente</ModalTitle>
                  <InfoRow><strong>Nome:</strong> {clientes[showInfoClienteIdx].nome}</InfoRow>
                  <InfoRow><strong>CNPJ/CPF:</strong> {clientes[showInfoClienteIdx].documento}</InfoRow>
                  <InfoRow><strong>Responsável:</strong> {clientes[showInfoClienteIdx].responsavel}</InfoRow>
                  <InfoRow><strong>E-mail:</strong> {clientes[showInfoClienteIdx].email}</InfoRow>
                  <InfoRow><strong>Telefone:</strong> {clientes[showInfoClienteIdx].telefone}</InfoRow>
                  <ModalActions>
                    <SaveButton type="button" onClick={() => setShowInfoClienteIdx(null)}>
                      Fechar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showUploadClienteIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Upload de Documentos</ModalTitle>
                  <p>Selecione um arquivo para upload para o cliente <b>{clientes[showUploadClienteIdx].nome}</b>:</p>
                  <UploadInput type="file" onChange={handleUploadCliente} />
                  {uploadFileCliente && <p style={{ marginTop: 8 }}>Arquivo selecionado: <b>{uploadFileCliente.name}</b></p>}
                  <ModalActions>
                    <CancelButton type="button" onClick={() => { setShowUploadClienteIdx(null); setUploadFileCliente(null); }}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={() => { setShowUploadClienteIdx(null); setUploadFileCliente(null); }}>
                      Enviar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
          </>
        ) : activeTab === 4 ? (
          <>
            <FlexHeader>
              <Title>Gerenciamento de Serviços</Title>
              <NewButton onClick={() => { setShowModalServico(true); setEditServicoIdx(null); setFormServico(initialServico); }}>
                <FaPlus /> NOVO SERVIÇO
              </NewButton>
            </FlexHeader>
            <Table>
              <thead>
                <Tr>
                  <Th>Nome do Serviço</Th>
                  <Th>Projeto Relacionado</Th>
                  <Th>Responsável</Th>
                  <Th>Status</Th>
                  <Th>Descrição</Th>
                  <Th>Ações</Th>
                </Tr>
              </thead>
              <tbody>
                {servicos.length === 0 ? (
                  <Tr>
                    <Td colSpan={6} style={{ color: '#888', textAlign: 'center', padding: 32 }}>
                      Nenhum serviço cadastrado
                    </Td>
                  </Tr>
                ) : (
                  servicos.map((s, idx) => (
                    <Tr key={idx}>
                      <Td>{s.nome}</Td>
                      <Td>{s.projeto}</Td>
                      <Td>{s.responsavel}</Td>
                      <Td>{s.status}</Td>
                      <Td>{s.descricao}</Td>
                      <Td>
                        <ActionGroup>
                          <ActionButton title="Editar" onClick={() => handleEditServico(idx)}><FaEdit /></ActionButton>
                          <ActionButton danger title="Excluir" onClick={() => setShowDeleteServicoIdx(idx)}><FaTrash /></ActionButton>
                          <ActionButton title="Visualizar Informações" onClick={() => setShowInfoServicoIdx(idx)}><FaInfoCircle /></ActionButton>
                          <ActionButton title="Upload de Documentos" onClick={() => setShowUploadServicoIdx(idx)}><FaUpload /></ActionButton>
                        </ActionGroup>
                      </Td>
                    </Tr>
                  ))
                )}
              </tbody>
            </Table>
            <Divider />
            {showModalServico && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>{editServicoIdx !== null ? 'Editar Serviço' : 'Novo Serviço'}</ModalTitle>
                  <ModalForm onSubmit={handleSaveServico}>
                    <ModalInput
                      name="nome"
                      placeholder="Nome do Serviço"
                      value={formServico.nome}
                      onChange={handleInputServico}
                      required
                    />
                    <ModalInput
                      name="projeto"
                      placeholder="Projeto Relacionado"
                      value={formServico.projeto}
                      onChange={handleInputServico}
                      required
                    />
                    <ModalInput
                      name="responsavel"
                      placeholder="Responsável"
                      value={formServico.responsavel}
                      onChange={handleInputServico}
                      required
                    />
                    <ModalSelect
                      name="status"
                      value={formServico.status}
                      onChange={handleInputServico}
                      required
                    >
                      <option value="">Selecione o status</option>
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Em andamento">Em andamento</option>
                    </ModalSelect>
                    <ModalInput
                      name="descricao"
                      placeholder="Descrição"
                      value={formServico.descricao}
                      onChange={handleInputServico}
                      required
                    />
                    <ModalActions>
                      <CancelButton type="button" onClick={() => { setShowModalServico(false); setEditServicoIdx(null); }}>
                        Cancelar
                      </CancelButton>
                      <SaveButton type="submit">Salvar</SaveButton>
                    </ModalActions>
                  </ModalForm>
                </ModalContent>
              </ModalOverlay>
            )}
            {showDeleteServicoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Confirmar Exclusão</ModalTitle>
                  <p>Tem certeza que deseja excluir o serviço <b>{servicos[showDeleteServicoIdx].nome}</b>?</p>
                  <ModalActions>
                    <CancelButton type="button" onClick={() => setShowDeleteServicoIdx(null)}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={handleDeleteServico}>
                      Excluir
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showInfoServicoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Informações do Serviço</ModalTitle>
                  <InfoRow><strong>Nome:</strong> {servicos[showInfoServicoIdx].nome}</InfoRow>
                  <InfoRow><strong>Projeto Relacionado:</strong> {servicos[showInfoServicoIdx].projeto}</InfoRow>
                  <InfoRow><strong>Responsável:</strong> {servicos[showInfoServicoIdx].responsavel}</InfoRow>
                  <InfoRow><strong>Status:</strong> {servicos[showInfoServicoIdx].status}</InfoRow>
                  <InfoRow><strong>Descrição:</strong> {servicos[showInfoServicoIdx].descricao}</InfoRow>
                  <ModalActions>
                    <SaveButton type="button" onClick={() => setShowInfoServicoIdx(null)}>
                      Fechar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
            {showUploadServicoIdx !== null && (
              <ModalOverlay>
                <ModalContent>
                  <ModalTitle>Upload de Documentos</ModalTitle>
                  <p>Selecione um arquivo para upload para o serviço <b>{servicos[showUploadServicoIdx].nome}</b>:</p>
                  <UploadInput type="file" onChange={handleUploadServico} />
                  {uploadFileServico && <p style={{ marginTop: 8 }}>Arquivo selecionado: <b>{uploadFileServico.name}</b></p>}
                  <ModalActions>
                    <CancelButton type="button" onClick={() => { setShowUploadServicoIdx(null); setUploadFileServico(null); }}>
                      Cancelar
                    </CancelButton>
                    <SaveButton type="button" onClick={() => { setShowUploadServicoIdx(null); setUploadFileServico(null); }}>
                      Enviar
                    </SaveButton>
                  </ModalActions>
                </ModalContent>
              </ModalOverlay>
            )}
          </>
        ) : menuContent[activeTab]}
      </Card>
    </Container>
  );
};

export default PostosServicoPage; 