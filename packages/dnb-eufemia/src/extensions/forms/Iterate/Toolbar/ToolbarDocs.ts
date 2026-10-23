import type { PropertiesTableProps } from '../../../../shared/types'

export const ToolbarProperties: PropertiesTableProps = {
  children: {
    doc: '`React.ReactNode` or a function that receives an object with the `index`, `items` and `value` of the current item.',
    type: ['React.ReactNode', 'function'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: 'Various',
    status: 'optional',
  },
}
