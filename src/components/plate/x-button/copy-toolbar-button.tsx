import { CheckIcon, CopyIcon } from 'lucide-react'
import useClipboard from 'react-use-clipboard'
import type { PlateEditor, TElement } from '@udecode/plate-common'
import { ToolbarButton } from '../toolbar'
import { XButtonStateSchema } from '@/lib/plate/x-button'

export function CopyToolbarButton({ element }: { element: TElement, editor: PlateEditor }) {
  const state = XButtonStateSchema.parse(element)
  const [isCopied, copy] = useClipboard(state.href || '', {
    successDuration: 1000,
  })

  return (
    <ToolbarButton
      className="flex items-center gap-1"
      onClick={copy}
    >
      {isCopied
        ? <CheckIcon size={12} />
        : <CopyIcon size={12} /> }
      <span className="sr-only">Copy</span>
    </ToolbarButton>
  )
}
