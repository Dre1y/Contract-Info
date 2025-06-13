import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Colaborador {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  cep: string;
  endereco: string;
  bairro: string;
  estado: string;
  razaoSocial: string;
}

export interface Contrato {
  id: string;
  contratanteId: string;
  contratante?: Empresa;
  tipoServico: "CONSULTORIA" | "MANUTENCAO" | "DESENVOLVIMENTO";
  descricao: string;
  dataInicio: string;
  dataTermino: string;
  valorContrato: number;
}

export interface Agregado {
  id: string;
  contratoId: string;
  colaboradorId: string;
  colaborador?: Colaborador;
  cargo: string;
  descricaoCargo: string;
}

export interface Aditivo {
  id: string;
  contratoId: string;
  tipo: "PRORROGACAO" | "REAJUSTE" | "ALTERACAO";
  valorAjustado: number;
  motivoAditivo: string;
  status: "PENDENTE" | "APROVADO" | "REJEITADO" | "CONCLUIDO" | "CANCELADO";
}

export interface Repactuacao {
  id: string;
  contratoId: string;
  novoPrazo: string;
  motivoRepactuacao: string;
  status: "PENDENTE" | "APROVADO" | "REJEITADO" | "CONCLUIDO" | "CANCELADO";
}

export interface Entregavel {
  id: string;
  contratoId: string;
  descricao: string;
  dataEntrega: string;
  status: "PENDENTE" | "APROVADO" | "REJEITADO" | "CONCLUIDO" | "CANCELADO";
}

export interface Anexo {
  id: string;
  contratoId: string;
  nomeArquivo?: string;
  arquivo?: File;
}

interface ContractContextType {
  colaboradores: Colaborador[];
  empresas: Empresa[];
  contratos: Contrato[];
  agregados: Agregado[];
  aditivos: Aditivo[];
  repactuacoes: Repactuacao[];
  entregaveis: Entregavel[];
  anexos: Anexo[];
  selectedContrato: Contrato | null;
  addColaborador: (colaborador: Omit<Colaborador, "id">) => Promise<void>;
  updateColaborador: (id: string, colaborador: Omit<Colaborador, "id">) => Promise<void>;
  deleteColaborador: (id: string) => Promise<void>;
  addEmpresa: (empresa: Omit<Empresa, "id">) => Promise<void>;
  updateEmpresa: (id: string, empresa: Omit<Empresa, "id">) => Promise<void>;
  deleteEmpresa: (id: string) => Promise<void>;
  addContrato: (contrato: Omit<Contrato, "id">) => Promise<void>;
  updateContrato: (id: string, contrato: Omit<Contrato, "id">) => Promise<void>;
  deleteContrato: (id: string) => Promise<void>;
  selectContrato: (contrato: Contrato | null) => void;
  addAgregado: (agregado: Omit<Agregado, "id">) => Promise<void>;
  updateAgregado: (id: string, agregado: Omit<Agregado, "id">) => Promise<void>;
  deleteAgregado: (id: string) => Promise<void>;
  addAditivo: (aditivo: Omit<Aditivo, "id">) => Promise<void>;
  updateAditivo: (id: string, aditivo: Omit<Aditivo, "id">) => Promise<void>;
  deleteAditivo: (id: string) => Promise<void>;
  addRepactuacao: (repactuacao: Omit<Repactuacao, "id">) => Promise<void>;
  updateRepactuacao: (id: string, repactuacao: Omit<Repactuacao, "id">) => Promise<void>;
  deleteRepactuacao: (id: string) => Promise<void>;
  addEntregavel: (entregavel: Omit<Entregavel, "id">) => Promise<void>;
  updateEntregavel: (id: string, entregavel: Omit<Entregavel, "id">) => Promise<void>;
  deleteEntregavel: (id: string) => Promise<void>;
  addAnexo: (anexo: Omit<Anexo, "id">) => Promise<void>;
  updateAnexo: (id: string, anexo: Omit<Anexo, "id">) => Promise<void>;
  deleteAnexo: (id: string) => Promise<void>;
  getContratoValorTotal: (contratoId: string) => number;
  loadData: () => Promise<void>;
}

const ContractContext = createContext<ContractContextType | undefined>(
  undefined
);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [agregados, setAgregados] = useState<Agregado[]>([]);
  const [aditivos, setAditivos] = useState<Aditivo[]>([]);
  const [repactuacoes, setRepactuacoes] = useState<Repactuacao[]>([]);
  const [entregaveis, setEntregaveis] = useState<Entregavel[]>([]);
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      console.log("Carregando dados do Supabase...");
      
      // Carregar colaboradores
      const { data: colaboradoresData, error: colaboradoresError } = await supabase
        .from('colaboradores')
        .select('*');
      
      if (colaboradoresError) {
        console.error("Erro ao carregar colaboradores:", colaboradoresError);
      } else {
        console.log("Colaboradores carregados:", colaboradoresData);
        setColaboradores(colaboradoresData || []);
      }

      // Carregar empresas
      const { data: empresasData, error: empresasError } = await supabase
        .from('empresas')
        .select('*');
      
      if (empresasError) {
        console.error("Erro ao carregar empresas:", empresasError);
      } else {
        console.log("Empresas carregadas:", empresasData);
        setEmpresas(empresasData?.map(empresa => ({
          id: empresa.id,
          nome: empresa.nome,
          cnpj: empresa.cnpj,
          email: empresa.email || '',
          telefone: empresa.telefone || '',
          cep: empresa.cep || '',
          endereco: empresa.endereco || '',
          bairro: empresa.bairro || '',
          estado: empresa.estado || '',
          razaoSocial: empresa.razao_social || '',
        })) || []);
      }

      // Carregar contratos
      const { data: contratosData, error: contratosError } = await supabase
        .from('contratos')
        .select('*, empresas(*)');
      
      if (contratosError) {
        console.error("Erro ao carregar contratos:", contratosError);
      } else {
        console.log("Contratos carregados:", contratosData);
        const contratosFormatted = contratosData?.map(contrato => ({
          id: contrato.id,
          contratanteId: contrato.contratante_id,
          contratante: contrato.empresas ? {
            id: contrato.empresas.id,
            nome: contrato.empresas.nome,
            cnpj: contrato.empresas.cnpj,
            email: contrato.empresas.email || '',
            telefone: contrato.empresas.telefone || '',
            cep: contrato.empresas.cep || '',
            endereco: contrato.empresas.endereco || '',
            bairro: contrato.empresas.bairro || '',
            estado: contrato.empresas.estado || '',
            razaoSocial: contrato.empresas.razao_social || '',
          } : undefined,
          tipoServico: contrato.tipo_servico as "CONSULTORIA" | "MANUTENCAO" | "DESENVOLVIMENTO",
          descricao: contrato.descricao,
          dataInicio: contrato.data_inicio,
          dataTermino: contrato.data_termino,
          valorContrato: Number(contrato.valor_contrato),
        })) || [];
        setContratos(contratosFormatted);
      }

      // Carregar agregados
      const { data: agregadosData, error: agregadosError } = await supabase
        .from('agregados')
        .select('*, colaboradores(*)');
      
      if (agregadosError) {
        console.error("Erro ao carregar agregados:", agregadosError);
      } else {
        const agregadosFormatted = agregadosData?.map(agregado => ({
          id: agregado.id,
          contratoId: agregado.contrato_id,
          colaboradorId: agregado.colaborador_id,
          colaborador: agregado.colaboradores ? {
            id: agregado.colaboradores.id,
            nome: agregado.colaboradores.nome,
            cpf: agregado.colaboradores.cpf,
            email: agregado.colaboradores.email || '',
            telefone: agregado.colaboradores.telefone || '',
          } : undefined,
          cargo: agregado.cargo,
          descricaoCargo: agregado.descricao_cargo || '',
        })) || [];
        setAgregados(agregadosFormatted);
      }

      // Carregar aditivos
      const { data: aditivosData, error: aditivosError } = await supabase
        .from('aditivos')
        .select('*');
      
      if (aditivosError) {
        console.error("Erro ao carregar aditivos:", aditivosError);
      } else {
        const aditivosFormatted = aditivosData?.map(aditivo => ({
          id: aditivo.id,
          contratoId: aditivo.contrato_id,
          tipo: aditivo.tipo as "PRORROGACAO" | "REAJUSTE" | "ALTERACAO",
          valorAjustado: Number(aditivo.valor_ajustado),
          motivoAditivo: aditivo.motivo_aditivo,
          status: aditivo.status as "PENDENTE" | "APROVADO" | "REJEITADO" | "CONCLUIDO" | "CANCELADO",
        })) || [];
        setAditivos(aditivosFormatted);
      }

      // Carregar repactuações
      const { data: repactuacoesData, error: repactuacoesError } = await supabase
        .from('repactuacoes')
        .select('*');
      
      if (repactuacoesError) {
        console.error("Erro ao carregar repactuações:", repactuacoesError);
      } else {
        const repactuacoesFormatted = repactuacoesData?.map(repactuacao => ({
          id: repactuacao.id,
          contratoId: repactuacao.contrato_id,
          novoPrazo: repactuacao.novo_prazo,
          motivoRepactuacao: repactuacao.motivo_repactuacao,
          status: repactuacao.status as "PENDENTE" | "APROVADO" | "REJEITADO" | "CONCLUIDO" | "CANCELADO",
        })) || [];
        setRepactuacoes(repactuacoesFormatted);
      }

      // Carregar entregáveis
      const { data: entregaveisData, error: entregaveisError } = await supabase
        .from('entregaveis')
        .select('*');
      
      if (entregaveisError) {
        console.error("Erro ao carregar entregáveis:", entregaveisError);
      } else {
        const entregaveisFormatted = entregaveisData?.map(entregavel => ({
          id: entregavel.id,
          contratoId: entregavel.contrato_id,
          descricao: entregavel.descricao,
          dataEntrega: entregavel.data_entrega,
          status: entregavel.status as "PENDENTE" | "APROVADO" | "REJEITADO" | "CONCLUIDO" | "CANCELADO",
        })) || [];
        setEntregaveis(entregaveisFormatted);
      }

    } catch (error) {
      console.error("Erro geral ao carregar dados:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getContratoValorTotal = (contratoId: string) => {
    const contrato = contratos.find((c) => c.id === contratoId);
    if (!contrato) return 0;

    const aditivosAprovados = aditivos.filter(
      (a) => a.contratoId === contratoId && a.status === "APROVADO"
    );

    const totalAditivos = aditivosAprovados.reduce(
      (sum, aditivo) => sum + aditivo.valorAjustado,
      0
    );

    return contrato.valorContrato + totalAditivos;
  };

  const addColaborador = async (colaborador: Omit<Colaborador, "id">) => {
    try {
      console.log("Adicionando colaborador:", colaborador);
      const { data, error } = await supabase
        .from('colaboradores')
        .insert([colaborador])
        .select()
        .single();

      if (error) {
        console.error("Erro ao adicionar colaborador:", error);
        toast({
          title: "Erro",
          description: "Erro ao adicionar colaborador: " + error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Colaborador adicionado com sucesso:", data);
      setColaboradores(prev => [...prev, data]);
      toast({
        title: "Sucesso",
        description: "Colaborador adicionado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao adicionar colaborador:", error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao adicionar colaborador",
        variant: "destructive",
      });
    }
  };

  const updateColaborador = async (id: string, colaborador: Omit<Colaborador, "id">) => {
    try {
      const { data, error } = await supabase
        .from('colaboradores')
        .update(colaborador)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar colaborador:", error);
        return;
      }

      setColaboradores(prev => prev.map(c => c.id === id ? data : c));
    } catch (error) {
      console.error("Erro ao atualizar colaborador:", error);
    }
  };

  const deleteColaborador = async (id: string) => {
    try {
      const { error } = await supabase
        .from('colaboradores')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar colaborador:", error);
        return;
      }

      setColaboradores(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error("Erro ao deletar colaborador:", error);
    }
  };

  const addEmpresa = async (empresa: Omit<Empresa, "id">) => {
    try {
      console.log("Adicionando empresa:", empresa);
      const empresaData = {
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        email: empresa.email,
        telefone: empresa.telefone,
        cep: empresa.cep,
        endereco: empresa.endereco,
        bairro: empresa.bairro,
        estado: empresa.estado,
        razao_social: empresa.razaoSocial,
      };

      const { data, error } = await supabase
        .from('empresas')
        .insert([empresaData])
        .select()
        .single();

      if (error) {
        console.error("Erro ao adicionar empresa:", error);
        toast({
          title: "Erro",
          description: "Erro ao adicionar empresa: " + error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("Empresa adicionada com sucesso:", data);
      const novaEmpresa: Empresa = {
        id: data.id,
        nome: data.nome,
        cnpj: data.cnpj,
        email: data.email || '',
        telefone: data.telefone || '',
        cep: data.cep || '',
        endereco: data.endereco || '',
        bairro: data.bairro || '',
        estado: data.estado || '',
        razaoSocial: data.razao_social || '',
      };
      
      setEmpresas(prev => [...prev, novaEmpresa]);
      toast({
        title: "Sucesso",
        description: "Empresa adicionada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao adicionar empresa:", error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao adicionar empresa",
        variant: "destructive",
      });
    }
  };

  const updateEmpresa = async (id: string, empresa: Omit<Empresa, "id">) => {
    try {
      const empresaData = {
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        email: empresa.email,
        telefone: empresa.telefone,
        cep: empresa.cep,
        endereco: empresa.endereco,
        bairro: empresa.bairro,
        estado: empresa.estado,
        razao_social: empresa.razaoSocial,
      };

      const { data, error } = await supabase
        .from('empresas')
        .update(empresaData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar empresa:", error);
        return;
      }

      const empresaAtualizada: Empresa = {
        id: data.id,
        nome: data.nome,
        cnpj: data.cnpj,
        email: data.email || '',
        telefone: data.telefone || '',
        cep: data.cep || '',
        endereco: data.endereco || '',
        bairro: data.bairro || '',
        estado: data.estado || '',
        razaoSocial: data.razao_social || '',
      };

      setEmpresas(prev => prev.map(e => e.id === id ? empresaAtualizada : e));
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
    }
  };

  const deleteEmpresa = async (id: string) => {
    try {
      const { error } = await supabase
        .from('empresas')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar empresa:", error);
        return;
      }

      setEmpresas(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error("Erro ao deletar empresa:", error);
    }
  };

  const addContrato = async (contrato: Omit<Contrato, "id">) => {
    try {
      const contratoData = {
        contratante_id: contrato.contratanteId,
        tipo_servico: contrato.tipoServico,
        descricao: contrato.descricao,
        data_inicio: contrato.dataInicio,
        data_termino: contrato.dataTermino,
        valor_contrato: contrato.valorContrato,
      };

      const { data, error } = await supabase
        .from('contratos')
        .insert([contratoData])
        .select('*, empresas(*)')
        .single();

      if (error) {
        console.error("Erro ao adicionar contrato:", error);
        return;
      }

      const novoContrato: Contrato = {
        id: data.id,
        contratanteId: data.contratante_id,
        contratante: data.empresas ? {
          id: data.empresas.id,
          nome: data.empresas.nome,
          cnpj: data.empresas.cnpj,
          email: data.empresas.email || '',
          telefone: data.empresas.telefone || '',
          cep: data.empresas.cep || '',
          endereco: data.empresas.endereco || '',
          bairro: data.empresas.bairro || '',
          estado: data.empresas.estado || '',
          razaoSocial: data.empresas.razao_social || '',
        } : undefined,
        tipoServico: data.tipo_servico,
        descricao: data.descricao,
        dataInicio: data.data_inicio,
        dataTermino: data.data_termino,
        valorContrato: Number(data.valor_contrato),
      };

      setContratos(prev => [...prev, novoContrato]);
    } catch (error) {
      console.error("Erro ao adicionar contrato:", error);
    }
  };

  const updateContrato = async (id: string, contrato: Omit<Contrato, "id">) => {
    console.log("Update contrato não implementado ainda");
  };

  const deleteContrato = async (id: string) => {
    console.log("Delete contrato não implementado ainda");
  };

  const selectContrato = (contrato: Contrato | null) => {
    setSelectedContrato(contrato);
  };

  // Implementar funções para agregados
  const addAgregado = async (agregado: Omit<Agregado, "id">) => {
    try {
      const agregadoData = {
        contrato_id: agregado.contratoId,
        colaborador_id: agregado.colaboradorId,
        cargo: agregado.cargo,
        descricao_cargo: agregado.descricaoCargo,
      };

      const { data, error } = await supabase
        .from('agregados')
        .insert([agregadoData])
        .select('*, colaboradores(*)')
        .single();

      if (error) {
        console.error("Erro ao adicionar agregado:", error);
        return;
      }

      const novoAgregado: Agregado = {
        id: data.id,
        contratoId: data.contrato_id,
        colaboradorId: data.colaborador_id,
        colaborador: data.colaboradores ? {
          id: data.colaboradores.id,
          nome: data.colaboradores.nome,
          cpf: data.colaboradores.cpf,
          email: data.colaboradores.email || '',
          telefone: data.colaboradores.telefone || '',
        } : undefined,
        cargo: data.cargo,
        descricaoCargo: data.descricao_cargo || '',
      };

      setAgregados(prev => [...prev, novoAgregado]);
    } catch (error) {
      console.error("Erro ao adicionar agregado:", error);
    }
  };

  const updateAgregado = async (id: string, agregado: Omit<Agregado, "id">) => {
    try {
      const agregadoData = {
        contrato_id: agregado.contratoId,
        colaborador_id: agregado.colaboradorId,
        cargo: agregado.cargo,
        descricao_cargo: agregado.descricaoCargo,
      };

      const { data, error } = await supabase
        .from('agregados')
        .update(agregadoData)
        .eq('id', id)
        .select('*, colaboradores(*)')
        .single();

      if (error) {
        console.error("Erro ao atualizar agregado:", error);
        return;
      }

      const agregadoAtualizado: Agregado = {
        id: data.id,
        contratoId: data.contrato_id,
        colaboradorId: data.colaborador_id,
        colaborador: data.colaboradores ? {
          id: data.colaboradores.id,
          nome: data.colaboradores.nome,
          cpf: data.colaboradores.cpf,
          email: data.colaboradores.email || '',
          telefone: data.colaboradores.telefone || '',
        } : undefined,
        cargo: data.cargo,
        descricaoCargo: data.descricao_cargo || '',
      };

      setAgregados(prev => prev.map(a => a.id === id ? agregadoAtualizado : a));
    } catch (error) {
      console.error("Erro ao atualizar agregado:", error);
    }
  };

  const deleteAgregado = async (id: string) => {
    try {
      const { error } = await supabase
        .from('agregados')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar agregado:", error);
        return;
      }

      setAgregados(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Erro ao deletar agregado:", error);
    }
  };

  // Implementar funções para aditivos
  const addAditivo = async (aditivo: Omit<Aditivo, "id">) => {
    try {
      const aditivoData = {
        contrato_id: aditivo.contratoId,
        tipo: aditivo.tipo,
        valor_ajustado: aditivo.valorAjustado,
        motivo_aditivo: aditivo.motivoAditivo,
        status: aditivo.status,
      };

      const { data, error } = await supabase
        .from('aditivos')
        .insert([aditivoData])
        .select()
        .single();

      if (error) {
        console.error("Erro ao adicionar aditivo:", error);
        return;
      }

      const novoAditivo: Aditivo = {
        id: data.id,
        contratoId: data.contrato_id,
        tipo: data.tipo,
        valorAjustado: Number(data.valor_ajustado),
        motivoAditivo: data.motivo_aditivo,
        status: data.status,
      };

      setAditivos(prev => [...prev, novoAditivo]);
    } catch (error) {
      console.error("Erro ao adicionar aditivo:", error);
    }
  };

  const updateAditivo = async (id: string, aditivo: Omit<Aditivo, "id">) => {
    try {
      const aditivoData = {
        contrato_id: aditivo.contratoId,
        tipo: aditivo.tipo,
        valor_ajustado: aditivo.valorAjustado,
        motivo_aditivo: aditivo.motivoAditivo,
        status: aditivo.status,
      };

      const { data, error } = await supabase
        .from('aditivos')
        .update(aditivoData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar aditivo:", error);
        return;
      }

      const aditivoAtualizado: Aditivo = {
        id: data.id,
        contratoId: data.contrato_id,
        tipo: data.tipo,
        valorAjustado: Number(data.valor_ajustado),
        motivoAditivo: data.motivo_aditivo,
        status: data.status,
      };

      setAditivos(prev => prev.map(a => a.id === id ? aditivoAtualizado : a));
    } catch (error) {
      console.error("Erro ao atualizar aditivo:", error);
    }
  };

  const deleteAditivo = async (id: string) => {
    try {
      const { error } = await supabase
        .from('aditivos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar aditivo:", error);
        return;
      }

      setAditivos(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Erro ao deletar aditivo:", error);
    }
  };

  // Implementar funções para repactuações
  const addRepactuacao = async (repactuacao: Omit<Repactuacao, "id">) => {
    try {
      const repactuacaoData = {
        contrato_id: repactuacao.contratoId,
        novo_prazo: repactuacao.novoPrazo,
        motivo_repactuacao: repactuacao.motivoRepactuacao,
        status: repactuacao.status,
      };

      const { data, error } = await supabase
        .from('repactuacoes')
        .insert([repactuacaoData])
        .select()
        .single();

      if (error) {
        console.error("Erro ao adicionar repactuação:", error);
        return;
      }

      const novaRepactuacao: Repactuacao = {
        id: data.id,
        contratoId: data.contrato_id,
        novoPrazo: data.novo_prazo,
        motivoRepactuacao: data.motivo_repactuacao,
        status: data.status,
      };

      setRepactuacoes(prev => [...prev, novaRepactuacao]);
    } catch (error) {
      console.error("Erro ao adicionar repactuação:", error);
    }
  };

  const updateRepactuacao = async (id: string, repactuacao: Omit<Repactuacao, "id">) => {
    try {
      const repactuacaoData = {
        contrato_id: repactuacao.contratoId,
        novo_prazo: repactuacao.novoPrazo,
        motivo_repactuacao: repactuacao.motivoRepactuacao,
        status: repactuacao.status,
      };

      const { data, error } = await supabase
        .from('repactuacoes')
        .update(repactuacaoData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar repactuação:", error);
        return;
      }

      const repactuacaoAtualizada: Repactuacao = {
        id: data.id,
        contratoId: data.contrato_id,
        novoPrazo: data.novo_prazo,
        motivoRepactuacao: data.motivo_repactuacao,
        status: data.status,
      };

      setRepactuacoes(prev => prev.map(r => r.id === id ? repactuacaoAtualizada : r));
    } catch (error) {
      console.error("Erro ao atualizar repactuação:", error);
    }
  };

  const deleteRepactuacao = async (id: string) => {
    try {
      const { error } = await supabase
        .from('repactuacoes')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar repactuação:", error);
        return;
      }

      setRepactuacoes(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Erro ao deletar repactuação:", error);
    }
  };

  // Implementar funções para entregáveis
  const addEntregavel = async (entregavel: Omit<Entregavel, "id">) => {
    try {
      const entregavelData = {
        contrato_id: entregavel.contratoId,
        descricao: entregavel.descricao,
        data_entrega: entregavel.dataEntrega,
        status: entregavel.status,
      };

      const { data, error } = await supabase
        .from('entregaveis')
        .insert([entregavelData])
        .select()
        .single();

      if (error) {
        console.error("Erro ao adicionar entregável:", error);
        return;
      }

      const novoEntregavel: Entregavel = {
        id: data.id,
        contratoId: data.contrato_id,
        descricao: data.descricao,
        dataEntrega: data.data_entrega,
        status: data.status,
      };

      setEntregaveis(prev => [...prev, novoEntregavel]);
    } catch (error) {
      console.error("Erro ao adicionar entregável:", error);
    }
  };

  const updateEntregavel = async (id: string, entregavel: Omit<Entregavel, "id">) => {
    try {
      const entregavelData = {
        contrato_id: entregavel.contratoId,
        descricao: entregavel.descricao,
        data_entrega: entregavel.dataEntrega,
        status: entregavel.status,
      };

      const { data, error } = await supabase
        .from('entregaveis')
        .update(entregavelData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error("Erro ao atualizar entregável:", error);
        return;
      }

      const entregavelAtualizado: Entregavel = {
        id: data.id,
        contratoId: data.contrato_id,
        descricao: data.descricao,
        dataEntrega: data.data_entrega,
        status: data.status,
      };

      setEntregaveis(prev => prev.map(e => e.id === id ? entregavelAtualizado : e));
    } catch (error) {
      console.error("Erro ao atualizar entregável:", error);
    }
  };

  const deleteEntregavel = async (id: string) => {
    try {
      const { error } = await supabase
        .from('entregaveis')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Erro ao deletar entregável:", error);
        return;
      }

      setEntregaveis(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error("Erro ao deletar entregável:", error);
    }
  };

  // Implementar funções para anexos (mantém local por enquanto)
  const addAnexo = async (anexo: Omit<Anexo, "id">) => {
    try {
      const novoAnexo: Anexo = {
        id: Math.random().toString(36).substr(2, 9),
        contratoId: anexo.contratoId,
        nomeArquivo: anexo.nomeArquivo,
        arquivo: anexo.arquivo,
      };

      setAnexos(prev => [...prev, novoAnexo]);
    } catch (error) {
      console.error("Erro ao adicionar anexo:", error);
    }
  };

  const updateAnexo = async (id: string, anexo: Omit<Anexo, "id">) => {
    try {
      setAnexos(prev => prev.map(a => a.id === id ? { ...a, ...anexo } : a));
    } catch (error) {
      console.error("Erro ao atualizar anexo:", error);
    }
  };

  const deleteAnexo = async (id: string) => {
    try {
      setAnexos(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error("Erro ao deletar anexo:", error);
    }
  };

  return (
    <ContractContext.Provider
      value={{
        colaboradores,
        empresas,
        contratos,
        agregados,
        aditivos,
        repactuacoes,
        entregaveis,
        anexos,
        selectedContrato,
        addAgregado,
        updateAgregado,
        deleteAgregado,
        addEmpresa,
        updateEmpresa,
        deleteEmpresa,
        addContrato,
        updateContrato,
        deleteContrato,
        selectContrato,
        addColaborador,
        updateColaborador,
        deleteColaborador,
        addAditivo,
        updateAditivo,
        deleteAditivo,
        addRepactuacao,
        updateRepactuacao,
        deleteRepactuacao,
        addEntregavel,
        updateEntregavel,
        deleteEntregavel,
        addAnexo,
        updateAnexo,
        deleteAnexo,
        getContratoValorTotal,
        loadData,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
