'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn, withRef } from '@udecode/cn'
import { cva } from 'class-variance-authority'

export const Popover = PopoverPrimitive.Root

export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverAnchor = PopoverPrimitive.Anchor

export const popoverVariants = cva(
  'w-72 rounded-md border border-zinc-200 bg-white p-4 text-zinc-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 print:hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50',
)

export const PopoverContent = withRef<typeof PopoverPrimitive.Content>(
  ({ align = 'center', className, sideOffset = 4, style, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        className={cn(popoverVariants(), className)}
        ref={ref}
        sideOffset={sideOffset}
        style={{ zIndex: 1000, ...style }}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
)
