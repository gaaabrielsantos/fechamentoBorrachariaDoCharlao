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
