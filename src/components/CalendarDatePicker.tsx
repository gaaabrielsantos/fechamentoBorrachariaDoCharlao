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
    if (date) {
      onDateSelected(formatDateBR(date));
    }
  };

  return (
    <div className="calendar-field-hidden-label">
      <DatePicker
        id="calendar-day"
        selected={selectedDate}
        onChange={handleSelect}
        dateFormat="dd/MM/yyyy"
        placeholderText="Escolha dia, mes e ano"
        className="calendar-input"
      />
    </div>
  );
}
