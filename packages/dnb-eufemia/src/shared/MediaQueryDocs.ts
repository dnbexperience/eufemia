import type { PropertiesTableProps } from '../shared/types'

export const MediaQueryProperties: PropertiesTableProps = {
  when: {
    doc: "Define a list of sizes to match, given as an object `{ min: 'small', max: 'medium' }` or as an array `[{ min: 'small', max: 'medium' }, { min: 'medium', max: 'large' }]`.",
    type: 'object',
    status: 'optional',
  },
  query: {
    doc: 'A MediaQuery as a string similar to the CSS API, but without `@media`.',
    type: 'object',
    status: 'optional',
  },
  not: {
    doc: 'Reverts the defined queries as a whole.',
    type: 'boolean',
    status: 'optional',
  },
  matchOnSSR: {
    doc: 'If set to `true`, it will match and return the given children during SSR.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'The content to be wrapped in the media query.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}
