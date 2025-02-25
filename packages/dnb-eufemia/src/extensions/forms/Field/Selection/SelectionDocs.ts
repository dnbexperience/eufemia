import { PropertiesTableProps } from '../../../../shared/types'

export const SelectionProperties: PropertiesTableProps = {
  variant: {
    doc: 'Choice of UI feature. Can be: `dropdown`, `autocomplete`, `radio` or `button`.',
    type: 'string',
    status: 'optional',
  },
  value: {
    doc: 'Defines the `value`. When using variant `radio` or `button`, value has to be a `string`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  transformSelection: {
    doc: 'Transform the displayed selection for Dropdown and Autocomplete variant. Use it to display a different value than the one in the data set. The first parameter is the props of the Option component or data item. You can return a React.Node that will be displayed in the selection.',
    type: 'function',
    status: 'optional',
  },
  optionsLayout: {
    doc: 'Layout for the list of options. Can be `horizontal` or `vertical`.',
    type: 'string',
    status: 'optional',
  },
  width: {
    doc: '`small`, `medium` or `large` for predefined standard widths, `stretch` for fill available width.',
    type: ['string', 'false'],
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
  autocompleteProps: {
    doc: 'Forward any additional props (camelCase) to the [Autocomplete](/uilib/components/autocomplete/) component.',
    type: 'object',
    status: 'optional',
  },
  dropdownProps: {
    doc: 'Forward any additional props (camelCase) to the [Dropdown](/uilib/components/dropdown/) component.',
    type: 'object',
    status: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'For providing Option components, and other children.',
    type: 'React.Node',
    status: 'optional',
  },
}
