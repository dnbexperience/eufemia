import type { PropertiesTableProps } from '../../shared/types'
import { spacingProperties } from './StatDocsUtils'

export const ColorizeBySignProperties: PropertiesTableProps = {
  value: {
    doc: 'The numeric value used to determine the color tone. Positive values are green, negative values are red, zero is gray, and negative zero (`-0`) is treated as negative.',
    type: ['number'],
    status: 'required',
  },
  children: {
    doc: 'Content to render inside the colorized wrapper.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  element: {
    doc: 'The HTML element to render.',
    type: ['string'],
    defaultValue: '"span"',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
