import { useState } from 'react';
import { AnimatePresence, m, type Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { y: '-100vh', opacity: 0, scale: 0.8 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 500 } },
  exit: { y: '100vh', opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

export default function ModalDemo() {
  const { t } = useTranslation('playground');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DemoStage className="relative overflow-hidden">
      <m.button
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="border-primary text-primary cursor-pointer rounded-lg border-2 bg-transparent px-8 py-4 text-lg"
      >
        {t('demos.modal.open')}
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <m.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-demo-title"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="from-primary/10 to-background border-primary/20 relative flex w-[90%] max-w-[500px] flex-col gap-6 rounded-[20px] border bg-linear-to-br p-8"
            >
              <m.h3
                id="modal-demo-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-primary text-center text-2xl"
              >
                {t('demos.modal.greeting')}
              </m.h3>

              <m.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="border-primary bg-primary/10 text-primary mt-auto cursor-pointer rounded-lg border p-3"
              >
                {t('demos.modal.close')}
              </m.button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </DemoStage>
  );
}
