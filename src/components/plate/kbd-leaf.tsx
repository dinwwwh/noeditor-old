import { withRef } from '@udecode/cn'
import { PlateLeaf } from '@udecode/plate-common'

export const KbdLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => (
    <PlateLeaf
      {...props}
      ref={ref}
      asChild
    >
      <kbd>{children}</kbd>
    </PlateLeaf>
  ),
)
