import { useEffect, useState } from 'react';
import { AnimatePresence, m, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const LOADING_MS = 3000;

const circleVariants: Variants = {
  animate: { rotate: 360, transition: { duration: 1, repeat: Infinity, ease: 'linear' } },
};

const loadingContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const dotVariants: Variants = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: [-10, 0, -10],
    opacity: 1,
    transition: { y: { repeat: Infinity, duration: 1, ease: 'easeInOut' } },
  },
};

export default function LoadingDemo() {
  const { t } = useTranslation('playground');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;
    const timer = setTimeout(() => setIsLoading(false), LOADING_MS);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <DemoStage className="relative overflow-hidden">
      <m.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsLoading(true)}
        className="border-primary text-primary cursor-pointer rounded-lg border-2 bg-transparent px-8 py-4 text-lg"
      >
        {t('demos.loading.start')}
      </m.button>

      <AnimatePresence>
        {isLoading && (
          <m.div
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <m.div
              variants={loadingContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center gap-8"
            >
              <m.div
                aria-hidden
                variants={circleVariants}
                animate="animate"
                className="border-primary/10 border-t-primary size-[60px] rounded-full border-4"
              />

              <div aria-hidden className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <m.div key={i} variants={dotVariants} className="bg-primary size-2.5 rounded-full" />
                ))}
              </div>

              <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary text-center text-lg">
                {t('demos.loading.message')}
              </m.div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </DemoStage>
  );
}
