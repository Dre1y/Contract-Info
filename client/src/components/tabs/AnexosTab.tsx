
import React, { useState } from "react";
import { useContract, Anexo } from "@/contexts/ContractContext";
import { Button } from "@/components/ui/button";
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
import { Edit, Trash, FileText, Upload, Download } from "lucide-react";

const AnexosTab = () => {
  const { selectedContrato, anexos, addAnexo, updateAnexo, deleteAnexo } =
    useContract();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnexo, setEditingAnexo] = useState<Anexo | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nomeArquivo: "",
  });

  if (!selectedContrato) return null;

  const contratoAnexos = anexos.filter(
    (a) => a.contratoId === selectedContrato.id
  );

  const resetForm = () => {
    setFormData({
      nomeArquivo: "",
    });
    setSelectedFile(null);
    setEditingAnexo(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ 
        ...formData, 
        nomeArquivo: file.name
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile && !editingAnexo) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um arquivo.",
        variant: "destructive",
      });
      return;
    }

    const anexoData = {
      ...formData,
      contratoId: selectedContrato.id,
      arquivo: selectedFile,
    } as Omit<Anexo, "id">;

    if (editingAnexo) {
      updateAnexo(editingAnexo.id, anexoData);
      toast({
        title: "Anexo atualizado",
        description: "Os dados do anexo foram atualizados com sucesso.",
      });
    } else {
      addAnexo(anexoData);
      toast({
        title: "Anexo adicionado",
        description: "Novo anexo foi adicionado ao contrato.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (anexo: Anexo) => {
    setEditingAnexo(anexo);
    setFormData({
      nomeArquivo: anexo.nomeArquivo || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAnexo(id);
    toast({
      title: "Anexo removido",
      description: "O anexo foi removido do contrato.",
    });
  };

  const handleDownload = (anexo: Anexo) => {
    if (anexo.arquivo) {
      const url = URL.createObjectURL(anexo.arquivo);
      const link = document.createElement('a');
      link.href = url;
      link.download = anexo.nomeArquivo || 'arquivo';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Anexos do Contrato</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Adicionar Anexo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAnexo ? "Editar Anexo" : "Adicionar Anexo"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="arquivo">
                  Arquivo
                </Label>
                <Input
                  id="arquivo"
                  type="file"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                  required={!editingAnexo}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Arquivo selecionado: {selectedFile.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <Label className="mb-2" htmlFor="nomeArquivo">
                  Nome do Arquivo
                </Label>
                <Input
                  id="nomeArquivo"
                  type="text"
                  value={formData.nomeArquivo}
                  onChange={(e) =>
                    setFormData({ ...formData, nomeArquivo: e.target.value })
                  }
                  placeholder="Nome do arquivo"
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
                  {editingAnexo ? "Atualizar" : "Adicionar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {contratoAnexos.length === 0 ? (
        <p className="text-center py-8 text-muted-foreground">
          Nenhum anexo adicionado a este contrato.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do Arquivo</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contratoAnexos.map((anexo) => (
              <TableRow key={anexo.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{anexo.nomeArquivo || "Documento"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {anexo.nomeArquivo ? 
                    anexo.nomeArquivo.split('.').pop()?.toUpperCase() || 'ARQUIVO' 
                    : 'ARQUIVO'
                  }
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(anexo)}
                      title="Baixar arquivo"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(anexo)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(anexo.id)}
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

export default AnexosTab;
