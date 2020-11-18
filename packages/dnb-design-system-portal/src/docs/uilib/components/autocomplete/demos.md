---
showTabs: true
---

import {
AutocompleteDefaultExample,
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

### Autocomplete with a custom title

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
