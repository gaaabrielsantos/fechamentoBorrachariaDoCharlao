import type { MonthlyClosing } from '../types';
import ReportPreview from '../components/ReportPreview';
import ExportPdfButton from '../components/ExportPdfButton';

interface ReportPageProps {
  closing: MonthlyClosing;
}

export default function ReportPage({ closing }: ReportPageProps) {
  const fileName = `${closing.title || 'fechamento'}_${closing.month}_${closing.year}`
    .replace(/\s+/g, '_')
    .toLowerCase();

  return (
    <section className="card section-card report-root">
      <ReportPreview closing={closing} reportId="monthly-report" />
      <div className="report-actions">
        <ExportPdfButton reportElementId="monthly-report" fileName={`${fileName}.pdf`} />
      </div>
    </section>
  );
}
