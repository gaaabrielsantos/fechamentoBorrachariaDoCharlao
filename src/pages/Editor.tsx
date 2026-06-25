import type { MonthlyClosing } from '../types';

interface EditorPageProps {
  closing: MonthlyClosing;
  onSave: (closing: MonthlyClosing) => void;
}

export default function EditorPage({ closing, onSave }: EditorPageProps) {
  return (
    <section className="card section-card">
      <h3>Editor legado</h3>
      <p>
        Esta pagina foi mantida apenas para compatibilidade. Use a pagina principal para editar o
        fechamento mensal.
      </p>
      <button type="button" className="btn btn-secondary" onClick={() => onSave(closing)}>
        Manter fechamento atual
      </button>
    </section>
  );
}
