import { useEffect, useId, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { DemoStage } from '../demo-stage';

const DEBOUNCE_MS = 300;
const FILTER_DELAY_MS = 300;
const SEARCH_TYPES = ['title', 'content', 'tag'] as const;
type SearchType = (typeof SEARCH_TYPES)[number];

type SearchRecord = { title: string; content: string; tags: string[] };
type Item = SearchRecord & { id: number; color: string };

// i18n `items` 배열의 같은 인덱스에 붙는 카드 색.
const COLORS = [
  'hsl(171, 100%, 70%)',
  'hsl(210, 100%, 70%)',
  'hsl(280, 100%, 70%)',
  'hsl(340, 100%, 70%)',
  'hsl(40, 100%, 70%)',
];

function matches(item: Item, type: SearchType, term: string) {
  if (type === 'tag') return item.tags.some((tag) => tag.toLowerCase().includes(term));
  return item[type].toLowerCase().includes(term);
}

const fieldClass = 'border-foreground/20 bg-foreground/10 text-foreground rounded-sm border p-2';

export default function InputFilterDemo() {
  const { t } = useTranslation('playground');
  const id = useId();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('title');
  const [applied, setApplied] = useState<{ term: string; type: SearchType } | null>(null);
  const [isFiltering, setIsFiltering] = useState(false);

  const records = t('demos.input-filter.items', { returnObjects: true }) as SearchRecord[];
  const items: Item[] = records.map((record, i) => ({ ...record, id: i + 1, color: COLORS[i % COLORS.length] }));
  const filteredItems = applied ? items.filter((item) => matches(item, applied.type, applied.term)) : [];

  // 입력이 멈추고 300ms 뒤 검색 시작, 300ms 더 "검색 중" 표시 후 결과 반영.
  useEffect(() => {
    if (searchTerm === '') return;
    let resultTimer: ReturnType<typeof setTimeout> | undefined;
    const debounceTimer = setTimeout(() => {
      setIsFiltering(true);
      resultTimer = setTimeout(() => {
        setApplied({ term: searchTerm.toLowerCase(), type: searchType });
        setIsFiltering(false);
      }, FILTER_DELAY_MS);
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(debounceTimer);
      clearTimeout(resultTimer);
      setIsFiltering(false);
    };
  }, [searchTerm, searchType]);

  const clearFilter = () => {
    setSearchTerm('');
    setApplied(null);
  };

  return (
    <DemoStage>
      <div className="mx-auto w-full max-w-[670px]">
        <div className="border-primary/20 bg-foreground/5 mb-8 rounded-[10px] border p-6">
          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor={`${id}-type`} className="sr-only">
              {t('demos.input-filter.typeLabel')}
            </label>
            <select
              id={`${id}-type`}
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as SearchType)}
              className={`${fieldClass} cursor-pointer pr-8`}
            >
              {SEARCH_TYPES.map((type) => (
                <option key={type} value={type} className="bg-card">
                  {t(`demos.input-filter.types.${type}`)}
                </option>
              ))}
            </select>

            <label htmlFor={`${id}-term`} className="sr-only">
              {t('demos.input-filter.termLabel')}
            </label>
            <input
              id={`${id}-term`}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('demos.input-filter.placeholder')}
              className={`${fieldClass} min-w-[200px] flex-1`}
            />

            <m.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilter}
              className="border-primary bg-foreground/10 text-primary cursor-pointer rounded-[5px] border px-4 py-2 whitespace-nowrap"
            >
              {t('demos.input-filter.reset')}
            </m.button>
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
              {t('demos.input-filter.searching')}
            </m.div>
          )}
        </AnimatePresence>

        <m.div layout className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {(searchTerm && applied ? filteredItems : items).map((item) => (
            <m.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="border-foreground/10 text-foreground rounded-[10px] border p-4"
              style={{ background: `linear-gradient(135deg, ${item.color} 0%, hsl(var(--background) / 0.8) 100%)` }}
            >
              <div className="border-foreground/10 mb-2 border-b pb-2 text-xl">{item.title}</div>
              <div className="mb-4 text-sm opacity-80">{item.content}</div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="border-primary/20 bg-primary/10 rounded-full border px-2 py-0.5 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </DemoStage>
  );
}
