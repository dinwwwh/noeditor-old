import { withRef } from '@udecode/cn'
import { PlateElement, useElement } from '@udecode/plate-common'
import { type TLinkElement, useLink } from '@udecode/plate-link'

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, ...props }, ref) => {
    const element = useElement<TLinkElement>()
    const { props: linkProps } = useLink({ element })

    return (
      <PlateElement
        {...(linkProps as any)}
        {...props}
        asChild
        ref={ref}
      >
        <a>{children}</a>
      </PlateElement>
    )
  },
)
