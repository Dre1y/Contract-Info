import React, { useState } from "react";
import { useContract, Contrato } from "@/contexts/ContractContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash, FileText } from "lucide-react";
import ContratoDetails from "@/components/ContratoDetails";

const Contratos = () => {
  const {
    contratos,
    empresas,
    addContrato,
    updateContrato,
    deleteContrato,
    selectedContrato,
    selectContrato,
    getContratoValorTotal,
  } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContrato, setEditingContrato] = useState<Contrato | null>(null);
  const [formData, setFormData] = useState({
    contratanteId: "",
    tipoServico: "" as "CONSULTORIA" | "MANUTENCAO" | "DESENVOLVIMENTO" | "",
    descricao: "",
    dataInicio: "",
    dataTermino: "",
    valorContrato: 0,
  });

  const resetForm = () => {
    setFormData({
      contratanteId: "",
      tipoServico: "",
      descricao: "",
      dataInicio: "",
      dataTermino: "",
      valorContrato: 0,
    });
    setEditingContrato(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.tipoServico) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o tipo de serviço.",
        variant: "destructive",
      });
      return;
    }

    // Validação de datas
    const dataInicio = new Date(formData.dataInicio);
    const dataTermino = new Date(formData.dataTermino);

    if (dataTermino <= dataInicio) {
      toast({
        title: "Erro",
        description: "A data de término deve ser posterior à data de início.",
        variant: "destructive",
      });
      return;
    }

    if (editingContrato) {
      updateContrato(editingContrato.id, formData as Omit<Contrato, "id">);
      toast({
        title: "Contrato atualizado",
        description: "Os dados do contrato foram atualizados com sucesso.",
      });
    } else {
      addContrato(formData as Omit<Contrato, "id">);
      toast({
        title: "Contrato cadastrado",
        description: "Novo contrato foi cadastrado com sucesso.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (contrato: Contrato) => {
    setEditingContrato(contrato);
    setFormData({
      contratanteId: contrato.contratanteId,
      tipoServico: contrato.tipoServico,
      descricao: contrato.descricao,
      dataInicio: contrato.dataInicio,
      dataTermino: contrato.dataTermino,
      valorContrato: contrato.valorContrato,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteContrato(id);
    toast({
      title: "Contrato excluído",
      description: "O contrato foi excluído com sucesso.",
    });
  };

  const handleSelectContrato = (contrato: Contrato) => {
    selectContrato(selectedContrato?.id === contrato.id ? null : contrato);
  };

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
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold">Gestão de Contratos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Novo Contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingContrato
                  ? "Editar Contrato"
                  : "Cadastrar Novo Contrato"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="contratante">
                  Empresa
                </Label>
                <Select
                  value={formData.contratanteId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, contratanteId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {empresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id}>
                        {empresa.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="tipoServico">
                  Tipo de Serviço
                </Label>
                <Select
                  value={formData.tipoServico}
                  onValueChange={(
                    value: "CONSULTORIA" | "MANUTENCAO" | "DESENVOLVIMENTO"
                  ) => setFormData({ ...formData, tipoServico: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CONSULTORIA">Consultoria</SelectItem>
                    <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
                    <SelectItem value="DESENVOLVIMENTO">
                      Desenvolvimento
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="descricao">
                  Descrição
                </Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label className="mb-2" htmlFor="dataInicio">
                    Data de Início
                  </Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) =>
                      setFormData({ ...formData, dataInicio: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <Label className="mb-2" htmlFor="dataTermino">
                    Data de Término
                  </Label>
                  <Input
                    id="dataTermino"
                    type="date"
                    value={formData.dataTermino}
                    onChange={(e) =>
                      setFormData({ ...formData, dataTermino: e.target.value })
                    }
                    min={formData.dataInicio}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="valorContrato">
                  Valor do Contrato
                </Label>
                <Input
                  id="valorContrato"
                  type="number"
                  step="0.01"
                  value={formData.valorContrato}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      valorContrato: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingContrato ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {contratos.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Nenhum contrato cadastrado ainda.
            </p>
          ) : (
            <Table className="min-w-[700px] sm:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Contratante</TableHead>
                  <TableHead>Tipo de Serviço</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Término</TableHead>
                  <TableHead>Valor Original</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratos.map((contrato) => (
                  <TableRow
                    key={contrato.id}
                    className={`cursor-pointer ${
                      selectedContrato?.id === contrato.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectContrato(contrato)}
                  >
                    <TableCell className="font-medium max-w-[150px] truncate">
                      {contrato.contratante?.nome || "N/A"}
                    </TableCell>
                    <TableCell>{contrato.tipoServico}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {contrato.descricao}
                    </TableCell>
                    <TableCell>{formatDate(contrato.dataInicio)}</TableCell>
                    <TableCell>{formatDate(contrato.dataTermino)}</TableCell>
                    <TableCell>
                      {formatCurrency(contrato.valorContrato)}
                    </TableCell>
                    <TableCell className="font-medium text-blue-600">
                      {formatCurrency(getContratoValorTotal(contrato.id))}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(contrato);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(contrato.id);
                          }}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedContrato && <ContratoDetails />}
    </div>
  );
};

export default Contratos;
