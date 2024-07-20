import type {
  AutoformatRule,
} from '@udecode/plate-autoformat'
import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from '@udecode/plate-autoformat'

import { autoformatBlocks } from './blocks'
import { autoformatIndentLists } from './indent-list-rules'
import { autoformatMarks } from './marks'

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatIndentLists,
  ...autoformatMarks,

  ...autoformatSmartQuotes,
  ...autoformatPunctuation,
  ...autoformatLegal,
  ...autoformatLegalHtml,
  ...autoformatArrow,
  ...autoformatMath,
]
