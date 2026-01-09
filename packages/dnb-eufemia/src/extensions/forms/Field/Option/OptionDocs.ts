import type { PropertiesTableProps } from '../../../../shared/types'
import { FieldProperties } from '../FieldDocs'

export const OptionProperties: PropertiesTableProps = {
  value: {
    doc: 'Value for this option.',
    type: ['string', 'number'],
    status: 'optional',
  },
  title: {
    doc: 'Title for the option. Overrides `children`.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  groupIndex: {
    doc: `What group index in the \`groups\` prop ([Field.Selection](/uilib/extensions/forms/base-fields/Selection/)) this item belongs to.`,
    type: 'number',
    status: 'optional',
  },
  text: {
    doc: 'Secondary text.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  disabled: {
    doc: 'Will disable the option.',
    type: 'boolean',
    status: 'optional',
  },
  help: FieldProperties.help,
  children: {
    doc: 'Optional way to provide `title`. Will be ignored if `title` is used.',
    type: 'React.ReactNode',
    status: 'optional',
  },
}
