import React, { useState } from "react";
import { useContract, Aditivo } from "@/contexts/ContractContext";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash, FileText } from "lucide-react";

const AditivosTab = () => {
  const {
    selectedContrato,
    aditivos,
    addAditivo,
    updateAditivo,
    deleteAditivo,
    getContratoValorTotal,
  } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAditivo, setEditingAditivo] = useState<Aditivo | null>(null);
  const [formData, setFormData] = useState({
    tipo: "" as "PRORROGACAO" | "REAJUSTE" | "ALTERACAO" | "",
    valorAjustado: 0,
    motivoAditivo: "",
    status: "" as
      | "PENDENTE"
      | "APROVADO"
      | "REJEITADO"
      | "CONCLUIDO"
      | "CANCELADO"
      | "",
  });

  if (!selectedContrato) return null;

  const contratoAditivos = aditivos.filter(
    (a) => a.contratoId === selectedContrato.id
  );

  const resetForm = () => {
    setFormData({
      tipo: "",
      valorAjustado: 0,
      motivoAditivo: "",
      status: "",
    });
    setEditingAditivo(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.status) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o status do aditivo.",
        variant: "destructive",
      });
      return;
    }

    const aditivoData = {
      ...formData,
      contratoId: selectedContrato.id,
    } as Omit<Aditivo, "id">;

    if (editingAditivo) {
      updateAditivo(editingAditivo.id, aditivoData);
      toast({
        title: "Aditivo atualizado",
        description: "Os dados do aditivo foram atualizados com sucesso.",
      });
    } else {
      addAditivo(aditivoData);
      toast({
        title: "Aditivo adicionado",
        description: "Novo aditivo foi adicionado ao contrato.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (aditivo: Aditivo) => {
    setEditingAditivo(aditivo);
    setFormData({
      tipo: aditivo.tipo,
      valorAjustado: aditivo.valorAjustado,
      motivoAditivo: aditivo.motivoAditivo,
      status: aditivo.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAditivo(id);
    toast({
      title: "Aditivo removido",
      description: "O aditivo foi removido do contrato.",
    });
  };

  const getTipoBadgeVariant = (tipo: string) => {
    switch (tipo) {
      case "PRORROGACAO":
        return "default";
      case "REAJUSTE":
        return "outline";
      case "ALTERACAO":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "APROVADO":
        return "default";
      case "CONCLUIDO":
        return "default";
      case "PENDENTE":
        return "secondary";
      case "REJEITADO":
        return "destructive";
      case "CANCELADO":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Aditivos do Contrato</h3>
          <p className="text-sm text-muted-foreground">
            Valor total do contrato:{" "}
            <span className="font-semibold text-blue-600">
              {formatCurrency(getContratoValorTotal(selectedContrato.id))}
            </span>
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={resetForm}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <FileText className="w-4 h-4 mr-2" />
              Adicionar Aditivo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAditivo ? "Editar Aditivo" : "Adicionar Aditivo"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="tipo">
                  Tipo de Aditivo
                </Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipo: value as any })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de aditivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PRORROGACAO">Prorrogação</SelectItem>
                    <SelectItem value="REAJUSTE">Reajuste</SelectItem>
                    <SelectItem value="ALTERACAO">Alteração</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="valorAjustado">
                  Valor Ajustado
                </Label>
                <Input
                  id="valorAjustado"
                  type="number"
                  step="0.01"
                  value={formData.valorAjustado}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      valorAjustado: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="motivoAditivo">
                  Motivo do Aditivo
                </Label>
                <Textarea
                  id="motivoAditivo"
                  value={formData.motivoAditivo}
                  onChange={(e) =>
                    setFormData({ ...formData, motivoAditivo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="status">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(
                    value:
                      | "PENDENTE"
                      | "APROVADO"
                      | "REJEITADO"
                      | "CONCLUIDO"
                      | "CANCELADO"
                  ) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="APROVADO">Aprovado</SelectItem>
                    <SelectItem value="REJEITADO">Rejeitado</SelectItem>
                    <SelectItem value="CONCLUIDO">Concluído</SelectItem>
                    <SelectItem value="CANCELADO">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingAditivo ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contratoAditivos.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">
          Nenhum aditivo adicionado a este contrato.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor Ajustado</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contratoAditivos.map((aditivo) => (
              <TableRow key={aditivo.id}>
                <TableCell>
                  <Badge variant={getTipoBadgeVariant(aditivo.tipo)}>
                    {aditivo.tipo === "PRORROGACAO"
                      ? "Prorrogação"
                      : aditivo.tipo === "REAJUSTE"
                      ? "Reajuste"
                      : aditivo.tipo === "ALTERACAO"
                      ? "Alteração"
                      : aditivo.tipo}
                  </Badge>
                </TableCell>

                <TableCell className="font-medium">
                  {formatCurrency(aditivo.valorAjustado)}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {aditivo.motivoAditivo}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(aditivo.status)}>
                    {aditivo.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => handleEdit(aditivo)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(aditivo.id)}
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
    </div>
  );
};

export default AditivosTab;
