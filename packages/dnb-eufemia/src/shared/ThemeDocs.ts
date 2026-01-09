import type { PropertiesTableProps } from '../shared/types'

export const ThemeProperties: PropertiesTableProps = {
  name: {
    doc: 'The name of a branding theme. Can be `ui` (universal identity), `eiendom`, `sbanken` or `carnegie`.',
    type: ['ui', 'eiendom', 'sbanken', 'carnegie'],
    status: 'optional',
  },
  size: {
    doc: 'Will define what sizes of components are used (WIP).',
    type: 'basis',
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
  darkMode: {
    doc: 'When a component supports a dark mode style, it will be used instead for the dedicated area.',
    type: 'boolean',
    status: 'optional',
  },
}
