import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSyncAlt } from "react-icons/fa";
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const tiposContrato = [
  "Desenvolvimento de Software",
  "Suporte Técnico",
  "Consultoria em TI",
  "Infraestrutura de Redes",
  "Cloud Computing",
  "Segurança da Informação",
  "Outros Serviços de TI"
];
const contratosVinculados = ["1221272618", "1212", "3456"];
const insumosNecessarios = [
  "Licenças de Software",
  "Servidores",
  "Computadores",
  "Acessórios de Rede",
  "Serviços em Nuvem",
  "Consultoria Especializada",
  "Mão de Obra Técnica",
  "Documentação Técnica",
  "Equipamentos de Backup",
  "Outros Insumos de TI"
];

interface OrdemServicoForm {
  prazo: string;
  tipoContrato: string;
  insumos: string[];
  contratoVinculado: string;
}

export default function OrdensServicoPage() {
  const [ordens, setOrdens] = useState<any[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [editandoIdx, setEditandoIdx] = useState<number | null>(null);
  const [visualizandoIdx, setVisualizandoIdx] = useState<number | null>(null);
  const [alterandoStatusIdx, setAlterandoStatusIdx] = useState<number | null>(null);
  const [novoStatus, setNovoStatus] = useState('');
  const [statusOptions] = useState([
    'Aguardando Insumos',
    'Aguardando Contratação da Equipe',
    'Em Andamento',
    'Concluído',
  ]);
  const [form, setForm] = useState<OrdemServicoForm>({
    prazo: "",
    tipoContrato: "",
    insumos: [""],
    contratoVinculado: "",
  });

  function abrirModal() {
    setForm({ prazo: "", tipoContrato: "", insumos: [], contratoVinculado: "" });
    setModalAberto(true);
  }
  function abrirModalEdicao(idx: number) {
    setForm({ ...ordens[idx], insumos: ordens[idx].insumos || [] });
    setEditandoIdx(idx);
    setModalAberto(true);
  }
  function fecharModal() {
    setModalAberto(false);
    setEditandoIdx(null);
  }
  function handleChange(e: any) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleInsumos(e: any) {
    const options = Array.from(e.target.selectedOptions).map((o: any) => o.value as string);
    setForm((f) => ({ ...f, insumos: options }));
  }
  function salvarOrdem() {
    if (!form.prazo || !form.tipoContrato || !form.insumos.length || !form.contratoVinculado) return;
    if (editandoIdx !== null) {
      setOrdens(o => o.map((ordem, idx) => idx === editandoIdx ? { ...form, numero: ordem.numero } : ordem));
      setEditandoIdx(null);
      toast.success('Ordem de serviço editada com sucesso!');
    } else {
      setOrdens((o) => [
        ...o,
        {
          numero: `OS${o.length + 1}`,
          contrato: form.contratoVinculado,
          data: form.prazo,
          status: "Aguardando Insumos",
          ...form,
        },
      ]);
      toast.success('Ordem de serviço cadastrada com sucesso!');
    }
    setModalAberto(false);
  }
  function excluirOrdem(idx: number) {
    setOrdens(o => o.filter((_, i) => i !== idx));
    toast.success('Ordem de serviço excluída com sucesso!');
  }

  return (
    <div style={{ background: '#fff', borderRadius: 12, padding: 24, margin: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Gerenciamento de Ordem de Serviço</h1>
        <button onClick={abrirModal} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
          <FaPlus size={18} /> NOVA ORDEM DE SERVIÇO
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
        <thead>
          <tr style={{ color: '#232b36', fontWeight: 700, fontSize: 17 }}>
            <th style={{ textAlign: 'left', padding: '12px 0' }}>Número</th>
            <th style={{ textAlign: 'left', padding: '12px 0' }}>Contrato</th>
            <th style={{ textAlign: 'left', padding: '12px 0' }}>Data</th>
            <th style={{ textAlign: 'left', padding: '12px 0' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '12px 0' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {ordens.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#888', padding: 32 }}>
                Nenhuma ordem de serviço cadastrada
              </td>
            </tr>
          ) : (
            ordens.map((ordem, idx) => (
              <tr key={ordem.numero} style={{ borderTop: '1px solid #eee' }}>
                <td style={{ padding: '16px 0' }}>{ordem.numero}</td>
                <td style={{ padding: '16px 0' }}>{ordem.contrato}</td>
                <td style={{ padding: '16px 0' }}>{ordem.data}</td>
                <td style={{ padding: '16px 0' }}>{ordem.status}</td>
                <td style={{ padding: '16px 0' }}>
                  <span style={{ display: 'inline-flex', gap: 16 }}>
                    <FaEdit style={{ color: '#1976d2', cursor: 'pointer' }} title="Editar" onClick={() => abrirModalEdicao(idx)} />
                    <FaTrash style={{ color: '#e53935', cursor: 'pointer' }} title="Excluir" onClick={() => excluirOrdem(idx)} />
                    <FaEye style={{ color: '#1976d2', cursor: 'pointer' }} title="Visualizar" onClick={() => setVisualizandoIdx(idx)} />
                    <FaSyncAlt style={{ color: '#1976d2', cursor: 'pointer' }} title="Atualizar" onClick={() => { setAlterandoStatusIdx(idx); setNovoStatus(ordem.status); }} />
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalAberto && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.18)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: '38px 36px 32px 36px', minWidth: 820, maxWidth: 900, boxShadow: '0 8px 32px rgba(35,57,93,0.13)' }}>
            <h2 style={{ fontWeight: 700, fontSize: 30, color: '#23395d', marginBottom: 32, letterSpacing: 0.2, textAlign: 'left' }}>{editandoIdx !== null ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}</h2>
            <form onSubmit={e => { e.preventDefault(); salvarOrdem(); }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
                  <input type="date" name="prazo" value={form.prazo} onChange={handleChange} placeholder="Prazo de Início *" style={{ width: '100%', minWidth: 0, boxSizing: 'border-box', height: 48, padding: '0 16px', borderRadius: 7, border: '1px solid #d9d9d9', fontSize: 17, marginBottom: 2, background: '#fff', color: '#232b36', fontWeight: 400 }} />
                  <span style={{ color: '#888', fontSize: 13, marginTop: 4, marginLeft: 2 }}>Selecione a data de início</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
                  <select name="tipoContrato" value={form.tipoContrato} onChange={handleChange} style={{ width: '100%', height: 48, padding: '0 16px', borderRadius: 7, border: '1px solid #d9d9d9', fontSize: 17, marginBottom: 2, background: '#fff', color: form.tipoContrato ? '#232b36' : '#888', fontWeight: 400 }}>
                    <option value="" disabled hidden>Tipo de Contrato *</option>
                    {tiposContrato.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
                  <Select
                    isMulti
                    name="insumos"
                    options={insumosNecessarios.map(i => ({ value: i, label: i }))}
                    value={form.insumos.filter(Boolean).map(i => ({ value: i, label: i }))}
                    onChange={opts => setForm(f => ({ ...f, insumos: Array.isArray(opts) ? opts.map(o => o.value) : [] }))}
                    placeholder="Insumos Necessários *"
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        minHeight: 48,
                        borderRadius: 7,
                        borderColor: state.isFocused ? '#1976d2' : '#d9d9d9',
                        boxShadow: state.isFocused ? '0 0 0 1.5px #1976d2' : 'none',
                        fontSize: 17,
                        paddingLeft: 2,
                        background: '#fff',
                      }),
                      multiValue: base => ({ ...base, background: '#ededed', borderRadius: 18, padding: '2px 8px' }),
                      multiValueLabel: base => ({ ...base, color: '#232b36', fontWeight: 500 }),
                      multiValueRemove: base => ({ ...base, color: '#888', ':hover': { background: '#e3e6ea', color: '#e53935' } }),
                    }}
                  />
                  <span style={{ color: '#888', fontSize: 13, marginTop: 4, marginLeft: 2 }}>Selecione todos os insumos necessários para a ordem.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 18 }}>
                  <input type="number" name="contratoVinculado" value={form.contratoVinculado} onChange={handleChange} placeholder="Contrato Vinculado *" style={{ width: '100%', minWidth: 0, boxSizing: 'border-box', height: 48, padding: '0 16px', borderRadius: 7, border: '1px solid #d9d9d9', fontSize: 17, marginBottom: 2, background: '#fff', color: '#232b36', fontWeight: 400 }} />
                  <span style={{ color: '#888', fontSize: 13, marginTop: 4, marginLeft: 2 }}>Informe o contrato público relacionado à ordem.</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, marginTop: 8 }}>
                <button type="button" onClick={fecharModal} style={{ border: '1.5px solid #232b36', background: '#fff', color: '#232b36', borderRadius: 6, padding: '10px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1 }}>CANCELAR</button>
                <button type="submit" disabled={!form.prazo || !form.tipoContrato || !form.insumos.length || !form.contratoVinculado} style={{ background: (!form.prazo || !form.tipoContrato || !form.insumos.length || !form.contratoVinculado) ? '#e3e6ea' : '#007bff', color: (!form.prazo || !form.tipoContrato || !form.insumos.length || !form.contratoVinculado) ? '#b0b0b0' : '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 700, fontSize: 15, cursor: (!form.prazo || !form.tipoContrato || !form.insumos.length || !form.contratoVinculado) ? 'not-allowed' : 'pointer', textTransform: 'uppercase', letterSpacing: 1 }}>SALVAR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {visualizandoIdx !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.18)', zIndex: 1100,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 8, minWidth: 500, maxWidth: 600, boxShadow: '0 8px 32px rgba(35,57,93,0.13)', padding: 0, overflow: 'hidden' }}>
            <div style={{ borderBottom: '1px solid #eee', padding: '28px 32px 18px 32px' }}>
              <h2 style={{ fontWeight: 600, fontSize: 26, color: '#232b36', margin: 0 }}>Detalhes da Ordem de Serviço</h2>
            </div>
            <div style={{ padding: '24px 32px 12px 32px', fontSize: 18, color: '#232b36' }}>
              <div style={{ marginBottom: 10 }}><b>Número:</b> {ordens[visualizandoIdx].numero}</div>
              <div style={{ marginBottom: 10 }}><b>Contrato Vinculado:</b> {ordens[visualizandoIdx].contratoVinculado || ordens[visualizandoIdx].contrato}</div>
              <div style={{ marginBottom: 10 }}><b>Tipo de Contrato:</b> {ordens[visualizandoIdx].tipoContrato}</div>
              <div style={{ marginBottom: 10 }}><b>Prazo de Início:</b> {ordens[visualizandoIdx].prazo || ordens[visualizandoIdx].data}</div>
              <div style={{ marginBottom: 10 }}><b>Status:</b> {ordens[visualizandoIdx].status}</div>
              <div style={{ marginBottom: 10 }}><b>Data de Cadastro:</b> {ordens[visualizandoIdx].data}</div>
              <div style={{ marginBottom: 10 }}><b>Insumos:</b> {Array.isArray(ordens[visualizandoIdx].insumos) ? ordens[visualizandoIdx].insumos.join(', ') : ordens[visualizandoIdx].insumos}</div>
            </div>
            <div style={{ borderTop: '1px solid #eee', padding: '16px 32px', textAlign: 'right' }}>
              <button onClick={() => setVisualizandoIdx(null)} style={{ background: 'none', border: 'none', color: '#1976d2', fontWeight: 600, fontSize: 17, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1 }}>FECHAR</button>
            </div>
          </div>
        </div>
      )}

      {alterandoStatusIdx !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.18)', zIndex: 1200,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ background: '#fff', borderRadius: 8, minWidth: 320, maxWidth: 340, boxShadow: '0 8px 32px rgba(35,57,93,0.13)', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 10px 24px' }}>
              <h2 style={{ fontWeight: 600, fontSize: 24, color: '#232b36', margin: 0, marginBottom: 18 }}>Alterar Status</h2>
              <div style={{ border: '1.5px solid #1976d2', borderRadius: 7, padding: '8px 12px 4px 12px', marginBottom: 18 }}>
                <div style={{ color: '#1976d2', fontWeight: 500, fontSize: 15, marginBottom: 2 }}>Novo Status</div>
                <select value={novoStatus} onChange={e => setNovoStatus(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: 20, color: '#232b36', background: 'transparent', fontWeight: 400, marginBottom: 2 }}>
                  {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 18 }}>
                <button onClick={() => {
                  setOrdens(o => o.map((ordem, idx) => idx === alterandoStatusIdx ? { ...ordem, status: novoStatus } : ordem));
                  setAlterandoStatusIdx(null);
                  toast.success('Status alterado com sucesso!');
                }} style={{ background: 'none', border: 'none', color: '#1976d2', fontWeight: 600, fontSize: 17, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1 }}>APLICAR</button>
                <button onClick={() => setAlterandoStatusIdx(null)} style={{ background: 'none', border: 'none', color: '#1976d2', fontWeight: 600, fontSize: 17, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 1 }}>CANCELAR</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
} 