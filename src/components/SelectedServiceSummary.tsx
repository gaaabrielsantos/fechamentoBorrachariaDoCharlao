import type { SelectedServiceType } from '../types';
import { formatCurrencyBRL } from '../utils/currency';
import { calculateSelectedServicesTotal, formatSelectedServiceLabel } from '../utils/serviceDescription';

interface SelectedServiceSummaryProps {
  selectedServices: SelectedServiceType[];
}

export default function SelectedServiceSummary({ selectedServices }: SelectedServiceSummaryProps) {
  const total = calculateSelectedServicesTotal(selectedServices);

  return (
    <div className="selected-summary card">
      <h4>Resumo dos serviços selecionados</h4>

      {selectedServices.length === 0 ? (
        <p>Nenhum serviço marcado.</p>
      ) : (
        <ul>
          {selectedServices.map((item) => (
            <li key={item.serviceTypeId}>
              {formatSelectedServiceLabel(item)} ({formatCurrencyBRL(item.unitValue)}) ={' '}
              <strong>{formatCurrencyBRL(item.subtotal)}</strong>
            </li>
          ))}
        </ul>
      )}

      <p className="selected-total">
        Total do atendimento: <strong>{formatCurrencyBRL(total)}</strong>
      </p>
    </div>
  );
}
