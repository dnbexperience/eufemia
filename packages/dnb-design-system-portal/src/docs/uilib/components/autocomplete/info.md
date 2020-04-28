---
showTabs: true
---

import AutocompleteMethods from 'Pages/uilib/components/autocomplete/methods'

## Description

The Autocomplete component is a combination of an [Input](/uilib/components/input) and a [Dropdown](/uilib/components/dropdown), also called **ComboBox**. During typing, matching data items gets suggested in an option menu (listbox).

### When to use it:

Use it for both small autocomplete purposes and large (async) data set search. The component supports two ways of showing [ProgressIndicator](/uilib/components/progress-indicator).

You may check out the [Dropdown](/uilib/components/dropdown/info) component for more details on how to use it etc. They both share the same [DrawerList](/uilib/components/fragments/drawer-list).

### Highlighting

Words found during typing are highlighted. The rules are:

1. The two first words will match the beginning of an option
1. The third word will match inside an option (can be changed with `search_in_word_index`)
1. Case insensitive

### Screen reader support

To enhance screen-reader usage, this component uses `aria-live` to announce the amount of options found.

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
