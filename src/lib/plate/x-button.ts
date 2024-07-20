import { createPluginFactory } from '@udecode/plate-common'
import { z } from 'zod'

export const ELEMENT_X_BUTTON = 'x-button'

// Ensures that the schema is always valid
export const XButtonStateSchema = z.object({
  href: z.string().optional().catch(undefined),
  rounded: z.enum(['none', 'md', 'full']).default('md').catch('md'),
  align: z.enum(['left', 'center', 'right', 'justify']).default('center').catch('center'),
}).catch({
  href: undefined,
  rounded: 'md',
  align: 'center',
})

export type XButtonState = z.infer<typeof XButtonStateSchema>

export const createXButtonPlugin = createPluginFactory({
  key: ELEMENT_X_BUTTON,
  isElement: true,
  deserializeHtml: {
    rules: [
      { validNodeName: 'A', validAttribute: 'x-button' },
      { validNodeName: 'X-BUTTON' },
    ],
    getNode(el) {
      const attributes = XButtonStateSchema.parse({
        href: el.getAttribute('href'),
        rounded: el.getAttribute('rounded'),
        width: el.getAttribute('width'),
        align: el.getAttribute('align'),
      })

      return {
        ...attributes,
        type: ELEMENT_X_BUTTON,
      }
    },
  },
})
