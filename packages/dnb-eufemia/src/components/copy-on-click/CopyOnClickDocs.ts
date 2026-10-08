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

export const CopyOnClickButtonProperties: PropertiesTableProps = {
  copyContent: {
    doc: 'The text to copy.',
    type: 'string',
    status: 'required',
  },
  title: {
    doc: 'Describes what the button copies, such as "Copy account number". Also used as the `aria-label`. Defaults to the translation `CopyOnClick.buttonTitle`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  tooltipContent: {
    doc: 'The message shown in the tooltip when the content is copied. Defaults to the translation `CopyOnClick.clipboardCopy`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  icon: {
    doc: 'Icon displayed on the button.',
    type: 'IconIcon',
    defaultValue: '`copy`',
    status: 'optional',
  },
  variant: {
    doc: 'Button variant.',
    type: ['"primary"', '"secondary"', '"tertiary"'],
    defaultValue: '"tertiary"',
    status: 'optional',
  },
  '[Button](/uilib/components/button/properties)': {
    doc: 'All button properties, except `tooltip`.',
    type: 'Various',
    status: 'optional',
  },
}
