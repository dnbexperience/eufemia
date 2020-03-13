---
showTabs: true
---

import AutocompleteMethods from 'Pages/uilib/components/autocomplete/methods'

## Description

The Autocomplete component is a combination of an [Input](/uilib/components/input) and a [Dropdown](/uilib/components/dropdown). During typing, matching data items gets suggested in an option menu.

### When to use it:

You may check out the [Dropdown](/uilib/components/dropdown/info) component for more details on how to use it etc.

## Custom size

```css
.dnb-autocomplete {
  --autocomplete-width: 20rem; /* custom width */
}
```

You can also set the width directly, but then it has to be defined like so (including `min-width`):

```css
.dnb-autocomplete__shell {
  width: 20rem; /* custom width */
}
.dnb-autocomplete__list {
  min-width: 20rem; /* custom width */
}
```

<AutocompleteMethods></AutocompleteMethods>
