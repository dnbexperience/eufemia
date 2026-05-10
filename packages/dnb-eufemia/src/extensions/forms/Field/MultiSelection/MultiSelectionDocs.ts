import type { PropertiesTableProps } from '../../../../shared/types'

export const MultiSelectionProperties: PropertiesTableProps = {
  data: {
    doc: 'Array of objects where each object contains at least `value` and `title`. Can also include `text` for an optional primary extra line, `description` for an optional secondary grey line, plus `disabled`, `help`, and `className`.',
    type: [
      'Array<{ value, title, text?: ReactNode, description?: ReactNode, disabled?, ... }>',
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
