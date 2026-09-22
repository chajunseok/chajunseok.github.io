import { m, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const circleVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1, 0.8, 1],
    rotate: [0, 180, 360, 180, 0],
    borderRadius: ['50%', '20%', '50%', '20%', '50%'],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
};

const pathVariants: Variants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: 'easeInOut', repeat: Infinity } },
};

const textVariants: Variants = {
  animate: { y: [0, -20, 0], opacity: [0, 1, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } },
};

export default function TimelineDemo() {
  const { t } = useTranslation('playground');

  return (
    <DemoStage className="min-h-[500px] flex-wrap gap-12">
      <m.div
        aria-hidden
        variants={circleVariants}
        animate="animate"
        className="from-primary to-background size-[200px] rounded-full bg-linear-to-br"
      />

      <svg aria-hidden width="200" height="200" viewBox="0 0 200 200" className="stroke-primary overflow-visible">
        <m.circle
          cx="100"
          cy="100"
          r="80"
          strokeWidth="4"
          fill="none"
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
        <m.path
          d="M100 20 L100 180 M20 100 L180 100"
          strokeWidth="4"
          fill="none"
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
      </svg>

      <div className="relative flex size-[200px] items-center justify-center">
        <m.div
          aria-hidden
          className="bg-primary absolute h-0.5 w-full"
          animate={{ scaleX: [0, 1, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        />
        <m.div
          aria-hidden
          className="bg-primary absolute h-full w-0.5"
          animate={{ scaleY: [0, 1, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
        />
        <m.div variants={textVariants} animate="animate" className="text-primary text-xl font-bold">
          {t('demos.timeline.label')}
        </m.div>
      </div>
    </DemoStage>
  );
}
