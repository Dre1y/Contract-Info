export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aditivos: {
        Row: {
          contrato_id: string
          created_at: string
          id: string
          motivo_aditivo: string
          status: string
          tipo: string
          updated_at: string
          valor_ajustado: number
        }
        Insert: {
          contrato_id: string
          created_at?: string
          id?: string
          motivo_aditivo: string
          status?: string
          tipo: string
          updated_at?: string
          valor_ajustado: number
        }
        Update: {
          contrato_id?: string
          created_at?: string
          id?: string
          motivo_aditivo?: string
          status?: string
          tipo?: string
          updated_at?: string
          valor_ajustado?: number
        }
        Relationships: [
          {
            foreignKeyName: "aditivos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      agregados: {
        Row: {
          cargo: string
          colaborador_id: string
          contrato_id: string
          created_at: string
          descricao_cargo: string | null
          id: string
          updated_at: string
        }
        Insert: {
          cargo: string
          colaborador_id: string
          contrato_id: string
          created_at?: string
          descricao_cargo?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          cargo?: string
          colaborador_id?: string
          contrato_id?: string
          created_at?: string
          descricao_cargo?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agregados_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agregados_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      anexos: {
        Row: {
          contrato_id: string
          created_at: string
          id: string
          link_documento: string
          nome_arquivo: string | null
          updated_at: string
        }
        Insert: {
          contrato_id: string
          created_at?: string
          id?: string
          link_documento: string
          nome_arquivo?: string | null
          updated_at?: string
        }
        Update: {
          contrato_id?: string
          created_at?: string
          id?: string
          link_documento?: string
          nome_arquivo?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "anexos_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores: {
        Row: {
          cpf: string
          created_at: string
          email: string | null
          id: string
          nome: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cpf: string
          created_at?: string
          email?: string | null
          id?: string
          nome: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cpf?: string
          created_at?: string
          email?: string | null
          id?: string
          nome?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contratos: {
        Row: {
          contratante_id: string
          created_at: string
          data_inicio: string
          data_termino: string
          descricao: string
          id: string
          tipo_servico: string
          updated_at: string
          valor_contrato: number
        }
        Insert: {
          contratante_id: string
          created_at?: string
          data_inicio: string
          data_termino: string
          descricao: string
          id?: string
          tipo_servico: string
          updated_at?: string
          valor_contrato: number
        }
        Update: {
          contratante_id?: string
          created_at?: string
          data_inicio?: string
          data_termino?: string
          descricao?: string
          id?: string
          tipo_servico?: string
          updated_at?: string
          valor_contrato?: number
        }
        Relationships: [
          {
            foreignKeyName: "contratos_contratante_id_fkey"
            columns: ["contratante_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          bairro: string | null
          cep: string | null
          cnpj: string
          created_at: string
          email: string | null
          endereco: string | null
          estado: string | null
          id: string
          nome: string
          razao_social: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          bairro?: string | null
          cep?: string | null
          cnpj: string
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome: string
          razao_social?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          bairro?: string | null
          cep?: string | null
          cnpj?: string
          created_at?: string
          email?: string | null
          endereco?: string | null
          estado?: string | null
          id?: string
          nome?: string
          razao_social?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      entregaveis: {
        Row: {
          contrato_id: string
          created_at: string
          data_entrega: string
          descricao: string
          id: string
          status: string
          updated_at: string
        }
        Insert: {
          contrato_id: string
          created_at?: string
          data_entrega: string
          descricao: string
          id?: string
          status?: string
          updated_at?: string
        }
        Update: {
          contrato_id?: string
          created_at?: string
          data_entrega?: string
          descricao?: string
          id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "entregaveis_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
      repactuacoes: {
        Row: {
          contrato_id: string
          created_at: string
          id: string
          motivo_repactuacao: string
          novo_prazo: string
          status: string
          updated_at: string
        }
        Insert: {
          contrato_id: string
          created_at?: string
          id?: string
          motivo_repactuacao: string
          novo_prazo: string
          status?: string
          updated_at?: string
        }
        Update: {
          contrato_id?: string
          created_at?: string
          id?: string
          motivo_repactuacao?: string
          novo_prazo?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "repactuacoes_contrato_id_fkey"
            columns: ["contrato_id"]
            isOneToOne: false
            referencedRelation: "contratos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
