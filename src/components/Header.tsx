import type { MonthlyClosing } from '../types';
import { calculateMonthTotal } from '../utils/totals';
import { formatCurrencyBRL } from '../utils/currency';
import { formatDateFromISOToBR } from '../utils/date';

interface HeaderProps {
  closing: MonthlyClosing;
}

export default function Header({ closing }: HeaderProps) {
  const periodStart = closing.periodStart ? formatDateFromISOToBR(closing.periodStart) : '-';
  const periodEnd = closing.periodEnd ? formatDateFromISOToBR(closing.periodEnd) : '-';
  const totalValue = formatCurrencyBRL(calculateMonthTotal(closing));
  const monthLabel = closing.month || '-';

  return (
    <header className="jobinho-header">
      <div className="header-content">
        <div className="header-left">
          <h1>{closing.title || 'JOBINHO'}</h1>

          <div className="header-info">
            <div className="info-item">
              <span>datas</span>
              <strong>{periodStart} à {periodEnd}</strong>
            </div>

            <div className="info-item">
              <span>mês</span>
              <strong>{monthLabel}</strong>
            </div>

            <div className="info-item">
              <span>Valor total</span>
              <strong>{totalValue}</strong>
            </div>
          </div>
        </div>

        <div className="header-right">
          <img src="/logo.png" alt="Borracharia do Charlão" className="header-logo" />
        </div>
      </div>
    </header>
  );
}
