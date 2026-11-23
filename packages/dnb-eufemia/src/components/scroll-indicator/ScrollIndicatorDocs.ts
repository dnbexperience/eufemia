import type { PropertiesTableProps } from '../../shared/types'

export const ScrollIndicatorProperties: PropertiesTableProps = {
  items: {
    doc: 'Dots in the same order as the corresponding content. Each item has a required accessible label and an optional active boolean. Several items can be active.',
    type: 'Array<{ label: string; active?: boolean }>',
    status: 'required',
  },
  'aria-label': {
    doc: 'Accessible name for the group. Defaults to the translated ScrollIndicator.label. Use a name that identifies the controlled content when several groups appear on a page.',
    type: 'string',
    status: 'optional',
  },
  'aria-controls': {
    doc: 'The id of the content controlled by the indicators.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/web/layout-and-typography/layout/space/properties)': {
    doc: 'Spacing properties like top or bottom are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const ScrollIndicatorEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Called when a dot is activated by click, Enter or Space. Receives an object with the zero-based index. Move the content and update items in response. Moving focus with arrow keys does not call onChange.',
    type: '({ index: number }) => void',
    status: 'required',
  },
}
