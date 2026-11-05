import type { PropertiesTableProps } from '../../../../shared/types'

export const ButtonRowProperties: PropertiesTableProps = {
  children: {
    doc: 'Buttons.',
    type: 'React.ReactNode',
    status: 'required',
  },
  '[Space](/web/layout-and-typography/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
