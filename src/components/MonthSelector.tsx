import { useEffect, useMemo, useState } from 'react';
import type { SavedClosingRef } from '../types';

interface MonthSelectorProps {
  savedClosings: SavedClosingRef[];
  currentMonth: number;
  currentYear: number;
  onOpen: (year: number, month: number) => void;
  onDelete: (year: number, month: number) => void;
  onCreate: (year: number, month: number) => void;
}

const monthOptions = [
  { value: 1, label: 'Janeiro' },
  { value: 2, label: 'Fevereiro' },
  { value: 3, label: 'Marco' },
  { value: 4, label: 'Abril' },
  { value: 5, label: 'Maio' },
  { value: 6, label: 'Junho' },
  { value: 7, label: 'Julho' },
  { value: 8, label: 'Agosto' },
  { value: 9, label: 'Setembro' },
  { value: 10, label: 'Outubro' },
  { value: 11, label: 'Novembro' },
  { value: 12, label: 'Dezembro' },
];

export default function MonthSelector({
  savedClosings,
  currentMonth,
  currentYear,
  onOpen,
  onDelete,
  onCreate,
}: MonthSelectorProps) {
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    setMonth(currentMonth);
    setYear(currentYear);
  }, [currentMonth, currentYear]);

  const years = useMemo(() => {
    const base = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, index) => base - 3 + index);
  }, []);

  return (
    <section className="card section-card">
      <div className="section-title-row">
        <h3>Fechamentos mensais</h3>
      </div>

      <div className="month-selector-row">
        <select value={month} onChange={(event) => setMonth(Number.parseInt(event.target.value, 10))}>
          {monthOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select value={year} onChange={(event) => setYear(Number.parseInt(event.target.value, 10))}>
          {years.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <button type="button" className="btn btn-secondary" onClick={() => onCreate(year, month)}>
          Novo mes
        </button>
        <button type="button" className="btn btn-primary" onClick={() => onOpen(year, month)}>
          Abrir mes
        </button>
      </div>

      <div className="saved-closings-list">
        {savedClosings.map((item) => (
          <div key={item.key} className="saved-closings-row">
            <span>{item.label}</span>
            <div>
              <button type="button" className="btn btn-ghost" onClick={() => onOpen(item.year, item.month)}>
                Abrir
              </button>
              <button type="button" className="btn btn-danger" onClick={() => onDelete(item.year, item.month)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
