import { useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PX_PER_MM = 3.78; // 96 DPI 기준
const A4_WIDTH_PX = A4_WIDTH_MM * PX_PER_MM;
const A4_HEIGHT_PX = A4_HEIGHT_MM * PX_PER_MM;
const SUCCESS_MS = 2000;
const SECTIONS = [1, 2, 3, 4, 5, 6];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function PdfDownloadDemo() {
  const { t } = useTranslation('playground');
  const pageRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const handleDownload = async () => {
    const page = pageRef.current;
    if (!page) return;
    setStatus('loading');
    try {
      const [{ jsPDF }, { default: html2canvas }] = await Promise.all([import('jspdf'), import('html2canvas-pro')]);
      const canvas = await html2canvas(page, {
        scale: 2,
        backgroundColor: getComputedStyle(page).backgroundColor,
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
      });
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
      pdf.save('download.pdf');
      setStatus('success');
      setTimeout(() => setStatus((s) => (s === 'success' ? 'idle' : s)), SUCCESS_MS);
    } catch (error) {
      console.error('PDF generation failed:', error);
      setStatus('error');
    }
  };

  return (
    <DemoStage className="relative flex-col overflow-hidden">
      {/* A4 크기 그대로 캡처한다. 좁은 화면에서는 가로 스크롤. */}
      <div className="mb-8 w-full overflow-x-auto">
        <div
          ref={pageRef}
          className="bg-background relative mx-auto box-border p-[20mm] shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          style={{ width: A4_WIDTH_PX, height: A4_HEIGHT_PX }}
        >
          <h2 className="text-primary mb-[15mm] text-2xl">{t('demos.pdf-download.heading')}</h2>

          <div className="mb-[15mm] grid grid-cols-2 gap-[10mm]">
            {SECTIONS.map((n) => (
              <div
                key={n}
                className="border-foreground/10 rounded-[3mm] border p-[10mm]"
                style={{
                  background: `linear-gradient(135deg, hsl(${n * 90}, 70%, 70%) 0%, hsl(var(--background) / 0.8) 100%)`,
                }}
              >
                <h3 className="text-foreground mb-[5mm] text-lg">{t('demos.pdf-download.section', { n })}</h3>
                <p className="text-foreground/80 text-sm leading-normal">{t('demos.pdf-download.sectionBody')}</p>
              </div>
            ))}
          </div>

          <div className="bg-foreground/5 text-foreground rounded-[3mm] p-[10mm]">
            <p className="text-sm leading-normal">{t('demos.pdf-download.note')}</p>
          </div>

          <div className="text-primary absolute right-[20mm] bottom-[10mm] text-sm italic opacity-80">
            {t('demos.pdf-download.madeBy')}
          </div>
        </div>
      </div>

      <m.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        disabled={status === 'loading'}
        className="bg-primary text-primary-foreground max-w-full cursor-pointer rounded-lg px-8 py-4 font-bold disabled:cursor-wait"
        style={{ width: A4_WIDTH_PX }}
      >
        {status === 'loading' ? t('demos.pdf-download.generating') : t('demos.pdf-download.download')}
      </m.button>

      {status === 'error' && (
        <p role="alert" className="text-destructive mt-4 text-sm">
          {t('demos.pdf-download.failed')}
        </p>
      )}

      <AnimatePresence>
        {status === 'success' && (
          <m.div
            role="status"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-primary text-primary-foreground absolute bottom-8 left-1/2 -translate-x-1/2 rounded-lg px-8 py-4 shadow-lg"
          >
            {t('demos.pdf-download.success')}
          </m.div>
        )}
      </AnimatePresence>
    </DemoStage>
  );
}
