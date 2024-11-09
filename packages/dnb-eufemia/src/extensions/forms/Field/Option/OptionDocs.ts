import { PropertiesTableProps } from '../../../../shared/types'
import { FieldProperties } from '../FieldDocs'

export const OptionProperties: PropertiesTableProps = {
  value: {
    doc: 'Value for this option.',
    type: ['string', 'number'],
    status: 'optional',
  },
  title: {
    doc: 'Text title for the option.',
    type: 'string',
    status: 'optional',
  },
  text: {
    doc: 'Secondary text.',
    type: 'string',
    status: 'optional',
  },
  help: FieldProperties.help,
  children: {
    doc: 'Optional way to provide `title`.',
    type: 'React.Node',
    status: 'optional',
  },
}
