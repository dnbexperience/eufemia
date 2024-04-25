import { PropertiesTableProps } from '../../../../shared/types'

export const VisibilityProperties: PropertiesTableProps = {
  pathDefined: {
    doc: 'Given data context path must be defined to show children.',
    type: 'string',
    status: 'optional',
  },
  pathUndefined: {
    doc: 'Given data context path must be undefined to show children.',
    type: 'string',
    status: 'optional',
  },
  pathTruthy: {
    doc: 'Given data context path must be truthy to show children.',
    type: 'string',
    status: 'optional',
  },
  pathFalsy: {
    doc: 'Given data context path must be falsy to show children.',
    type: 'string',
    status: 'optional',
  },
  pathTrue: {
    doc: 'Given data context path must be true to show children.',
    type: 'string',
    status: 'optional',
  },
  pathFalse: {
    doc: 'Given data context path must be false to show children.',
    type: 'string',
    status: 'optional',
  },
  pathValue: {
    doc: 'Given data context path must match, as well as the `whenValue` value.',
    type: 'string',
    status: 'optional',
  },
  whenValue: {
    doc: 'The value to match. Should be used together with `pathValue`.',
    type: 'string',
    status: 'optional',
  },
  inferData: {
    doc: 'Will be called to decide by external logic, and show/hide contents based on the return value.',
    type: 'function',
    status: 'optional',
  },
  visible: {
    doc: 'Control visibility directly by boolean value.',
    type: 'boolean',
    status: 'optional',
  },
  animate: {
    doc: 'Define if the content should animate during show/hide.',
    type: 'boolean',
    status: 'optional',
  },
  KeepInDOM: {
    doc: "Keep the content in the DOM, even if it's not visible",
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `div`. Only for when `animate` is true.',
    type: 'string or React.Element',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
}
