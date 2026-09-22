import { useRef, useState } from 'react';
import { AnimatePresence, m, type Variants } from 'motion/react';
import { ArrowDown, ArrowUp, Plus, X, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const SECTION_COUNT = 20;
const SECTIONS = Array.from({ length: SECTION_COUNT }, (_, i) => i + 1);

type MenuKey = 'toTop' | 'toBottom';
const MENU_ITEMS: { key: MenuKey; Icon: LucideIcon; gradient: string }[] = [
  { key: 'toTop', Icon: ArrowUp, gradient: 'from-accent' },
  { key: 'toBottom', Icon: ArrowDown, gradient: 'from-primary' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FloatingMenuDemo() {
  const { t } = useTranslation('playground');
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (key: MenuKey) => {
    const el = scrollRef.current;
    el?.scrollTo({ top: key === 'toTop' ? 0 : el.scrollHeight, behavior: 'smooth' });
  };

  return (
    <DemoStage>
      {/* 메뉴는 페이지가 아닌 이 박스 안에 떠 있다. */}
      <div className="relative mx-auto h-[400px] w-full max-w-[800px]">
        <div ref={scrollRef} className="bg-foreground/[0.03] h-full w-full overflow-y-auto rounded-[10px] p-6">
          {SECTIONS.map((n) => (
            <div key={n} className="border-primary/10 bg-foreground/5 mb-4 w-full rounded-lg border p-6">
              {t('demos.floating-menu.section', { n })}
            </div>
          ))}
        </div>

        <div className="absolute right-8 bottom-8 z-10 flex flex-col items-end gap-2">
          <AnimatePresence>
            {isOpen && (
              <m.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex min-w-[200px] flex-col gap-2"
              >
                {MENU_ITEMS.map(({ key, Icon, gradient }) => (
                  <m.button
                    key={key}
                    type="button"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollTo(key)}
                    className={`${gradient} border-foreground/10 text-foreground to-background/80 flex cursor-pointer items-center gap-4 rounded-[10px] border bg-linear-135 px-4 py-3 shadow-lg`}
                  >
                    <span className="bg-foreground/10 flex size-[30px] items-center justify-center rounded-lg">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <span className="text-sm">{t(`demos.floating-menu.${key}`)}</span>
                  </m.button>
                ))}
              </m.div>
            )}
          </AnimatePresence>

          <m.button
            type="button"
            aria-label={isOpen ? t('demos.floating-menu.close') : t('demos.floating-menu.open')}
            aria-expanded={isOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary text-primary-foreground shadow-primary/30 flex size-[50px] cursor-pointer items-center justify-center rounded-full shadow-lg"
          >
            {isOpen ? <X className="size-5" aria-hidden /> : <Plus className="size-5" aria-hidden />}
          </m.button>
        </div>
      </div>
    </DemoStage>
  );
}
