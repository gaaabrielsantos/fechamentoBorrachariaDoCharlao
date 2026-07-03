import type { MonthlyClosing, SavedClosingRef, ServiceType } from '../types';
import { calculateMonthTotal, calculateTotalServiceCount } from './totals';
import { suggestServicePlural } from './serviceDescription';

const CLOSING_PREFIX = 'fechamento-';
const SERVICE_TYPES_KEY = 'service-types-v1';

const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Marco',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export const monthNumberToName = (month: number): string => MONTH_NAMES[Math.max(1, Math.min(12, month)) - 1];

export const monthNameToNumber = (monthName: string): number => {
  const normalized = monthName.trim().toLowerCase();
  const index = MONTH_NAMES.findIndex((name) => name.toLowerCase() === normalized);
  return index >= 0 ? index + 1 : 1;
};

export const generateClosingStorageKey = (month: number, year: number): string => {
  const m = String(month).padStart(2, '0');
  return `${CLOSING_PREFIX}${year}-${m}`;
};

export const saveMonthlyClosing = (closing: MonthlyClosing): void => {
  const now = new Date().toISOString();
  const normalized: MonthlyClosing = {
    ...closing,
    createdAt: closing.createdAt || now,
    updatedAt: now,
  };
  const monthNumber = monthNameToNumber(closing.month);
  const key = generateClosingStorageKey(monthNumber, closing.year);
  localStorage.setItem(key, JSON.stringify(normalized));
};

export const updateMonthlyClosing = (closing: MonthlyClosing): void => {
  saveMonthlyClosing(closing);
};

export const loadMonthlyClosing = (year: number, month: number): MonthlyClosing | null => {
  const key = generateClosingStorageKey(month, year);
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const parsed = JSON.parse(raw) as Partial<MonthlyClosing>;
  const now = new Date().toISOString();

  return {
    id: parsed.id || crypto.randomUUID(),
    title: parsed.title || 'Jobinho',
    periodStart: parsed.periodStart || '',
    periodEnd: parsed.periodEnd || '',
    month: parsed.month || monthNumberToName(month),
    year: parsed.year || year,
    days: parsed.days || [],
    createdAt: parsed.createdAt || now,
    updatedAt: parsed.updatedAt || now,
  };
};

export const deleteMonthlyClosing = (year: number, month: number): void => {
  const key = generateClosingStorageKey(month, year);
  localStorage.removeItem(key);
};

export const listSavedClosings = (): SavedClosingRef[] => {
  const refs: SavedClosingRef[] = [];

  Object.keys(localStorage).forEach((key) => {
    if (!key.startsWith(CLOSING_PREFIX)) return;

    const suffix = key.replace(CLOSING_PREFIX, '');
    const [yearText, monthText] = suffix.split('-');
    const year = Number.parseInt(yearText, 10);
    const month = Number.parseInt(monthText, 10);

    if (!year || !month) return;

    const loaded = loadMonthlyClosing(year, month);
    if (!loaded) return;

    refs.push({
      key,
      year,
      month,
      label: `${monthNumberToName(month)} / ${year}`,
      closing: {
        id: loaded.id,
        title: loaded.title,
        periodStart: loaded.periodStart,
        periodEnd: loaded.periodEnd,
        month: loaded.month,
        year: loaded.year,
        totalServices: calculateTotalServiceCount(loaded),
        totalValue: calculateMonthTotal(loaded),
        updatedAt: loaded.updatedAt,
      },
    });
  });

  return refs.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
};

export const saveServiceTypes = (types: ServiceType[]): void => {
<<<<<<< HEAD
  localStorage.setItem(SERVICE_TYPES_KEY, JSON.stringify(types));
=======
  const normalized = types.map((item) => {
    const singular = (item.nameSingular ?? item.name).trim().toUpperCase();
    return {
      ...item,
      name: singular,
      nameSingular: singular,
      namePlural: (item.namePlural ?? suggestServicePlural(singular)).trim().toUpperCase(),
    };
  });

  localStorage.setItem(SERVICE_TYPES_KEY, JSON.stringify(normalized));
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
};

export const loadServiceTypes = (): ServiceType[] => {
  const raw = localStorage.getItem(SERVICE_TYPES_KEY);
  if (!raw) return [];
  const parsed = JSON.parse(raw) as ServiceType[];
<<<<<<< HEAD
  return parsed.map((item) => ({
    ...item,
    nameSingular: item.nameSingular ?? item.name,
    namePlural: item.namePlural ?? suggestServicePlural(item.name),
=======

  return parsed.map((item) => ({
    ...item,
    name: (item.nameSingular ?? item.name).trim().toUpperCase(),
    nameSingular: (item.nameSingular ?? item.name).trim().toUpperCase(),
    namePlural: (item.namePlural ?? suggestServicePlural(item.nameSingular ?? item.name)).trim().toUpperCase(),
    unitValue:
      (item.nameSingular ?? item.name).trim().toLowerCase() === 'balanceamento' && item.unitValue === 25
        ? 20
        : item.unitValue,
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
  }));
};
