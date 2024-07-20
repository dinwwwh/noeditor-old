'use client'

import * as React from 'react'

import * as ToolbarPrimitive from '@radix-ui/react-toolbar'
import { cn, withCn, withRef, withVariants } from '@udecode/cn'
import { type VariantProps, cva } from 'class-variance-authority'

import { Separator } from './separator'
import { withTooltip } from './tooltip'
import { Icons } from '@/components/icons'

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'relative flex select-none items-center gap-1 bg-white dark:bg-zinc-950',
)

export const ToolbarToggleGroup = withCn(
  ToolbarPrimitive.ToolbarToggleGroup,
  'flex items-center',
)

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4',
)

export const ToolbarSeparator = withCn(
  ToolbarPrimitive.Separator,
  'my-1 w-px shrink-0 bg-zinc-200 dark:bg-zinc-800',
)

const toolbarButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300',
    '[&_svg:not([data-icon])]:size-5',
  ),
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-3',
        lg: 'h-11 px-5',
        sm: 'h-9 px-2',
      },
      variant: {
        default:
          'bg-transparent hover:bg-zinc-100 hover:text-zinc-500 aria-checked:bg-zinc-100 aria-checked:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-400 dark:aria-checked:bg-zinc-800 dark:aria-checked:text-zinc-50',
        outline:
          'border border-zinc-200 bg-transparent hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-50',
      },
    },
  },
)

export const ToolbarToggleItem = withVariants(
  ToolbarPrimitive.ToggleItem,
  toolbarButtonVariants,
  ['variant', 'size'],
)

const ToolbarButton = withTooltip(
  React.forwardRef<
    React.ElementRef<typeof ToolbarToggleItem>,
    {
      isDropdown?: boolean
      pressed?: boolean
    } & Omit<
      React.ComponentPropsWithoutRef<typeof ToolbarToggleItem>,
      'asChild' | 'value'
    > &
    VariantProps<typeof toolbarButtonVariants>
  >(
    (
      { children, className, isDropdown, pressed, size, variant, ...props },
      ref,
    ) => {
      return typeof pressed === 'boolean'
        ? (
            <ToolbarToggleGroup
              disabled={props.disabled}
              type="single"
              value="single"
            >
              <ToolbarToggleItem
                className={cn(
                  toolbarButtonVariants({
                    size,
                    variant,
                  }),
                  isDropdown && 'my-1 justify-between pr-1',
                  className,
                )}
                ref={ref}
                value={pressed ? 'single' : ''}
                {...props}
              >
                {isDropdown
                  ? (
                      <>
                        <div className="flex flex-1">{children}</div>
                        <div>
                          <Icons.arrowDown className="ml-0.5 size-4" data-icon />
                        </div>
                      </>
                    )
                  : (
                      children
                    )}
              </ToolbarToggleItem>
            </ToolbarToggleGroup>
          )
        : (
            <ToolbarPrimitive.Button
              className={cn(
                toolbarButtonVariants({
                  size,
                  variant,
                }),
                isDropdown && 'pr-1',
                className,
              )}
              ref={ref}
              {...props}
            >
              {children}
            </ToolbarPrimitive.Button>
          )
    },
  ),
)
ToolbarButton.displayName = 'ToolbarButton'

export { ToolbarButton }

export const ToolbarGroup = withRef<
  'div',
  {
    noSeparator?: boolean
  }
>(({ children, className, noSeparator }, ref) => {
  // eslint-disable-next-line react/no-children-map
  const childArr = React.Children.map(children, c => c)

  if (!childArr || childArr.length === 0)
    return null

  return (
    <div className={cn('flex', className)} ref={ref}>
      {!noSeparator && (
        <div className="h-full py-1">
          <Separator orientation="vertical" />
        </div>
      )}

      <div className="mx-1 flex items-center gap-1">{children}</div>
    </div>
  )
})
