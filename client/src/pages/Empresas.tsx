import React, { useState } from "react";
import { useContract, Empresa } from "@/contexts/ContractContext";
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
import { Edit, Trash, Building } from "lucide-react";

const Empresas = () => {
  const { empresas, addEmpresa, updateEmpresa, deleteEmpresa } = useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    bairro: "",
    estado: "",
    razaoSocial: "",
  });

  const resetForm = () => {
    setFormData({
      nome: "",
      cnpj: "",
      email: "",
      telefone: "",
      cep: "",
      endereco: "",
      bairro: "",
      estado: "",
      razaoSocial: "",
    });
    setEditingEmpresa(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmpresa) {
      updateEmpresa(editingEmpresa.id, formData);
      toast({
        title: "Empresa atualizada",
        description: "Os dados da empresa foram atualizados com sucesso.",
      });
    } else {
      addEmpresa(formData);
      toast({
        title: "Empresa cadastrada",
        description: "Nova empresa foi cadastrada com sucesso.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (empresa: Empresa) => {
    setEditingEmpresa(empresa);
    setFormData({
      nome: empresa.nome,
      cnpj: empresa.cnpj,
      email: empresa.email,
      telefone: empresa.telefone,
      cep: empresa.cep,
      endereco: empresa.endereco,
      bairro: empresa.bairro,
      estado: empresa.estado,
      razaoSocial: empresa.razaoSocial,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteEmpresa(id);
    toast({
      title: "Empresa excluída",
      description: "A empresa foi excluída com sucesso.",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Gestão de Empresas</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Nova Empresa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle>
                {editingEmpresa ? "Editar Empresa" : "Cadastrar Nova Empresa"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Campos */}
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
                <Label className="mb-2" htmlFor="cnpj">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  value={formData.cnpj}
                  onChange={(e) =>
                    setFormData({ ...formData, cnpj: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="email">
                  E-mail
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
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="cep">
                  CEP
                </Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) =>
                    setFormData({ ...formData, cep: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="bairro">
                  Bairro
                </Label>
                <Input
                  id="bairro"
                  value={formData.bairro}
                  onChange={(e) =>
                    setFormData({ ...formData, bairro: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col col-span-1 sm:col-span-2">
                <Label className="mb-2" htmlFor="endereco">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData({ ...formData, endereco: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="estado">
                  Estado
                </Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({ ...formData, estado: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="razaoSocial">
                  Razão Social
                </Label>
                <Input
                  id="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={(e) =>
                    setFormData({ ...formData, razaoSocial: e.target.value })
                  }
                  required
                  className="w-full"
                />
              </div>

              <div className="col-span-1 sm:col-span-2 flex justify-end space-x-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingEmpresa ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de empresas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
        </CardHeader>
        <CardContent>
          {empresas.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Nenhuma empresa cadastrada ainda.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>CEP</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Bairro</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Razão Social</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {empresas.map((empresa) => (
                    <TableRow key={empresa.id}>
                      <TableCell className="font-medium">
                        {empresa.nome}
                      </TableCell>
                      <TableCell>{empresa.cnpj}</TableCell>
                      <TableCell>{empresa.email}</TableCell>
                      <TableCell>{empresa.telefone}</TableCell>
                      <TableCell>{empresa.cep}</TableCell>
                      <TableCell>{empresa.endereco}</TableCell>
                      <TableCell>{empresa.bairro}</TableCell>
                      <TableCell>{empresa.estado}</TableCell>
                      <TableCell>{empresa.razaoSocial}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(empresa)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(empresa.id)}
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

export default Empresas;
