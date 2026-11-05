import type { PropertiesTableProps } from '../../shared/types'

export const VippsWalletButtonProperties: PropertiesTableProps = {
  pending: {
    doc: 'Set to `true` to show a pending state with a [SubmitIndicator](/web/forms/Form/SubmitIndicator/). The button is disabled while pending. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  '[Button](/web/components/button/properties)': {
    doc: 'All button properties, except `variant` which is always set to `primary`.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/web/layout-and-typography/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
