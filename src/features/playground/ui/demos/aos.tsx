import { useRef } from 'react';
import { m, type TargetAndTransition } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

const ITEMS: { key: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'zoomIn' | 'rotate'; initial: TargetAndTransition }[] = [
  { key: 'fadeUp', initial: { opacity: 0, y: 100 } },
  { key: 'fadeLeft', initial: { opacity: 0, x: -200 } },
  { key: 'fadeRight', initial: { opacity: 0, x: 200 } },
  { key: 'zoomIn', initial: { opacity: 0, scale: 0.3 } },
  { key: 'rotate', initial: { opacity: 0, rotate: 360 } },
];

export default function AosDemo() {
  const { t } = useTranslation('playground');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <DemoStage className="block overflow-hidden p-0">
      {/* 스테이지 안쪽 스크롤 영역 — whileInView의 기준(root)이 된다. */}
      <div
        ref={containerRef}
        role="region"
        aria-label={t('demos.aos.region')}
        tabIndex={0}
        className="flex h-[500px] [scrollbar-width:none] flex-col gap-60 overflow-x-hidden overflow-y-auto p-8 py-40 [&::-webkit-scrollbar]:hidden"
      >
        {ITEMS.map(({ key, initial }, index) => (
          <m.div
            key={key}
            initial={initial}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
            // 첫 카드만 절반 이상 보여야 나타난다 (레거시 동작 유지).
            viewport={{ root: containerRef, once: false, margin: '-100px', amount: index === 0 ? 0.5 : undefined }}
            transition={{ duration: 0.7 }}
            className={cn(
              'w-full shrink-0 rounded-[20px] p-12 text-center text-xl',
              index === 0 ? 'from-primary to-background text-foreground bg-linear-to-br' : 'bg-primary/10 text-primary',
            )}
          >
            {t(`demos.aos.${key}`)}
          </m.div>
        ))}
      </div>
    </DemoStage>
  );
}
