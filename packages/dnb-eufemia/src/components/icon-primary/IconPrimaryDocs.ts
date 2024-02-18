import { PropertiesTableProps } from '../../shared/types'

export const IconPrimaryProperties: PropertiesTableProps = {
  icon: {
    doc: 'Defines the <a href="/icons/primary">primary icon</a> to be used, as a string.',
    type: 'unknown',
    state: 'required',
  },
  '[Icon](/uilib/components/icon/properties)': {
    doc: 'all Icon properties.',
    type: 'Various',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
