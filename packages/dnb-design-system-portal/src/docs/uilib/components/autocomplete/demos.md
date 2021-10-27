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
AutocompleteOpened
} from 'Pages/uilib/components/autocomplete/Examples'

## Demos

### Default autocomplete

<AutocompleteDefaultExample />

### Autocomplete with numbers

<AutocompleteNumbersExample />

### Autocomplete with a custom title

- `keep_value` means the input value gets not removed after a input blur happens.
- `show_clear_button` means a clear button will show up when the input field contains a value.

<AutocompleteWithCustomTitle />

### Async usage, dynamically update data during typing

This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout.<br /><br />Also, you may consider of using `disable_filter` if you have a backend doing the search operation.

<AutocompleteDynamicallyUpdatedData />

### Update data dynamically on first focus

<AutocompleteFirstFocusUpdate />

### With a Button to toggle the open / close state

**NB:** Just to show the possibility; the data is given as a function.

<AutocompleteToggleExample />

### With a predefined input/search value

<AutocompletePredefinedInput />

### Different sizes

Four sizes are available: `small`, `default`, `medium` and `large`.

<AutocompleteDifferentSizes />

### Custom width

<AutocompleteCustomWidth />

<AutocompleteOpened />
