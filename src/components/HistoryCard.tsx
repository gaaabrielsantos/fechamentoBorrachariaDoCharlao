import type { SavedClosingRef } from '../types';
import { formatCurrencyBRL } from '../utils/currency';
import { formatDateFromISOToBR, formatDateTimeBR } from '../utils/date';

interface HistoryCardProps {
  item: SavedClosingRef;
  onEdit: (year: number, month: number) => void;
  onDelete: (year: number, month: number) => void;
}

export default function HistoryCard({ item, onEdit, onDelete }: HistoryCardProps) {
  const { closing } = item;

  return (
    <article className="card history-card">
      <div className="history-card-header">
        <h3>{closing.title || 'Fechamento Mensal'} - {item.label}</h3>
      </div>

      <div className="history-card-content">
        <p>
          <strong>Período:</strong> {formatDateFromISOToBR(closing.periodStart)} a {formatDateFromISOToBR(closing.periodEnd)}
        </p>
        <p>
          <strong>Serviços:</strong> {closing.totalServices}
        </p>
        <p>
          <strong>Total:</strong> {formatCurrencyBRL(closing.totalValue)}
        </p>
        <p>
          <strong>Última atualização:</strong> {formatDateTimeBR(closing.updatedAt)}
        </p>
      </div>

      <div className="history-actions">
        <button type="button" className="btn btn-secondary history-action-btn" onClick={() => onEdit(item.year, item.month)}>
          Editar
        </button>
        <button type="button" className="btn btn-danger history-action-btn" onClick={() => onDelete(item.year, item.month)}>
          Excluir
        </button>
      </div>
    </article>
  );
}
