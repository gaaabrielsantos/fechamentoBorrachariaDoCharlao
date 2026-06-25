import type { MonthlyClosing } from '../types';
import { calculateMonthTotal } from '../utils/totals';
import { formatCurrencyBRL } from '../utils/currency';
import { formatDateFromISOToBR } from '../utils/date';

interface SummaryPanelProps {
  closing: MonthlyClosing;
}

export default function SummaryPanel({ closing }: SummaryPanelProps) {
  const monthTotal = calculateMonthTotal(closing);
  const formattedPeriod = closing.periodStart && closing.periodEnd
    ? `${formatDateFromISOToBR(closing.periodStart)} a ${formatDateFromISOToBR(closing.periodEnd)}`
    : '-';

  return (
    <div className="closing-summary-compact">
      <div className="summary-left">
        <div className="summary-item">
          <span>Nome do fechamento</span>
          <strong>{closing.title || '-'}</strong>
        </div>

        <div className="summary-item">
          <span>Período</span>
          <strong>{formattedPeriod}</strong>
        </div>
      </div>

      <div className="summary-total">
        <span>Valor total geral</span>
        <strong>{formatCurrencyBRL(monthTotal)}</strong>
      </div>
    </div>
  );
}
