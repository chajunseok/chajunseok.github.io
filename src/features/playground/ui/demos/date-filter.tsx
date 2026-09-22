import { useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const SAMPLE_COUNT = 20;
const FILTER_DELAY_MS = 500;

type Item = { id: number; date: string; color: string };

// 로컬 날짜 기준 YYYY-MM-DD — toISOString()은 UTC라 자정 근처 날짜가 하루 어긋난다.
const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

/** 오늘 기준 한 달 전후 사이의 무작위 날짜 샘플. */
function generateSampleData(): Item[] {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()).getTime();
  const end = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()).getTime();
  return Array.from({ length: SAMPLE_COUNT }, (_, i) => ({
    id: i + 1,
    date: toIsoDate(new Date(start + Math.random() * (end - start))),
    color: `hsl(${Math.random() * 360}, 70%, 70%)`,
  }));
}

const inputClass =
  'border-primary bg-foreground/10 text-foreground min-w-[140px] cursor-pointer rounded-[5px] border p-2 [color-scheme:dark]';
const buttonClass = 'min-w-20 cursor-pointer rounded-[5px] px-4 py-2 whitespace-nowrap';

export default function DateFilterDemo() {
  const { t } = useTranslation('playground');
  const id = useId();
  const [items] = useState(generateSampleData);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // null = 필터 없음. 빈 배열은 "조건에 맞는 항목 없음"이라 전체 목록과 구분한다.
  const [filteredItems, setFilteredItems] = useState<Item[] | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFilter = () => {
    setIsFiltering(true);
    // YYYY-MM-DD 문자열은 사전순 비교가 곧 날짜 비교다.
    const filtered = items.filter(
      (item) => (!startDate || item.date >= startDate) && (!endDate || item.date <= endDate),
    );
    setTimeout(() => {
      setFilteredItems(filtered);
      setIsFiltering(false);
    }, FILTER_DELAY_MS);
  };

  const clearFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilteredItems(null);
  };

  return (
    <DemoStage>
      <div className="mx-auto w-full max-w-[670px]">
        <div className="border-primary/20 bg-foreground/5 mb-8 rounded-[10px] border p-6">
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor={`${id}-start`} className="sr-only">
              {t('demos.date-filter.start')}
            </label>
            <m.input
              id={`${id}-start`}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              className={inputClass}
            />
            <span className="text-primary" aria-hidden>
              ~
            </span>
            <label htmlFor={`${id}-end`} className="sr-only">
              {t('demos.date-filter.end')}
            </label>
            <m.input
              id={`${id}-end`}
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              whileFocus={{ scale: 1.02 }}
              className={inputClass}
            />
            <div className="flex shrink-0 gap-2">
              <m.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFilter}
                className={`${buttonClass} bg-primary text-primary-foreground font-bold`}
              >
                {t('demos.date-filter.search')}
              </m.button>
              <m.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilter}
                className={`${buttonClass} border-primary bg-foreground/10 text-primary border`}
              >
                {t('demos.date-filter.reset')}
              </m.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isFiltering && (
            <m.div
              role="status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-primary mb-4 text-center"
            >
              {t('demos.date-filter.filtering')}
            </m.div>
          )}
        </AnimatePresence>

        {filteredItems?.length === 0 && !isFiltering && (
          <p role="status" className="text-muted-foreground mb-4 text-center">
            {t('demos.date-filter.noResults')}
          </p>
        )}

        <m.div layout className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {(filteredItems ?? items).map((item) => (
            <m.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="border-foreground/10 text-foreground rounded-[10px] border p-4 text-center"
              style={{ background: `linear-gradient(135deg, ${item.color} 0%, hsl(var(--background) / 0.8) 100%)` }}
            >
              <div className="mb-2 text-xl">{t('demos.date-filter.itemTitle', { n: item.id })}</div>
              <div className="text-sm opacity-80">{item.date}</div>
            </m.div>
          ))}
        </m.div>
      </div>
    </DemoStage>
  );
}
