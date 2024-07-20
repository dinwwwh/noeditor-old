import { ToolbarButton } from '@radix-ui/react-toolbar'
import { PopoverClose, PopoverTrigger } from '@radix-ui/react-popover'
import { useRef } from 'react'
import { type PlateEditor, type TElement, findNodePath, setNodes } from '@udecode/plate-common'
import { Popover, PopoverContent } from '../popover'
import { XButtonStateSchema } from '@/lib/plate/x-button'

export function EditToolbarButton({ element, editor }: { element: TElement, editor: PlateEditor }) {
  const closeEl = useRef<HTMLButtonElement>(null)
  const state = XButtonStateSchema.parse(element)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setNodes(editor, {
      href: formData.get('href') as string,
    }, { at: findNodePath(editor, element) })
    closeEl.current?.click()
  }

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <ToolbarButton>
          Edit
        </ToolbarButton>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverClose ref={closeEl} className="sr-only" />

        <form onSubmit={onSubmit} className="flex items-center gap-2">

          <input
            name="href"
            placeholder="https://example.com"
            pattern="^.*://.*$"
            required
            defaultValue={state.href}
          />

          <button type="submit">
            Save
          </button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
