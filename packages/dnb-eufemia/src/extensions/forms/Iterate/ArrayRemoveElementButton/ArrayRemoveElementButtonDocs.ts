import { PropertiesTableProps } from '../../../../shared/types'

export const ArrayRemoveElementButtonProperties: PropertiesTableProps = {
  text: {
    doc: 'Button text.',
    type: 'string',
    state: 'optional',
  },
  children: {
    doc: 'Alternative to `text` for button contents.',
    type: 'ReactNode',
    state: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties.',
    type: 'Various',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const ArrayRemoveElementButtonEvents: PropertiesTableProps = {}
