import React, { useEffect } from 'react'

import {
  findNodePath,
  isSelectionExpanded,
  setNodes,
  useEditorRef,
  useEditorSelector,
  useElement,
  useRemoveNodeButton,
} from '@udecode/plate-common'
import {
  FloatingMedia as FloatingMediaPrimitive,
  floatingMediaActions,
  useFloatingMediaSelectors,
} from '@udecode/plate-media'
import { useReadOnly, useSelected } from 'slate-react'

import { Icons } from '@/components/icons'

import { Button, buttonVariants } from './button'
import { CaptionButton } from './caption'
import { inputVariants } from './input'
import { Popover, PopoverAnchor, PopoverContent } from './popover'
import { Separator } from './separator'

export interface MediaPopoverProps {
  children: React.ReactNode
  pluginKey?: string
}

export function MediaPopover({ children, pluginKey }: MediaPopoverProps) {
  const readOnly = useReadOnly()
  const selected = useSelected()

  const selectionCollapsed = useEditorSelector(
    editor => !isSelectionExpanded(editor),
    [],
  )
  const isOpen = !readOnly && selected && selectionCollapsed
  const isEditing = useFloatingMediaSelectors().isEditing()

  useEffect(() => {
    if (!isOpen && isEditing) {
      floatingMediaActions.isEditing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const element = useElement()
  const editor = useEditorRef()
  const { props: buttonProps } = useRemoveNodeButton({ element })

  if (readOnly)
    return <>{children}</>

  return (
    <Popover modal={false} open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>

      <PopoverContent
        className="w-auto p-1"
        onOpenAutoFocus={e => e.preventDefault()}
      >
        {isEditing
          ? (
              <div className="flex w-[330px] flex-col">
                <div className="flex items-center">
                  <div className="flex items-center pl-3 text-zinc-500 dark:text-zinc-400">
                    <Icons.link className="size-4" />
                  </div>

                  <FloatingMediaPrimitive.UrlInput
                    className={inputVariants({ h: 'sm', variant: 'ghost' })}
                    options={{
                      pluginKey,
                    }}
                    placeholder="Paste the embed link..."
                  />
                </div>
              </div>
            )
          : (
              <div className="box-content flex h-9 items-center gap-1">
                <FloatingMediaPrimitive.EditButton
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Edit link
                </FloatingMediaPrimitive.EditButton>

                <CaptionButton variant="ghost">Caption</CaptionButton>

                <Separator className="my-1" orientation="vertical" />

                <Button
                  size="sms"
                  variant="ghost"
                  onClick={() => {
                    setNodes(editor, {
                      align: 'left',
                    }, { at: findNodePath(editor, element) })
                  }}
                >
                  <Icons.alignLeft className="size-4" />
                </Button>
                <Button
                  size="sms"
                  variant="ghost"
                  onClick={() => {
                    setNodes(editor, {
                      align: 'center',
                    }, { at: findNodePath(editor, element) })
                  }}
                >
                  <Icons.alignCenter className="size-4" />
                </Button>
                <Button
                  size="sms"
                  variant="ghost"
                  onClick={() => {
                    setNodes(editor, {
                      align: 'right',
                    }, { at: findNodePath(editor, element) })
                  }}
                >
                  <Icons.alignRight className="size-4" />
                </Button>

                <Separator className="my-1" orientation="vertical" />

                <Button size="sms" variant="ghost" {...buttonProps}>
                  <Icons.delete className="size-4" />
                </Button>
              </div>
            )}
      </PopoverContent>
    </Popover>
  )
}
