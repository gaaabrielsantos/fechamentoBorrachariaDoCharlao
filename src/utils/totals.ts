import type { DayGroup, MonthlyClosing } from '../types';

export const calculateDayTotal = (day: DayGroup): number =>
  day.services.reduce((sum, service) => sum + service.value, 0);

export const calculateMonthTotal = (closing: MonthlyClosing): number =>
  closing.days.reduce((sum, day) => sum + calculateDayTotal(day), 0);

export const calculateDayServiceCount = (day: DayGroup): number => day.services.length;

export const calculateTotalServiceCount = (closing: MonthlyClosing): number =>
  closing.days.reduce((sum, day) => sum + day.services.length, 0);

export const calculateTotalDayCount = (closing: MonthlyClosing): number => closing.days.length;
