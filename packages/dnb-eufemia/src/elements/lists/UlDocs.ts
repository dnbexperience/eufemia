import { PropertiesTableProps } from '../../shared/types'
import { ElementProperties } from './../ElementDocs'

export const UlProperties: PropertiesTableProps = {
  inside: {
    doc: 'Defines the position of the marker.',
    type: 'boolean',
    status: 'optional',
  },
  outside: {
    doc: 'Defines the position of the marker (default).',
    type: 'boolean',
    status: 'optional',
  },
  nested: {
    doc: 'Will ensure a nested structure of several lists.',
    type: 'boolean',
    status: 'optional',
  },
  ...ElementProperties,
}
