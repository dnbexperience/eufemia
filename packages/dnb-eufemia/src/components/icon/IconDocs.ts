import { PropertiesTableProps } from '../../shared/types'

export const IconProperties: PropertiesTableProps = {
  icon: {
    doc: 'A React SVG Component.',
    type: 'React.ReactNode',
    status: 'required',
  },
  title: {
    doc: 'Use a title to provide extra information about the icon used.',
    type: 'string',
    status: 'optional',
  },
  border: {
    doc: 'Use `true` to display a rounded border with an inherited color. Keep in mind that the icon will have a larger total width and height of `+0.5em`.',
    type: 'boolean',
    status: 'optional',
  },
  alt: {
    doc: 'The alternative label (text version) of the icon. Defaults to the imported icon name.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.',
    type: [
      'small',
      'medium',
      'large',
      'default',
      'x-large',
      'xx-large',
      'auto',
      'basis',
      'number',
    ],
    status: 'optional',
  },
  color: {
    doc: 'The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the [colors table](/uilib/usage/customisation/colors), e.g. `var(--color-ocean-green)`. Default is no color, which means `--color-black-80`.',
    type: 'Various',
    status: 'optional',
  },
  inheritColor: {
    doc: 'Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.',
    type: 'boolean',
    status: 'optional',
  },
  modifier: {
    doc: 'Modifier class to define. Will result in: `dnb-icon--${modifier}`.',
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
    type: ['string', 'object'],
    status: 'optional',
  },
}
