import { PropertiesTableProps } from '../../../../shared/types'

export const SummaryListProperties: PropertiesTableProps = {
  layout: {
    doc: 'Use `grid`, `horizontal` or `vertical`.',
    type: 'string',
    status: 'optional',
  },
  transformLabel: {
    doc: 'Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.',
    type: 'function',
    status: 'optional',
  },
  inheritVisibility: {
    doc: 'Use this property to propagate the `inheritVisibility` property to all nested values.',
    type: 'boolean',
    status: 'optional',
  },
  inheritLabel: {
    doc: 'Use this property to propagate the `inheritLabel` property to all nested values.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const StepEvents: PropertiesTableProps = {}
