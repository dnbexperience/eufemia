import { PropertiesTableProps } from '../../shared/types'

export const FormRowProperties: PropertiesTableProps = {
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label/legend layout direction. Defaults to `horizontal`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  direction: {
    doc: 'To define the layout direction on how the next component should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.',
    type: ['vertical', 'horizontal'],
    status: 'optional',
  },
  vertical: {
    doc: 'Will force both `direction` and `label_direction` to be **vertical** if set to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  centered: {
    doc: 'Will center all children vertically as long as the screen does not hit a mobile width.',
    type: 'boolean',
    status: 'optional',
  },
  wrap: {
    doc: 'Forces the content of a FormRow to wrap. Make sure you always define spacing as `right="..."` and not `left`, this way components will align left once they wrap. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  responsive: {
    doc: 'To force responsiveness on form components (like [Input](/uilib/components/input) and their labels ([FormLabel](/uilib/components/form-label)), set the property to `true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  section_style: {
    doc: 'To enable the visual helper `.dnb-section` class. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.',
    type: ['divider', 'white', 'transparent'],
    status: 'optional',
  },
  section_spacing: {
    doc: 'To modify the `spacing`. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.',
    type: ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'],
    status: 'optional',
  },
  no_fieldset: {
    doc: 'If set to `true`, then the internal `legend` element will be a `label` instead, and no `<fieldset>` is used. Keep in mind, that `<legend>` and `<fieldset>` **is only used if a `label` is provided**. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  label_class: {
    doc: 'If you need to style the "legend", then you can either send in a custom Component, like `label={ <H2> }`, or define your styling class with the `label_class` property.',
    type: 'string',
    status: 'optional',
  },
  locale: {
    doc: 'Send along a different locale to all nested components.',
    type: 'string',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, every component inside will be disabled. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
