import type { ComponentType, SVGProps } from 'react'

import { withRef } from '@udecode/cn'
import {
  type PlateEditor,
  PlateElement,
  setNodes,
  toggleNodeType,
} from '@udecode/plate-common'
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3 } from '@udecode/plate-heading'
import { ListStyleType, toggleIndentList } from '@udecode/plate-indent-list'

import { Icons } from '@/components/icons'
import { ELEMENT_X_BUTTON } from '@/lib/plate/x-button'
import { ImageIcon, MousePointerClickIcon, MoveVerticalIcon } from 'lucide-react'
import { ELEMENT_X_SPACER } from '@/lib/plate/x-spacer'
import { ELEMENT_IMAGE } from '@udecode/plate-media'
import {
  InlineCombobox,
  InlineComboboxContent,
  InlineComboboxEmpty,
  InlineComboboxInput,
  InlineComboboxItem,
} from './inline-combobox'

interface SlashCommandRule {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  onSelect: (editor: PlateEditor) => void
  value: string
  keywords?: string[]
}

const rules: SlashCommandRule[] = [
  {
    icon: Icons.h1,
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_H1 })
    },
    value: 'Heading 1',
  },
  {
    icon: Icons.h2,
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_H2 })
    },
    value: 'Heading 2',
  },
  {
    icon: Icons.h3,
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_H3 })
    },
    value: 'Heading 3',
  },
  {
    icon: Icons.ul,
    keywords: ['ul', 'unordered list'],
    onSelect: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      })
    },
    value: 'Bulleted list',
  },
  {
    icon: Icons.ol,
    keywords: ['ol', 'ordered list'],
    onSelect: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      })
    },
    value: 'Numbered list',
  },
  {
    icon: MousePointerClickIcon,
    keywords: ['button', 'x button', 'x-button'],
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_X_BUTTON })
    },
    value: 'Button',
  },
  {
    icon: MoveVerticalIcon,
    keywords: ['spacer', 'x spacer', 'x-spacer'],
    onSelect: (editor) => {
      toggleNodeType(editor, { activeType: ELEMENT_X_SPACER })
    },
    value: 'Spacer',
  },
  {
    icon: ImageIcon,
    keywords: ['image', 'img'],
    onSelect: (editor) => {
      // TODO: Add a better image uploading feature
      // eslint-disable-next-line no-alert
      const url = window.prompt('Enter the image URL:')
      if (!url)
        return

      setNodes(editor, {
        type: ELEMENT_IMAGE,
        url,
      })
    },
    value: 'Image',
  },
]

export const SlashInputElement = withRef<typeof PlateElement>(
  ({ className, ...props }, ref) => {
    const { children, editor, element } = props

    return (
      <PlateElement
        as="span"
        data-slate-value={element.value}
        ref={ref}
        {...props}
      >
        <InlineCombobox element={element} trigger="/">
          <InlineComboboxInput />

          <InlineComboboxContent>
            <InlineComboboxEmpty>
              No matching commands found
            </InlineComboboxEmpty>

            {rules.map(({ icon: Icon, keywords, onSelect, value }) => (
              <InlineComboboxItem
                key={value}
                keywords={keywords}
                onClick={() => onSelect(editor)}
                value={value}
              >
                <Icon aria-hidden className="mr-2 size-4" />
                {value}
              </InlineComboboxItem>
            ))}
          </InlineComboboxContent>
        </InlineCombobox>

        {children}
      </PlateElement>
    )
  },
)
