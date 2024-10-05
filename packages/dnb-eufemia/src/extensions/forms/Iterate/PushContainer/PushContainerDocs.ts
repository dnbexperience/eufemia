import { PropertiesTableProps } from '../../../../shared/types'

export const PushContainerProperties: PropertiesTableProps = {
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
  data: {
    doc: 'Prefilled data to be used by fields. Use `defaultData` when possible.',
    type: ['object', 'array'],
    status: 'optional',
  },
  defaultData: {
    doc: 'Prefilled data to be used by fields.',
    type: ['object', 'array'],
    status: 'optional',
  },
  openButton: {
    doc: 'The button to open container.',
    type: 'React.Node',
    status: 'optional',
  },
  showOpenButtonWhen: {
    doc: 'Define when the "open button" should be shown. Should be a function that returns a boolean.',
    type: 'function',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the variant of the container. Can be `outline` or `basic`. Defaults to `outline`.',
    type: 'string',
    status: 'optional',
  },
  toolbar: {
    doc: 'A custom toolbar to be shown below the container.',
    type: 'React.Node',
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

export const PushContainerEvents: PropertiesTableProps = {}
