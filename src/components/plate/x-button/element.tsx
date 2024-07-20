import { type XButtonState, XButtonStateSchema } from '@/lib/plate/x-button'
import type { PlateEditor, TElement } from '@udecode/plate-common'
import { PlateElement, withRef } from '@udecode/plate-common'
import { useReadOnly } from 'slate-react'
import { tv } from 'tailwind-variants'
import { useDebounceToolbarOpen } from '@/lib/plate/use-debounce-toolbar-open'
import { Globe2Icon } from 'lucide-react'
import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import { Toolbar, ToolbarGroup } from '../toolbar'
import { AlignDropdownMenu } from './align-dropdown-menu'
import { EditToolbarButton } from './edit-toolbar-button'
import { RoundedDropdownMenu } from './rounded-dropdown-menu'
import { CopyToolbarButton } from './copy-toolbar-button'

const xButton = tv({
  slots: {
    root: 'flex',
    button: [
      'px-6 h-11 inline-flex justify-center items-center',
      'bg-zinc-900 text-white font-semibold',
    ],
  },
  variants: {
    rounded: {
      none: {
        button: 'rounded-none',
      },
      md: {
        button: 'rounded-lg',
      },
      full: {
        button: 'rounded-full',
      },
    },
    align: {
      left: {
        root: 'justify-start',
      },
      center: {
        root: 'justify-center',
      },
      right: {
        root: 'justify-end',
      },
      justify: {
        button: 'w-full',
      },
    },
  },
  defaultVariants: {
    rounded: 'md',
    align: 'center',
  },
})

export const XButtonElement = withRef<typeof PlateElement>(({ children, ...props }, ref) => {
  const { href, rounded, align } = props.element as unknown as XButtonState
  const { root, button } = xButton({ rounded, align })

  return (
    <PlateElement ref={ref} {...props} className={root({ className: props.className })}>
      <XButtonToolbar element={props.element} editor={props.editor}>
        <a href={href} target="_blank" className={button()}>
          {children}
        </a>
      </XButtonToolbar>
    </PlateElement>
  )
})

function XButtonToolbar({ children, element, editor }: { children: React.ReactNode, element: TElement, editor: PlateEditor }) {
  const state = XButtonStateSchema.parse(element)
  const isReadOnly = useReadOnly()
  const open = useDebounceToolbarOpen()

  if (isReadOnly) {
    return children
  }

  return (
    <Popover modal={false} open={open}>
      <PopoverAnchor asChild>
        {children}
      </PopoverAnchor>

      <PopoverContent
        align="center"
        className="w-auto p-1"
        onOpenAutoFocus={e => e.preventDefault()}
        side="top"
        sideOffset={10}
      >
        <Toolbar>

          <ToolbarGroup>
            <a className="flex items-center gap-1" href={state.href} target="_blank">
              <Globe2Icon size={12} />
              {state.href
                ? (
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 max-w-32 truncate">
                      {state.href}
                    </span>
                  )
                : (
                    <span className="text-xs text-zinc-500 dark:text-zinc-500">
                      Unset
                    </span>
                  )}

            </a>
            <CopyToolbarButton element={element} editor={editor} />
            <EditToolbarButton element={element} editor={editor} />
          </ToolbarGroup>

          <ToolbarGroup>
            <AlignDropdownMenu element={element} editor={editor} />
            <RoundedDropdownMenu element={element} editor={editor} />
          </ToolbarGroup>
        </Toolbar>
      </PopoverContent>
    </Popover>
  )
}
