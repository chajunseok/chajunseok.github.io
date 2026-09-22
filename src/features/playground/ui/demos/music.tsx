import { useEffect, useRef, useState } from 'react';
import { m, type Variants } from 'motion/react';
import { Pause, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/utils/cn';
import { DemoStage } from '../demo-stage';

const BAR_COUNT = 12;

const barVariants: Variants = {
  playing: (i: number) => ({
    scaleY: [1, 2, 1],
    transition: { duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' },
  }),
  stopped: { scaleY: 1 },
};

const buttonVariants: Variants = {
  hover: { scale: 1.1, boxShadow: '0 0 25px hsla(250, 90%, 70%, 0.5)' },
  tap: { scale: 0.95 },
};

export default function MusicDemo() {
  const { t } = useTranslation('playground');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/music/background.mp3');
    audio.preload = 'auto';
    audioRef.current = audio;

    const onLoaded = () => setAudioLoaded(true);
    const onError = () => {
      console.error('Audio error:', audio.error);
      setIsPlaying(false);
      setAudioLoaded(false);
      setHasError(true);
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadeddata', onLoaded);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadeddata', onLoaded);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audioLoaded || !audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  };

  const status = hasError
    ? t('demos.music.failed')
    : !audioLoaded
      ? t('demos.music.loadingAudio')
      : isPlaying
        ? t('demos.music.playing')
        : t('demos.music.idle');

  return (
    <DemoStage className="flex-col">
      <m.button
        type="button"
        aria-label={isPlaying ? t('demos.music.pause') : t('demos.music.play')}
        disabled={!audioLoaded}
        variants={buttonVariants}
        whileHover={audioLoaded ? 'hover' : undefined}
        whileTap={audioLoaded ? 'tap' : undefined}
        onClick={handleClick}
        className={cn(
          'border-primary text-primary relative flex size-20 items-center justify-center rounded-full border-2 transition-[background-color] duration-300',
          isPlaying ? 'bg-primary/20' : 'bg-transparent',
          audioLoaded ? 'cursor-pointer' : 'cursor-not-allowed opacity-60',
        )}
      >
        <m.span
          aria-hidden
          animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {isPlaying ? <Pause className="size-8" /> : <Play className="size-8" />}
        </m.span>
      </m.button>

      <div aria-hidden className="mt-8 flex h-[60px] items-center gap-1.5 px-4">
        {Array.from({ length: BAR_COUNT }, (_, i) => (
          <m.div
            key={i}
            custom={i}
            variants={barVariants}
            animate={isPlaying ? 'playing' : 'stopped'}
            className={cn('bg-primary h-10 w-1.5 rounded', isPlaying ? 'opacity-100' : 'opacity-50')}
            style={{ originY: 1 }}
          />
        ))}
      </div>

      <m.p
        aria-live="polite"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-primary mt-6 text-center text-base"
      >
        {status}
      </m.p>
    </DemoStage>
  );
}
