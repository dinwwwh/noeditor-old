'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { withProps, withVariants } from '@udecode/cn'
import { cva } from 'class-variance-authority'

const separatorVariants = cva('shrink-0 bg-zinc-200 dark:bg-zinc-800', {
  defaultVariants: {
    orientation: 'horizontal',
  },
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
})

export const Separator = withVariants(
  withProps(SeparatorPrimitive.Root, {
    decorative: true,
    orientation: 'horizontal',
  }),
  separatorVariants,
)
