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
  visibleWhen: {
    doc: 'Provide a `path` and a `hasValue` property with the excepted value in order to show children. You can alternatively provide a `withValue` function that returns a boolean. The first parameter is the value of the path.',
    type: 'object',
    status: 'optional',
  },
  visibleWhenNot: {
    doc: 'Same as `visibleWhen`, but with inverted logic.',
    type: 'object',
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
  keepInDOM: {
    doc: "Keep the content in the DOM, even if it's not visible. Can be used to let fields run validation.",
    type: 'boolean',
    status: 'optional',
  },
  compensateForGap: {
    doc: 'To compensate for CSS gap between the rows, so animation does not jump during the animation. Provide a CSS unit or `auto`. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  filterData: {
    doc: 'Filter data based on provided criteria. More info about `filterData` can be found in the [Getting Started](/uilib/extensions/forms/getting-started/#filter-data) documentation.',
    type: ['object', 'function'],
    status: 'optional',
  },
  fieldPropsWhenHidden: {
    doc: 'When visibility is hidden, and `keepInDOM` is true, pass these props to the children.',
    type: 'various',
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
