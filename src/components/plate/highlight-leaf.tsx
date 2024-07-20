import { cn, withRef } from '@udecode/cn'
import { PlateLeaf } from '@udecode/plate-common'

export const HighlightLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => (
    <PlateLeaf
      asChild
      className={cn('bg-zinc-900/20 text-inherit dark:bg-zinc-900/40 dark:bg-zinc-50/20 dark:dark:bg-zinc-50/40', className)}
      ref={ref}
      {...props}
    >
      <mark>{children}</mark>
    </PlateLeaf>
  ),
)
