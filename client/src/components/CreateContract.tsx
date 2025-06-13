
import React, { useState } from "react";
import { useContract } from "../contexts/ContractContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, FileText } from "lucide-react";

interface CreateContractProps {
  onBack: () => void;
}

export const CreateContract = ({ onBack }: CreateContractProps) => {
  const { empresas, addContrato } = useContract();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    contratanteId: "",
    tipoServico: "" as "CONSULTORIA" | "MANUTENCAO" | "DESENVOLVIMENTO" | "",
    descricao: "",
    dataInicio: "",
    dataTermino: "",
    valorContrato: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.tipoServico) {
        throw new Error("Selecione o tipo de serviço");
      }

      addContrato({
        contratanteId: formData.contratanteId,
        tipoServico: formData.tipoServico,
        descricao: formData.descricao,
        dataInicio: formData.dataInicio,
        dataTermino: formData.dataTermino,
        valorContrato: formData.valorContrato,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onBack();
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Novo Contrato</h1>
          <p className="text-muted-foreground">Crie um novo contrato preenchendo as informações abaixo</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Informações do Contrato</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contratanteId">Empresa</Label>
                <select
                  id="contratanteId"
                  value={formData.contratanteId}
                  onChange={(e) => handleChange('contratanteId', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  required
                >
                  <option value="">Selecione uma empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoServico">Tipo de Serviço</Label>
                <select
                  id="tipoServico"
                  value={formData.tipoServico}
                  onChange={(e) => handleChange('tipoServico', e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="CONSULTORIA">Consultoria</option>
                  <option value="MANUTENCAO">Manutenção</option>
                  <option value="DESENVOLVIMENTO">Desenvolvimento</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva os detalhes do contrato..."
                  value={formData.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data de Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => handleChange('dataInicio', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dataTermino">Data de Término</Label>
                <Input
                  id="dataTermino"
                  type="date"
                  value={formData.dataTermino}
                  onChange={(e) => handleChange('dataTermino', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="valorContrato">Valor (R$)</Label>
                <Input
                  id="valorContrato"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.valorContrato}
                  onChange={(e) => handleChange('valorContrato', parseFloat(e.target.value) || 0)}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Criando...' : 'Criar Contrato'}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateContract;
