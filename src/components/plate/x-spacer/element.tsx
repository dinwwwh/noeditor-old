import type { PlateEditor, TElement } from '@udecode/plate-common'
import { PlateElement, findNodePath, setNodes, withRef } from '@udecode/plate-common'
import { useReadOnly } from 'slate-react'
import { tv } from 'tailwind-variants'
import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import { Toolbar, ToolbarToggleGroup, ToolbarToggleItem } from '../toolbar'
import { XSpacerStateSchema } from '@/lib/plate/x-spacer'
import { useDebounceToolbarOpen } from '@/lib/plate/use-debounce-toolbar-open'

export const xSpacer = tv({
  slots: {
    root: '',
  },
  variants: {
    height: {
      sm: {
        root: 'h-2',
      },
      md: {
        root: 'h-4',
      },
      lg: {
        root: 'h-8',
      },
      xl: {
        root: 'h-16',
      },
    },
  },
  defaultVariants: {
    height: 'md',
  },
})

export const XSpacerElement = withRef<typeof PlateElement>(({ children, ...props }, ref) => {
  const state = XSpacerStateSchema.parse(props.element)
  const { root } = xSpacer({ height: state.height })
  return (
    <XSpacerToolbar element={props.element} editor={props.editor}>
      <PlateElement {...props} ref={ref} className={root({ className: props.className })}>
        {children}
      </PlateElement>
    </XSpacerToolbar>
  )
})

function XSpacerToolbar({ children, element, editor }: { children: React.ReactNode, element: TElement, editor: PlateEditor }) {
  const state = XSpacerStateSchema.parse(element)
  const isReadOnly = useReadOnly()
  const open = useDebounceToolbarOpen()

  if (isReadOnly) {
    return children
  }

  return (
    <Popover modal={false} open={open}>
      <PopoverAnchor className={open ? 'border-2 border-zinc-500' : ''} asChild>
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
          <ToolbarToggleGroup
            type="single"
            defaultValue={state.height}
            onValueChange={(value) => {
              setNodes(editor, {
                height: value,
              }, { at: findNodePath(editor, element) })
            }}
          >
            <ToolbarToggleItem value="sm">
              sm
            </ToolbarToggleItem>
            <ToolbarToggleItem value="md">
              md
            </ToolbarToggleItem>
            <ToolbarToggleItem value="lg">
              lg
            </ToolbarToggleItem>
            <ToolbarToggleItem value="xl">
              xl
            </ToolbarToggleItem>
          </ToolbarToggleGroup>
        </Toolbar>
      </PopoverContent>
    </Popover>
  )
}
