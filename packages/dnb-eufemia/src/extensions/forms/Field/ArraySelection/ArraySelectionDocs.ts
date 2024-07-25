import { PropertiesTableProps } from '../../../../shared/types'

export const arraySelectionProperties: PropertiesTableProps = {
  variant: {
    doc: 'Choice of UI feature.',
    type: [`'checkbox'`, `'button'`, `'checkbox-button'`],
    defaultValue: `'checkbox'`,
    status: 'optional',
  },
  optionsLayout: {
    doc: 'Layout for the list of options.',
    type: [`'horizontal'`, `'vertical'`],
    defaultValue: `'vertical'`,
    status: 'optional',
  },
  children: {
    doc: 'For providing `<Field.Option>` components.',
    type: 'React.Node',
    status: 'optional',
  },
}
