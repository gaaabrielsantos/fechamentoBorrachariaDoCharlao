import { useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { parseISODate, toISODate } from '../utils/date';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  periodStart: string;
  periodEnd: string;
  onChange: (periodStart: string, periodEnd: string) => void;
}

export default function DateRangePicker({ periodStart, periodEnd, onChange }: DateRangePickerProps) {
  const startDate = useMemo(() => parseISODate(periodStart), [periodStart]);
  const endDate = useMemo(() => parseISODate(periodEnd), [periodEnd]);

  return (
    <div className="field">
      <label htmlFor="period-range">Período</label>
      <DatePicker
        id="period-range"
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => {
          const [start, end] = dates;
          onChange(start ? toISODate(start) : '', end ? toISODate(end) : '');
        }}
        dateFormat="dd/MM/yyyy"
        placeholderText=""
        className="calendar-input"
        isClearable
      />

    </div>
  );
}
