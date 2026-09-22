import { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

const CATEGORIES = ['all', 'web', 'mobile', 'design'] as const;
const STATUSES = ['all', 'active', 'pending', 'completed'] as const;
type Category = (typeof CATEGORIES)[number];
type Status = (typeof STATUSES)[number];

// 이름은 i18n `names` 배열의 같은 인덱스.
const ITEMS: { id: number; category: Exclude<Category, 'all'>; status: Exclude<Status, 'all'> }[] = [
  { id: 1, category: 'web', status: 'active' },
  { id: 2, category: 'mobile', status: 'completed' },
  { id: 3, category: 'web', status: 'pending' },
  { id: 4, category: 'design', status: 'active' },
  { id: 5, category: 'mobile', status: 'pending' },
  { id: 6, category: 'design', status: 'completed' },
];

const STATUS_CLASS: Record<Exclude<Status, 'all'>, string> = {
  active: 'bg-accent/15 text-accent',
  pending: 'bg-primary/15 text-primary',
  completed: 'bg-muted text-muted-foreground',
};

const selectClass = 'border-primary bg-muted text-foreground w-full cursor-pointer rounded-[5px] border p-2';
const pillClass = 'rounded-full px-2 py-0.5 text-xs';

export default function SelectFilterDemo() {
  const { t } = useTranslation('playground');
  const id = useId();
  const [category, setCategory] = useState<Category>('all');
  const [status, setStatus] = useState<Status>('all');
  const names = t('demos.select-filter.names', { returnObjects: true }) as string[];

  const filteredItems = ITEMS.filter(
    (item) => (category === 'all' || item.category === category) && (status === 'all' || item.status === status),
  );

  return (
    <DemoStage>
      <div className="w-full max-w-[800px]">
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="min-w-[200px] flex-1">
            <label htmlFor={`${id}-category`} className="text-muted-foreground mb-2 block">
              {t('demos.select-filter.categoryLabel')}
            </label>
            <select
              id={`${id}-category`}
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={selectClass}
            >
              {CATEGORIES.map((value) => (
                <option key={value} value={value}>
                  {t(`demos.select-filter.categories.${value}`)}
                </option>
              ))}
            </select>
          </div>

          <div className="min-w-[200px] flex-1">
            <label htmlFor={`${id}-status`} className="text-muted-foreground mb-2 block">
              {t('demos.select-filter.statusLabel')}
            </label>
            <select
              id={`${id}-status`}
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              className={selectClass}
            >
              {STATUSES.map((value) => (
                <option key={value} value={value}>
                  {t(`demos.select-filter.statuses.${value}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <m.div layout className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <m.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="border-primary/20 bg-foreground/5 rounded-[10px] border p-4"
              >
                <h3 className="text-foreground mb-2">{names[item.id - 1]}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className={cn(pillClass, 'bg-primary/10 text-primary')}>
                    {t(`demos.select-filter.categories.${item.category}`)}
                  </span>
                  <span className={cn(pillClass, STATUS_CLASS[item.status])}>
                    {t(`demos.select-filter.statuses.${item.status}`)}
                  </span>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </div>
    </DemoStage>
  );
}
