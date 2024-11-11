import { PropertiesTableProps } from '../../shared/types'

import { ElementPropertiesWithoutSkeleton } from './../ElementDocs'

export const OlProperties: PropertiesTableProps = {
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
  ...ElementPropertiesWithoutSkeleton,
}
