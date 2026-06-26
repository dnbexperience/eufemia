import type { PropertiesTableProps } from '../../shared/types'

export const VippsWalletButtonProperties: PropertiesTableProps = {
  pending: {
    doc: 'Set to `true` to show a pending state with a [SubmitIndicator](/uilib/extensions/forms/Form/SubmitIndicator/). The button is disabled while pending. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties, except `variant` which is always set to `primary`.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
