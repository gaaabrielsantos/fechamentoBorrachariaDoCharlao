import type { MonthlyClosing } from '../types';
import {
  deleteMonthlyClosing,
  loadMonthlyClosing,
  monthNameToNumber,
  updateMonthlyClosing,
} from './monthlyStorage';

export const saveClosingToStorage = (closing: MonthlyClosing): void => {
  updateMonthlyClosing(closing);
};

export const loadClosingFromStorage = (year: number, month: number): MonthlyClosing | null => {
  return loadMonthlyClosing(year, month);
};

export const clearClosingStorage = (closing: MonthlyClosing): void => {
  const month = monthNameToNumber(closing.month);
  deleteMonthlyClosing(closing.year, month);
};
