import { withProps } from '@udecode/cn'
import type { RenderAfterEditable } from '@udecode/plate-common'
import { PlateLeaf, createPlugins } from '@udecode/plate-common'
import { ELEMENT_PARAGRAPH, createParagraphPlugin } from '@udecode/plate-paragraph'
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, createHeadingPlugin } from '@udecode/plate-heading'
import { ELEMENT_BLOCKQUOTE, createBlockquotePlugin } from '@udecode/plate-block-quote'
import { ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX, createCodeBlockPlugin } from '@udecode/plate-code-block'
import { ELEMENT_HR, createHorizontalRulePlugin } from '@udecode/plate-horizontal-rule'
import { ELEMENT_LINK, createLinkPlugin } from '@udecode/plate-link'
import { ELEMENT_IMAGE, createImagePlugin } from '@udecode/plate-media'
import { createCaptionPlugin } from '@udecode/plate-caption'
import { ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TR, createTablePlugin } from '@udecode/plate-table'
import { ELEMENT_TODO_LI, createTodoListPlugin } from '@udecode/plate-list'
import { MARK_BOLD, MARK_CODE, MARK_ITALIC, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE, createBoldPlugin, createCodePlugin, createItalicPlugin, createStrikethroughPlugin, createSubscriptPlugin, createSuperscriptPlugin, createUnderlinePlugin } from '@udecode/plate-basic-marks'
import { createFontBackgroundColorPlugin, createFontColorPlugin, createFontSizePlugin } from '@udecode/plate-font'
import { MARK_HIGHLIGHT, createHighlightPlugin } from '@udecode/plate-highlight'
import { MARK_KBD, createKbdPlugin } from '@udecode/plate-kbd'
import { createAlignPlugin } from '@udecode/plate-alignment'
import { createIndentPlugin } from '@udecode/plate-indent'
import { createIndentListPlugin } from '@udecode/plate-indent-list'
import { createLineHeightPlugin } from '@udecode/plate-line-height'
import { createBlockSelectionPlugin } from '@udecode/plate-selection'
import { createDndPlugin } from '@udecode/plate-dnd'
import { createEmojiPlugin } from '@udecode/plate-emoji'
import { createExitBreakPlugin, createSoftBreakPlugin } from '@udecode/plate-break'
import { createNodeIdPlugin } from '@udecode/plate-node-id'
import { createResetNodePlugin } from '@udecode/plate-reset-node'
import { createDeletePlugin } from '@udecode/plate-select'
import { createTabbablePlugin } from '@udecode/plate-tabbable'
import { createTrailingBlockPlugin } from '@udecode/plate-trailing-block'
import { createDeserializeDocxPlugin } from '@udecode/plate-serializer-docx'
import { createDeserializeCsvPlugin } from '@udecode/plate-serializer-csv'
import { createDeserializeMdPlugin } from '@udecode/plate-serializer-md'
import { createJuicePlugin } from '@udecode/plate-juice'
import { ELEMENT_SLASH_INPUT, createSlashPlugin } from '@udecode/plate-slash-command'

import { BlockquoteElement } from '@/components/plate/blockquote-element'
import { CodeBlockElement } from '@/components/plate/code-block-element'
import { CodeLineElement } from '@/components/plate/code-line-element'
import { CodeSyntaxLeaf } from '@/components/plate/code-syntax-leaf'
import { HrElement } from '@/components/plate/hr-element'
import { ImageElement } from '@/components/plate/image-element'
import { LinkElement } from '@/components/plate/link-element'
import { LinkFloatingToolbar } from '@/components/plate/link-floating-toolbar'
import { HeadingElement } from '@/components/plate/heading-element'
import { ParagraphElement } from '@/components/plate/paragraph-element'
import { TableElement } from '@/components/plate/table-element'
import { TableRowElement } from '@/components/plate/table-row-element'
import { TableCellElement, TableCellHeaderElement } from '@/components/plate/table-cell-element'
import { TodoListElement } from '@/components/plate/todo-list-element'
import { CodeLeaf } from '@/components/plate/code-leaf'
import { HighlightLeaf } from '@/components/plate/highlight-leaf'
import { KbdLeaf } from '@/components/plate/kbd-leaf'
import { withPlaceholders } from '@/components/plate/placeholder'
import { withDraggables } from '@/components/plate/with-draggables'
import { SlashInputElement } from '@/components/plate/slash-input-element'
import { XButtonElement } from '@/components/plate/x-button/element'
import { XSpacerElement } from '@/components/plate/x-spacer/element'
import { autoformatPlugin } from './autoformat/plugin'
import { ELEMENT_X_BUTTON, createXButtonPlugin } from './x-button'
import { ELEMENT_X_SPACER, createXSpacerPlugin } from './x-spacer'

export const plugins = createPlugins(
  [
    createParagraphPlugin(),
    createHeadingPlugin(),
    createBlockquotePlugin(),
    createCodeBlockPlugin(),
    createHorizontalRulePlugin(),
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createCaptionPlugin({
      options: {
        pluginKeys: [
          // ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED
        ],
      },
    }),
    createTablePlugin(),
    createTodoListPlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createStrikethroughPlugin(),
    createCodePlugin(),
    createSubscriptPlugin(),
    createSuperscriptPlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createKbdPlugin(),
    createAlignPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
          ],
        },
      },
    }),
    createIndentPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createIndentListPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_BLOCKQUOTE,
            ELEMENT_CODE_BLOCK,
          ],
        },
      },
    }),
    createLineHeightPlugin({
      inject: {
        props: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3],
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
          ],
        },
      },
    }),

    autoformatPlugin,
    createSlashPlugin(),

    createBlockSelectionPlugin({
      options: {
        sizes: {
          top: 0,
          bottom: 0,
        },
      },
    }),
    createDndPlugin({
      options: { enableScroller: true },
    }),
    createEmojiPlugin(),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: 'mod+enter',
          },
          {
            hotkey: 'mod+shift+enter',
            before: true,
          },
          {
            hotkey: 'enter',
            query: {
              start: true,
              end: true,
              // allow: KEYS_HEADING,
            },
            relative: true,
            level: 1,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ],
      },
    }),
    createDeletePlugin(),
    createSoftBreakPlugin({
      options: {
        rules: [
          { hotkey: 'shift+enter' },
          {
            hotkey: 'enter',
            query: {
              allow: [
                // ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD
              ],
            },
          },
        ],
      },
    }),
    createTabbablePlugin(),
    createTrailingBlockPlugin({
      options: { type: ELEMENT_PARAGRAPH },
    }),
    createDeserializeDocxPlugin(),
    createDeserializeCsvPlugin(),
    createDeserializeMdPlugin(),
    createJuicePlugin(),

    // CUSTOM PLUGINS
    createXButtonPlugin(),
    createXSpacerPlugin(),
  ],
  {
    components: withDraggables(withPlaceholders({
      [ELEMENT_BLOCKQUOTE]: BlockquoteElement,
      [ELEMENT_CODE_BLOCK]: CodeBlockElement,
      [ELEMENT_CODE_LINE]: CodeLineElement,
      [ELEMENT_CODE_SYNTAX]: CodeSyntaxLeaf,
      [ELEMENT_HR]: HrElement,
      [ELEMENT_IMAGE]: ImageElement,
      [ELEMENT_LINK]: LinkElement,
      [ELEMENT_H1]: withProps(HeadingElement, { variant: 'h1' }),
      [ELEMENT_H2]: withProps(HeadingElement, { variant: 'h2' }),
      [ELEMENT_H3]: withProps(HeadingElement, { variant: 'h3' }),
      [ELEMENT_H4]: withProps(HeadingElement, { variant: 'h4' }),
      [ELEMENT_H5]: withProps(HeadingElement, { variant: 'h5' }),
      [ELEMENT_H6]: withProps(HeadingElement, { variant: 'h6' }),
      [ELEMENT_PARAGRAPH]: ParagraphElement,
      [ELEMENT_TABLE]: TableElement,
      [ELEMENT_TR]: TableRowElement,
      [ELEMENT_TD]: TableCellElement,
      [ELEMENT_TH]: TableCellHeaderElement,
      [ELEMENT_TODO_LI]: TodoListElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
      [MARK_CODE]: CodeLeaf,
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: 'em' }),
      [MARK_KBD]: KbdLeaf,
      [MARK_STRIKETHROUGH]: withProps(PlateLeaf, { as: 's' }),
      [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: 'sub' }),
      [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: 'sup' }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: 'u' }),
      [ELEMENT_SLASH_INPUT]: SlashInputElement,

      // CUSTOM ELEMENTS
      [ELEMENT_X_BUTTON]: XButtonElement,
      [ELEMENT_X_SPACER]: XSpacerElement,
    })),
  },
)
