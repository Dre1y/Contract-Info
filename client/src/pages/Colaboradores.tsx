import React, { useState } from "react";
import { useContract, Colaborador } from "@/contexts/ContractContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const Colaboradores = () => {
  const {
    colaboradores,
    addColaborador,
    updateColaborador,
    deleteColaborador,
  } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingColaborador, setEditingColaborador] =
    useState<Colaborador | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
    });
    setEditingColaborador(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingColaborador) {
      updateColaborador(editingColaborador.id, formData);
      toast({
        title: "Colaborador atualizado",
        description: "Os dados do colaborador foram atualizados com sucesso.",
      });
    } else {
      addColaborador(formData);
      toast({
        title: "Colaborador cadastrado",
        description: "Novo colaborador foi cadastrado com sucesso.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (colaborador: Colaborador) => {
    setEditingColaborador(colaborador);
    setFormData({
      nome: colaborador.nome,
      cpf: colaborador.cpf,
      email: colaborador.email,
      telefone: colaborador.telefone,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteColaborador(id);
    toast({
      title: "Colaborador excluído",
      description: "O colaborador foi excluído com sucesso.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Gestão de Colaboradores</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Colaborador
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md w-full">
            <DialogHeader>
              <DialogTitle>
                {editingColaborador
                  ? "Editar Colaborador"
                  : "Cadastrar Novo Colaborador"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="nome">
                  Nome
                </Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="cpf">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) =>
                    setFormData({ ...formData, cpf: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="telefone">
                  Telefone
                </Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) =>
                    setFormData({ ...formData, telefone: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex justify-end space-x-2 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingColaborador ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de colaboradores */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Colaboradores</CardTitle>
        </CardHeader>
        <CardContent>
          {colaboradores.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Nenhum colaborador cadastrado ainda.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {colaboradores.map((colaborador) => (
                    <TableRow key={colaborador.id}>
                      <TableCell className="font-medium">
                        {colaborador.nome}
                      </TableCell>
                      <TableCell>{colaborador.cpf}</TableCell>
                      <TableCell>{colaborador.email}</TableCell>
                      <TableCell>{colaborador.telefone}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(colaborador)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(colaborador.id)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Colaboradores;
