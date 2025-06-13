import React, { useState } from "react";
import { useContract, Repactuacao } from "@/contexts/ContractContext";
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
import { Edit, Trash, Calendar } from "lucide-react";

const RepactuacoesTab = () => {
  const {
    selectedContrato,
    repactuacoes,
    addRepactuacao,
    updateRepactuacao,
    deleteRepactuacao,
  } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRepactuacao, setEditingRepactuacao] =
    useState<Repactuacao | null>(null);
  const [formData, setFormData] = useState({
    novoPrazo: "",
    motivoRepactuacao: "",
    status: "" as
      | "PENDENTE"
      | "APROVADO"
      | "REJEITADO"
      | "CONCLUIDO"
      | "CANCELADO"
      | "",
  });

  if (!selectedContrato) return null;

  const contratoRepactuacoes = repactuacoes.filter(
    (r) => r.contratoId === selectedContrato.id
  );

  const resetForm = () => {
    setFormData({
      novoPrazo: "",
      motivoRepactuacao: "",
      status: "",
    });
    setEditingRepactuacao(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.status) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o status da repactuação.",
        variant: "destructive",
      });
      return;
    }

    const repactuacaoData = {
      ...formData,
      contratoId: selectedContrato.id,
    } as Omit<Repactuacao, "id">;

    if (editingRepactuacao) {
      updateRepactuacao(editingRepactuacao.id, repactuacaoData);
      toast({
        title: "Repactuação atualizada",
        description: "Os dados da repactuação foram atualizados com sucesso.",
      });
    } else {
      addRepactuacao(repactuacaoData);
      toast({
        title: "Repactuação adicionada",
        description: "Nova repactuação foi adicionada ao contrato.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (repactuacao: Repactuacao) => {
    setEditingRepactuacao(repactuacao);
    setFormData({
      novoPrazo: repactuacao.novoPrazo,
      motivoRepactuacao: repactuacao.motivoRepactuacao,
      status: repactuacao.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteRepactuacao(id);
    toast({
      title: "Repactuação removida",
      description: "A repactuação foi removida do contrato.",
    });
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Repactuações do Contrato</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Adicionar Repactuação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRepactuacao
                  ? "Editar Repactuação"
                  : "Adicionar Repactuação"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="novoPrazo">
                  Novo Prazo
                </Label>
                <Input
                  id="novoPrazo"
                  type="date"
                  value={formData.novoPrazo}
                  onChange={(e) =>
                    setFormData({ ...formData, novoPrazo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="motivoRepactuacao">
                  Motivo da Repactuação
                </Label>
                <Textarea
                  id="motivoRepactuacao"
                  value={formData.motivoRepactuacao}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      motivoRepactuacao: e.target.value,
                    })
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
                <Button type="submit">
                  {editingRepactuacao ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contratoRepactuacoes.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">
          Nenhuma repactuação adicionada a este contrato.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Novo Prazo</TableHead>
              <TableHead>Motivo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contratoRepactuacoes.map((repactuacao) => (
              <TableRow key={repactuacao.id}>
                <TableCell className="font-medium">
                  {formatDate(repactuacao.novoPrazo)}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {repactuacao.motivoRepactuacao}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(repactuacao.status)}>
                    {repactuacao.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(repactuacao)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(repactuacao.id)}
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

export default RepactuacoesTab;
