import React from "react";
import { useContract } from "@/contexts/ContractContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgregadosTab from "./tabs/AgregadosTab";
import AditivosTab from "./tabs/AditivosTab";
import RepactuacoesTab from "./tabs/RepactuacoesTab";
import EntregaveisTab from "./tabs/EntregaveisTab";
import AnexosTab from "./tabs/AnexosTab";

const ContratoDetails = () => {
  const { selectedContrato } = useContract();

  if (!selectedContrato) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Detalhes do Contrato - {selectedContrato.contratante?.nome}
        </CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Tipo:</span>{" "}
            {selectedContrato.tipoServico}
          </div>
          <div>
            <span className="font-medium">Valor:</span>{" "}
            {formatCurrency(selectedContrato.valorContrato)}
          </div>
          <div>
            <span className="font-medium">Início:</span>{" "}
            {formatDate(selectedContrato.dataInicio)}
          </div>
          <div>
            <span className="font-medium">Término:</span>{" "}
            {formatDate(selectedContrato.dataTermino)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="agregados" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="agregados">Agregados</TabsTrigger>
            <TabsTrigger value="aditivos">Aditivos</TabsTrigger>
            <TabsTrigger value="repactuacoes">Repactuações</TabsTrigger>
            <TabsTrigger value="entregaveis">Entregáveis</TabsTrigger>
            <TabsTrigger value="anexos">Anexos</TabsTrigger>
          </TabsList>

          <TabsContent value="agregados">
            <AgregadosTab />
          </TabsContent>

          <TabsContent value="aditivos">
            <AditivosTab />
          </TabsContent>

          <TabsContent value="repactuacoes">
            <RepactuacoesTab />
          </TabsContent>

          <TabsContent value="entregaveis">
            <EntregaveisTab />
          </TabsContent>

          <TabsContent value="anexos">
            <AnexosTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContratoDetails;
