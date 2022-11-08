---
showTabs: true
---

import {
TableVariantBasic,
TableClassHelpers,
TableLongHeader,
TableSticky,
} from 'Docs/uilib/components/table/Examples'

## Demos

### Default variant

<TableVariantBasic />

### Table with sticky header

**NB:** Keep in mind, you have to avoid using `overflow: hidden;` on any child elements to get `position: sticky;` to work. This is a know issue happening on every modern browser. There are various tricks, including [this deallocation / sync solution](https://uxdesign.cc/position-stuck-96c9f55d9526).

**Optionally:** Depending on your Table markup, you may include this helper in your table syntax:

```jsx
<tbody>
  <!-- place it at the beginning of your table body -->
  <Table.StickyHelper />

  <tr>...</tr>
</tbody>
```

<TableSticky />

### Table with long header text (wrapping)

Also, the table header is set to **small** font-size.

<TableLongHeader />

### Example usage of class helpers

<TableClassHelpers />
