import type { TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn('border rounded p-2 w-full bg-background text-foreground', className)} {...props} />;
}
