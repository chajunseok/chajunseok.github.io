import { useState } from 'react';
import { AnimatePresence, m, type PanInfo, type Variants } from 'motion/react';
import { Atom, Braces, ChevronLeft, ChevronRight, Terminal, Triangle, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

// 기술 이름은 고유명사라 번역하지 않는다.
const SLIDES: { title: string; color: string; Icon: LucideIcon }[] = [
  { title: 'React.js', color: '#61DAFB', Icon: Atom },
  { title: 'Vue.js', color: '#42B883', Icon: Triangle },
  { title: 'JavaScript', color: '#F7DF1E', Icon: Braces },
  { title: 'Python', color: '#3776AB', Icon: Terminal },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
};

const SWIPE_CONFIDENCE = 10000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

const arrowClass =
  'border-primary/20 bg-primary/10 text-primary absolute z-[2] flex size-10 cursor-pointer items-center justify-center rounded-full border';

export default function CarouselDemo() {
  const { t } = useTranslation('playground');
  const [[currentIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const slide = SLIDES[currentIndex];

  const paginate = (newDirection: number) =>
    setSlide(([index]) => [(index + newDirection + SLIDES.length) % SLIDES.length, newDirection]);

  const handleDragEnd = (_: unknown, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -SWIPE_CONFIDENCE) paginate(1);
    else if (swipe > SWIPE_CONFIDENCE) paginate(-1);
  };

  return (
    <DemoStage className="min-h-[450px] flex-col gap-4">
      <div className="relative flex h-[400px] w-full max-w-[600px] items-center justify-center overflow-hidden">
        <m.button
          type="button"
          aria-label={t('demos.carousel.prev')}
          initial={{ opacity: 0.7 }}
          whileHover={{ scale: 1.2, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className={cn(arrowClass, 'left-2.5')}
        >
          <ChevronLeft className="size-4" aria-hidden />
        </m.button>

        <m.button
          type="button"
          aria-label={t('demos.carousel.next')}
          initial={{ opacity: 0.7 }}
          whileHover={{ scale: 1.2, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className={cn(arrowClass, 'right-2.5')}
        >
          <ChevronRight className="size-4" aria-hidden />
        </m.button>

        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="border-primary/20 from-foreground/10 to-background/80 absolute flex size-full cursor-grab flex-col items-center justify-center rounded-[20px] border bg-linear-135 active:cursor-grabbing"
          >
            <slide.Icon className="mb-8 size-16" style={{ color: slide.color }} aria-hidden />
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-foreground m-0 text-2xl"
            >
              {slide.title}
            </m.h2>
          </m.div>
        </AnimatePresence>

        <div className="absolute bottom-8 z-[2] flex gap-2">
          {SLIDES.map((s, index) => (
            <button
              key={s.title}
              type="button"
              aria-label={t('demos.carousel.goTo', { n: index + 1 })}
              aria-current={currentIndex === index}
              onClick={() => setSlide([index, index > currentIndex ? 1 : -1])}
              className={cn(
                'size-2 cursor-pointer rounded-full',
                currentIndex === index ? 'bg-primary' : 'bg-foreground/30',
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-muted-foreground text-center text-sm">{t('demos.carousel.hint')}</p>
    </DemoStage>
  );
}
