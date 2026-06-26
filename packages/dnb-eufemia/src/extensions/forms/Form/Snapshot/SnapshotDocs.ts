import type { PropertiesTableProps } from '../../../../shared/types'

export const SnapshotProperties: PropertiesTableProps = {
  name: {
    doc: 'A unique name for the sliced snapshot area.',
    type: 'string',
    status: 'required',
  },
}

export const SnapshotEvents: PropertiesTableProps = {}
