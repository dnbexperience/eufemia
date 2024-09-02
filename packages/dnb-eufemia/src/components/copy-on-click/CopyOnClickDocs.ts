import type { PropertiesTableProps } from '../../shared/types'

export const CopyOnClickProperties: PropertiesTableProps = {
  showCursor: {
    doc: 'Define if the copy cursor should be visible.  Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If `false`, the copy functionality and copy cursor will be omitted.  Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  copyContent: {
    doc: 'Contents to copy. Used when the copied value should differ from the visually shown value(`children`).',
    type: 'React.Node',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
}
