import { PropertiesTableProps } from '../../../shared/types'

export const FieldBlockProperties: PropertiesTableProps = {
  label: {
    doc: 'Field label to show above / before the input feature.',
    type: 'string',
    state: 'optional',
  },
  labelDescription: {
    doc: 'A more discreet text displayed beside the label (i.e for "(optional)").',
    type: 'string',
    state: 'optional',
  },
  labelSize: {
    doc: 'Define one of the following [heading size](/uilib/elements/heading/): `medium` or `large`.',
    type: ['string', 'false'],
    state: 'optional',
  },
  layout: {
    doc: 'Layout for the label and input. Can be `horizontal` or `vertical`.',
    type: 'string',
    state: 'optional',
  },
  width: {
    doc: '`small`, `medium`, `large`, `stretch` or `false` for predefined standard widths.',
    type: ['string', 'false'],
    state: 'optional',
  },
  contentWidth: {
    doc: '`small`, `medium`, `large`, `stretch` or `false` for predefined standard widths.',
    type: ['string', 'false'],
    state: 'optional',
  },
  composition: {
    doc: 'Use `true` for when you have more than one field wrapped.',
    type: 'string',
    state: 'optional',
  },
  asFieldset: {
    doc: 'Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.',
    type: 'boolean',
    state: 'optional',
  },
  disabled: {
    doc: 'Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.',
    type: 'boolean',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
