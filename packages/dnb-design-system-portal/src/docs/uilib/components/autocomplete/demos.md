---
showTabs: true
---

import {
AutocompleteDefaultExample,
AutocompleteNumbersExample,
AutocompleteWithCustomTitle,
AutocompleteDynamicallyUpdatedData,
AutocompleteFirstFocusUpdate,
AutocompleteToggleExample,
AutocompletePredefinedInput,
AutocompleteDifferentSizes,
AutocompleteCustomWidth,
AutocompleteSuffix,
AutocompleteOpened,
AutocompleteDisabledExample,
} from 'Docs/uilib/components/autocomplete/Examples'

## Demos

### Default autocomplete

<AutocompleteDefaultExample />

### Autocomplete with numbers

<AutocompleteNumbersExample />

### Autocomplete with a custom title

- `keep_value` means the input value gets not removed after an input blur happens.
- `show_clear_button` means a clear button will show up when the input field contains a value.

<AutocompleteWithCustomTitle />

### Async usage, dynamically update data during typing

This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout.<br /><br />Also, you may consider using `disable_filter` if you have a backend doing the search operation.

<AutocompleteDynamicallyUpdatedData />

### Update data dynamically on the first focus

<AutocompleteFirstFocusUpdate />

### With a Button to toggle the open / close state

**NB:** Just to show the possibility; the data is given as a function.

<AutocompleteToggleExample />

### With a predefined input/search value

<AutocompletePredefinedInput />

### Different sizes

Four sizes are available: `small`, `default`, `medium` and `large`.

<AutocompleteDifferentSizes />

### Data suffix value

Data is provided as such:

```js
const { locale } = React.useContext(Context)
const data = [
  {
    suffix_value: (
      <NumberFormat currency srLabel="Total:" locale={locale}>
        {12345678}
      </NumberFormat>
    ),
    selected_value: `Brukskonto (${ban})`,
    content: ['Brukskonto', ban],
  },
]
```

<AutocompleteSuffix />

### Custom width

<AutocompleteCustomWidth />

<AutocompleteOpened />

<AutocompleteDisabledExample />
