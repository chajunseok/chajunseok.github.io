import { useState } from 'react';
import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

export default function SpringDemo() {
  const { t } = useTranslation('playground');
  const [isRight, setIsRight] = useState(false);

  return (
    <DemoStage className="overflow-hidden">
      <m.button
        type="button"
        animate={{ x: isRight ? 200 : -200, rotate: isRight ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, mass: 1 }}
        onClick={() => setIsRight(!isRight)}
        className="from-primary to-background text-foreground flex size-[100px] shrink-0 cursor-pointer items-center justify-center rounded-[20px] bg-linear-to-br text-sm"
      >
        {t('demos.spring.label')}
      </m.button>
    </DemoStage>
  );
}
