import { withRef } from '@udecode/cn'
import { PlateElement } from '@udecode/plate-common'
import { useSelected } from 'slate-react'

export const HrElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    const selected = useSelected()

    return (
      <PlateElement
        ref={ref}
        {...props}
        data-selected={selected}
      >
        <hr />

        {children}
      </PlateElement>
    )
  },
)
