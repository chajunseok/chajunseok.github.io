import { useState } from 'react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

export default function LayoutDemo() {
  const { t } = useTranslation('playground');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DemoStage>
      <m.button
        type="button"
        layout
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        animate={{
          boxShadow: isOpen ? '0 10px 30px hsla(250, 90%, 70%, 0.2)' : '0 0 0 hsla(250, 90%, 70%, 0)',
        }}
        className={cn(
          'from-primary to-background flex max-w-full cursor-pointer flex-col items-start rounded-[10px] bg-linear-to-br p-5 text-left',
          isOpen ? 'h-[200px] w-[400px]' : 'size-[150px]',
        )}
      >
        <m.span layout="position" className={cn('text-foreground block font-bold', isOpen ? 'text-2xl' : 'text-base')}>
          {t('demos.layout.label')}
        </m.span>
      </m.button>
    </DemoStage>
  );
}
