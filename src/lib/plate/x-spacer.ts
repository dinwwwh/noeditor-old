import { createPluginFactory } from '@udecode/plate-common'
import { z } from 'zod'

export const ELEMENT_X_SPACER = 'x-spacer'

// Ensures that the schema is always valid
export const XSpacerStateSchema = z.object({
  height: z.enum(['sm', 'md', 'lg', 'xl']).default('md').catch('md'),
}).catch({
  height: 'md',
})

export type XSpacerState = z.infer<typeof XSpacerStateSchema>

export const createXSpacerPlugin = createPluginFactory({
  key: ELEMENT_X_SPACER,
  isElement: true,
  isVoid: true,
  deserializeHtml: {
    rules: [
      { validNodeName: 'DIV', validAttribute: 'x-spacer' },
      { validNodeName: 'X-SPACER' },
    ],
    getNode(el) {
      const state = XSpacerStateSchema.parse({
        height: el.getAttribute('height'),
      })

      return {
        ...state,
        type: ELEMENT_X_SPACER,
      }
    },
  },
})
