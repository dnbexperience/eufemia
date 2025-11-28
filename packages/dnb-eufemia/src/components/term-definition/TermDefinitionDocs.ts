import { PropertiesTableProps } from '../../shared/types'

export const TermDefinitionProperties: PropertiesTableProps = {
  children: {
    doc: 'Term shown as the trigger. Typically a short word or phrase.',
    type: 'React.ReactNode',
    status: 'required',
  },
  content: {
    doc: 'Definition text that will be displayed inside the tooltip.',
    type: 'React.ReactNode',
    status: 'required',
  },
  className: {
    doc: 'Custom className applied to the trigger span.',
    type: 'string',
    status: 'optional',
  },
  placement: {
    doc: 'Tooltip placement relative to the trigger.',
    type: ['top', 'right', 'bottom', 'left'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Supports spacing props such as `top`, `right`, `bottom`, `left`, or `space`.',
    type: ['string', 'number', 'boolean', 'object'],
    status: 'optional',
  },
}
