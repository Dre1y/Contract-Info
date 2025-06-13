
-- Criar tabela de empresas/contratantes
CREATE TABLE public.empresas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cnpj TEXT NOT NULL UNIQUE,
  email TEXT,
  telefone TEXT,
  cep TEXT,
  endereco TEXT,
  bairro TEXT,
  estado TEXT,
  razao_social TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de colaboradores
CREATE TABLE public.colaboradores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  email TEXT,
  telefone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de contratos
CREATE TABLE public.contratos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contratante_id UUID REFERENCES public.empresas(id) NOT NULL,
  tipo_servico TEXT NOT NULL CHECK (tipo_servico IN ('CONSULTORIA', 'MANUTENCAO', 'DESENVOLVIMENTO')),
  descricao TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  data_termino DATE NOT NULL,
  valor_contrato DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de agregados (colaboradores vinculados aos contratos)
CREATE TABLE public.agregados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contrato_id UUID REFERENCES public.contratos(id) ON DELETE CASCADE NOT NULL,
  colaborador_id UUID REFERENCES public.colaboradores(id) NOT NULL,
  cargo TEXT NOT NULL,
  descricao_cargo TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de aditivos
CREATE TABLE public.aditivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contrato_id UUID REFERENCES public.contratos(id) ON DELETE CASCADE NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('PRORROGACAO', 'REAJUSTE', 'ALTERACAO')),
  valor_ajustado DECIMAL(15,2) NOT NULL,
  motivo_aditivo TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'APROVADO', 'REJEITADO', 'CONCLUIDO', 'CANCELADO')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de repactuações
CREATE TABLE public.repactuacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contrato_id UUID REFERENCES public.contratos(id) ON DELETE CASCADE NOT NULL,
  novo_prazo DATE NOT NULL,
  motivo_repactuacao TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'APROVADO', 'REJEITADO', 'CONCLUIDO', 'CANCELADO')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de entregáveis
CREATE TABLE public.entregaveis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contrato_id UUID REFERENCES public.contratos(id) ON DELETE CASCADE NOT NULL,
  descricao TEXT NOT NULL,
  data_entrega DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDENTE' CHECK (status IN ('PENDENTE', 'APROVADO', 'REJEITADO', 'CONCLUIDO', 'CANCELADO')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de anexos
CREATE TABLE public.anexos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contrato_id UUID REFERENCES public.contratos(id) ON DELETE CASCADE NOT NULL,
  nome_arquivo TEXT,
  link_documento TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar bucket para armazenar arquivos de anexos
INSERT INTO storage.buckets (id, name, public) VALUES ('anexos', 'anexos', true);

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colaboradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agregados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aditivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repactuacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entregaveis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anexos ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS (permitindo acesso total por enquanto - pode ser refinado depois)
CREATE POLICY "Allow all operations on empresas" ON public.empresas FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on colaboradores" ON public.colaboradores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on contratos" ON public.contratos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on agregados" ON public.agregados FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on aditivos" ON public.aditivos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on repactuacoes" ON public.repactuacoes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on entregaveis" ON public.entregaveis FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on anexos" ON public.anexos FOR ALL USING (true) WITH CHECK (true);

-- Políticas para storage de anexos
CREATE POLICY "Allow public access to anexos bucket" ON storage.objects FOR ALL USING (bucket_id = 'anexos') WITH CHECK (bucket_id = 'anexos');
