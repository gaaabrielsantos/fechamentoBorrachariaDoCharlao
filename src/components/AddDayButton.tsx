<<<<<<< HEAD
import { useRef } from 'react';
import { parseISODate, formatDateBR } from '../utils/date';

interface AddDayButtonProps {
  onDaySelected: (date: string) => void;
}

export default function AddDayButton({ onDaySelected }: AddDayButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenCalendar = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker();
    } else {
      inputRef.current?.click();
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;

    if (!selectedDate) return;

    const parsed = parseISODate(selectedDate);
    if (!parsed) return;

    const formattedDate = formatDateBR(parsed);
    onDaySelected(formattedDate);

    event.target.value = '';
=======
import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { parseISODate, formatDateBR } from '../utils/date';
import 'react-datepicker/dist/react-datepicker.css';

interface AddDayButtonProps {
  onDaySelected: (date: string) => void;
  suggestedDate?: string;
}

type AddDayTriggerProps = {
  onClick?: () => void;
};

const AddDayTrigger = forwardRef<HTMLButtonElement, AddDayTriggerProps>(({ onClick }, ref) => (
  <button ref={ref} type="button" className="btn btn-primary add-day-button" onClick={onClick}>
    + Adicionar dia
  </button>
));

AddDayTrigger.displayName = 'AddDayTrigger';

const getSuggestedAsDate = (suggestedDate?: string): Date => {
  if (!suggestedDate) return new Date();
  return parseISODate(suggestedDate) ?? new Date();
};

export default function AddDayButton({ onDaySelected, suggestedDate }: AddDayButtonProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(getSuggestedAsDate(suggestedDate));

  useEffect(() => {
    setSelectedDate(getSuggestedAsDate(suggestedDate));
  }, [suggestedDate]);

  const handleSelectDate = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    onDaySelected(formatDateBR(date));
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
  };

  return (
    <div className="add-day-area">
<<<<<<< HEAD
      <button type="button" className="btn btn-primary add-day-button" onClick={handleOpenCalendar}>
        + Adicionar dia
      </button>

      <input
        ref={inputRef}
        type="date"
        className="hidden-date-input"
        onChange={handleDateChange}
        aria-hidden="true"
        tabIndex={-1}
=======
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => setSelectedDate(date)}
        onSelect={handleSelectDate}
        dateFormat="dd/MM/yyyy"
        customInput={<AddDayTrigger />}
        shouldCloseOnSelect
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
      />
    </div>
  );
}
