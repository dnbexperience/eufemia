import type { PropertiesTableProps } from '../shared/types'

export const ThemeProperties: PropertiesTableProps = {
  name: {
    doc: 'The name of a branding theme. Can be `ui` (universal identity), `eiendom`, `sbanken` or `carnegie`.',
    type: ['"ui"', '"eiendom"', '"sbanken"', '"carnegie"'],
    status: 'optional',
  },
  size: {
    doc: 'Will define what sizes of components are used (WIP).',
    type: '"basis"',
    status: 'optional',
  },
  variant: {
    doc: '(WIP).',
    type: 'string',
    status: 'optional',
  },
  propMapping: {
    doc: 'Defines a specific CSS class so you get a declarative way of mapping CSS properties. A set of predefined maps will be available (WIP).',
    type: 'string',
    status: 'optional',
  },
  contrastMode: {
    doc: 'When a component supports a contrast style, it will be used instead for the dedicated area.',
    type: 'boolean',
    status: 'optional',
  },
  colorScheme: {
    doc: 'Controls the color scheme. Use `auto` to follow system preference and switch automatically between light and dark, `light` for light mode, `dark` for dark mode, or `inherit` to inherit from a parent Theme. Default is `undefined`.',
    type: ['"auto"', '"light"', '"dark"', '"inherit"'],
    status: 'optional',
  },
  surface: {
    doc: "Adjusts component appearance based on background. Use `dark` when content is placed on a dark surface, `light` for light, or `initial` to reset to the component's default behavior, ignoring any parent surface context. Default is `undefined`.",
    type: ['"dark"', '"light"', '"initial"'],
    status: 'optional',
  },
}
