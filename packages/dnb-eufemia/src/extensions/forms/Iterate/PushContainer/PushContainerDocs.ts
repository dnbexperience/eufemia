import { PropertiesTableProps } from '../../../../shared/types'
import { IsolationEvents } from '../../Form/Isolation/IsolationDocs'

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
    doc: 'Prefilled data to be used by fields. The data will be put into this path: `/pushContainerItems/0`. Use `defaultData` when possible.',
    type: ['object', 'array'],
    status: 'optional',
  },
  defaultData: {
    doc: 'Prefilled data to be used by fields. The data will be put into this path: `/pushContainerItems/0`',
    type: ['object', 'array'],
    status: 'optional',
  },
  isolatedData: {
    doc: 'Provide additional data that will be put into the root of the isolated data context (parallel to `/pushContainerItems/0`).',
    type: 'object',
    status: 'optional',
  },
  bubbleValidation: {
    doc: 'Prevent the form from being submitted when there are fields with errors inside the PushContainer.',
    type: 'boolean',
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
    doc: 'Defines the variant of the container. Can be `outline`, `filled` or `basic`. Defaults to `outline`.',
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

export const PushContainerEvents: PropertiesTableProps = {
  onCommit: IsolationEvents.onCommit,
}
