import { PropertiesTableProps } from '../../shared/types'

export const SectionProperties: PropertiesTableProps = {
  variant: {
    doc: 'Defines the semantic purpose and subsequently the style of the visual helper.',
    type: 'string',
    status: 'optional',
  },
  breakout: {
    doc: 'Use `true` to enable a fullscreen breakout look. Supports also media query breakpoints like `{ small: boolean }`. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  outset: {
    doc: 'Define if the Section should break out negatively on larger screens. You cannot use `breakout` and `outset` together. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  outline: {
    doc: "Define a custom border color. If `true` is given, `color-black-8` is used. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'black-8' }`.",
    type: 'string',
    status: 'optional',
  },
  outlineWidth: {
    doc: "Define a custom border width. Defaults to `var(--card-outline-width)`. Supports also media query breakpoints like `{ small: '2px' }`.",
    type: 'string | number',
    status: 'optional',
  },
  roundedCorner: {
    doc: 'Use `true` to enable rounded corners (border-radius). Supports also media query breakpoints like `{ small: boolean }`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  backgroundColor: {
    doc: "Define a custom background color, instead of a variant. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'white' }`.",
    type: 'string',
    status: 'optional',
  },
  dropShadow: {
    doc: 'Use `true` to show the default Eufemia DropShadow. Supports also media query breakpoints like `{ small: true }`.',
    type: 'boolean',
    status: 'optional',
  },
  textColor: {
    doc: "Define a custom text color to compliment the `backgroundColor`. Use a Eufemia color. Supports also media query breakpoints like `{ small: 'black-80' }`.",
    type: 'string',
    status: 'optional',
  },
  innerSpace: {
    doc: "Will add a padding around the content. Supports also media query breakpoints like `{small: { top: 'medium' }}`.",
    type: 'string',
    status: 'optional',
  },
  innerRef: {
    doc: 'By providing a React Ref we can get the internally used element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
