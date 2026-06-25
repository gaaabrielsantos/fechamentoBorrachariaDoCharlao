import { downloadPdf } from '../utils/pdf';

interface ExportPdfButtonProps {
  reportElementId: string;
  fileName: string;
}

export default function ExportPdfButton({ reportElementId, fileName }: ExportPdfButtonProps) {
  const handleExport = async () => {
    const element = document.getElementById(reportElementId);
    if (!element) return;
    await downloadPdf(element, fileName);
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleExport}>
      Exportar relatorio em PDF
    </button>
  );
}
