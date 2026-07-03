import logoCharlao from '../assets/logo-jobinho.png';
import { formatCurrencyBRL } from '../utils/currency';
import { formatDateFromISOToBR } from '../utils/date';

type ReportHeaderProps = {
  title: string;
  periodStart: string;
  periodEnd: string;
  total: number;
};

export default function ReportHeader({ title, periodStart, periodEnd, total }: ReportHeaderProps) {
  const displayTitle = title?.trim() || 'Jobinho';
  const start = periodStart ? formatDateFromISOToBR(periodStart) : '-';
  const end = periodEnd ? formatDateFromISOToBR(periodEnd) : '-';

  return (
    <header className="report-header">
      <div className="report-header__content">
        <div className="report-header__left">
          <h1 className="report-header__title">{displayTitle}</h1>

          <div className="report-header__info">
            <div className="report-header__info-item">
              <span>datas</span>
              <strong>
                {start} à {end}
              </strong>
            </div>

            <div className="report-header__info-item">
              <span>Valor total</span>
              <strong>{formatCurrencyBRL(total)}</strong>
            </div>
          </div>
        </div>

        <div className="report-header__right">
          <img src={logoCharlao} alt="Borracharia do Charlao" className="report-header__logo" />
        </div>
      </div>
    </header>
  );
}