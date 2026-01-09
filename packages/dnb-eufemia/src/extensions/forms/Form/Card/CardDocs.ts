import type { PropertiesTableProps } from '../../../../shared/types'
import { CardProperties } from '../../../../components/card/CardDocs'
const { stack, outset, ...inheritedCardProps } = CardProperties

export const FormCardProperties: PropertiesTableProps = {
  outset: {
    ...outset,
    doc: 'Whether or not to break out (using negative margins) on larger screens. Same as `outset` in [Card](/uilib/components/card/properties). But defaults to `true`',
  },
  stack: {
    ...stack,
    doc: 'True to stack the sub components with space between. The `spacing` will default to `medium`. Same as `stack` in [Card](/uilib/components/card/properties). But defaults to `true`',
  },
}

export const InheritedCardProperties: PropertiesTableProps = {
  ...inheritedCardProps,
}
