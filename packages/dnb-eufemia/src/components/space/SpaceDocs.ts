import type { PropertiesTableProps } from '../../shared/types'

export const SpaceGlobalProperties: PropertiesTableProps = {
  space: {
    doc: 'Has to be an object with either: `top`, `right`, `bottom`, `left`, `inline`, or `block`. Also supports media query breakpoints like `{small: "medium", medium: "large", large: "x-large"}` and shorthand directions `inline`/`block`. Use spacing values like: `small`, `1rem`, `1` or `16px`.',
    type: ['object'],
    status: 'optional',
  },
  top: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-top`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
  right: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-right`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
  bottom: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-bottom`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
  left: {
    doc: 'Use spacing values like: `small`, `1rem`, `1` or `16px`. Will use `margin-left`.',
    type: ['string', 'number', 'boolean'],
    status: 'optional',
  },
}

export const SpaceProperties: PropertiesTableProps = {
  element: {
    doc: 'Defines the HTML element used. Defaults to `div`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the space element will be 100% in `width`.',
    type: 'boolean',
    status: 'optional',
  },
  inline: {
    doc: 'If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  innerSpace: {
    doc: "Will add a padding around the content. Also supports media query breakpoints like `{small: { top: 'medium' }}` and shorthand directions `inline`/`block`.",
    type: ['object', 'string', 'number', 'boolean'],
    status: 'optional',
  },
  noCollapse: {
    doc: "If set to `true`, then a wrapper with `display: flow-root;` is used. This way you avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline={true}` in combination.",
    type: 'boolean',
    status: 'optional',
  },
}

export const SpaceResponsiveProperties: PropertiesTableProps = {
  density: {
    doc: 'Forces a specific spacing density for descendants. Overrides `defaultBreakpoint` when set.',
    type: ['"compact"', '"basis"', '"spacious"'],
    status: 'optional',
  },
  defaultBreakpoint: {
    doc: "Sets which breakpoint's spacing scale to use as the default. Default: `medium`.",
    type: ['"small"', '"medium"', '"large"'],
    status: 'optional',
  },
  off: {
    doc: 'When `true`, disables responsive spacing for descendants, overriding a parent `Space.Responsive`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}
