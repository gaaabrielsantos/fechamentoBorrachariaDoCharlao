import { useMemo } from 'react';
import type { DayGroup, MonthlyClosing, ServiceItem, ServiceType } from '../types';
import AddDayButton from '../components/AddDayButton';
import ClosingInfoForm from '../components/ClosingInfoForm';
import DayBlock from '../components/DayBlock';
import GeneratePdfButton from '../components/GeneratePdfButton';
import ReportPreview from '../components/ReportPreview';
import { compareDateBR, getWeekdayFromDate } from '../utils/date';

interface HomePageProps {
  closing: MonthlyClosing;
  serviceTypes: ServiceType[];
  onServiceTypesChange: (serviceTypes: ServiceType[]) => void;
  onChange: (closing: MonthlyClosing) => void;
  onResetCurrentMonth: () => void;
}

export default function HomePage({
  closing,
  serviceTypes,
  onServiceTypesChange,
  onChange,
  onResetCurrentMonth,
}: HomePageProps) {
  const sortedDays = useMemo(
    () => [...closing.days].sort((a, b) => compareDateBR(a.date, b.date)),
    [closing.days],
  );

  const addDayFromDate = (date: string) => {
    if (sortedDays.some((day) => day.date === date)) return;

    const newDay: DayGroup = {
      id: crypto.randomUUID(),
      date,
      weekday: getWeekdayFromDate(date),
      services: [],
    };

    onChange({ ...closing, days: [...closing.days, newDay] });
  };

  const deleteDay = (dayId: string) => {
    onChange({ ...closing, days: closing.days.filter((day) => day.id !== dayId) });
  };

  const addService = (dayId: string, service: ServiceItem) => {
    onChange({
      ...closing,
      days: closing.days.map((day) =>
        day.id === dayId ? { ...day, services: [...day.services, service] } : day,
      ),
    });
  };

  const editService = (dayId: string, service: ServiceItem) => {
    onChange({
      ...closing,
      days: closing.days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              services: day.services.map((item) => (item.id === service.id ? service : item)),
            }
          : day,
      ),
    });
  };

  const deleteService = (dayId: string, serviceId: string) => {
    onChange({
      ...closing,
      days: closing.days.map((day) =>
        day.id === dayId
          ? { ...day, services: day.services.filter((service) => service.id !== serviceId) }
          : day,
      ),
    });
  };

  const handleClearCurrentMonth = () => {
    const confirmed = window.confirm(
      'Tem certeza de que deseja limpar o fechamento do mês atual? Essa ação não poderá ser desfeita.',
    );
    if (!confirmed) return;

    onResetCurrentMonth();
  };

  return (
    <div className="main-content">
      <ClosingInfoForm
        closing={closing}
        onChange={onChange}
        serviceTypes={serviceTypes}
        onServiceTypesChange={onServiceTypesChange}
      />

      <section className="card section-card report-section">
        <div className="section-title-row">
          <h3>Relatório</h3>
        </div>

        <button
          type="button"
          className="btn btn-danger clear-current-closing-button"
          onClick={handleClearCurrentMonth}
        >
          Limpar fechamento do mês atual
        </button>

        <div className="days-stack">
          {sortedDays.map((day) => (
            <DayBlock
              key={day.id}
              day={day}
              serviceTypes={serviceTypes}
              onAddService={addService}
              onEditService={editService}
              onDeleteService={deleteService}
              onDeleteDay={deleteDay}
            />
          ))}
        </div>

        <AddDayButton onDaySelected={addDayFromDate} />
      </section>

      <section className="card section-card">
        <div className="section-title-row">
          <h3>Gerar PDF</h3>
        </div>
        <div className="add-day-area">
          <div className="add-day-wrapper">
            <GeneratePdfButton closing={closing} reportId="monthly-report" />
          </div>
        </div>
      </section>

      <div className="report-preview-hidden">
        <ReportPreview closing={closing} reportId="monthly-report" />
      </div>
    </div>
  );
}
