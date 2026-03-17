import type { PropertiesTableProps } from '../../shared/types'

export const SkipContentProperties: PropertiesTableProps = {
  selector: {
    doc: 'Define an existing HTML element selector to focus when the inner button got pressed.',
    type: 'string',
    status: 'required',
  },
  text: {
    doc: 'Define a clear message describing the choices the users has.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  children: {
    doc: 'Define a clear message describing the choices the users has.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  focusDelay: {
    doc: 'Defines the delay after the enter key has been pressed.',
    type: 'number',
    status: 'optional',
  },
}
