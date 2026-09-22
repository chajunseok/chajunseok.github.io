import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

const ITEMS_PER_PAGE = 6;
const TOTAL_PAGES = 5;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

// 렌더 중 Math.random을 쓰지 않도록 id에서 색상을 뽑는다.
const itemsOf = (page: number) =>
  Array.from({ length: ITEMS_PER_PAGE }, (_, i) => {
    const id = (page - 1) * ITEMS_PER_PAGE + i + 1;
    return { id, color: `hsl(${(id * 137) % 360}, 70%, 70%)` };
  });

const buttonClass =
  'border-primary flex size-10 cursor-pointer items-center justify-center rounded-[5px] border disabled:cursor-default disabled:opacity-50';

export default function PaginationDemo() {
  const { t } = useTranslation('playground');
  const [currentPage, setCurrentPage] = useState(1);

  const navButtons: { label: string; Icon: LucideIcon; target: number; disabled: boolean }[] = [
    { label: t('demos.pagination.first'), Icon: ChevronsLeft, target: 1, disabled: currentPage === 1 },
    { label: t('demos.pagination.prev'), Icon: ChevronLeft, target: currentPage - 1, disabled: currentPage === 1 },
    {
      label: t('demos.pagination.next'),
      Icon: ChevronRight,
      target: currentPage + 1,
      disabled: currentPage === TOTAL_PAGES,
    },
    {
      label: t('demos.pagination.last'),
      Icon: ChevronsRight,
      target: TOTAL_PAGES,
      disabled: currentPage === TOTAL_PAGES,
    },
  ];

  const renderNav = ({ label, Icon, target, disabled }: (typeof navButtons)[number]) => (
    <m.button
      key={label}
      type="button"
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setCurrentPage(target)}
      disabled={disabled}
      className={cn(buttonClass, 'bg-primary/10 text-primary')}
    >
      <Icon className="size-4" aria-hidden />
    </m.button>
  );

  return (
    <DemoStage>
      <div className="mx-auto w-full max-w-[600px]">
        <AnimatePresence mode="wait">
          <m.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8 grid grid-cols-3 gap-4">
              {itemsOf(currentPage).map((item) => (
                <m.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border-foreground/10 text-foreground flex h-[120px] items-center justify-center rounded-[10px] border text-xl"
                  style={{ background: `linear-gradient(135deg, ${item.color} 0%, hsl(var(--background) / 0.8) 100%)` }}
                >
                  {item.id}
                </m.div>
              ))}
            </div>
          </m.div>
        </AnimatePresence>

        <nav aria-label={t('demos.pagination.label')} className="mt-8 flex items-center justify-center gap-2">
          {navButtons.slice(0, 2).map(renderNav)}
          {PAGES.map((page) => (
            <m.button
              key={page}
              type="button"
              aria-label={t('demos.pagination.page', { n: page })}
              aria-current={currentPage === page ? 'page' : undefined}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage(page)}
              className={cn(
                buttonClass,
                currentPage === page ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary',
              )}
            >
              {page}
            </m.button>
          ))}
          {navButtons.slice(2).map(renderNav)}
        </nav>
      </div>
    </DemoStage>
  );
}
