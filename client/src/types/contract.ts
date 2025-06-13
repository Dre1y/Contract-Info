
export interface Contract {
  id: string;
  title: string;
  client: string;
  value: number;
  status: 'draft' | 'in-review' | 'signed' | 'expired';
  createdAt: Date;
  expiryDate: Date;
  description: string;
  signedDate?: Date;
}

export type ContractStatus = Contract['status'];
