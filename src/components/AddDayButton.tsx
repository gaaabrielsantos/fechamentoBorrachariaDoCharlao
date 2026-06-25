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
  };

  return (
    <div className="add-day-area">
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
      />
    </div>
  );
}
