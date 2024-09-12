import { PropertiesTableProps } from '../../../shared/types'

export const fieldBlockSharedProperties: PropertiesTableProps = {
  label: {
    doc: 'Field label to show above / before the input feature.',
    type: 'string',
    status: 'optional',
  },
  labelDescription: {
    doc: 'A more discreet text displayed beside the label (i.e for "(optional)").',
    type: 'string',
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  layout: {
    doc: 'Layout for the label and input. Can be `horizontal` or `vertical`.',
    type: 'string',
    status: 'optional',
  },
  width: {
    doc: '`small`, `medium`, `large`, `stretch` or `false` for predefined standard widths.',
    type: ['string', 'false'],
    status: 'optional',
  },
  contentWidth: {
    doc: '`small`, `medium`, `large`, `stretch` or `false` for predefined standard widths.',
    type: ['string', 'false'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const fieldBlockProperties: PropertiesTableProps = {
  ...fieldBlockSharedProperties,
  labelSize: {
    doc: 'Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  asFieldset: {
    doc: 'Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.',
    type: 'boolean',
    status: 'optional',
  },
  align: {
    doc: '`center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  composition: {
    doc: 'Use `true` for when you have more than one field wrapped.',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'Set `true` to make the inner [FormLabel](/uilib/components/form-label/) behave as disabled.',
    type: 'boolean',
    status: 'optional',
  },
}
