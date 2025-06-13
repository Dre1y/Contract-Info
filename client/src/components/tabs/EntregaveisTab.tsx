import React, { useState } from "react";
import { useContract, Entregavel } from "@/contexts/ContractContext";
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

const EntregaveisTab = () => {
  const {
    selectedContrato,
    entregaveis,
    addEntregavel,
    updateEntregavel,
    deleteEntregavel,
  } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntregavel, setEditingEntregavel] = useState<Entregavel | null>(
    null
  );
  const [formData, setFormData] = useState({
    descricao: "",
    dataEntrega: "",
    status: "" as
      | "PENDENTE"
      | "APROVADO"
      | "REJEITADO"
      | "CONCLUIDO"
      | "CANCELADO"
      | "",
  });

  if (!selectedContrato) return null;

  const contratoEntregaveis = entregaveis.filter(
    (e) => e.contratoId === selectedContrato.id
  );

  const resetForm = () => {
    setFormData({
      descricao: "",
      dataEntrega: "",
      status: "",
    });
    setEditingEntregavel(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.status) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o status do entregável.",
        variant: "destructive",
      });
      return;
    }

    const entregavelData = {
      ...formData,
      contratoId: selectedContrato.id,
    } as Omit<Entregavel, "id">;

    if (editingEntregavel) {
      updateEntregavel(editingEntregavel.id, entregavelData);
      toast({
        title: "Entregável atualizado",
        description: "Os dados do entregável foram atualizados com sucesso.",
      });
    } else {
      addEntregavel(entregavelData);
      toast({
        title: "Entregável adicionado",
        description: "Novo entregável foi adicionado ao contrato.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (entregavel: Entregavel) => {
    setEditingEntregavel(entregavel);
    setFormData({
      descricao: entregavel.descricao,
      dataEntrega: entregavel.dataEntrega,
      status: entregavel.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteEntregavel(id);
    toast({
      title: "Entregável removido",
      description: "O entregável foi removido do contrato.",
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
        <h3 className="text-lg font-semibold">Entregáveis do Contrato</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Adicionar Entregável
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingEntregavel
                  ? "Editar Entregável"
                  : "Adicionar Entregável"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="dataEntrega">
                  Data de Entrega
                </Label>
                <Input
                  id="dataEntrega"
                  type="date"
                  value={formData.dataEntrega}
                  onChange={(e) =>
                    setFormData({ ...formData, dataEntrega: e.target.value })
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
                  {editingEntregavel ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contratoEntregaveis.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">
          Nenhum entregável adicionado a este contrato.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Data de Entrega</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contratoEntregaveis.map((entregavel) => (
              <TableRow key={entregavel.id}>
                <TableCell className="max-w-xs truncate">
                  {entregavel.descricao}
                </TableCell>
                <TableCell className="font-medium">
                  {formatDate(entregavel.dataEntrega)}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(entregavel.status)}>
                    {entregavel.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(entregavel)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(entregavel.id)}
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

export default EntregaveisTab;
