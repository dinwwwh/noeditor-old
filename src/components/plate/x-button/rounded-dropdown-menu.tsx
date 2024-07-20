import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'

import { iconVariants } from '@/components/icons'
import { type XButtonState, XButtonStateSchema } from '@/lib/plate/x-button'
import { CircleIcon, SquareIcon, SquircleIcon } from 'lucide-react'
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
    value: 'none',
    icon: SquareIcon,
  },
  {
    value: 'md',
    icon: SquircleIcon,
  },
  {
    value: 'full',
    icon: CircleIcon,
  },
] satisfies {
  value: XButtonState['rounded']
  icon: React.FC
}[]

export function RoundedDropdownMenu({ editor, element, children, ...props }: DropdownMenuProps & { element: TElement, editor: PlateEditor }) {
  const state = XButtonStateSchema.parse(element)
  const openState = useOpenState()

  const IconValue
    = items.find(item => item.value === state.rounded)?.icon
    ?? items[0].icon

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton pressed={openState.open} tooltip="Rounded" isDropdown>
          <IconValue />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          onValueChange={rounded => setNodes(editor, {
            rounded: rounded as XButtonState['rounded'],
          }, { at: findNodePath(editor, element) })}
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
