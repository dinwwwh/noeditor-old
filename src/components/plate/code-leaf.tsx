import { withRef } from '@udecode/cn'
import { PlateLeaf } from '@udecode/plate-common'

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({ children, ...props }, ref) => {
    return (
      <PlateLeaf
        asChild
        ref={ref}
        {...props}
      >
        <code>{children}</code>
      </PlateLeaf>
    )
  },
)
