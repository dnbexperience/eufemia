import type { PropertiesTableProps } from '../../../../shared/types'

export const MultiSelectionProperties: PropertiesTableProps = {
  variant: {
    doc: 'Defines the variant of the component. `popover` renders a trigger button that opens a popover with the item list. `inline` renders the item list inline as checkboxes.',
    type: ['"popover"', '"inline"'],
    status: 'optional',
  },
  data: {
    doc: 'Array of objects where each object contains at least `value` and `title`. Can also include `text` for an optional primary extra line, `description` for an optional secondary grey line, plus `disabled`, `help`, and `className`.',
    type: [
      'Array<{ value, title, text?: React.ReactNode, description?: React.ReactNode, disabled?, ... }>',
    ],
    status: 'optional',
  },
  dataPath: {
    doc: 'Path to data in Form.Handler context. The context data array should contain objects with `value` and `title` properties.',
    type: ['string'],
    status: 'optional',
  },

  showSearchField: {
    doc: 'Show a search/filter input field to search through items.',
    type: ['boolean'],
    status: 'optional',
  },
  search: {
    doc: 'Configure search behavior when `showSearchField` is enabled. An object with optional keys: `filter` (enable result filtering, default `true`), `reorder` (enable relevance reordering, default `true`), `numbers` (enable number-optimized matching, default `false`), `matchInsideWordsFrom` (threshold for in-word search, default `3`), and `match` (matching mode `"word"` or `"starts-with"`, default `"word"`). When `filter` is `false`, items are not filtered out but are still reordered by relevance unless `reorder` is also `false`. Example: `search={{ numbers: true }}`.',
    type: 'SearchOptions',
    status: 'optional',
  },
  showSelectAll: {
    doc: 'Show a "Select all" checkbox at the top of the list.',
    type: ['boolean'],
    status: 'optional',
  },
  showSelectedTags: {
    doc: 'Show selected items as removable tags inside the popover. When enabled and nothing is selected, a placeholder text is shown.',
    type: ['boolean'],
    status: 'optional',
  },
  maxHeight: {
    doc: 'Sets the maximum height of the scrollable item list for the `inline` variant. Numbers are interpreted as rem.',
    type: ['string', 'number'],
    status: 'optional',
  },
  showConfirmButton: {
    doc: 'Show confirm and cancel buttons at the bottom of the popover. Selections are only applied when the user confirms.',
    type: ['boolean'],
    status: 'optional',
  },
  selectedItemsCollapsibleThreshold: {
    doc: 'When the number of selected items exceeds this threshold, the selected items are hidden by default and can be toggled with a header.',
    type: ['number'],
    status: 'optional',
  },
  openOnFind: {
    doc: "Keeps collapsed selected tags findable by the browser's find-in-page feature. Matching content expands the selected tags. Defaults to `false`.",
    type: ['boolean'],
    status: 'optional',
  },
  minItems: {
    doc: 'Minimum number of items required to be selected. Triggers a validation error if fewer items are selected.',
    type: ['number'],
    status: 'optional',
  },
  maxItems: {
    doc: 'Maximum number of items allowed to be selected. Triggers a validation error if more items are selected.',
    type: ['number'],
    status: 'optional',
  },
  width: {
    doc: 'The width of the component. Supported values: `"medium"` and `"large"`. Defaults to `"large"`.',
    type: ['"medium"', '"large"'],
    status: 'optional',
  },
}
