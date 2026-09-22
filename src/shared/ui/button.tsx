import type { ComponentProps } from 'react';
import { Slot } from 'radix-ui';
import { cn } from '@/shared/utils/cn';
import { buttonVariants, type ButtonVariantProps } from './button-variants';

type ButtonProps = ComponentProps<'button'> & ButtonVariantProps & { asChild?: boolean };

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
