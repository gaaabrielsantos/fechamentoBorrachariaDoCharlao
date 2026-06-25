import { useState } from 'react';
import type { DayGroup, ServiceItem, ServiceType } from '../types';
import { calculateDayServiceCount, calculateDayTotal } from '../utils/totals';
import { formatCurrencyBRL } from '../utils/currency';
import ServiceCard from './ServiceCard';
import ServiceForm from './ServiceForm';

interface DayBlockProps {
  day: DayGroup;
  serviceTypes: ServiceType[];
  onAddService: (dayId: string, service: ServiceItem) => void;
  onEditService: (dayId: string, service: ServiceItem) => void;
  onDeleteService: (dayId: string, serviceId: string) => void;
  onDeleteDay: (dayId: string) => void;
}

export default function DayBlock({
  day,
  serviceTypes,
  onAddService,
  onEditService,
  onDeleteService,
  onDeleteDay,
}: DayBlockProps) {
  const [showNewForm, setShowNewForm] = useState(false);
  const dayTotal = calculateDayTotal(day);
  const serviceCount = calculateDayServiceCount(day);

  return (
    <section className="card day-card">
      <header className="day-card-head">
        <div>
          <h4>{day.date}</h4>
          <p>{day.weekday}</p>
        </div>

        <div className="day-card-kpis">
          <span>{serviceCount === 1 ? '1 serviço' : `${serviceCount} serviços`}</span>
          <strong>{formatCurrencyBRL(dayTotal)}</strong>
        </div>

        <button type="button" className="btn btn-danger" onClick={() => onDeleteDay(day.id)}>
          Excluir dia
        </button>
      </header>

      <div className="day-card-body">
        {serviceCount === 0 && <p className="day-empty">Nenhum serviço cadastrado neste dia.</p>}

        {day.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            serviceTypes={serviceTypes}
            onEdit={(updated) => onEditService(day.id, updated)}
            onDelete={(serviceId) => onDeleteService(day.id, serviceId)}
          />
        ))}

        {showNewForm ? (
          <ServiceForm
            serviceTypes={serviceTypes}
            submitLabel="Adicionar serviço"
            onSave={(service) => {
              onAddService(day.id, service);
              setShowNewForm(false);
            }}
            onCancel={() => setShowNewForm(false)}
          />
        ) : (
          <button type="button" className="btn btn-secondary" onClick={() => setShowNewForm(true)}>
            Adicionar novo serviço
          </button>
        )}
      </div>
    </section>
  );
}
