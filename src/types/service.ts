import type { SelectedServiceType } from './serviceType';

export interface ServiceItem {
  id: string;
  vehicle: string;
  plate: string;
  selectedServices: SelectedServiceType[];
  value: number;
  description: string;
}
