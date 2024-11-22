import { CardProperties } from '../../../../components/card/CardDocs'
import { PropertiesTableProps } from '../../../../shared/types'

export const FormCardProperties: PropertiesTableProps = {
  outset: {
    ...CardProperties.outset,
    doc: 'Same as `outset` in [Card](/uilib/components/card/properties). Defaults to `true`.',
  },
  stack: {
    ...CardProperties.stack,
    doc: 'Same as `stack` in [Card](/uilib/components/card/properties). Defaults to `true`.',
  },
  '[Card](/uilib/components/card/properties)': {
    doc: 'Card properties.',
    type: 'Various',
    status: 'optional',
  },
}
