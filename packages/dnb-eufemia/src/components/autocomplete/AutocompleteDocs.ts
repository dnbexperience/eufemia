import { PropertiesTableProps } from '../../shared/types'

export const AutocompleteProperties = {
  mode: {
    doc: 'If set to `async`, it prevents showing the "no options" message during typing / filtering. Defaults to `sync`.',
    type: 'string',
    status: 'optional',
  },
  inputValue: {
    doc: 'Lets you define a custom input value. Setting it to an empty string `""` will reset the input value.',
    type: 'string',
    status: 'optional',
  },
  placeholder: {
    doc: 'Use this to define the pre-filled placeholder text in the input. Defaults to `title="Skriv og velg"`.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'Give a title to let the user know what they have to do. Defaults to `Skriv og få alternativer`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  disableFilter: {
    doc: 'If set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  disableHighlighting: {
    doc: 'If set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  disableReorder: {
    doc: 'If set to `true`, reordering of search results will be disabled. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  searchNumbers: {
    doc: 'If set to `true` and `searchInWordIndex` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  searchInWordIndex: {
    doc: 'This gives you the possibility to change the threshold number, which defines from what word on we search "inside words". Defaults to `3`.',
    type: 'boolean',
    status: 'optional',
  },
  keepValue: {
    doc: 'Use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  keepSelection: {
    doc: 'Use `true` to not remove selected item on input blur, when the input value is empty. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  keepValueAndSelection: {
    doc: 'Like `keepValue` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  preventSelection: {
    doc: 'If set to `true`, no permanent selection will be made. Also, the typed value will not disappear on input blur (like `keepValue`). Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  showClearButton: {
    doc: 'If set to `true`, a clear button is shown inside the input field. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  icon: {
    doc: 'To be included in the autocomplete input.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  iconSize: {
    doc: 'Change the size of the icon pragmatically.',
    type: 'string',
    status: 'optional',
  },
  iconPosition: {
    doc: 'Position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.',
    type: 'string',
    status: 'optional',
  },
  inputIcon: {
    doc: 'Same as `icon`.',
    type: ['string', 'React.ReactNode'],
    status: 'optional',
  },
  trianglePosition: {
    doc: 'Position of icon arrow / triangle the drawer. Set to `left` or `right`. Defaults to `left`.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'Define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.',
    type: 'string',
    status: 'optional',
  },
  drawerClass: {
    doc: 'Define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  showSubmitButton: {
    doc: 'Use `true` to show a Autocomplete button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  alignAutocomplete: {
    doc: 'Use `right` to change the options alignment direction. Defaults to `left`.',
    type: 'string',
    status: 'optional',
  },
  noOptions: {
    doc: 'Text show in the "no options" item. If set to `false`, the list will not be rendered when there are no options available. Defaults to `Ingen alternativer`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  ariaLiveOptions: {
    doc: 'Text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  showAll: {
    doc: 'Text that lets a user unravel all the available options. Defaults to `Vis alt`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  indicatorLabel: {
    doc: 'Text show on indicator "options" item. Defaults to `Henter data ...`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  showOptionsSr: {
    doc: 'Only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer`.',
    type: 'string',
    status: 'optional',
  },
  selectedSr: {
    doc: 'Only for screen readers (VoiceOver). The label used to announce the selected item. Defaults to `Valgt:`.',
    type: 'string',
    status: 'optional',
  },
  selectall: {
    doc: 'If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.',
    type: 'boolean',
    status: 'optional',
  },
  submitButtonTitle: {
    doc: 'Title on submit button. Defaults to `Vis alternativer`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  submitButtonIcon: {
    doc: 'The icon used in the submit button. Defaults to `chevron_down`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  submitElement: {
    doc: 'Replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from &#39;@dnb/eufemia/components/input/Input&#39;`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  opened: {
    doc: 'If set to `true`, the Autocomplete will be rendered initially with a visible and accessible data list / options.',
    type: 'boolean',
    status: 'optional',
  },
  openOnFocus: {
    doc: 'Use `true` to auto open the list once the user is entering the input field with the keyboard.',
    type: 'boolean',
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the autocomplete will be 100% in available `width`.',
    type: 'boolean',
    status: 'optional',
  },
  skipPortal: {
    doc: 'Set to `true` to disable the React Portal behavior. Defaults to `false`.',
    type: 'string',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
    status: 'optional',
  },
  statusState: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: ['error', 'info'],
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'object',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'object',
    status: 'optional',
  },
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelDirection: {
    doc: 'Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  inputRef: {
    doc: 'Use a React.Ref to get access to the `input` DOM element.',
    type: 'React.RefObject',
    status: 'optional',
  },
  inputElement: {
    doc: 'Lets you provide a custom React element as the input HTML element.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  '[DrawerList](/uilib/components/fragments/drawer-list/properties)': {
    doc: 'all DrawerList properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
} satisfies PropertiesTableProps

export const AutocompleteEvents = {
  onType: {
    doc: 'Will be called for every key change the users makes. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data)',
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: 'Will be called on user generated focus action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).',
    type: 'function',
    status: 'optional',
  },
  onBlur: {
    doc: 'Will be called on user generated blur action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).',
    type: 'function',
    status: 'optional',
  },
  onChange: {
    doc: 'Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).',
    type: 'function',
    status: 'optional',
  },
  onSelect: {
    doc: 'Will be called once the users focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, activeItem }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data). The "activeItem" property is the currently selected item by keyboard navigation',
    type: 'function',
    status: 'optional',
  },
  onShow: {
    doc: 'Will be called once the user presses the autocomplete. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
  onHide: {
    doc: 'Will be called once the user presses the autocomplete again, or clicks somewhere else. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
} satisfies PropertiesTableProps
