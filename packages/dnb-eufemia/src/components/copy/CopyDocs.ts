import type { PropertiesTableProps } from '../../shared/types'

export const CopyProperties: PropertiesTableProps = {
  showCursor: {
    doc: 'Define if the copy cursor should be visible.  Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If `false`, the copy functionality will be omitted.  Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
}
