import {
  PropertiesTableProps,
  transformPropertiesToCamelCase,
} from '../../../../shared/PropertiesTable'
import { AutocompleteProperties as OriginalAutocompleteProperties } from '../../../../components/autocomplete/AutocompleteDocs'

export const AutocompleteProperties: PropertiesTableProps = {
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
  ...transformPropertiesToCamelCase(OriginalAutocompleteProperties, [
    'mode',
    'disableFilter',
    'keepValue',
    'showSubmitButton',
    'submitButtonTitle',
  ]),
}

export const AutocompleteEvents: PropertiesTableProps = {
  onType: {
    doc: 'Callback function triggered when the user types in the input field. The first parameter is the value of the input field, the second parameter is an object with the following properties: `showIndicator`, `hideIndicator`, `updateData`, `debounce`.',
    type: 'function',
    status: 'optional',
  },
}
