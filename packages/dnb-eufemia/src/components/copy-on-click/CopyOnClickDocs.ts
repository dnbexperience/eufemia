import type { PropertiesTableProps } from '../../shared/types'

export const CopyOnClickProperties: PropertiesTableProps = {
  showCursor: {
    doc: 'Define if the copy cursor should be visible. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  disabled: {
    doc: 'If `true`, the copy functionality and copy cursor will be omitted. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  copyContent: {
    doc: 'Contents to copy. Used when the copied value should differ from the visually shown value(`children`).',
    type: 'React.ReactNode',
    status: 'optional',
  },
  tooltipContent: {
    doc: 'The message shown in the tooltip when the content is copied. Defaults to the translation `CopyOnClick.clipboardCopy`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.ReactNode',
    status: 'required',
  },
}
