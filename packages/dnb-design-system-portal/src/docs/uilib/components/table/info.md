---
showTabs: true
---

# Tables

The following table has a default style. But in future, there will be several extensions and styles to choose from.

## Accessibility

Tables do both serve as a way of navigation for screen readers and other assertive technologies. But they also help to give data an ordered structure.

Use the documentation from [MDN – The Table element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) for more information on making semantic correct tables, including `scope`, `align`, `colSpan` and `rowSpan`.

Here is a list of things you may follow along in order to ensure your coded tables still are accessible:

- Keep a semantic correct structure.
- Let tables align the column width, when possible.
- Do not use CSS `display` property on any table element.
- Do not overwrite styles in general, but rather get in touch with DNB UX.
- Never put a table inside a table.
- Text inside tables do not need to be wrapped inside a paragraph as well. They give screen readers no additional useful information.

## Table header components

- `<Th.SortButton />` to be used for additional sorting functionality.
- `<Th.HelpButton />` to be used for help related content.

## Alignment

Use e.g. `align="right"` on a `<Th>`, `<Td>` or `<Tr>` to align a table header or a table data element.

## Fixed layout

You may consider using `table-layout: fixed;`. You can use the modifier property `fixed` for doing so and combine it with CSS e.g. `width: 40%` on specific table headers.

## Scrollable

Depending on your situation, you may want to wrap your Table within `Table.ScrollView`:

```jsx
import { Table } from '@dnb/eufemia'

render(
  <Table.ScrollView>
    <Table />
  </Table.ScrollView>
)
```

## Sticky header

You have two options (both have their downsides):

1. use `sticky={true}`. It works even when using a `Table.ScrollView` or a `overflow: hidden;` is used on any parent elements. And it works inside a [Drawer](/uilib/components/drawer) as well. The downside is, that it uses JavaScript and the browser may drop some frames, which results in a potential flickering during scrolling.

2. use `sticky="css-position"` for using the CSS `position: sticky;` method. It is super smooth. But then you can not use a `overflow: hidden;` or `overflow: auto;` on any parent elements. This is a know issue happening on every modern browser.

Method no. 2 should be used when a `max-height` is set to the wrapping `Table.ScrollView` e.g.:

```jsx
<Table.ScrollView style={{ maxHeight: '20rem' }}>
  <Table sticky="css-position" />
</Table.ScrollView>
```

Have a [look at this example](/uilib/components/table/demos/#table-with-a-max-height).

## Sortable table

Optionally, make use of the following React Hook to handle the `Th.SortButton` directions.

It can be used as a "controller" for your own sorting logic of your data.

By default, it will cycle trough three stages `['asc', 'desc', 'off']`.

<details>
  <summary class="dnb-p">
    Show how to use the useHandleSortState React Hook.
  </summary>

```jsx
import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'

// You can also provide a default that will be used as the fallback e.g.
const defaultOptions = { direction: 'asc', modes: ['asc', 'desc', 'off'] }

export const YourComponent = () => {
  const { sortState, sortHandler, activeSortName } = useHandleSortState(
    {
      // Defiend your column names with options (optional)
      column1: { active: true }, //
      column2: { direction: 'desc', modes: ['asc', 'desc'] }, // overwrite the defaultOptions
      column3: { modes: ['asc', 'off'] }, // will only allow one direciton
      column4: {}, // etc.
    },
    defaultOptions
  )

  // Use these properties for your custom sorting logic
  console.log(sortState.column1.direction) // returns either "asc", "desc" or "off"
  console.log(activeSortName) // returns the current active one: "column1" (returns null when nothing is active)

  // Handle your logic
  useEffect(() => {
    switch (sortState.column1.direction) {
      default:
      case 'asc':
        setYourLocalState(mockData.sort(compareFunctionAsc))
        break

      case 'desc':
        setYourLocalState(mockData.sort(compareFunctionsDesc))
        break

      case 'off':
        setYourLocalState(mockData)
        break
    }
  }, [sortState.column1.direction])

  return (
    <Table>
      <thead>
        <Tr>
          <Th
            sortable
            active={sortState.column1.active}
            reversed={sortState.column1.reversed}
          >
            <Th.SortButton
              text="Column 1"
              title="Sort this column"
              on_click={sortHandler.column1}
            />
          </Th>
        </Tr>
      </thead>
    </Table>
  )
}
```

</details>
