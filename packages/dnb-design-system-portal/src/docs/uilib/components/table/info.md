---
showTabs: true
---

# Tables

The following table has a default style. But in future, there will be several extensions and styles to choose from.

## Accessibility

Tables do both serve as a way of navigation for screen readers and other assertive technologies. But they also help to give data an ordered structure.

Use the documentation from [MDN – The Table element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) for more information on making semantic correct tables, including `scope`, `align`, `colSpan` and `rowSpan`.

## Table header components

- `<Th.SortButton />` to be used for additional sorting functionality.
- `<Th.HelpButton />` to be used for help related content.

## Alignment

Use e.g. `align="right"` on a `<Th>`, `<Td>` or `<Tr>` to align a table header or a table data element.

## Fixed layout

You may consider using `table-layout: fixed;`. You can use the modifier property `fixed` for doing so and combine it with CSS e.g. `width: 40%` on spesific table headers.
