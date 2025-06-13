import React, { useState } from "react";
import { useContract, Colaborador, Agregado } from "@/contexts/ContractContext";
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
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash, UserPlus } from "lucide-react";

const ColaboradoresTab = () => {
  const {
    selectedContrato,
    colaboradores,
    agregados,
    addAgregado,
    updateAgregado,
    deleteAgregado,
  } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgregado, setEditingAgregado] = useState<Agregado | null>(null);
  const [formData, setFormData] = useState({
    colaboradorId: "",
    cargo: "",
    descricaoCargo: "",
  });

  if (!selectedContrato) return null;

  const contratoAgregados = Array.isArray(agregados)
    ? agregados.filter((c) => c.contratoId === selectedContrato.id)
    : [];

  const resetForm = () => {
    setFormData({
      colaboradorId: "",
      cargo: "",
      descricaoCargo: "",
    });
    setEditingAgregado(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const agregadoData = {
      ...formData,
      contratoId: selectedContrato.id,
    };

    if (editingAgregado) {
      updateAgregado(editingAgregado.id, agregadoData);
      toast({
        title: "Agregado atualizado",
        description: "Os dados do agregado foram atualizados com sucesso.",
      });
    } else {
      addAgregado(agregadoData);
      toast({
        title: "Agregado adicionado",
        description: "Novo agregado foi adicionado ao contrato.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (agregado: Agregado) => {
    setEditingAgregado(agregado);
    setFormData({
      colaboradorId: agregado.colaboradorId,
      cargo: agregado.cargo,
      descricaoCargo: agregado.descricaoCargo,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAgregado(id);
    toast({
      title: "Agregado removido",
      description: "O agregado foi removido do contrato.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Agregados do Contrato</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} size="sm">
              <UserPlus className="w-4 h-4 mr-2" />
              Adicionar Agregado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAgregado ? "Editar Agregado" : "Adicionar Agregado"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="colaborador">
                  Colaborador
                </Label>
                <Select
                  value={formData.colaboradorId}
                  onValueChange={(value) =>
                    setFormData({ ...formData, colaboradorId: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um colaborador" />
                  </SelectTrigger>
                  <SelectContent>
                    {colaboradores.map((colaborador) => (
                      <SelectItem key={colaborador.id} value={colaborador.id}>
                        {colaborador.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="cargo">
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  value={formData.cargo}
                  onChange={(e) =>
                    setFormData({ ...formData, cargo: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="descricaoCargo">
                  Descrição do Cargo
                </Label>
                <Textarea
                  id="descricaoCargo"
                  value={formData.descricaoCargo}
                  onChange={(e) =>
                    setFormData({ ...formData, descricaoCargo: e.target.value })
                  }
                  required
                />
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
                  {editingAgregado ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contratoAgregados.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">
          Nenhum agregado adicionado a este contrato.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Descrição do Cargo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contratoAgregados.map((agregado) => (
              <TableRow key={agregado.id}>
                <TableCell className="font-medium">
                  {agregado.colaborador?.nome || "N/A"}
                </TableCell>
                <TableCell>{agregado.cargo}</TableCell>
                <TableCell>{agregado.descricaoCargo}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(agregado)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(agregado.id)}
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

export default ColaboradoresTab;
