import { PropertiesTableProps } from '../../shared/types'

export const TypographyProperties: PropertiesTableProps = {
  element: {
    doc: 'Defines the Element Type, like `p`.',
    type: ['HTMLElement', 'string'],
    status: 'optional',
  },
  medium: {
    doc: 'Tells the component to use the medium font-weight styling `dnb-p--medium`. More details [here](/uilib/typography/font-weight).',
    type: 'boolean',
    status: 'optional',
  },
  bold: {
    doc: 'Tells the component to use the bold font-weight styling class `dnb-p--bold`. More details [here](/uilib/typography/font-weight).',
    type: 'boolean',
    status: 'optional',
  },
  size: {
    doc: 'Sets the font size based on the following sizes:  `x-small`, `small`, `basis`, `medium`, `large`, `x-large` or `xx-large`.',
    type: 'string',
    status: 'optional',
  },
  modifier: {
    doc: 'String containing a combination of modifiers, used to set both font-size and weight in one property. e.g. `x-small bold` would make the paragraph extra small and bold.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
