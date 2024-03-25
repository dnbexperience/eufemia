import { PropertiesTableProps } from '../../shared/types'

export const IconProperties: PropertiesTableProps = {
  icon: {
    doc: 'a React SVG Component or the icon name (in case we use `IconPrimary` or `dnb-icon-primary`).',
    type: 'unknown',
    state: 'required',
  },
  title: {
    doc: 'Use a title to provide extra information about the icon used.',
    type: 'unknown',
    state: 'optional',
  },
  border: {
    doc: 'Use `true` to display a rounded border with an inherited color. Keep in mind that the icon will have a larger total width and height of `+0.5em`.',
    type: 'unknown',
    state: 'optional',
  },
  alt: {
    doc: 'The alternative label (text version) of the icon. Defaults to the imported icon name.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'The dimension of the icon. This will be the `viewBox` and represent `width` and `height`. Defaults to `16`. You can use `small`,`medium`, `large` or `auto`. Auto will enable that the icon size gets inherited by the parent HTML element if it provides a `font-size`.',
    type: 'unknown',
    state: 'optional',
  },
  color: {
    doc: 'The color can be any valid color property, such as Hex, RGB or preferable – any CSS variable from the <a href="/uilib/usage/customisation/colors">colors table</a>, e.g. `var(--color-ocean-green)`. Default is no color, which means `--color-black-80`.',
    type: 'unknown',
    state: 'optional',
  },
  inherit_color: {
    doc: 'Defaults to `true`. Set to `false` if you do not want to inherit the color by `currentColor`.',
    type: 'unknown',
    state: 'optional',
  },
  modifier: {
    doc: 'Modifier class to define. Will result in: `dnb-icon--${modifier}`.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
