---
version: 11.0.2
generatedAt: 2026-04-28T04:47:20.666Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

## Dynamically change data

You can manipulate the used data dynamically, either by changing the `data` property or during user events like `onType` or `onFocus`. The following properties and methods are there to use:

### Methods

- `updateData` replace all data entries.
- `emptyData` remove all data entries.
- `resetSelectedItem` will invalidate the selected key.
- `revalidateSelectedItem` will re-validate the internal selected key on the given `value`.
- `revalidateInputValue` will re-validate the current input value and update it – based on the given `value`.
- `setInputValue` update the input value.
- `clearInputValue` will set the current input value to an empty string.
- `focusInput` will set focus on the input element.
- `showIndicator` shows a progress indicator instead of the icon (inside the input).
- `hideIndicator` hides the progress indicator inside the input.
- `showIndicatorItem` shows an item with a [ProgressIndicator](/uilib/components/progress-indicator) status as an data option item.
- `showNoOptionsItem` shows the "no entries found" status as an data option item.
- `setVisible` shows the [DrawerList](/uilib/components/fragments/drawer-list).
- `setHidden` hides the [DrawerList](/uilib/components/fragments/drawer-list).
- `showAllItems` shows all [DrawerList](/uilib/components/fragments/drawer-list) items.
- `setMode` switch the mode during runtime.
- `debounce` a debounce method with a cancel invocation method on repeating calls. There is [more documentation](/uilib/helpers/functions/#debounce) about this method.

### Properties

- `dataList` contains all the data entries.

### Example

```jsx
<Autocomplete
  onFocus={({ updateData, showIndicator }) => {
    showIndicator()
    setTimeout(() => {
      updateData(topMovies)
    }, 1e3)
  }}
  onType={({ value /* updateData, ... */ }) => {
    console.log('onType', value)
  }}
/>
```

## Properties

You may check out the [DrawerList Properties](#drawerlist-properties) down below as well as the [Data structure examples](#the-data-property).

```json
{
  "props": {
    "mode": {
      "doc": "If set to `async`, it prevents showing the \"no options\" message during typing / filtering. Defaults to `sync`.",
      "type": ["\"sync\"", "\"async\""],
      "status": "optional"
    },
    "inputValue": {
      "doc": "Lets you define a custom input value. Setting it to an empty string `\"\"` will reset the input value.",
      "type": "string",
      "status": "optional"
    },
    "placeholder": {
      "doc": "Use this to define the pre-filled placeholder text in the input. Defaults to `title=\"Skriv og velg\"`.",
      "type": "string",
      "status": "optional"
    },
    "title": {
      "doc": "Give a title to let the user know what they have to do. Defaults to `Skriv og få alternativer`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "disableFilter": {
      "doc": "If set to `true`, word highlighting will still be active, but no options will be filtered out. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "disableHighlighting": {
      "doc": "If set to `true`, word highlighting will be disabled, but the options will still get filtered. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "disableReorder": {
      "doc": "If set to `true`, reordering of search results will be disabled. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "searchNumbers": {
      "doc": "If set to `true` and `searchInWordIndex` is not set, the user will be able to more easily search and filter e.g. bank account numbers. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "searchInWordIndex": {
      "doc": "This gives you the possibility to change the threshold number, which defines from what word on we search \"inside words\". Defaults to `3`.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "searchMatch": {
      "doc": "Defines how search matching is performed. Use `starts-with` to only match items that begin with the first typed word. Defaults to `word`.",
      "type": ["\"word\"", "\"starts-with\""],
      "status": "optional"
    },
    "keepValue": {
      "doc": "Use `true` to not remove the typed value on input blur, if it is invalid. By default, the typed value will disappear / replaced by a selected value from the data list during the input field blur. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "keepSelection": {
      "doc": "Use `true` to not remove selected item on input blur, when the input value is empty. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "keepValueAndSelection": {
      "doc": "Like `keepValue` – but would not reset to the selected value during input field blur. Also, the selected value would still be kept. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "preventSelection": {
      "doc": "If set to `true`, no permanent selection will be made. Also, the typed value will not disappear on input blur (like `keepValue`). Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "showClearButton": {
      "doc": "If set to `true`, a clear button is shown inside the input field. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "icon": {
      "doc": "To be included in the autocomplete input.",
      "type": ["string", "React.ReactNode"],
      "status": "optional"
    },
    "iconSize": {
      "doc": "Change the size of the icon pragmatically.",
      "type": "string",
      "status": "optional"
    },
    "iconPosition": {
      "doc": "Position of the icon inside the autocomplete. Set to `left` or `right`. Defaults to `left`.",
      "type": ["\"left\"", "\"right\""],
      "status": "optional"
    },
    "arrowPosition": {
      "doc": "Position of arrow on the popup drawer. Set to `left` or `right`. Defaults to `left`.",
      "type": ["\"left\"", "\"right\""],
      "status": "optional"
    },
    "size": {
      "doc": "Define the height of the Autocomplete. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.",
      "type": ["\"small\"", "\"default\"", "\"medium\"", "\"large\""],
      "status": "optional"
    },
    "drawerClass": {
      "doc": "Define a custom class for the internal drawer-list. This makes it possible more easily customize the drawer-list style with styled-components and the `css` style method. Defaults to `null`.",
      "type": "string",
      "status": "optional"
    },
    "showSubmitButton": {
      "doc": "Use `true` to show a Autocomplete button to toggle the [DrawerList](/uilib/components/fragments/drawer-list). Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "align": {
      "doc": "Use `right` to change the options alignment direction. Defaults to `left`.",
      "type": ["\"left\"", "\"right\""],
      "status": "optional"
    },
    "noOptions": {
      "doc": "Text show in the \"no options\" item. If set to `false`, the list will not be rendered when there are no options available. Defaults to `Ingen alternativer`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "ariaLiveOptions": {
      "doc": "Text read out by screen readers. This way users with screen readers know how many options they got during typing. Defaults to `%s alternativer`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "showAll": {
      "doc": "Text that lets a user unravel all the available options. Defaults to `Vis alt`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "indicatorLabel": {
      "doc": "Text shown on indicator \"options\" item. Defaults to `Henter data ...`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "showOptionsSr": {
      "doc": "Only for screen readers. Title of the button to show the suggestions / options. It is always present and when activating, it opens the DrawerList and sets the focus on it. Defaults to `Bla gjennom alternativer`.",
      "type": "string",
      "status": "optional"
    },
    "selectedSr": {
      "doc": "Only for screen readers (VoiceOver). The label used to announce the selected item. Defaults to `Valgt:`.",
      "type": "string",
      "status": "optional"
    },
    "selectAll": {
      "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
      "type": "boolean",
      "status": "optional"
    },
    "submitButtonTitle": {
      "doc": "Title on submit button. Defaults to `Vis alternativer`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "submitButtonIcon": {
      "doc": "The icon used in the submit button. Defaults to `chevron_down`.",
      "type": ["string", "React.Element"],
      "status": "optional"
    },
    "submitElement": {
      "doc": "Replace the dropdown / submit button with a custom React element. Defaults to the input SubmitButton `import { SubmitButton } from '@dnb/eufemia/components/input/Input'`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "open": {
      "doc": "If set to `true`, the Autocomplete will be rendered initially with a visible and accessible data list / options.",
      "type": "boolean",
      "status": "optional"
    },
    "openOnFocus": {
      "doc": "Use `true` to auto open the list once the user is entering the input field with the keyboard.",
      "type": "boolean",
      "status": "optional"
    },
    "stretch": {
      "doc": "If set to `true`, then the autocomplete will be 100% in available `width`.",
      "type": "boolean",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "Set to `true` to disable the React Portal behavior. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "status": {
      "doc": "Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.",
      "type": ["\"error\"", "\"information\"", "boolean"],
      "status": "optional"
    },
    "statusState": {
      "doc": "Defines the state of the status. Currently, there are two statuses `[error, information]`. Defaults to `error`.",
      "type": ["\"error\"", "\"information\""],
      "status": "optional"
    },
    "statusProps": {
      "doc": "Use an object to define additional FormStatus properties.",
      "type": "object",
      "status": "optional"
    },
    "globalStatus": {
      "doc": "The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).",
      "type": "object",
      "status": "optional"
    },
    "label": {
      "doc": "Prepends the Form Label component. If no ID is provided, a random ID is created.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use `labelDirection=\"horizontal\"` to change the label layout direction. Defaults to `vertical`.",
      "type": ["\"horizontal\"", "\"vertical\""],
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text describing the content of the Autocomplete more than the label. You can also send in a React component, so it gets wrapped inside the Autocomplete component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "inputRef": {
      "doc": "Use a `React.Ref` to get access to the `input` DOM element.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "inputElement": {
      "doc": "Lets you provide a custom React element as the input HTML element.",
      "type": ["string", "React.Element"],
      "status": "optional"
    },
    "[DrawerList](/uilib/components/fragments/drawer-list/properties)": {
      "doc": "All DrawerList properties.",
      "type": "Various",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## DrawerList Properties

```json
{
  "props": {
    "[data](#the-data-property)": {
      "doc": "The data we want to fill the list with. [Details on the type of {DATA} can be found below](#the-data-property). The data can be provided as an array or object. Or as a function that returns the data (called when user opens the list).",
      "type": ["{DATA}", "() => {DATA}"],
      "status": "required"
    },
    "groups": {
      "doc": "An array of group titles for the list items. Only the first group can be `undefined`.",
      "type": "Array<React.ReactNode>",
      "status": "optional"
    },
    "value": {
      "doc": "Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` property (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to `null`.",
      "type": "number",
      "status": "optional"
    },
    "arrowPosition": {
      "doc": "Position of the arrow on the popup drawer. Set to `left` or `right`. Defaults to `left` if not set.",
      "type": "string",
      "status": "optional"
    },
    "direction": {
      "doc": "Defines the direction of how the drawer-list shows the options list. Can be `bottom` or `top`. Defaults to `auto`.",
      "type": ["\"auto\"", "\"top\"", "\"bottom\""],
      "status": "optional"
    },
    "labelDirection": {
      "doc": "Use `labelDirection=\"horizontal\"` to change the label layout direction. Defaults to `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "preventSelection": {
      "doc": "If set to `true`, the DrawerList will then not make any permanent selection.",
      "type": "boolean",
      "status": "optional"
    },
    "focusable": {
      "doc": "If set to `true`, the element is then focusable by assertive technologies.",
      "type": "boolean",
      "status": "optional"
    },
    "preventClose": {
      "doc": "If set to `true`, the DrawerList will not close on any events.",
      "type": "boolean",
      "status": "optional"
    },
    "keepOpen": {
      "doc": "If set to `true`, the DrawerList will close on outside clicks, but not on selection.",
      "type": "boolean",
      "status": "optional"
    },
    "independentWidth": {
      "doc": "If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.",
      "type": "boolean",
      "status": "optional"
    },
    "fixedPosition": {
      "doc": "If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.",
      "type": "boolean",
      "status": "optional"
    },
    "enableBodyLock": {
      "doc": "If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.",
      "type": "boolean",
      "status": "optional"
    },
    "skipKeysearch": {
      "doc": "If set to `true`, search items by the first key will be ignored.",
      "type": "boolean",
      "status": "optional"
    },
    "ignoreEvents": {
      "doc": "If set to `true`, all keyboard and mouse events will be ignored.",
      "type": "boolean",
      "status": "optional"
    },
    "alignDrawer": {
      "doc": "Use 'right' to change the options alignment direction. Makes only sense to use in combination with `preventSelection` - or if an independent width is used.",
      "type": "string",
      "status": "optional"
    },
    "listClass": {
      "doc": "Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.",
      "type": "string",
      "status": "optional"
    },
    "portalClass": {
      "doc": "Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.",
      "type": "string",
      "status": "optional"
    },
    "scrollable": {
      "doc": "Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).",
      "type": "boolean",
      "status": "optional"
    },
    "noScrollAnimation": {
      "doc": "To disable scrolling animation.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "To disable appear/disappear (show/hide) animation.",
      "type": "boolean",
      "status": "optional"
    },
    "skipPortal": {
      "doc": "To disable the React Portal behavior.",
      "type": "boolean",
      "status": "optional"
    },
    "minHeight": {
      "doc": "Defines the minimum height (in `rem`) of the options list.",
      "type": "string",
      "status": "optional"
    },
    "maxHeight": {
      "doc": "Defines the maximum height (in `rem`) of the options list.",
      "type": "string",
      "status": "optional"
    },
    "pageOffset": {
      "doc": "Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).",
      "type": "string",
      "status": "optional"
    },
    "observerElement": {
      "doc": "Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.",
      "type": "string",
      "status": "optional"
    },
    "cacheHash": {
      "doc": "Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.",
      "type": "string",
      "status": "optional"
    },
    "wrapperElement": {
      "doc": "Has to be an HTML Element, or a selector for one, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapperElement` will not trigger an outside click.",
      "type": ["string", "HTMLElement"],
      "status": "optional"
    },
    "optionsRender": {
      "doc": "Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsRender). This can be used to add additional options above the actual rendered list.",
      "type": "function",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## The `data` property

The `data` can be structured in two main ways:

- As an array
- As an object.

An array is preferred as it gives you the most options.

### `data` as an array

```ts
// an array can contain complex items and offers the most control
const data = [
  {
    content: "Item 1",
  },
  {
    content: <span>Item 2</span>
  },
  {
    content: ["Item 3", "Line 2", <span>Line 3</span>]
  },
  {
    content: ['Main account', '1234 12 12345'],
    selectedValue: 'Main account (605,22 kr)',
    suffixValue: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffixValue: '0,00 kr',
  },
]

// If you only use the `content` property, you can use it directly in the array.
// This list is identical to the one above:
const data = [
  "Item 1",
  <span>Item 2</span>,
  ["Item 3", "Line 2", <span>Line 3</span>],
  {
    content: ['Main account', '1234 12 12345'],
    selectedValue: 'Main account (605,22 kr)',
    suffixValue: '605,22 kr',
  },
  {
    content: ['Old account', <i>Closed</i>],
    disabled: true,
    suffixValue: '0,00 kr',
  },
]

const onChange = ({ data, value }) => {
  console.log(data) // returns the item as it appears in the array
  console.log(value) // returns the index of the item
}
```

Each object in the array have the following properties:

```json
{
  "props": {
    "content": {
      "doc": "Visual content in the list item.",
      "type": [
        "string",
        "React.ReactNode",
        "Array<(string | React.ReactNode)>"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Disables the list item from selection.",
      "type": "boolean",
      "status": "optional"
    },
    "groupIndex": {
      "doc": "What group index in the `groups` property this item belongs to.",
      "type": "number",
      "status": "optional"
    },
    "selectedKey": {
      "doc": "If set, can be used instead of array index by the `value` prop.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "selectedValue": {
      "doc": "Replaces the standard value output for selected item. Only used in some implementations (Dropdown, Autocomplete).",
      "type": ["string", "React.ReactNode"],
      "status": "optional"
    },
    "suffixValue": {
      "doc": "Content placed to the right in the list item.",
      "type": ["string", "React.ReactNode"],
      "status": "optional"
    }
  }
}
```

### `data` as an object

A simpler alternative, but with less options

```ts
// Each entry can contain the same type of value as the array's `content` property
const data = {
  first: "Item 1",,
  second: <span>Item 2</span>,
  last: ["Item 3", "Line 2", <span>Line 3</span>],
}

const onChange = ({ data, value }) => {
  console.log(data)
  // returns a generated object representing the item:
  // {
  //   selectedKey: 'first',
  //   value: 'first',
  //   content: 'Item 1',
  //   type: 'object'
  // }

  console.log(value) // returns the key ("first", "second", or "last"), instead of an index

}

```

### `data` types overview

The following is an overview of all the types that the `data` property accepts. (These are not actual names of actual types in the library.)

```ts
// The visual content that is shown in one DrawerList item.
// An array can be used to define multiple lines.
type CONTENT = string | React.ReactNode | (string | React.ReactNode)[]

// An array item
type ARRAY_OBJECT = {
  content: CONTENT
  disabled?: boolean
  selectedKey?: string | number
  selectedValue?: string | React.ReactNode
  suffixValue?: string | React.ReactNode
  style?: React.CSSProperties
}

// `data` as an array. A list of "ARRAY_OBJECT" types is preferred,
// but the "CONTENT" type can be useful for simple lists.
type ARRAY = (CONTENT | ARRAY_OBJECT)[]

// `data` as an object. Can only contain the "CONTENT" type.
// Each `key` behaves like the "ARRAY_OBJECT"'s `selectedKey`.
type RECORD = Record<string, CONTENT>

// An object or array that represents the entire DrawerList list.
type DATA = ARRAY | RECORD

// The final type of the `data` property:
let data: DATA | () => DATA
```

#### JSON string

There is technically support for sending in a JSON string of the data to the `data` property. But this is an old functionality that we do not really support anymore.

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Autocomplete.ariaLiveOptions": {
      "nb-NO": "%s alternativer",
      "en-GB": "%s options",
      "sv-SE": "%s alternativ",
      "da-DK": "%s muligheder"
    },
    "Autocomplete.indicatorLabel": {
      "nb-NO": "Henter data ...",
      "en-GB": "Getting data ...",
      "sv-SE": "Hämtar data ...",
      "da-DK": "Henter data ..."
    },
    "Autocomplete.noOptions": {
      "nb-NO": "Ingen alternativer",
      "en-GB": "No options",
      "sv-SE": "Inga alternativ",
      "da-DK": "Ingen muligheder"
    },
    "Autocomplete.selectedSr": {
      "nb-NO": "Valgt:",
      "en-GB": "Selected:",
      "sv-SE": "Vald:",
      "da-DK": "Valgt:"
    },
    "Autocomplete.showAll": {
      "nb-NO": "Vis alt",
      "en-GB": "Show everything",
      "sv-SE": "Visa allt",
      "da-DK": "Vis alt"
    },
    "Autocomplete.showOptionsSr": {
      "nb-NO": "Bla gjennom alternativer, lukk med esc knappen",
      "en-GB": "Browse options, close with esc button",
      "sv-SE": "Bläddra genom alternativ, stäng med esc-knappen",
      "da-DK": "Gennemse muligheder, luk med esc-knappen"
    },
    "Autocomplete.submitButtonTitle": {
      "nb-NO": "Vis alternativer",
      "en-GB": "Show options",
      "sv-SE": "Visa alternativ",
      "da-DK": "Vis muligheder"
    },
    "Autocomplete.title": {
      "nb-NO": "Skriv og velg",
      "en-GB": "Type and select",
      "sv-SE": "Skriv och välj",
      "da-DK": "Skriv og vælg"
    },
    "DrawerList.defaultGroupSR": {
      "nb-NO": "Standardvalg",
      "en-GB": "Default options",
      "sv-SE": "Standardval",
      "da-DK": "Standardvalg"
    },
    "DrawerList.missingGroup": {
      "nb-NO": "Gruppe",
      "en-GB": "Group",
      "sv-SE": "Grupp",
      "da-DK": "Gruppe"
    },
    "DrawerList.noGroupSR": {
      "nb-NO": "Andre valg",
      "en-GB": "Other options",
      "sv-SE": "Andra val",
      "da-DK": "Andre valg"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onType": {
      "doc": "Will be called for every key change the users makes. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
      "type": "function",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called on user generated focus action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
      "type": "function",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called on user generated blur action. Returns an object with the input `value` inside `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
      "type": "function",
      "status": "optional"
    },
    "onChange": {
      "doc": "Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
      "type": "function",
      "status": "optional"
    },
    "onSelect": {
      "doc": "Will be called once the users focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, activeItem, selectedItem }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data). The \"activeItem\" property is the currently selected item by keyboard navigation.",
      "type": "function",
      "status": "optional"
    },
    "onOpen": {
      "doc": "Will be called once the user presses the autocomplete. Returns the data item `{ data, attributes }`.",
      "type": "function",
      "status": "optional"
    },
    "onClose": {
      "doc": "Will be called once the user presses the autocomplete again, or clicks somewhere else. Returns the data item `{ data, attributes }`.",
      "type": "function",
      "status": "optional"
    },
    "onClear": {
      "doc": "Will be called on a clear button click. Returns `{ value, previousValue, event }`.",
      "type": "function",
      "status": "optional"
    },
    "onSubmit": {
      "doc": "Will be called when the user presses Enter in the input field without selecting an item from the list. Useful for triggering custom actions like navigating to a search results page. Returns `{ value, event, attributes }` including [these methods](/uilib/components/autocomplete/events#dynamically-change-data).",
      "type": "function",
      "status": "optional"
    },
    "onItemMouseEnter": {
      "doc": "Will be called when the mouse enters a dropdown item. Useful for pre-fetching data on hover. Returns `{ item, data, event }` where `item` is the item index and `data` is the item data.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

### The `onChange` vs `onSelect` difference

The difference between `onChange` and `onSelect` is:

- `onChange` will be called when the state changes, either with a **click** or **space/enter** keypress confirmation.
- `onSelect` differs most when the user is navigating by keyboard. Once the user is pressing e.g. the arrow keys, the selection is changing, but not the state.

### The `onSubmit` event

The `onSubmit` event is called when the user presses **Enter** in the input field without having selected or navigated to an item in the list. This is useful for implementing custom behaviors such as:

- Navigating to a dedicated search results page
- Triggering an advanced search action

```tsx
<Autocomplete
  data={myData}
  onSubmit={({ value }) => {
    navigateTo(`/search?q=${value}`)
  }}
/>
```

### The `onItemMouseEnter` event

The `onItemMouseEnter` event is called when the user hovers over a dropdown item. This is useful for pre-fetching data or triggering actions before the user commits to a selection.

```tsx
<Autocomplete
  data={myData}
  onItemMouseEnter={({ item, data, event }) => {
    prefetchData(data)
  }}
/>
```

## Dynamically change data

You can manipulate the used data dynamically, either by changing the `data` property or during user events like `onType` or `onFocus`. The following properties and methods are there to use:

### Methods

- `updateData` replace all data entries.
- `emptyData` remove all data entries.
- `resetSelectedItem` will invalidate the selected key.
- `revalidateSelectedItem` will re-validate the internal selected key on the given `value`.
- `revalidateInputValue` will re-validate the current input value and update it – based on the given `value`.
- `setInputValue` update the input value.
- `clearInputValue` will set the current input value to an empty string.
- `focusInput` will set focus on the input element.
- `showIndicator` shows a progress indicator instead of the icon (inside the input).
- `hideIndicator` hides the progress indicator inside the input.
- `showIndicatorItem` shows an item with a [ProgressIndicator](/uilib/components/progress-indicator) status as an data option item.
- `showNoOptionsItem` shows the "no entries found" status as an data option item.
- `setVisible` shows the [DrawerList](/uilib/components/fragments/drawer-list).
- `setHidden` hides the [DrawerList](/uilib/components/fragments/drawer-list).
- `showAllItems` shows all [DrawerList](/uilib/components/fragments/drawer-list) items.
- `setMode` switch the mode during runtime.
- `debounce` a debounce method with a cancel invocation method on repeating calls. There is [more documentation](/uilib/helpers/functions/#debounce) about this method.

### Properties

- `dataList` contains all the data entries.

### Example

```jsx
<Autocomplete
  onFocus={({ updateData, showIndicator }) => {
    showIndicator()
    setTimeout(() => {
      updateData(topMovies)
    }, 1e3)
  }}
  onType={({ value /* updateData, ... */ }) => {
    console.log('onType', value)
  }}
/>
```
