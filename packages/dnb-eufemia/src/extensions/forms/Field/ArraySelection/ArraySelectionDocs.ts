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
  data: {
    doc: 'Data to be used for the component. The object needs to have a `value` and a `title` property. Provide the Dropdown or Autocomplete data in the format documented here: [Dropdown](/uilib/components/dropdown) and [Autocomplete](/uilib/components/autocomplete) documentation.',
    type: 'array',
    status: 'optional',
  },
  dataPath: {
    doc: 'The path to the context data (Form.Handler). The context data object needs to have a `value` and a `title` property. The generated options will be placed above given JSX based children.',
    type: 'string',
    status: 'optional',
  },
}
