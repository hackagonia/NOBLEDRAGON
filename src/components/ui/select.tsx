import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn('border rounded p-2 bg-background text-foreground', className)} {...props}>
      {children}
    </select>
  );
}
