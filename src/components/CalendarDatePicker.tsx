import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { formatDateBR } from '../utils/date';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarDatePickerProps {
  onDateSelected: (dateString: string) => void;
}

export default function CalendarDatePicker({ onDateSelected }: CalendarDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSelect = (date: Date | null) => {
    setSelectedDate(date);
<<<<<<< HEAD
    if (date) {
      onDateSelected(formatDateBR(date));
=======
  };

  const handleConfirm = () => {
    if (!selectedDate) return;
    onDateSelected(formatDateBR(selectedDate));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleConfirm();
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    }
  };

  return (
    <div className="calendar-field-hidden-label">
      <DatePicker
        id="calendar-day"
        selected={selectedDate}
        onChange={handleSelect}
<<<<<<< HEAD
=======
        onKeyDown={handleKeyDown}
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
        dateFormat="dd/MM/yyyy"
        placeholderText="Escolha dia, mes e ano"
        className="calendar-input"
      />
<<<<<<< HEAD
=======
      <div className="add-day-picker-actions">
        <button type="button" className="btn btn-primary" onClick={handleConfirm}>
          Confirmar dia
        </button>
      </div>
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
    </div>
  );
}
