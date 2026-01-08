import type { PropertiesTableProps } from '../../shared/types'

export const SpaceGlobalProperties: PropertiesTableProps = {
  space: {
    doc: 'Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.',
    type: ['object'],
    status: 'optional',
  },
  top: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
  right: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
  bottom: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
  left: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
}

export const SpaceProperties: PropertiesTableProps = {
  element: {
    doc: 'Defines the HTML element used. Defaults to `div`.',
    type: 'React.Element',
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the space element will be 100% in width.',
    type: 'boolean',
    status: 'optional',
  },
  inline: {
    doc: 'If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  innerSpace: {
    doc: "Will add a padding around the content. Supports also media query breakpoints like `{small: { top: 'medium' }}`.",
    type: ['object', 'string', 'number', 'boolean'],
    status: 'optional',
  },
  no_collapse: {
    doc: "If set to `true`, then a wrapper with `display: flow-root;` is used. This way you avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline={true}` in combination.",
    type: 'boolean',
    status: 'optional',
  },
}
