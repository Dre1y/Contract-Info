
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useContract } from "../contexts/ContractContext";

export const Dashboard = () => {
  const { contratos } = useContract();

  const stats = {
    total: contratos.length,
    consultoria: contratos.filter(c => c.tipoServico === 'CONSULTORIA').length,
    manutencao: contratos.filter(c => c.tipoServico === 'MANUTENCAO').length,
    desenvolvimento: contratos.filter(c => c.tipoServico === 'DESENVOLVIMENTO').length,
    totalValue: contratos.reduce((sum, c) => sum + c.valorContrato, 0)
  };

  const recentContratos = contratos
    .sort((a, b) => new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Contratos
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consultorias
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.consultoria}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Manutenções
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.manutencao}</div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              R$ {stats.totalValue.toLocaleString('pt-BR')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Contracts */}
      <Card>
        <CardHeader>
          <CardTitle>Contratos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentContratos.map((contrato) => (
              <div key={contrato.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{contrato.descricao}</h3>
                  <p className="text-sm text-muted-foreground">{contrato.contratante?.nome || "Sem contratante"}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">R$ {contrato.valorContrato.toLocaleString('pt-BR')}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(contrato.dataInicio).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Badge variant="default">
                    {contrato.tipoServico}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
