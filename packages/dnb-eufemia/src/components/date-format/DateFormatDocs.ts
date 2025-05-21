import { PropertiesTableProps } from '../../shared/types'

export const DateFormatProperties: PropertiesTableProps = {
  date: {
    doc: 'A date or a string formatted date',
    type: ['Date', 'string'],
    status: 'required',
  },
}
