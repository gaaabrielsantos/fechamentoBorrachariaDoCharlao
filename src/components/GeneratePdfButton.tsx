import { useState } from 'react';
import type { MonthlyClosing } from '../types';
import { downloadPdf, generatePdfFileName, openPdfInNewTab } from '../utils/pdf';

interface GeneratePdfButtonProps {
  closing: MonthlyClosing;
  reportId?: string;
}

export default function GeneratePdfButton({ closing, reportId = 'monthly-report' }: GeneratePdfButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileName = generatePdfFileName(closing.title, closing.month, closing.year);

  const handleOpenInNewTab = async () => {
    const element = document.getElementById(reportId);
    if (!element) return;
    await openPdfInNewTab(element);
    setIsOpen(false);
  };

  const handleDownload = async () => {
    const element = document.getElementById(reportId);
    if (!element) return;
    await downloadPdf(element, fileName);
    setIsOpen(false);
  };

  return (
    <section className="generate-pdf-section">
      <button
        type="button"
        className="btn btn-primary add-day-button"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        Gerar PDF
      </button>

      {isOpen && (
        <div className="generate-pdf-options card">
          <p className="generate-pdf-help">Escolha como deseja gerar o relatório.</p>
          <button type="button" className="btn btn-secondary" onClick={handleOpenInNewTab}>
            Abrir PDF em nova guia
          </button>
          <button type="button" className="btn btn-primary" onClick={handleDownload}>
            Baixar PDF
          </button>
        </div>
      )}
    </section>
  );
}
