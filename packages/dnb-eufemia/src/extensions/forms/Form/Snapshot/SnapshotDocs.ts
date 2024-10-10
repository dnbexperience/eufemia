import { PropertiesTableProps } from '../../../../shared/types'

export const SnapshotProperties: PropertiesTableProps = {
  name: {
    doc: 'A unique name for the sliced snapshot area.',
    type: 'string',
    status: 'optional',
  },
}

export const SnapshotEvents: PropertiesTableProps = {}
