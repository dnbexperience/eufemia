import { PropertiesTableProps } from '../../shared/types'

export const FormLabelProperties: PropertiesTableProps = {
  forId: {
    doc: 'The same unique `id` like the linked HTML element has.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'The `text` of the label. You can use `children` as well.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  srOnly: {
    doc: 'When `true`, the label will be invisible and only accessible for screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  vertical: {
    doc: 'If set to `true`, will do the same as `label_direction` when set to **vertical**.',
    type: 'boolean',
    status: 'optional',
  },
  size: {
    doc: 'Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.',
    type: ['medium', 'large'],
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If set to `true`, the label will behave as not interactive.',
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'Defines the HTML element used. Defaults to `label`.',
    type: 'React.Element',
    status: 'optional',
  },
  innerRef: {
    doc: 'Attach a React Ref to the inner label `element`.',
    type: 'React.Ref',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
