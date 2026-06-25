import type { MonthlyClosing } from '../types';
import {
  calculateDayTotal,
  calculateMonthTotal,
} from '../utils/totals';
import { formatCurrencyBRL } from '../utils/currency';
import { formatDateFromISOToBR } from '../utils/date';
import { formatSelectedServiceLabel } from '../utils/serviceDescription';

interface ReportPreviewProps {
  closing: MonthlyClosing;
  reportId?: string;
}

export default function ReportPreview({ closing, reportId = 'monthly-report' }: ReportPreviewProps) {
  const monthTotal = calculateMonthTotal(closing);

  return (
    <section id={reportId} className="report-sheet">
      <header className="report-top">
        <div className="report-brand">
          <h2>{closing.title || 'Fechamento mensal'}</h2>
          <p>
            Periodo: {closing.periodStart ? formatDateFromISOToBR(closing.periodStart) : '-'} a{' '}
            {closing.periodEnd ? formatDateFromISOToBR(closing.periodEnd) : '-'}
          </p>
          <p>
            Referência: {closing.month}/{closing.year}
          </p>
        </div>

        <div className="report-overview">
          <div className="kpi total">
            <span>Valor total geral</span>
            <strong>{formatCurrencyBRL(monthTotal)}</strong>
          </div>
        </div>
      </header>

      <div>
        {closing.days.length === 0 && <p className="report-empty">Nenhum dia cadastrado.</p>}

        {closing.days.map((day) => {
          const dayTotal = calculateDayTotal(day);

          return (
            <article key={day.id} className="report-day">
              <div className="report-day-head">
                <div>
                  <strong>Data: {day.date}</strong>
                  <p>Dia da semana: {day.weekday}</p>
                </div>
                <div>
                  <strong>Subtotal: {formatCurrencyBRL(dayTotal)}</strong>
                </div>
              </div>

              <div className="report-day-services">
                <div className="report-row head">
                  <span>Veículo</span>
                  <span>Placa</span>
                  <span>Descrição</span>
                  <span>Valor</span>
                </div>

                {day.services.map((service) => (
                  <div key={service.id} className="report-row">
                    <span>{service.vehicle || '-'}</span>
                    <span>{service.plate || '-'}</span>
                    <span>
                      {service.description ||
                        (service.selectedServices && service.selectedServices.length > 0
                          ? service.selectedServices.map((item) => formatSelectedServiceLabel(item)).join(' + ')
                          : '-')}
                    </span>
                    <span>{formatCurrencyBRL(service.value)}</span>
                  </div>
                ))}

                <div className="report-row subtotal">
                  <span>Subtotal do dia</span>
                  <span>-</span>
                  <span>-</span>
                  <span>{formatCurrencyBRL(dayTotal)}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
