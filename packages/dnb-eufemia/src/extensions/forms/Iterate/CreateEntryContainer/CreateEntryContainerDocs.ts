import { PropertiesTableProps } from '../../../../shared/types'

export const CreateEntryContainerProperties: PropertiesTableProps = {
  path: {
    doc: 'The path to the array to add the new item to.',
    type: 'string',
    status: 'required',
  },
  title: {
    doc: 'The title of the container.',
    type: 'React.Node',
    status: 'optional',
  },
  showButton: {
    doc: 'The button to open container.',
    type: 'React.Node',
    status: 'optional',
  },
  showButtonWhen: {
    doc: 'Define when the "open button" should be shown. Should be a function that returns a boolean.',
    type: 'function',
    status: 'optional',
  },
  children: {
    doc: 'The container contents.',
    type: 'React.Node',
    status: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const CreateEntryContainerEvents: PropertiesTableProps = {}
