import { PropertiesTableProps } from '../../shared/types'

export const multiInputMaskedEvents: PropertiesTableProps = {
  onChange: {
    doc: "runs when an input value changes. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: "runs when an input gains focus. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
    type: 'function',
    status: 'optional',
  },
  onBlur: {
    doc: "runs when an input lose focus. Has an object parameter with keys matching the id's defined in `inputs`, and values of string. E.g: `{month: string, year: string}`.",
    type: 'function',
    status: 'optional',
  },
}
