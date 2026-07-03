import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { MonthlyClosing, ServiceType } from '../types';
import DateRangePicker from './DateRangePicker';
import ServiceTypeManager from './ServiceTypeManager';
<<<<<<< HEAD
import SummaryPanel from './SummaryPanel';
=======
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
import { monthNumberToName } from '../utils/monthlyStorage';

interface ClosingInfoFormProps {
  closing: MonthlyClosing;
  serviceTypes?: ServiceType[];
  onChange: (next: MonthlyClosing) => void;
  onServiceTypesChange?: (serviceTypes: ServiceType[]) => void;
}

export default function ClosingInfoForm({
  closing,
  onChange,
  serviceTypes,
  onServiceTypesChange,
}: ClosingInfoFormProps) {
  const [isServiceTypesOpen, setIsServiceTypesOpen] = useState(false);

  const update = (field: keyof MonthlyClosing) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({ ...closing, [field]: field === 'year' ? Number(event.target.value) : event.target.value });
    };

  return (
    <section className="card section-card">
      <div className="section-title-row">
        <h3>Informações do fechamento</h3>
      </div>

<<<<<<< HEAD
      <SummaryPanel closing={closing} />

=======
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
      <div className="grid-2 closing-info-fields">
        <div className="field">
          <label htmlFor="closing-title">Nome do fechamento</label>
          <input
            id="closing-title"
            value={closing.title}
            onChange={update('title')}
            placeholder="Ex.: Jobinho"
          />
        </div>

        <DateRangePicker
          periodStart={closing.periodStart}
          periodEnd={closing.periodEnd}
          onChange={(periodStart, periodEnd) => {
            const nextClosing = { ...closing, periodStart, periodEnd };
            if (periodStart) {
              const parsed = new Date(periodStart);
              if (!Number.isNaN(parsed.getTime())) {
                nextClosing.month = monthNumberToName(parsed.getMonth() + 1);
                nextClosing.year = parsed.getFullYear();
              }
            }
            onChange(nextClosing);
          }}
        />
      </div>

      <section className="collapsible-section">
        <button
          type="button"
          className="collapsible-header"
          onClick={() => setIsServiceTypesOpen((previous) => !previous)}
          aria-expanded={isServiceTypesOpen}
        >
          Tipos de serviços
          <span className="collapsible-icon">{isServiceTypesOpen ? '−' : '+'}</span>
        </button>

        {isServiceTypesOpen && serviceTypes && onServiceTypesChange && (
          <div className="collapsible-content">
            <ServiceTypeManager serviceTypes={serviceTypes} onChange={onServiceTypesChange} />
          </div>
        )}
      </section>
    </section>
  );
}
