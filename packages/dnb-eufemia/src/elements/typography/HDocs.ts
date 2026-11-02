import type { PropertiesTableProps } from '../../shared/types'
import { ElementProperties } from '../ElementDocs'

export const HProperties: PropertiesTableProps = {
  size: {
    doc: 'Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Use `auto` to use the size of the heading level. `H` defaults to `xx-large`, and `H1` to `H6` default to `auto`.',
    type: [
      '"auto"',
      '"xx-large"',
      '"x-large"',
      '"large"',
      '"medium"',
      '"basis"',
      '"small"',
      '"x-small"',
    ],
    status: 'optional',
  },
  level: {
    doc: 'Set to `use` to let the automated [Heading](/uilib/components/heading) levels continue from the level of this element. For example, `<H3 level="use" />` makes the next `Heading` use level 3.',
    type: '"use"',
    status: 'optional',
  },
  proseMaxWidth: {
    doc: 'Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.',
    type: ['number', 'boolean'],
    status: 'optional',
  },
  element: {
    doc: 'Defines the HTML element of `H`, like `h2`. `H1` to `H6` always use their own heading element. Defaults to `h1`.',
    type: 'string',
    status: 'optional',
  },
  ...ElementProperties,
}
