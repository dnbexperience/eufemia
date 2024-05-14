import { PropertiesTableProps } from '../../../../shared/types'
import { ToggleProperties } from '../Toggle/ToggleDocs'

Object.assign(ToggleProperties, {
  valueOn: {
    ...ToggleProperties.valueOn,
    status: 'optional',
  },
  valueOff: {
    ...ToggleProperties.valueOff,
    status: 'optional',
  },
})

export const IndeterminateProperties: PropertiesTableProps = {
  dependencePaths: {
    doc: 'Provide an array with the related paths of other [Toggle](/uilib/extensions/forms/base-fields/Toggle/) og [Boolean](/uilib/extensions/forms/base-fields/Boolean/) fields.',
    type: 'array',
    status: 'required',
  },
  propagateIndeterminateState: {
    doc: 'When `checked`, the dependent checkboxes will always be set to "checked" when in indeterminate state. When `unchecked`, the dependent checkboxes will be set to "unchecked" when in indeterminate state. When "auto", the dependent checkboxes will get the inverted state from where the (this) parent checkbox is in. Default is `true`.',
    type: ['checked', 'unchecked', 'auto'],
    status: 'optional',
  },
  ...ToggleProperties,
  textOn: undefined,
  textOff: undefined,
  variant: undefined,
}
