import { withRef } from '@udecode/cn'
import { PlateElement } from '@udecode/plate-common'

export const HeadingElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    const Element = props.element.type as keyof JSX.IntrinsicElements

    return (
      <PlateElement
        asChild
        ref={ref}
        {...props}
      >
        <Element>
          {children}
        </Element>
      </PlateElement>
    )
  },
)
