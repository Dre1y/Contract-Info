
import { cn } from "@/lib/utils";
import { ContractStatus } from "../types/contract";

interface StatusBadgeProps {
  status: ContractStatus;
  className?: string;
}

const statusConfig = {
  draft: {
    label: 'Rascunho',
    className: 'bg-gray-100 text-gray-800 border-gray-200'
  },
  'in-review': {
    label: 'Em Revisão',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  signed: {
    label: 'Assinado',
    className: 'bg-green-100 text-green-800 border-green-200'
  },
  expired: {
    label: 'Expirado',
    className: 'bg-red-100 text-red-800 border-red-200'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
};
