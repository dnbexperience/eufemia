import { PropertiesTableProps } from '../../../../shared/types'
import { CardProperties } from '../../../../components/card/CardDocs'
const { stack, outset, ...inheritedCardProps } = CardProperties

export const FormCardProperties: PropertiesTableProps = {
  stack: {
    ...stack,
    doc: 'True to stack the sub components with space between. Same as `stack` in [Card](/uilib/components/card/properties). But defaults to `true`',
  },
}

export const InheritedCardProperties: PropertiesTableProps = {
  ...inheritedCardProps,
}
