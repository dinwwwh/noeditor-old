import { isCollapsed, useEditorSelector } from '@udecode/plate-common'
import { useReadOnly, useSelected } from 'slate-react'

export function useDebounceToolbarOpen() {
  const readOnly = useReadOnly()
  const selected = useSelected()

  const selectionCollapsed = useEditorSelector(
    editor => isCollapsed(editor.selection),
    [],
  )

  // TODO:should add debounce
  return !readOnly && selected && selectionCollapsed
}
