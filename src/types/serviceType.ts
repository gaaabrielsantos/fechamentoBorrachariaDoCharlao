export interface ServiceType {
  id: string;
  name: string;
  nameSingular?: string;
  namePlural?: string;
  unitValue: number;
}

export interface SelectedServiceType {
  serviceTypeId: string;
  name: string;
  nameSingular?: string;
  namePlural?: string;
  unitValue: number;
  quantity: number;
  subtotal: number;
}

export interface SavedClosingRef {
  key: string;
  year: number;
  month: number;
  label: string;
  closing: {
    id: string;
    title: string;
    periodStart: string;
    periodEnd: string;
    month: string;
    year: number;
    totalServices: number;
    totalValue: number;
    updatedAt: string;
  };
}
