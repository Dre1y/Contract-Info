import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Repactuacao {
  id: number;
  cpfCnpj: string;
  numeroContrato: string;
  valorDivida: string;
  novaData: string;
  status: string;
}

interface RepactuacoesContextType {
  repactuacoes: Repactuacao[];
  setRepactuacoes: React.Dispatch<React.SetStateAction<Repactuacao[]>>;
}

const RepactuacoesContext = createContext<RepactuacoesContextType | undefined>(
  undefined
);

export const RepactuacoesProvider = ({ children }: { children: ReactNode }) => {
  const [repactuacoes, setRepactuacoes] = useState<Repactuacao[]>([]);
  return (
    <RepactuacoesContext.Provider value={{ repactuacoes, setRepactuacoes }}>
      {children}
    </RepactuacoesContext.Provider>
  );
};

export function useRepactuacoes() {
  const context = useContext(RepactuacoesContext);
  if (!context) {
    throw new Error(
      "useRepactuacoes deve ser usado dentro de RepactuacoesProvider"
    );
  }
  return context;
}
