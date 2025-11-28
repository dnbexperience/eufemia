import { PropertiesTableProps } from '../../shared/types'

export const TermDefinitionProperties: PropertiesTableProps = {
  children: {
    doc: 'Term shown as the trigger. Typically a short word or phrase.',
    type: 'React.ReactNode',
    status: 'required',
  },
  content: {
    doc: 'Definition text that will be displayed inside.',
    type: 'React.ReactNode',
    status: 'required',
  },
  placement: {
    doc: 'Defines the preferred popover placement relative to the trigger.',
    type: ['top', 'right', 'bottom', 'left'],
    defaultValue: 'bottom',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Supports spacing props such as `top`, `right`, `bottom`, `left`, or `space`.',
    type: ['string', 'number', 'boolean', 'object'],
    status: 'optional',
  },
}
