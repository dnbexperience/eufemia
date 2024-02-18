import { PropertiesTableProps } from '../../../../shared/types'

export const VisibilityProperties: PropertiesTableProps = {
  visible: {
    doc: 'Control visibility directly by boolean value.',
    type: 'boolean',
    state: 'optional',
  },
  animate: {
    doc: 'Define if the content should animate during show/hide.',
    type: 'boolean',
    state: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `div`. Only for when `animate` is true.',
    type: 'string or React.Element',
    state: 'optional',
  },
  pathDefined: {
    doc: 'Given data context path must be defined to show children.',
    type: 'string',
    state: 'optional',
  },
  pathUndefined: {
    doc: 'Given data context path must be undefined to show children.',
    type: 'string',
    state: 'optional',
  },
  pathTruthy: {
    doc: 'Given data context path must be truthy to show children.',
    type: 'string',
    state: 'optional',
  },
  pathFalsy: {
    doc: 'Given data context path must be falsy to show children.',
    type: 'string',
    state: 'optional',
  },
  pathTrue: {
    doc: 'Given data context path must be true to show children.',
    type: 'string',
    state: 'optional',
  },
  pathFalse: {
    doc: 'Given data context path must be false to show children.',
    type: 'string',
    state: 'optional',
  },
  pathValue: {
    doc: 'Given data context path must match, as well as the `whenValue` value.',
    type: 'string',
    state: 'optional',
  },
  whenValue: {
    doc: 'The value to match. Should be used together with `pathValue`.',
    type: 'string',
    state: 'optional',
  },
  inferData: {
    doc: 'Will be called to decide by external logic, and show/hide contents based on the return value.',
    type: 'function',
    state: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    state: 'required',
  },
}
