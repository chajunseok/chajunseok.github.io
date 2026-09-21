import { useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { initialCalculatorState, pressKey, type CalculatorKey } from '../../model/calculator';
import { DemoStage } from '../demo-stage';

type Tone = 'danger' | 'accent' | 'plain';
// 기호만으로는 스크린 리더가 읽기 애매한 키에 붙이는 이름(i18n 키).
type KeyName = 'clear' | 'toggleSign' | 'percent' | 'divide' | 'multiply' | 'subtract' | 'add' | 'equals' | 'decimal';

const BUTTONS: { key: CalculatorKey; tone: Tone; name?: KeyName; wide?: boolean }[] = [
  { key: 'C', tone: 'danger', name: 'clear' },
  { key: '±', tone: 'accent', name: 'toggleSign' },
  { key: '%', tone: 'accent', name: 'percent' },
  { key: '÷', tone: 'accent', name: 'divide' },
  { key: '7', tone: 'plain' },
  { key: '8', tone: 'plain' },
  { key: '9', tone: 'plain' },
  { key: '×', tone: 'accent', name: 'multiply' },
  { key: '4', tone: 'plain' },
  { key: '5', tone: 'plain' },
  { key: '6', tone: 'plain' },
  { key: '-', tone: 'accent', name: 'subtract' },
  { key: '1', tone: 'plain' },
  { key: '2', tone: 'plain' },
  { key: '3', tone: 'plain' },
  { key: '+', tone: 'accent', name: 'add' },
  { key: '0', tone: 'plain', wide: true },
  { key: '.', tone: 'plain', name: 'decimal' },
  { key: '=', tone: 'accent', name: 'equals' },
];

const TONE_CLASS: Record<Tone, string> = {
  danger: 'bg-destructive text-background',
  accent: 'bg-accent text-background',
  plain: 'bg-foreground/10 text-foreground',
};

export default function CalculatorDemo() {
  const { t } = useTranslation('playground');
  const [state, setState] = useState(initialCalculatorState);

  return (
    <DemoStage>
      <div className="bg-foreground/5 w-full max-w-[300px] rounded-2xl p-6 shadow-lg">
        <m.div
          layout
          aria-live="polite"
          className="bg-foreground/10 text-foreground mb-4 flex min-h-14 items-center justify-end overflow-hidden rounded-lg p-4 font-mono text-3xl"
        >
          <AnimatePresence mode="wait">
            <m.div
              key={state.display}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {state.display}
            </m.div>
          </AnimatePresence>
        </m.div>

        <div className="grid grid-cols-4 gap-2">
          {BUTTONS.map(({ key, tone, name, wide }) => (
            <m.button
              key={key}
              type="button"
              aria-label={name && t(`demos.calculator.keys.${name}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setState((prev) => pressKey(prev, key))}
              className={cn(
                'flex items-center justify-center rounded-lg p-4 text-xl',
                wide ? 'col-span-2 aspect-[2/1]' : 'aspect-square',
                TONE_CLASS[tone],
              )}
            >
              {key}
            </m.button>
          ))}
        </div>
      </div>
    </DemoStage>
  );
}
