import type { FC } from 'react'

import { ELEMENT_BLOCKQUOTE } from '@udecode/plate-block-quote'
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block'
import { createNodesWithHOC } from '@udecode/plate-common'
import {
  type WithDraggableOptions,
  withDraggable as withDraggablePrimitive,
} from '@udecode/plate-dnd'
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from '@udecode/plate-heading'
import { ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list'
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph'

import { ELEMENT_IMAGE } from '@udecode/plate-media'
import { Draggable, type DraggableProps } from './draggable'
import { ELEMENT_X_BUTTON } from '@/lib/plate/x-button'
import { ELEMENT_X_SPACER } from '@/lib/plate/x-spacer'

export function withDraggable(Component: FC, options?: WithDraggableOptions<
  Partial<Omit<DraggableProps, 'children' | 'editor' | 'element'>>
>) {
  return withDraggablePrimitive<DraggableProps>(Draggable, Component, options as any)
}

export const withDraggablesPrimitive = createNodesWithHOC(withDraggable)

export function withDraggables(components: any) {
  return withDraggablesPrimitive(components, [
    {
      keys: [ELEMENT_PARAGRAPH, ELEMENT_UL, ELEMENT_OL],
      level: 0,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'px-0 pb-1 text-[1.875em]',
        },
      },
      key: ELEMENT_H1,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'px-0 pb-1 text-[1.5em]',
        },
      },
      key: ELEMENT_H2,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'pt-[2px] px-0 pb-1 text-[1.25em]',
        },
      },
      key: ELEMENT_H3,
    },
    {
      draggableProps: {
        classNames: {
          blockToolbarWrapper: 'h-[1.3em]',
          gutterLeft: 'pt-[3px] px-0 pb-0 text-[1.1em]',
        },
      },
      keys: [ELEMENT_H4, ELEMENT_H5],
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-[3px] px-0 pb-0',
        },
      },
      keys: [ELEMENT_PARAGRAPH],
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
      keys: [ELEMENT_H6, ELEMENT_UL, ELEMENT_OL],
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'px-0 pb-0',
        },
      },
      key: ELEMENT_BLOCKQUOTE,
    },
    {
      draggableProps: {
        classNames: {
          gutterLeft: 'pt-8 px-0 pb-0',
        },
      },
      key: ELEMENT_CODE_BLOCK,
    },
    {
      keys: [ELEMENT_X_BUTTON, ELEMENT_X_SPACER, ELEMENT_IMAGE],
    },
  ])
}
