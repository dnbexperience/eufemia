import { PropertiesTableProps } from '../../../../shared/types'

export const FormCardProperties: PropertiesTableProps = {
  outset: {
    doc: 'Whether or not to break out (using negative margins) on larger screens. Same as `outset` in [Card](/uilib/components/card/properties). But defaults to `true`',
    type: 'boolean',
    status: 'optional',
  },
  stack: {
    doc: 'True to stack the sub components with lines between. The `spacing` will default to `medium`. Same as `stack` in [Card](/uilib/components/card/properties). But defaults to `true`',
    type: 'boolean',
    status: 'optional',
  },
  '[Card](/uilib/components/card/properties)': {
    doc: 'Card properties.',
    type: 'Various',
    status: 'optional',
  },
}
