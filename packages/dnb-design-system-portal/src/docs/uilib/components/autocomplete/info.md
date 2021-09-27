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

1. The two first words will match the beginning of a word
1. The third word will match inside a word (can be changed with `search_in_word_index`)
1. Case insensitive

#### Using Components inside content

It is **not** possible to wrap them inside of React Components. The reason is because the Autocomplete component needs to know the data is wants to search, before your React Component has rendered. But also, the component can't update the HTML in order to make the bold highlighting – "after" your component has rendered.

That means, you can't run a component that will render as soon as it is displayed.

If you need to format numbers, then do it before you send in the data content.

It is possible to wrap your content inside one HTML Element. Nested elements are **not** supported.

In order to wrap your content only visually, you can provide your wrappers inside an array:

```jsx
{
  content: [
    <IconPrimary icon="bell" />,
    <span className="custom-selector-a">The Shawshank Redemption</span>,
    <span className="custom-selector-b">The Dark Knight</span>,
    // etc.
    <NumberFormat value={1234} />, // <-- Not searchable nor highlightable
  ]
}
```

or you can provide it inside a fragment:

```jsx
{
  content: <>
    <IconPrimary icon="bell" />
    <span className="custom-selector-a">The Shawshank Redemption</span>
    <span className="custom-selector-b">The Dark Knight</span>
  </>
}
```

and if you need to decouple the searchable content form whats displayed, then you can put your searchable content inside `search_content`:

```jsx
{
  content: ['your visual content'],
  search_content: ['your search content'],
}
```

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
