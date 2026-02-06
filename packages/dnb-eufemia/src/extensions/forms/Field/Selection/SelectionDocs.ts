import { PropertiesTableProps } from '../../../../shared/types'

export const SelectionProperties: PropertiesTableProps = {
  variant: {
    doc: 'Choice of UI feature. Can be: `dropdown`, `autocomplete`, `button`, `radio`.',
    type: 'string',
    status: 'optional',
  },
  value: {
    doc: 'Defines the `value`. When using variant `radio` or `button`, value has to be a `string`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  transformSelection: {
    doc: 'Transform the displayed selection for Dropdown and Autocomplete variant. Use it to display a different value than the one in the data set. The first parameter is the properties of the Option component or data item. You can return a React.ReactNode that will be displayed in the selection.',
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
  groups: {
    doc: 'An array of group titles for the list items. Only the first group can be `undefined`',
    type: 'React.ReactNode[]',
    status: 'optional',
  },
  dataPath: {
    doc: 'The path to the context data (Form.Handler). The context data object needs to have a `value` and a `title` property. The generated options will be placed above given JSX based children. When `children` is a function, the generated options are instead provided as `options` to the function.',
    type: 'string',
    status: 'optional',
  },
  autocompleteProps: {
    doc: 'Forward any additional properties (camelCase) to the [Autocomplete](/uilib/components/autocomplete/) component. `onType` will additionally provide the `value` parameter with `emptyValue` support in addition to the internal `dataContext`.',
    type: 'object',
    status: 'optional',
  },
  dropdownProps: {
    doc: 'Forward any additional properties (camelCase) to the [Dropdown](/uilib/components/dropdown/) component.',
    type: 'object',
    status: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is small (1.5rem), default (2rem), medium (2.5rem) and large (3rem) are supported component sizes. Defaults to default / null. Also, if you define a number like size="2" then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).',
    type: 'string',
    status: 'optional',
  },
  children: {
    doc: 'For providing [Field.Option](/uilib/extensions/forms/base-fields/Option/) components and other children. Can also be a render function that receives `{ value, options }`, where `options` are from `data` or `dataPath` and may include additional custom properties.',
    type: ['React.ReactNode', 'function'],
    status: 'optional',
  },
}
