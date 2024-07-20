import { createAutoformatPlugin } from '@udecode/plate-autoformat'

import { autoformatRules } from './rules'

export const autoformatPlugin = createAutoformatPlugin({
  options: {
    rules: autoformatRules,
    enableUndoOnDelete: true,
  },
})
