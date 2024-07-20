import { DndProvider } from 'react-dnd'
import type { TElement } from '@udecode/plate-common'
import { Plate } from '@udecode/plate-common'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TooltipProvider } from './plate/tooltip'
import { FixedToolbar } from './plate/fixed-toolbar'
import { FixedToolbarButtons } from './plate/fixed-toolbar-buttons'
import { Editor as PlateEditor } from './plate/editor'
import { FloatingToolbar } from './plate/floating-toolbar'
import { FloatingToolbarButtons } from './plate/floating-toolbar-buttons'
import { plugins } from '@/lib/plate/plugins'

export interface EmailEditorProps {
  initialValue?: TElement[]
  onChange?: (value: TElement[]) => void
}

export function Editor({ initialValue, onChange }: EmailEditorProps) {
  return (
    <TooltipProvider>
      <DndProvider backend={HTML5Backend}>
        <Plate plugins={plugins} initialValue={initialValue} onChange={onChange}>
          <FixedToolbar>
            <FixedToolbarButtons />
          </FixedToolbar>

          <PlateEditor />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
        </Plate>
      </DndProvider>
    </TooltipProvider>
  )
}
