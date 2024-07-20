import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { Icons, iconVariants } from '@/components/icons'
import { type XButtonState, XButtonStateSchema } from '@/lib/plate/x-button'
import { type PlateEditor, type TElement, findNodePath, setNodes } from '@udecode/plate-common'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from '../dropdown-menu'
import { ToolbarButton } from '../toolbar'

const items = [
  {
    value: 'left',
    icon: Icons.alignLeft,
  },
  {
    value: 'center',
    icon: Icons.alignCenter,
  },
  {
    value: 'right',
    icon: Icons.alignRight,
  },
  {
    value: 'justify',
    icon: Icons.alignJustify,
  },
] satisfies {
  value: XButtonState['align']
  icon: React.FC
}[]

export function AlignDropdownMenu({ editor, element, children, ...props }: DropdownMenuProps & { element: TElement, editor: PlateEditor }) {
  const state = XButtonStateSchema.parse(element)
  const openState = useOpenState()

  const IconValue
    = items.find(item => item.value === state.align)?.icon
    ?? Icons.alignLeft

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Align" isDropdown>
          <IconValue />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          onValueChange={(align) => {
            setNodes(editor, {
              align: align as XButtonState['align'],
            }, { at: findNodePath(editor, element) })
          }}
        >
          {items.map(({ value: itemValue, icon: Icon }) => (
            <DropdownMenuRadioItem key={itemValue} value={itemValue} hideIcon>
              <Icon className={iconVariants({ variant: 'toolbar' })} />
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
