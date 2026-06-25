import type { SavedClosingRef } from '../types';
import HistoryCard from '../components/HistoryCard';

interface HistoryPageProps {
  savedClosings: SavedClosingRef[];
  onEdit: (year: number, month: number) => void;
  onDelete: (year: number, month: number) => void;
  onGoToNew: () => void;
}

export default function HistoryPage({ savedClosings, onEdit, onDelete, onGoToNew }: HistoryPageProps) {
  return (
    <section className="history-page">
      <div className="history-header-row no-print">
        <h2>Historicos</h2>
        <button type="button" className="btn btn-primary" onClick={onGoToNew}>
          Novo Fechamento
        </button>
      </div>

      {savedClosings.length === 0 ? (
        <section className="card section-card">
          <p>Nenhum fechamento salvo ate o momento.</p>
        </section>
      ) : (
        <div className="history-list">
          {savedClosings.map((item) => (
            <HistoryCard key={item.key} item={item} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
