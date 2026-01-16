---
title: 'Table'
description: 'Enhanced HTML Table element.'
metadata: https://eufemia.dnb.no/uilib/components/table/metadata.json
---

## Import

```tsx
import { Table } from '@dnb/eufemia'
```

## Description

The Table component is an all-inclusive and accessible table based on correct HTML semantics.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1499)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/table)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/table)

Please use the properties instead of overwriting the styles. If you miss a feature, get in [touch with us](/contribute/contact/).

**NB:** If you have more than three (3) columns, please consider using the `border` property to enhance accessibility.

### Accessibility

Tables both serve as a way of navigation for screen readers and other assistive technologies, and help to give data an ordered structure.

Use the documentation from [MDN – The Table element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) for more information on making semantic correct tables, including `scope`, `align`, `colSpan` and `rowSpan`.

Here is a list of things you may follow along in order to ensure your coded tables still are accessible:

- Keep a semantic correct structure.
- Let tables align the column width, when possible.
- Do not use CSS `display` property on any table element.
- Do not overwrite styles in general, but rather get in touch with DNB UX.
- Never put a table inside a table.
- Text inside tables do not need to be wrapped inside a paragraph as well. They give screen readers no additional useful information.

### Table header components

- `<Th.SortButton />` to be used for additional sorting functionality.
- `<Th.HelpButton />` to be used for help related content.

### Alignment

Use e.g. `align="right"` on a `<Th>`, `<Td>` or `<Tr>` to align a table header or a table data element.

### Fixed layout

You may consider using `table-layout: fixed;`. You can use the modifier property `fixed` for doing so and combine it with CSS e.g. `width: 40%` on specific table headers.

### Scrollable

Depending on your situation, you may want to wrap your Table within `Table.ScrollView`:

```jsx
import { Table } from '@dnb/eufemia'

render(
  <Table.ScrollView>
    <Table />
  </Table.ScrollView>,
)
```

### Sticky header

You have two options (both have their downsides):

1. use `sticky={true}`. It works even when using a `Table.ScrollView` or when `overflow: hidden;` is used on any parent elements. It also works inside a [Drawer](/uilib/components/drawer). The downside is that it uses JavaScript and the browser may drop some frames, which results in potential flickering during scrolling.

2. use `sticky="css-position"` for using the CSS `position: sticky;` method. It is super smooth. But then you cannot use a `overflow: hidden;` or `overflow: auto;` on any parent elements. This is a known issue happening on every modern browser.

Method no. 2 should be used when a `max-height` is set to the wrapping `Table.ScrollView` e.g.:

```jsx
<Table.ScrollView style={{ maxHeight: '20rem' }}>
  <Table sticky="css-position" />
</Table.ScrollView>
```

Have a [look at this example](/uilib/components/table/demos/#table-with-a-max-height).

### Sortable table

Optionally, make use of the following React Hook to handle the `Th.SortButton` directions.

It can be used as a "controller" for your own sorting logic of your data.

By default, it will cycle through three stages `['asc', 'desc', 'off']`.

<Details>
  <Summary>How to use the useHandleSortState React Hook.</Summary>

```jsx
import useHandleSortState from '@dnb/eufemia/components/table/useHandleSortState'

// You can also provide a default that will be used as the fallback e.g.
const defaultOptions = { direction: 'asc', modes: ['asc', 'desc', 'off'] }

export const YourComponent = () => {
  const { sortState, sortHandler, activeSortName } = useHandleSortState(
    {
      // Define your column names with options (optional)
      column1: { active: true }, //
      column2: { direction: 'desc', modes: ['asc', 'desc'] }, // overwrite the defaultOptions
      column3: { modes: ['asc', 'off'] }, // will only allow one direction
      column4: {}, // etc.
    },
    defaultOptions,
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

</Details>

## Demos

### Basic table

**NB:** In this example, the sort buttons do react on your input. But will not change the table data.

```tsx
const BasicTable = () => {
  const { sortState, sortHandler } = useHandleSortState({
    column1: {
      direction: 'asc',
      active: true,
    },
    column2: {
      direction: 'desc',
      modes: ['asc', 'desc'],
    },
  })

  // Handle your "column1" logic
  React.useEffect(() => {
    switch (sortState.column1.direction) {
      case 'asc':
        break
      case 'desc':
        break
      default:
      case 'off':
        break
    }
  }, [sortState.column1.direction])
  return (
    <Table.ScrollView>
      <Table>
        <caption className="dnb-sr-only">A Table Caption</caption>
        <thead>
          <Tr>
            <Th>Column</Th>
            <Th>
              <Th.Horizontal>
                Help Button
                <Th.HelpButton>Help Content</Th.HelpButton>
              </Th.Horizontal>
            </Th>
            <Th
              sortable
              active={sortState.column1.active}
              reversed={sortState.column1.reversed}
            >
              <Th.SortButton
                text="Sortable Active"
                title="Sort table column"
                on_click={sortHandler.column1}
              />
            </Th>
            <Th
              sortable
              active={sortState.column2.active}
              reversed={sortState.column2.reversed}
              align="right"
            >
              <Th.SortButton
                text="Sortable"
                title="Sort table column"
                on_click={sortHandler.column2}
              />
            </Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td align="right">Row 1</Td>
          </Tr>
          <Tr>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td align="right">Row 2</Td>
          </Tr>
          <Tr>
            <Td>
              <P>Row 3 with paragraph</P>
            </Td>
            <Td>
              Row 3 with <Code>code</Code>
            </Td>
            <Td>
              <P>
                Row 3 with <b>medium paragraph</b>
              </P>
            </Td>
            <Td align="right">
              Row 3 with <b>medium text</b>
            </Td>
          </Tr>
        </tbody>
      </Table>
    </Table.ScrollView>
  )
}
render(<BasicTable />)
```

### Complex table

You can force a row to overwrite the automated odd/even counting by providing e.g. `variant="even"` to a `<Tr />`. You can use this in combination with `rowSpan`.

**NB:** The table header in the first column needs to have `scope="row"`!

```tsx
render(
  <Table.ScrollView>
    <Table border outline>
      <caption>A Table Caption</caption>
      <thead>
        <Tr noWrap>
          <Th />
          <Th>
            Column 2<br />
            newline
          </Th>
          <Th colSpan={2}>Column 3 that spans</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr variant="even">
          <Th scope="rowgroup" rowSpan={2}>
            Row 1+2 Header
          </Th>
          <Td rowSpan={2}>Row 1 that spans</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr variant="even">
          <Td>Row 2</Td>
          <Td>Row 2</Td>
        </Tr>
        <Tr>
          <Th scope="row">
            Row 3 Header <br />
            newline
          </Th>
          <Td>Row 3</Td>
          <Td spacing="horizontal">
            <Button variant="secondary">Button</Button>
          </Td>
          <Td noSpacing align="right">
            <Code>noSpacing + align="right"</Code>
          </Td>
        </Tr>
        <Tr>
          <Th scope="row">Row 4 Header</Th>
          <Td>Row 4</Td>
          <Td colSpan={2}>Row 4</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

### Row scope headers only

This table has only `scope="row"` and `scope="rowgroup"` headers – without the default `scope="col"`.

```tsx
render(
  <Table.ScrollView>
    <Table outline border>
      <caption>A Table Caption</caption>
      <tbody>
        <Tr>
          <Th scope="row">Header A</Th>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Th>Header B</Th>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

### Fixed table

```tsx
const FixedTable = styled(Table)`
  min-width: 70rem;

  /* Define the width of the THs so they are aligned across tables */
  thead {
    th:nth-of-type(1) {
      width: 30%;
    }
    th:nth-of-type(2) {
      width: 20%;
    }
    th:nth-of-type(3) {
      width: 10%;
    }
    th:nth-of-type(4) {
      width: 10%;
    }
    th:nth-of-type(5) {
      width: 5%;
    }
    th:nth-of-type(6) {
      width: 5%;
    }
    th:nth-of-type(7) {
      width: 5%;
    }
    th:nth-of-type(8) {
      width: 5%;
    }
  }
`
render(
  <Table.ScrollView>
    <FixedTable fixed>
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr noWrap>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
          <Th>Column 4</Th>
          <Th>Column 5</Th>
          <Th>Column 6</Th>
          <Th>Column 7</Th>
          <Th align="right">Column 8</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td align="right">Row 1</Td>
        </Tr>
        <Tr>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td align="right">Row 2</Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td align="right">Row 3</Td>
        </Tr>
        <Tr>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td align="right">Row 4</Td>
        </Tr>
      </tbody>
    </FixedTable>
  </Table.ScrollView>,
)
```

### Medium and small sized

```tsx
render(
  <Table.ScrollView>
    <Table size="medium">
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th>Column</Th>
          <Th sortable>
            <Th.SortButton text="Sortable" title="Sort table column" />
          </Th>
          <Th align="right">Column</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td align="right">Row 1</Td>
        </Tr>
        <Tr>
          <Td>
            <P>Row 2 with paragraph</P>
          </Td>
          <Td>
            <P>
              Row 2 with <b>medium paragraph</b>
            </P>
          </Td>
          <Td align="right">
            Row 2 with <b>medium text</b>
          </Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

A `small` sized table is only for special circumstances, where a lot of data needs to be shown on the screen at the same time.

```tsx
render(
  <Table.ScrollView>
    <Table size="small">
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th>Column</Th>
          <Th sortable>
            <Th.SortButton text="Sortable" title="Sort table column" />
          </Th>
          <Th align="right">Column</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td align="right">Row 1</Td>
        </Tr>
        <Tr>
          <Td>
            <P size="small">Row 2 with paragraph</P>
          </Td>
          <Td>
            <P size="small">
              Row 2 with <b>medium paragraph</b>
            </P>
          </Td>
          <Td align="right">
            Row 2 with <b>medium text</b>
          </Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

### Table with accordion

#### Expand a single container

The second table uses both a `border` and an `outline`.

```tsx
const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" label_sr_only />
  }
  const TdInput = () => {
    return <Input label="Label" label_sr_only size={4} />
  }
  const Content = ({ shareId }) => {
    const ref = React.useRef()
    const { copy, CopyTooltip } = useCopyWithNotice()
    const shareHandler = () => {
      const url = new URL(location.href)
      url.hash = '#' + shareId
      copy(url.toString())
    }
    return (
      <>
        <Button top icon="bell" variant="secondary">
          Ring the bell
        </Button>

        <Section top spacing>
          <Dl>
            <Dt>Favorittfarge</Dt>
            <Dd>Grønn</Dd>
            <Dt>Favorittmat</Dt>
            <Dd>Taco</Dd>
          </Dl>
        </Section>

        <Button
          top
          variant="tertiary"
          icon={copyIcon}
          icon_position="left"
          on_click={shareHandler}
          inner_ref={ref}
        >
          Copy link to this row
        </Button>

        <CopyTooltip target={ref.current} />
      </>
    )
  }
  const Row = ({ nr }) => {
    const shareId = id + '-' + nr
    return (
      <Tr id={shareId}>
        <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
        <Td>Row {nr}</Td>
        <Td spacing="horizontal">
          <TdInput />
        </Td>
        <Td align="right">Row {nr}</Td>

        <Td.AccordionContent>
          <Content shareId={shareId} />
        </Td.AccordionContent>
      </Tr>
    )
  }
  return (
    <Table mode="accordion" id={id} {...props}>
      <caption className="dnb-sr-only">A Table Caption</caption>

      <thead>
        <Tr>
          <Th>Column A</Th>
          <Th>Column B</Th>
          <Th>Column C</Th>
          <Th align="right">Column D</Th>
        </Tr>
      </thead>

      <tbody>
        <Row nr="1" />
        <Row nr="2" />
        <Row nr="3" />
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <AccordionTable
        id="accordion-table-1"
        showCheckbox
        accordionChevronPlacement="end"
      />
    </Table.ScrollView>

    <Table.ScrollView top>
      <AccordionTable
        id="accordion-table-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>,
)
```

#### Expand additional rows

It's also possible to use accordion to expand the table with more rows.

```tsx
const firstRowContent = [
  {
    label: 'Expanded 1.1',
  },
  {
    label: 'Expanded 1.2 with a lot of text',
  },
]
render(
  <Table.ScrollView>
    <Table mode="accordion" accordionChevronPlacement="end">
      <thead>
        <Tr>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column A
          </Th>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column B
          </Th>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column C
          </Th>
          <Th
            noWrap
            style={{
              width: '25%',
            }}
          >
            Column D
          </Th>
        </Tr>
      </thead>

      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>

          {firstRowContent.map(({ label }) => (
            <Tr.AccordionContent key={label}>
              <Td>{label}</Td>
              <Td>{label}</Td>
              <Td>{label}</Td>
              <Td>{label}</Td>
            </Tr.AccordionContent>
          ))}
        </Tr>

        <Tr>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>

          <Tr.AccordionContent>
            <Td>Expanded 2.1 with a lot of text</Td>
            <Td>Expanded 2.1</Td>
            <Td>Expanded 2.1</Td>
            <Td>Expanded 2.1</Td>
          </Tr.AccordionContent>

          <Tr.AccordionContent>
            <Td>Expanded 2.2 with a lot of text</Td>
            <Td>Expanded 2.2</Td>
            <Td>Expanded 2.2</Td>
            <Td>Expanded 2.2</Td>
          </Tr.AccordionContent>

          <Tr.AccordionContent>
            <Td>Expanded 2.3 with a lot of text</Td>
            <Td>Expanded 2.3</Td>
            <Td>Expanded 2.3</Td>
            <Td>Expanded 2.3</Td>
          </Tr.AccordionContent>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

##### Collapse all rows at once

You can collapse all expanded rows by sending a ref to the `collapseAllHandleRef` property and calling the `.current()` function on your ref.

```jsx
const myTableCollapseAll = React.useRef<() => void>()

return (
  <button onClick={() => myTableCollapseAll.current()}>
    Close all rows
  </button>

  <Table mode="accordion" collapseAllHandleRef={myTableCollapseAll}>
    {/* ... your table code */}
  </Table>
)
```

### Table with navigation

```tsx
const NavigationTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" label_sr_only />
  }
  const TdInput = () => {
    return <Input label="Label" label_sr_only size={4} />
  }
  const Row = ({ nr }) => {
    const shareId = id + '-' + nr
    return (
      <Tr
        id={shareId}
        onClick={() => {
          console.log('your navigation logic here')
          // window.location.href = 'https://eufemia.dnb.no/'
        }}
      >
        <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
        <Td>Row {nr}</Td>
        <Td spacing="horizontal">
          <TdInput />
        </Td>
        <Td align="right">Row {nr}</Td>
      </Tr>
    )
  }
  return (
    <Table mode="navigation" id={id} {...props}>
      <caption className="dnb-sr-only">A Table Caption</caption>

      <thead>
        <Tr>
          <Th>Column A</Th>
          <Th>Column B</Th>
          <Th>Column C</Th>
          <Th align="right">Column D</Th>
        </Tr>
      </thead>

      <tbody>
        <Row nr="1" />
        <Row nr="2" />
        <Row nr="3" />
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <NavigationTable id="navigation-table-1" showCheckbox />
    </Table.ScrollView>

    <Table.ScrollView top>
      <NavigationTable
        id="navigation-table-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>,
)
```

### Table with sticky header

```tsx
render(
  <Table.ScrollView>
    <Table
      sticky={isVisibleWhenVisualTest ? 'css-position' : true}
      stickyOffset={isFullscreen ? 0 : '3.5rem'}
    >
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th colSpan={2}>Header</Th>
          <Th sortable reversed>
            <Th.SortButton text="Sortable" title="Sort table column" />
          </Th>
          <Th sortable active>
            <Th.SortButton text="Active" title="Sort table column" />
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>
            <P>
              Row 1 <b>with p</b>
            </P>
          </Td>
          <Td>
            <Code>Row 1 with code</Code>
          </Td>
          <Td>
            <span>Row 1 with span</span>
          </Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Td colSpan={2}>Column which spans over two columns</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
        </Tr>
      </tbody>
      <tfoot>
        <Tr>
          <Td colSpan={3}>Footer</Td>
          <Td>Sum</Td>
        </Tr>
      </tfoot>
    </Table>
  </Table.ScrollView>,
)
```

### Table with a max height

A sticky table header with `sticky="css-position"` and `max-height` on the `Table.ScrollView`.

```tsx
render(
  <Table.ScrollView
    style={{
      maxHeight: '18rem',
    }}
  >
    <Table sticky="css-position">
      <thead>
        <Tr>
          <Th>Column 1</Th>
          <Th>Column 2</Th>
          <Th>Column 3</Th>
          <Th>Column 4</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
          <Td>Row 1</Td>
        </Tr>
        <Tr>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
          <Td>Row 2</Td>
        </Tr>
        <Tr>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
          <Td>Row 3</Td>
        </Tr>
        <Tr>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
          <Td>Row 4</Td>
        </Tr>
        <Tr>
          <Td>Row 5</Td>
          <Td>Row 5</Td>
          <Td>Row 5</Td>
          <Td>Row 5</Td>
        </Tr>
        <Tr>
          <Td>Row 6</Td>
          <Td>Row 6</Td>
          <Td>Row 6</Td>
          <Td>Row 6</Td>
        </Tr>
        <Tr>
          <Td>Row 7</Td>
          <Td>Row 7</Td>
          <Td>Row 7</Td>
          <Td>Row 7</Td>
        </Tr>
        <Tr>
          <Td>Row 8</Td>
          <Td>Row 8</Td>
          <Td>Row 8</Td>
          <Td>Row 8</Td>
        </Tr>
        <Tr>
          <Td>Row 9</Td>
          <Td>Row 9</Td>
          <Td>Row 9</Td>
          <Td>Row 9</Td>
        </Tr>
        <Tr>
          <Td>Row 10</Td>
          <Td>Row 10</Td>
          <Td>Row 10</Td>
          <Td>Row 10</Td>
        </Tr>
        <Tr>
          <Td>Row 11</Td>
          <Td>Row 11</Td>
          <Td>Row 11</Td>
          <Td>Row 11</Td>
        </Tr>
        <Tr>
          <Td>Row 12</Td>
          <Td>Row 12</Td>
          <Td>Row 12</Td>
          <Td>Row 12</Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

### Several tables in one container

<Details>
  <Summary>How the import and syntax is structured.</Summary>
  
```tsx
render(
  <TableContainer>
    <TableContainer.Head>
      <H2>Heading</H2>
    </TableContainer.Head>

    <TableContainer.Body>
      <Table>Content</Table>
      <Table>Content</Table>
    </TableContainer.Body>

    <TableContainer.Foot>
      <P>Footer</P>
    </TableContainer.Foot>

</TableContainer>,
)

````

</Details>


```tsx
const StyledContainer = styled(TableContainer)`
  /*
            Define the width of the THs so they are aligned across tables.
            A "fixed" table width is needed in order to align all tables to act with the same column widths.
          */
  &,
  .dnb-table__scroll-view {
    max-width: 70rem;
  }
  .dnb-table__container__body {
    min-width: 800px;
  }
  table {
    th:nth-of-type(1),
    td:nth-of-type(1) {
      width: 30%;
    }
    th:nth-of-type(2) {
      width: 30%;
    }
    th:nth-of-type(3) {
      width: 20%;
    }
    th:nth-of-type(4) {
      width: 20%;
    }
  }
`
render(
  <StyledContainer aria-label="I contain two tables" bottom="large">
    <TableContainer.Head>
      <H2>Header</H2>
      <P top>Text</P>
    </TableContainer.Head>

    <TableContainer.Body>
      <Table
        fixed
        border
        sticky
        stickyOffset={isFullscreen ? 0 : '3.5rem'}
      >
        <caption className="dnb-sr-only">Table One</caption>
        <thead>
          <Tr noWrap>
            <Th>
              I have a superscript{' '}
              <sup>
                <Anchor href="#unique-ref-id">1</Anchor>
              </sup>
            </Th>
            <Th>Column 2</Th>
            <Th>Column 3</Th>
            <Th>Column 4</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
        </tbody>
      </Table>

      <Table
        fixed
        border
        sticky
        stickyOffset={isFullscreen ? 0 : '3.5rem'}
      >
        <caption className="dnb-sr-only">Table Two</caption>
        <thead>
          <Tr noWrap>
            <Th>Column 1</Th>
            <Th>Column 2</Th>
            <Th>Column 3</Th>
            <Th>Column 4</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td rowSpan={2}>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr>
            <Td rowSpan={2}>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
          <Tr>
            <Td>Row 3</Td>
            <Td>Row 3</Td>
            <Td>Row 3</Td>
          </Tr>
        </tbody>
      </Table>

      <Table fixed border>
        <tbody>
          <Tr>
            <Th scope="rowgroup" rowSpan={2}>
              Row Header Group
            </Th>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
        </tbody>
      </Table>
    </TableContainer.Body>

    <TableContainer.Foot>
      <P id="unique-ref-id">Footer</P>
    </TableContainer.Foot>
  </StyledContainer>,
)
````

With no (empty) `head` and `foot` content.

```tsx
render(
  <TableContainer bottom="large">
    <TableContainer.Body>
      <Table border>
        <thead>
          <Tr>
            <Th>Column 1</Th>
            <Th>Column 2</Th>
            <Th>Column 3</Th>
            <Th>Column 4</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
            <Td>Row 1</Td>
          </Tr>
          <Tr>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
            <Td>Row 2</Td>
          </Tr>
        </tbody>
      </Table>
    </TableContainer.Body>
  </TableContainer>,
)
```

### Table with long header text (wrapping)

```tsx
render(
  <Table.ScrollView>
    <Table>
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th colSpan={2}>
            Static long header senectus ornare convallis ut at erat
            imperdiet commodo
          </Th>
          <Th sortable reversed>
            <Th.SortButton
              text="Sortable long header ridiculus laoreet turpis netus at vitae"
              title="Sort table column"
            />
          </Th>
          <Th align="right" sortable active>
            <Th.SortButton
              text="Active and right aligned long header ridiculus laoreet turpis netus at vitae"
              title="Sort table column"
            />
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td colSpan={4}>
            <P>col span of 4</P>
          </Td>
        </Tr>
      </tbody>
    </Table>
  </Table.ScrollView>,
)
```

### Table with pagination

This example is not yet fully supported using the Sbanken theme.

```tsx
const TablePagination = () => {
  const amountPerPage = 5
  const [currentPage, setCurrentPage] = React.useState(1)
  const [data] = React.useState(() => getDataFromAPI(0, 100))
  return (
    <Pagination
      page_count={data.length / amountPerPage}
      current_page={currentPage}
      on_change={({ pageNumber }) => {
        setCurrentPage(pageNumber)
      }}
    >
      <MakeTable
        currentPage={currentPage}
        amountPerPage={amountPerPage}
        data={data}
      />
    </Pagination>
  )
  function getDataFromAPI(offset, max) {
    const list = []
    for (let i = offset + 1, l = offset + max; i <= l; i++) {
      list.push({
        name: 'Row ' + i,
      })
    }
    return list
  }
  function MakeTable({ currentPage, amountPerPage, data }) {
    const offset = currentPage * amountPerPage - amountPerPage
    const tableBody = data
      .slice(offset, offset + amountPerPage)
      .map(({ name }, i) => {
        return (
          <Tr key={i}>
            <Td>{name}</Td>
          </Tr>
        )
      })
    return (
      <Table.ScrollView>
        <Table>
          <thead>
            <Tr>
              <Th>Column</Th>
            </Tr>
          </thead>
          <tbody>{tableBody}</tbody>
        </Table>
      </Table.ScrollView>
    )
  }
}
render(<TablePagination />)
```

### Responsive table in a Card

**NB:** For tables with lots of content, it's best to avoid repeating the header for each row. This can be overwhelming for users who rely on screen readers.

Also, it is important that the `<td>` without a `<th>` has a `aria-label={header.title}` to let users with screen readers know where "these tools" belong to.

This example uses `scope="row"` with a table header (`<th>`) in each row.

```tsx
const Example = () => {
  const { isSmall, isLarge } = useMedia()
  const header = {
    title: 'Tittel',
    description: 'Beskrivelse',
    status: 'Status',
    deadline: 'Frist',
  }
  const content = {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum',
    status: <Badge content="Ikke påbegynt" />,
    deadline: '17.04.2025',
  }
  const align = isLarge ? 'flex-end' : isSmall ? 'center' : 'flex-start'
  const tableRow = (
    <>
      {isLarge ? (
        <Tr>
          <Td>{content.title}</Td>
          <Td>{content.description}</Td>
          <Td>{content.status}</Td>
          <Td>{content.deadline}</Td>
        </Tr>
      ) : (
        <>
          <Tr variant="odd">
            <Th scope="row">{header.title}</Th>
            <Td>{content.title}</Td>
          </Tr>
          <Tr>
            <Th scope="row">{header.description}</Th>
            <Td>{content.description}</Td>
          </Tr>
          <Tr>
            <Th scope="row">{header.status}</Th>
            <Td>{content.status}</Td>
          </Tr>
          <Tr>
            <Th scope="row">{header.deadline}</Th>
            <Td>{content.deadline}</Td>
          </Tr>
        </>
      )}

      <Tr variant="odd">
        <Td colSpan={isLarge ? 4 : 2} aria-label={header.title}>
          <Flex.Horizontal justify={align}>
            <Button
              variant="tertiary"
              icon={stopIcon}
              icon_position="left"
            >
              Avvis signering
            </Button>
            <Button variant="secondary" icon={composeIcon}>
              Start signering
            </Button>
          </Flex.Horizontal>
        </Td>
      </Tr>
    </>
  )
  const MyTable = () => (
    <Table.ScrollView>
      <Table border outline size="medium">
        {isLarge && (
          <thead>
            <Tr noWrap>
              <Th>{header.title}</Th>
              <Th>{header.description}</Th>
              <Th>{header.status}</Th>
              <Th>{header.deadline}</Th>
            </Tr>
          </thead>
        )}

        <tbody>
          {tableRow}
          {tableRow}
        </tbody>
      </Table>
    </Table.ScrollView>
  )
  return (
    <Card title="Card title" responsive={false} innerSpace={0} filled>
      <MyTable />
    </Card>
  )
}
render(<Example />)
```

### Example usage without and with classes

```tsx
render(
  <Table.ScrollView>
    <table className="dnb-table">
      <thead>
        <tr>
          <th>Header</th>
          <th className="dnb-table--sortable dnb-table--reversed">
            <Th.SortButton text="Sortable" />
          </th>
          <th className="dnb-table--sortable dnb-table--active">
            <Th.SortButton text="Active" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1</td>
          <td>Row 1</td>
          <td>Row 1</td>
        </tr>
        <tr>
          <td>Row 2</td>
          <td>Row 2</td>
          <td>Row 2</td>
        </tr>
        <tr>
          <td>Row 3</td>
          <td>Row 3</td>
          <td>Row 3</td>
        </tr>
      </tbody>
    </table>
  </Table.ScrollView>,
)
```

```tsx
render(
  <Table.ScrollView>
    <table className="dnb-table">
      <thead>
        <tr className="dnb-table__tr">
          <th className="dnb-table__th">.dnb-table__th</th>
          <th className="dnb-table__th dnb-table--sortable dnb-table--reversed">
            <Th.SortButton
              text="dnb-table--reversed"
              title="dnb-table__th dnb-table--sortable dnb-table--reversed"
            />
          </th>
          <th className="dnb-table__th dnb-table--sortable dnb-table--active">
            <Th.SortButton
              text="dnb-table--active"
              title="dnb-table__th dnb-table--sortable dnb-table--active"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="dnb-table__tr dnb-table__tr--even">
          <td colSpan={3} className="dnb-table__td">
            .dnb-table__tr--even{' > '}.dnb-table__td
          </td>
        </tr>
        <tr className="dnb-table__tr dnb-table__tr--odd">
          <td colSpan={3} className="dnb-table__td">
            .dnb-table__tr--odd{' > '}.dnb-table__td
          </td>
        </tr>
      </tbody>
    </table>
  </Table.ScrollView>,
)
```

```tsx
render(<ContentVariants />)
```

```tsx
const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" label_sr_only />
  }
  const TdInput = () => {
    return <Input label="Label" label_sr_only size={4} />
  }
  const Content = ({ shareId }) => {
    const ref = React.useRef()
    const { copy, CopyTooltip } = useCopyWithNotice()
    const shareHandler = () => {
      const url = new URL(location.href)
      url.hash = '#' + shareId
      copy(url.toString())
    }
    return (
      <>
        <Button top icon="bell" variant="secondary">
          Ring the bell
        </Button>

        <Section top spacing>
          <Dl>
            <Dt>Favorittfarge</Dt>
            <Dd>Grønn</Dd>
            <Dt>Favorittmat</Dt>
            <Dd>Taco</Dd>
          </Dl>
        </Section>

        <Button
          top
          variant="tertiary"
          icon={copyIcon}
          icon_position="left"
          on_click={shareHandler}
          inner_ref={ref}
        >
          Copy link to this row
        </Button>

        <CopyTooltip target={ref.current} />
      </>
    )
  }
  return (
    <Table mode="accordion" id={id} {...props}>
      <caption className="dnb-sr-only">A Table Caption</caption>

      <thead>
        <Tr>
          <Th>Column A</Th>
          <Th>Column B</Th>
          <Th>Column C</Th>
          <Th align="right">Column D</Th>
        </Tr>
      </thead>

      <tbody>
        <Tr id={id + '-' + 1}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 1}</Td>
          <Td>Row {1}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {1}</Td>

          <Td.AccordionContent>
            <Content shareId={id + '-' + 1} />
          </Td.AccordionContent>
        </Tr>
        <Tr id={id + '-' + 2}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 2}</Td>
          <Td>Row {2}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {2}</Td>
        </Tr>
        <Tr id={id + '-' + 3}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 3}</Td>
          <Td>Row {3}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {3}</Td>

          <Td.AccordionContent>
            <Content shareId={id + '-' + 3} />
          </Td.AccordionContent>
        </Tr>
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <AccordionTable
        id="accordion-table-mixed-1"
        showCheckbox
        accordionChevronPlacement="end"
      />
    </Table.ScrollView>

    <Table.ScrollView top>
      <AccordionTable
        id="accordion-table-mixed-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>,
)
```

```tsx
const NavigationTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" label_sr_only />
  }
  const TdInput = () => {
    return <Input label="Label" label_sr_only size={4} />
  }
  return (
    <Table mode="navigation" id={id} {...props}>
      <caption className="dnb-sr-only">A Table Caption</caption>

      <thead>
        <Tr>
          <Th>Column A</Th>
          <Th>Column B</Th>
          <Th>Column C</Th>
          <Th align="right">Column D</Th>
        </Tr>
      </thead>

      <tbody>
        <Tr
          id={id + '-' + 1}
          onClick={() => {
            console.log('your navigation logic here')
            // window.location.href = 'https://eufemia.dnb.no/'
          }}
        >
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 1}</Td>
          <Td>Row {1}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {1}</Td>
        </Tr>
        <Tr id={id + '-' + 2}>
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 2}</Td>
          <Td>Row {2}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {2}</Td>
        </Tr>
        <Tr
          id={id + '-' + 3}
          onClick={() => {
            console.log('your navigation logic here')
            // window.location.href = 'https://eufemia.dnb.no/'
          }}
        >
          <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + 3}</Td>
          <Td>Row {3}</Td>
          <Td spacing="horizontal">
            <TdInput />
          </Td>
          <Td align="right">Row {3}</Td>
        </Tr>
      </tbody>
    </Table>
  )
}
render(
  <>
    <Table.ScrollView>
      <NavigationTable
        id="navigation-table-mixed-1"
        showCheckbox
        accordionChevronPlacement="end"
      />
    </Table.ScrollView>

    <Table.ScrollView top>
      <NavigationTable
        id="navigation-table-mixed-2"
        border
        outline
        size="medium"
      />
    </Table.ScrollView>
  </>,
)
```

```tsx
const AccordionTable = ({ id, showCheckbox = false, ...props }) => {
  const TdCheckbox = () => {
    return <Checkbox label="Select row" label_sr_only />
  }
  const TdInput = () => {
    return <Input label="Label" label_sr_only size={4} />
  }
  const Row = ({ nr }) => {
    const shareId = id + '-' + nr
    return (
      <Tr id={shareId}>
        <Td>{showCheckbox ? <TdCheckbox /> : 'Row ' + nr}</Td>
        <Td>Row {nr}</Td>
        <Td spacing="horizontal">
          <TdInput />
        </Td>
        <Td align="right">Row {nr}</Td>

        <Td.AccordionContent>
          <Table>
            <thead>
              <Tr>
                <Th>Column A</Th>
                <Th>Column B</Th>
              </Tr>
            </thead>
            <tbody>
              <Tr>
                <td>test</td>
                <td>test</td>
              </Tr>
              <Tr>
                <td>test</td>
                <td>test</td>
              </Tr>
            </tbody>
          </Table>
        </Td.AccordionContent>
      </Tr>
    )
  }
  return (
    <Table mode="accordion" id={id} {...props}>
      <caption className="dnb-sr-only">A Table Caption</caption>
      <thead>
        <Tr>
          <Th>Column A</Th>
          <Th>Column B</Th>
          <Th>Column C</Th>
          <Th align="right">Column D</Th>
        </Tr>
      </thead>
      <tbody>
        <Row nr="1" />
      </tbody>
    </Table>
  )
}
render(
  <Table.ScrollView>
    <AccordionTable
      id="accordion-table-in-table"
      accordionChevronPlacement="end"
    />
  </Table.ScrollView>,
)
```
