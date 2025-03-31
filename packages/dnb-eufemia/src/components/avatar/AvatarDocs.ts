import { PropertiesTableProps } from '../../shared/types'

export const AvatarProperties: PropertiesTableProps = {
  size: {
    doc: 'Size of the Avatar. Options: `small` | `medium` | `large` | `x-large`. Defaults to `medium`.',
    type: ['small', 'medium', 'large', 'x-large'],
    status: 'optional',
  },
  children: {
    doc: 'Content of the component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  alt: {
    doc: 'Used in combination with `src` to provide an alt attribute for the `img` element.',
    type: 'string',
    status: 'optional',
  },
  src: {
    doc: 'Specifies the path to the image.',
    type: 'string',
    status: 'optional',
  },
  imgProps: {
    doc: '[Image properties](/uilib/elements/image) applied to the `img` element if the component is used to display an image.',
    type: ['ImgProps'],
    status: 'optional',
  },
  variant: {
    doc: 'Override the variant of the component. Options: `primary` | `secondary` | `tertiary`. Defaults to `primary`.',
    type: ['primary', 'secondary', 'tertiary'],
    status: 'optional',
  },
  hasLabel: {
    doc: 'If aria-hidden is set to `true` or if a label is given, typical inside a table or dl (definition list), then you can disable Avatar.Group as a dependent of Avatar. Use `true` to omit the `Avatar group required:` warning.',
    type: 'boolean',
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component root.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: 'Various',
    status: 'optional',
  },
}

export const AvatarGroupProperties: PropertiesTableProps = {
  label: {
    doc: 'The label description of the group of avatars.',
    type: 'string',
    status: 'required',
  },
  size: {
    doc: 'Size of the Avatars, and "elements hidden text (+x)". Options: `small` | `medium` | `large` | `x-large`. Defaults to `medium`.',
    type: ['small', 'medium', 'large', 'x-large'],
    status: 'optional',
  },
  variant: {
    doc: 'Override the variant of the Avatars. Options: `primary` | `secondary` | `tertiary`. Defaults to `primary`.',
    type: ['primary', 'secondary', 'tertiary'],
    status: 'optional',
  },
  maxElements: {
    doc: 'Number of max displayed elements, including the "elements hidden text (+x)". Defaults to `4`.',
    type: 'number',
    status: 'optional',
  },
  children: {
    doc: 'The Avatars to group.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  className: {
    doc: 'Custom className for the component root.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: 'Various',
    status: 'optional',
  },
}
