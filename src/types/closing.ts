import type { ServiceItem } from './service';

export interface DayGroup {
  id: string;
  date: string;
  weekday: string;
  services: ServiceItem[];
}

export interface MonthlyClosing {
  id: string;
  title: string;
  periodStart: string;
  periodEnd: string;
  month: string;
  year: number;
  days: DayGroup[];
  createdAt: string;
  updatedAt: string;
}
