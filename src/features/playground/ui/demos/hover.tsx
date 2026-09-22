import { m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

export default function HoverDemo() {
  const { t } = useTranslation('playground');

  return (
    <DemoStage className="min-h-[500px] flex-wrap gap-8">
      <m.div
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 5px 20px hsla(250, 90%, 70%, 0.4)' }}
        className="from-primary to-background relative flex h-[250px] w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-[20px] bg-linear-to-br"
      >
        <m.div
          initial={{ y: 60, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="text-foreground absolute bottom-5 text-center"
        >
          {t('demos.hover.reveal')}
        </m.div>
      </m.div>

      <m.div
        whileHover={{ scale: 1.05 }}
        className="bg-primary/10 relative h-[250px] w-[200px] cursor-pointer rounded-[20px] border-2 border-transparent p-5"
      >
        <m.div initial={{ opacity: 0.5 }} whileHover={{ opacity: 1 }} className="flex h-full flex-col justify-between">
          <m.div aria-hidden initial={{ y: 0 }} whileHover={{ y: -5 }} className="bg-primary size-10 rounded-[10px]" />
          <m.div initial={{ y: 0 }} whileHover={{ y: 5 }} className="text-primary text-sm">
            {t('demos.hover.prompt')}
          </m.div>
        </m.div>
      </m.div>

      <m.div
        whileHover="hover"
        className="bg-background relative flex h-[250px] w-[200px] cursor-pointer items-center justify-center rounded-[20px]"
      >
        <m.div
          aria-hidden
          variants={{
            hover: { scale: [null, 1.3, 1], rotate: [null, 90, 0], transition: { duration: 0.5 } },
          }}
          className="from-primary to-background size-[60px] rounded-xl bg-linear-to-br"
        />
      </m.div>
    </DemoStage>
  );
}
