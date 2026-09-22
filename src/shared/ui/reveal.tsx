import { m, type HTMLMotionProps } from 'motion/react';

type RevealProps = HTMLMotionProps<'div'> & { delay?: number };

/** 화면에 처음 들어올 때 한 번 떠오른다. reduced-motion이면 MotionConfig가 이동을 끈다. */
export function Reveal({ delay = 0, ...props }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      {...props}
    />
  );
}
