import { useRef } from 'react';
import { m, useScroll } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

export default function ScrollProgressDemo() {
  const { t } = useTranslation('playground');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <DemoStage className="relative h-[400px] overflow-hidden p-0">
      {/* 스테이지 안쪽 스크롤 영역 — 창 스크롤 대신 이 영역의 진행도를 쓴다. */}
      <div
        ref={containerRef}
        role="region"
        aria-label={t('demos.scroll-progress.region')}
        tabIndex={0}
        className="absolute inset-0 [scrollbar-width:none] overflow-y-auto [&::-webkit-scrollbar]:hidden"
      >
        <div className="h-[1000px] pt-[400px]">
          <p className="text-muted-foreground p-5 text-center text-sm">{t('demos.scroll-progress.hint')}</p>
        </div>
      </div>

      <div className="border-primary/20 text-primary pointer-events-none absolute top-1/2 left-1/2 flex size-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[10px] text-base">
        <m.div
          aria-hidden
          className="border-primary absolute -inset-2.5 rounded-full border-[10px]"
          style={{ scaleX: scrollYProgress, scaleY: scrollYProgress, opacity: scrollYProgress }}
        />
        <m.span style={{ opacity: scrollYProgress }}>{t('demos.scroll-progress.label')}</m.span>
      </div>
    </DemoStage>
  );
}
