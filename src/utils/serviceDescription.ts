import type { SelectedServiceType } from '../types';

const KNOWN_PLURALS: Record<string, string> = {
  alinhamento: 'alinhamentos',
  balanceamento: 'balanceamentos',
  conserto: 'consertos',
  montagem: 'montagens',
  'retirada de engate': 'retiradas de engate',
  'rodízio de pneus e rodas': 'rodízios de pneus e rodas',
  'rodizio de pneus e rodas': 'rodizios de pneus e rodas',
};

const normalizeServiceName = (name: string): string => name.trim().toLowerCase();

export const suggestServicePlural = (name: string): string => {
  const normalized = normalizeServiceName(name);
  return KNOWN_PLURALS[normalized] ?? `${normalized}s`;
};

const getPluralName = (service: SelectedServiceType): string => {
  if (service.namePlural?.trim()) return service.namePlural.trim();
  if (service.nameSingular?.trim()) {
    const singular = normalizeServiceName(service.nameSingular);
    return KNOWN_PLURALS[singular] ?? `${singular}s`;
  }

  const normalized = normalizeServiceName(service.name);
  return KNOWN_PLURALS[normalized] ?? `${normalized}s`;
};

const getSingularName = (service: SelectedServiceType): string => {
  if (service.nameSingular?.trim()) return service.nameSingular.trim();
  return service.name.trim();
};

export const calculateSelectedServicesTotal = (selectedServices: SelectedServiceType[]): number =>
  selectedServices.reduce((sum, item) => sum + item.subtotal, 0);

export const formatSelectedServiceLabel = (service: SelectedServiceType): string => {
  const quantity = service.quantity;
  return `${quantity} ${quantity === 1 ? getSingularName(service) : getPluralName(service)}`;
};

export const generateServiceDescription = (selectedServices: SelectedServiceType[]): string => {
  if (selectedServices.length === 0) return '';

  return selectedServices.map((item) => formatSelectedServiceLabel(item)).join(' + ');
};

export const getServiceDisplayName = (service: SelectedServiceType, quantity: number): string =>
  quantity === 1 ? getSingularName(service) : getPluralName(service);
