import { cn } from '@udecode/cn'
import {
  type PlaceholderProps,
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
} from '@udecode/plate-common'
import { ELEMENT_H1 } from '@udecode/plate-heading'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'
import React from 'react'

export function Placeholder(props: PlaceholderProps) {
  const { children, nodeProps, placeholder } = props

  const { enabled } = usePlaceholderState(props)

  // eslint-disable-next-line react/no-children-map
  return React.Children.map(children, (child) => {
    // eslint-disable-next-line react/no-clone-element
    return React.cloneElement(child, {
      className: child.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled
          && 'before:absolute before:cursor-text before:opacity-30 before:content-[attr(placeholder)]',
        ),
        placeholder,
      },
    })
  })
}

export const withPlaceholder = createNodeHOC(Placeholder)

export const withPlaceholdersPrimitive = createNodesHOC(Placeholder)

export function withPlaceholders(components: any) {
  return withPlaceholdersPrimitive(components, [
    {
      hideOnBlur: true,
      key: ELEMENT_PARAGRAPH,
      placeholder: 'Type a paragraph',
      query: {
        maxLevel: 1,
      },
    },
    {
      hideOnBlur: false,
      key: ELEMENT_H1,
      placeholder: 'Untitled',
    },
  ])
}
