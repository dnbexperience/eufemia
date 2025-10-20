import { PropertiesTableProps } from '../../shared/types'

export const FormLabelProperties: PropertiesTableProps = {
  forId: {
    doc: 'the same unique `id` like the linked HTML element has.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'the `text` of the label. You can use `children` as well.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  srOnly: {
    doc: 'when `true`, the label will be invisible and only accessible for screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  vertical: {
    doc: 'if set to `true`, will do the same as `labelDirection` when set to **vertical**.',
    type: 'boolean',
    status: 'optional',
  },
  size: {
    doc: 'define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.',
    type: ['medium', 'large'],
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'if set to `true`, the label will behave as not interactive.',
    type: 'boolean',
    status: 'optional',
  },
  element: {
    doc: 'defines the HTML element used. Defaults to `label`.',
    type: 'React.Element',
    status: 'optional',
  },
  innerRef: {
    doc: 'attach a React Ref to the inner label `element`.',
    type: 'React.Ref',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
