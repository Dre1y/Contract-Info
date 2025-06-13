
import React, { useState } from "react";
import { useContract } from "../contexts/ContractContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const ContractList = () => {
  const { contratos, selectContrato } = useContract();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const filteredContracts = contratos.filter((contract) => {
    const searchMatch =
      contract.descricao.toLowerCase().includes(search.toLowerCase()) ||
      contract.contratante?.nome.toLowerCase().includes(search.toLowerCase());
    const filterMatch = filter ? contract.tipoServico === filter : true;
    const dateMatch = date
      ? new Date(contract.dataInicio).getTime() <= date.getTime() &&
        new Date(contract.dataTermino).getTime() >= date.getTime()
      : true;
    return searchMatch && filterMatch && dateMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="search"
          placeholder="Buscar contratos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="CONSULTORIA">Consultoria</SelectItem>
            <SelectItem value="MANUTENCAO">Manutenção</SelectItem>
            <SelectItem value="DESENVOLVIMENTO">Desenvolvimento</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                new Date(date).toLocaleDateString("pt-BR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        {filteredContracts.map((contract) => (
          <div
            key={contract.id}
            className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => selectContrato(contract)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{contract.descricao}</h3>
                <p className="text-gray-600">{contract.contratante?.nome}</p>
                <p className="text-sm text-gray-500">
                  {new Date(contract.dataInicio).toLocaleDateString()} - {new Date(contract.dataTermino).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">R$ {contract.valorContrato.toLocaleString()}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {contract.tipoServico}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractList;
