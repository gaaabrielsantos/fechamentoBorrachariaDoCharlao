import html2pdf from 'html2pdf.js';

interface PdfOptions {
  element: HTMLElement;
  fileName: string;
}

const defaultPdfSettings = {
  margin: [8, 8, 8, 8] as [number, number, number, number],
  image: { type: 'jpeg' as const, quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
  jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
<<<<<<< HEAD
=======
  pagebreak: {
    mode: ['avoid-all', 'css', 'legacy'] as Array<'avoid-all' | 'css' | 'legacy'>,
    avoid: ['.report-header', '.pdf-day-section', '.day-block', '.service-card'],
  },
>>>>>>> ef1e995 (Atualiza projeto fechamentoJobinho)
};

export const generatePdfFileName = (title: string, month: string, year: number): string => {
  const normalizedMonth = month.trim().toLowerCase();
  const normalizedTitle = title.trim() ? title.trim().toLowerCase().replace(/\s+/g, '-') : 'fechamento-jobinho';
  return `${normalizedTitle}-${normalizedMonth}-${year}.pdf`;
};

export const generatePdfBlob = async ({ element }: Omit<PdfOptions, 'fileName'>): Promise<Blob> => {
  document.documentElement.classList.add('pdf-export-mode');
  try {
    return await html2pdf()
      .set({
        ...defaultPdfSettings,
        jsPDF: { ...defaultPdfSettings.jsPDF, orientation: 'portrait' },
      })
      .from(element)
      .outputPdf('blob');
  } finally {
    document.documentElement.classList.remove('pdf-export-mode');
  }
};

export const openPdfInNewTab = async (element: HTMLElement): Promise<void> => {
  const blob = await generatePdfBlob({ element });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

export const downloadPdf = async (element: HTMLElement, fileName: string): Promise<void> => {
  const blob = await generatePdfBlob({ element });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 10000);
};
