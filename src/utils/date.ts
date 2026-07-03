<<<<<<< HEAD
=======
import type { DayGroup } from '../types';

>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
const weekdayFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });

const toTitleCase = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const parseDateBR = (dateString: string): Date | null => {
  const [dayStr, monthStr, yearStr] = dateString.split('/');
  const day = Number.parseInt(dayStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const year = Number.parseInt(yearStr, 10);

  if (!day || !month || !year) return null;

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const formatDateBR = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const toISODate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const parseISODate = (dateString: string): Date | null => {
  const [yearStr, monthStr, dayStr] = dateString.split('-');
  const year = Number.parseInt(yearStr, 10);
  const month = Number.parseInt(monthStr, 10);
  const day = Number.parseInt(dayStr, 10);

  if (!year || !month || !day) return null;

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const formatDateFromISOToBR = (dateString: string): string => {
  const parsed = parseISODate(dateString);
  return parsed ? formatDateBR(parsed) : '-';
};

export const formatDateTimeBR = (dateTimeString: string): string => {
  const parsed = new Date(dateTimeString);
  if (Number.isNaN(parsed.getTime())) return '-';

  return parsed.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getWeekdayFromDate = (dateString: string): string => {
  const parsed = parseDateBR(dateString);
  if (!parsed) return '-';
  const weekday = weekdayFormatter.format(parsed);
  return toTitleCase(weekday);
};

export const isValidDate = (dateString: string): boolean => parseDateBR(dateString) !== null;

export const compareDateBR = (a: string, b: string): number => {
  const dateA = parseDateBR(a);
  const dateB = parseDateBR(b);
  if (!dateA || !dateB) return 0;
  return dateA.getTime() - dateB.getTime();
};
<<<<<<< HEAD
=======

const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const parseDayDate = (value: string): Date | null => {
  if (!value) return null;
  return parseISODate(value) ?? parseDateBR(value);
};

export function getNextSuggestedDate(days: DayGroup[], periodStart?: string): string {
  if (!days || days.length === 0) {
    const parsedPeriodStart = periodStart ? parseISODate(periodStart) : null;
    return parsedPeriodStart ? formatDateToISO(parsedPeriodStart) : formatDateToISO(new Date());
  }

  const sortedDays = [...days]
    .map((day) => parseDayDate(day.date))
    .filter((date): date is Date => Boolean(date))
    .sort((a, b) => a.getTime() - b.getTime());

  if (sortedDays.length === 0) {
    const parsedPeriodStart = periodStart ? parseISODate(periodStart) : null;
    return parsedPeriodStart ? formatDateToISO(parsedPeriodStart) : formatDateToISO(new Date());
  }

  const lastDate = new Date(sortedDays[sortedDays.length - 1].getTime());
  lastDate.setDate(lastDate.getDate() + 1);
  return formatDateToISO(lastDate);
}
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
