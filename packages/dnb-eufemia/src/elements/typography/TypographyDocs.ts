import { PropertiesTableProps } from '../../shared/types'

export const TypographyProperties: PropertiesTableProps = {
  element: {
    doc: 'Defines the Element Type, like `p`.',
    type: ['HTMLElement', 'string'],
    status: 'optional',
  },
  size: {
    doc: 'Sets the font size, also sets the line-height if `line` prop is not set.',
    type: [
      `'x-small'`,
      `'small'`,
      `'basis'`,
      `'medium'`,
      `'large'`,
      `'x-large'`,
      `'xx-large'`,
    ],
    status: 'optional',
  },
  line: {
    doc: 'Sets the line height, will use same value as `size` if not set.',
    type: [
      `'x-small'`,
      `'small'`,
      `'basis'`,
      `'medium'`,
      `'large'`,
      `'x-large'`,
      `'xx-large'`,
    ],
    status: 'optional',
  },
  align: {
    doc: 'Sets the text alignment.',
    type: [`'center'`, `'left'`, `'right'`],
    status: 'optional',
  },
  family: {
    doc: 'Sets the font family.',
    type: [`'basis'`, `'heading'`, `'monospace'`],
    status: 'optional',
  },
  weight: {
    doc: 'Sets the font weight.',
    type: [`'regular'`, `'medium'`],
    status: 'optional',
  },
  decoration: {
    doc: 'Sets the font decoration.',
    type: [`'italic'`, `'underline'`],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
