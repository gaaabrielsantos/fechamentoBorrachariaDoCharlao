export const formatCurrencyBRL = (value: number): string => {
  const safe = Number.isFinite(value) ? value : 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(safe);
};

export const parseCurrencyValue = (value: string): number => {
  if (!value.trim()) return 0;

  const normalized = value
    .replace(/[^\d,-.]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');

  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed)) return 0;
  return parsed;
};

export const formatValueInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '';

  const cents = Number.parseInt(digits, 10);
  const decimal = (cents / 100).toFixed(2);
  const [intPart, fraction] = decimal.split('.');

  return `${Number(intPart).toLocaleString('pt-BR')},${fraction}`;
};

export const isPositiveCurrency = (value: string): boolean => parseCurrencyValue(value) > 0;
