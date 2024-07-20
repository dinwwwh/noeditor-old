import type { TElement } from '@udecode/plate-common'
import { useEffect, useState } from 'react'
import { Editor } from './components/editor'

export function App() {
  const [value, setValue] = useState<TElement[] | undefined>(undefined)

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(value)
  }, [value])

  return (
    <div>
      <Editor initialValue={value} onChange={setValue} />
    </div>
  )
}
