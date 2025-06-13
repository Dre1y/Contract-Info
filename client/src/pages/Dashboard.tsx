
import React from 'react';
import { useContract } from '@/contexts/ContractContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, FileText } from 'lucide-react';

const Dashboard = () => {
  const { colaboradores, empresas, contratos } = useContract();

  const stats = [
    {
      title: 'Colaboradores',
      value: colaboradores.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Empresas',
      value: empresas.length,
      icon: Building,
      color: 'text-green-600',
    },
    {
      title: 'Contratos',
      value: contratos.length,
      icon: FileText,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard - Sistema de Contratos GetInfo</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bem-vindo ao Sistema de Gestão de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use a navegação lateral para gerenciar colaboradores, empresas e contratos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
