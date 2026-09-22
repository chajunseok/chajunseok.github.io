import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

export default function TransformDemo() {
  const { t } = useTranslation('playground');

  return (
    <DemoStage>
      <m.div
        animate={{ rotateX: [0, 180, 180, 0], rotateY: [0, 0, 180, 0], z: [0, 50, -50, 0] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.5 }}
        className="from-primary to-background size-[150px] rounded-[20px] bg-linear-to-br shadow-[0_0_20px_hsl(var(--primary)/0.3)] perspective-[1000px] transform-3d"
      >
        <div className="text-foreground flex size-full items-center justify-center text-xl font-bold">
          {t('demos.transform.label')}
        </div>
      </m.div>
    </DemoStage>
  );
}
