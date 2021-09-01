---
showTabs: true
---

import AutocompleteMethods from 'Pages/uilib/components/autocomplete/methods'

## Description

The Autocomplete component is a combination of an [Input](/uilib/components/input) and a [Dropdown](/uilib/components/dropdown), also called **ComboBox**. During typing, matching data items gets suggested in an option menu (listbox).

## Type Ahead and ComboBox

The Autocomplete component may also be known as _Type Ahead_ or _ComboBox_. But autocomplete describes the purpose more pricey and descriptive, therefore Eufemia is using this term.

### When to use it:

Use it for both small autocomplete purposes and large (async) data set search. The component supports two ways of showing [ProgressIndicator](/uilib/components/progress-indicator).

You may check out the [Dropdown](/uilib/components/dropdown/info) component for more details on how to use it etc. They both share the same [DrawerList](/uilib/components/fragments/drawer-list).

### Highlighting

Words found during typing are highlighted. The rules are:

1. The two first words will match the beginning of an option
1. The third word will match inside an option (can be changed with `search_in_word_index`)
1. Case insensitive

### Numbers

Numbers are often different than a word filter. You can use `search_numbers={true}` to enable a number specialized filtering. See example in the demos.

Now the user could search for e.g. bank account numbers by just entering `201`, even if you format it like `2000 12 34567` (e.g. use format(20001234567, { ban: true }) from /components/number-format/NumberUtils)

### Screen reader support

To enhance screen-reader usage, this component uses `aria-live` to announce the amount of options found (`aria_live_options`).

## Custom size

```css
.dnb-autocomplete {
  --autocomplete-width: 20rem; /* custom width */
}
```

You can also set the width directly, but then it has to be defined like so (including `min-width`):

```css
/** Because of the included label/status etc. we target the "__shell" */
.dnb-autocomplete__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-autocomplete .dnb-drawer-list__root {
  width: 10rem;
}
```

<AutocompleteMethods></AutocompleteMethods>
