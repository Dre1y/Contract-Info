
import React from 'react';
import { useContract } from '@/contexts/ContractContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Repactuacoes = () => {
  const { repactuacoes, contratos } = useContract();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'APROVADO': return 'default';
      case 'CONCLUIDO': return 'default';
      case 'PENDENTE': return 'secondary';
      case 'REJEITADO': return 'destructive';
      case 'CANCELADO': return 'destructive';
      default: return 'secondary';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getContratoInfo = (contratoId: string) => {
    const contrato = contratos.find(c => c.id === contratoId);
    return contrato ? `${contrato.contratante?.nome} - ${contrato.tipoServico}` : 'N/A';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Repactuações</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Repactuações</CardTitle>
        </CardHeader>
        <CardContent>
          {repactuacoes.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Nenhuma repactuação cadastrada ainda.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contrato</TableHead>
                  <TableHead>Novo Prazo</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repactuacoes.map((repactuacao) => (
                  <TableRow key={repactuacao.id}>
                    <TableCell className="font-medium">
                      {getContratoInfo(repactuacao.contratoId)}
                    </TableCell>
                    <TableCell>{formatDate(repactuacao.novoPrazo)}</TableCell>
                    <TableCell className="max-w-xs truncate">{repactuacao.motivoRepactuacao}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(repactuacao.status)}>
                        {repactuacao.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Repactuacoes;
