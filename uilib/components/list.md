---
title: 'List'
description: 'List is a layout component for displaying rows of content, with optional start/center/end slots and a navigable item variant.'
version: 10.96.0
generatedAt: 2026-02-05T20:50:44.332Z
checksum: b4857e09dad88230fd9cf09c5c5bf42acd8c3ea607a33b3147eea5f4f530105a
---

# List

## Import

```tsx
import { List } from '@dnb/eufemia'
```

## Description

`List` is a layout component for displaying rows of content. Use `List.Container` as the wrapper and `List.Item.Basic`, `List.Item.Action`, or `List.Item.Accordion` for each row.

- **List.Container** – Provides list context (e.g. variant) and wraps items in a vertical flex layout. Pass `separated` to insert gap between rows so each item gets its own rounding/outline instead of sharing borders.
- **List.Item.Basic** – A single row with optional `icon` and `title` props and cell children. Supports selected state, variant override, and loading states via `pending` (skeleton overlay) or `skeleton` (text placeholder).
- **List.Item.Action** – Clickable row with optional `icon` and `title` props (Enter/Space support) and a chevron icon. Use `chevronPosition="left"` or `"right"` (default) to place the chevron. Supports `pending` to show a loading overlay and disable interaction. Use `href` for navigation.
- **List.Item.Accordion** – Expandable row with optional `icon` and `title` props and `List.Item.Accordion.Content` for the expandable section. Use `open` for initial state, `chevronPosition="left"` or `"right"` (default) for chevron placement, and optional `id` for ARIA. Supports `pending` to disable toggling.
- **List.Cell.Start**, **List.Cell.Center**, **List.Cell.End**, **List.Cell.Footer** – Cell slots inside Basic/Action/Accordion for start, middle, end, and additional content.
- **List.Cell.Title** – Title block that can contain `List.Cell.Title.Overline` and `List.Cell.Title.Subline`. Use the nested helpers for structured header text, even though the drop-in `List.Cell.Title.Overline`/`List.Cell.Title.Subline` components still exist for backward compatibility.

All item components support [Space](/uilib/layout/space/properties) props (`top`, `bottom`, etc.) and forward standard HTML attributes.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=47195-2954)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list)

## Basic usage

```jsx
import { List } from '@dnb/eufemia'

render(
  <List.Container>
    <List.Item.Basic>Simple row</List.Item.Basic>

    <List.Item.Basic title="Title" icon="bell">
      <List.Cell.Start>Start</List.Cell.Start>
      <List.Cell.Center>Center</List.Cell.Center>
      <List.Cell.End>End</List.Cell.End>
    </List.Item.Basic>

    <List.Item.Basic>
      <List.Cell.Center>
        <List.Cell.Title>
          <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
          Main title here
          <List.Cell.Title.Subline>Subline</List.Cell.Title.Subline>
        </List.Cell.Title>
      </List.Cell.Center>
    </List.Item.Basic>

    <List.Item.Action
      title="Click me"
      icon="bell"
      onClick={() => console.log('Clicked')}
    >
      <List.Cell.End>Value</List.Cell.End>
    </List.Item.Action>

    <List.Item.Action
      title="Link"
      icon="bell"
      href="https://dnb.no"
      target="_blank"
      rel="noopener noreferrer"
    >
      <List.Cell.End>Value</List.Cell.End>
    </List.Item.Action>

    <List.Item.Accordion title="Expandable" icon="bell">
      <List.Item.Accordion.Header>
        <List.Cell.End>1234</List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content>
        <P>Content when expanded.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>

    <List.Item.Accordion title="Without explicit header" icon="bell">
      <List.Item.Accordion.Content>
        <P>Content when expanded.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
```

## Loading states

- **pending** – On `List.Item.Basic` or `List.Item.Action`: shows a skeleton overlay and disables pointer events. On `List.Item.Action`, click and keyboard are disabled (`tabIndex={-1}`, `aria-disabled`). Use while data is loading.
- **skeleton** – On `List.Item.Basic` or `List.Item.Action`: applies skeleton font styling (text placeholder) without the full overlay. Use for a lighter loading indication.

## Accessibility

- **List.Item.Action** uses `role="button"` so assistive technologies announce it as a button. It is focusable (`tabIndex={0}`) and activates on Enter and Space. When `pending` is true, it is not focusable and has `aria-disabled="true"`. You can override the role via the `role` prop (e.g. `role="link"`).
- **List.Item.Accordion** exposes full ARIA for expand/collapse: the header has `id`, `aria-controls`, and `aria-expanded`; the content region has `id`, `aria-labelledby`, `aria-hidden`, and `aria-expanded`. Pass an `id` prop for stable references, or leave it unset for an auto-generated id. When `pending` is true, the header is not focusable and has `aria-disabled="true"`.
- Use `aria-label` or other ARIA attributes on the container or items when needed for screen readers.

## Demos

### Rows with cells like Start, Center, End, Title

This example demonstrates different cell layouts and their placement.

```tsx
render(
  <List.Container>
    <List.Item.Basic>
      <List.Cell.Start>Start</List.Cell.Start>
      <List.Cell.Center>Center</List.Cell.Center>
      <List.Cell.End>End</List.Cell.End>
    </List.Item.Basic>

    <List.Item.Basic title="Title" icon={fish_medium}>
      <List.Cell.End>End</List.Cell.End>
    </List.Item.Basic>

    <List.Item.Basic>
      <List.Cell.Title>
        <List.Cell.Title.Overline>Overline</List.Cell.Title.Overline>
        Title
        <List.Cell.Title.Subline variant="description">
          Subline
        </List.Cell.Title.Subline>
      </List.Cell.Title>
      <List.Cell.End>End</List.Cell.End>
      <List.Cell.Footer
        style={{
          background: 'var(--color-sand-yellow)',
        }}
      >
        <P>Footer</P>
      </List.Cell.Footer>
    </List.Item.Basic>
  </List.Container>
)
```

### Navigable item

```tsx
render(
  <List.Container>
    <List.Item.Action
      icon={fish_medium}
      title="Navigate to details"
      onClick={() => console.log('Clicked')}
    >
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Action
      chevronPosition="left"
      title="Left aligned chevron"
      onClick={() => console.log('Clicked')}
    >
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
```

### Navigable item with href

Use the `href` property on `List.Item.Action` to render a native link. Use `target` and `rel` for external links (e.g. `target="_blank"` with `rel="noopener noreferrer"`).

```tsx
render(
  <List.Container>
    <List.Item.Action
      icon={fish_medium}
      title="Link to details"
      href="#details"
    >
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Action
      icon={fish_medium}
      title="External link (opens in new tab)"
      href="https://eufemia.dnb.no/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <List.Cell.End>
        <NumberFormat currency value={5678} />
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
```

### With anchor

List items containing [Anchor](/uilib/components/anchor) links.

```tsx
render(
  <List.Container>
    <List.Item.Basic title={<Anchor href="#">Link to page one</Anchor>} />

    <List.Item.Basic
      icon={fish_medium}
      title={<Anchor href="#">Link with icon and end value</Anchor>}
    >
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Basic>
  </List.Container>
)
```

### Accordion

Expandable list items using `List.Item.Accordion` with optional `icon` and `title` properties and `List.Item.Accordion.Content` for the expandable section. Use the `open` property to set the initial open state.

```tsx
render(
  <List.Container>
    <List.Item.Accordion icon={fish_medium} title="Accordion title">
      <List.Item.Accordion.Header>
        <List.Cell.End>
          <NumberFormat currency value={1234} />
        </List.Cell.End>
      </List.Item.Accordion.Header>

      <List.Item.Accordion.Content innerSpace>
        <P>Accordion content goes here.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>

    <List.Item.Accordion open title="Opened by default">
      <List.Item.Accordion.Content innerSpace>
        <P>This section is open initially.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>

    <List.Item.Accordion
      chevronPosition="left"
      title="Chevron on the left"
    >
      <List.Item.Accordion.Header>
        <List.Cell.End>
          <NumberFormat currency value={1234} />
        </List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content innerSpace>
        <P>
          Use <Code>chevronPosition="left"</Code> to place the chevron on
          the left.
        </P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
```

### With Badge

Use [Badge](/uilib/components/badge) in `List.Cell.End` to show status or counts.

```tsx
render(
  <List.Container>
    <List.Item.Action title="In Action Item" icon={fish_medium}>
      <List.Cell.End>
        <Badge content="Badge" />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Accordion title="In Accordion Item" icon={fish_medium}>
      <List.Item.Accordion.Header>
        <List.Cell.End>
          <Flex.Horizontal>
            <Badge
              content={3}
              label="Notifications"
              variant="notification"
            />
            <Value.Currency value={1234} showEmpty />
          </Flex.Horizontal>
        </List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content innerSpace>
        <P>Accordion content goes here.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
```

### Footer with buttons

Use `List.Cell.Footer` to place actions such as [Button](/uilib/components/button) in the list row.

```tsx
render(
  <List.Container>
    <List.Item.Basic title="Item with actions" icon={fish_medium}>
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
      <List.Cell.Footer>
        <Flex.Horizontal>
          <Button text="Save" />
          <Button variant="tertiary" text="Delete" />
        </Flex.Horizontal>
      </List.Cell.Footer>
    </List.Item.Basic>

    <List.Item.Action icon={fish_medium} title="Action item with button">
      <List.Cell.End>
        <Value.Currency value={5678} showEmpty />
      </List.Cell.End>
      <List.Cell.Footer>
        <Button variant="secondary" text="Open" />
      </List.Cell.Footer>
    </List.Item.Action>

    <List.Item.Accordion chevronPosition="left" title="Accordion title">
      <List.Item.Accordion.Header>
        <List.Cell.End>
          <NumberFormat currency value={1234} />
        </List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Cell.Footer
        style={{
          background: 'var(--color-sand-yellow)',
        }}
      >
        <Button variant="tertiary" text="Next" icon="chevron_right" />
      </List.Cell.Footer>

      <List.Item.Accordion.Content innerSpace>
        <P>Accordion content goes here.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
```

### Responsive Grid Layout

Using [Grid.Container](/uilib/layout/grid/container) with [Grid.Item](/uilib/layout/grid/item) for a 12-column responsive grid.

```tsx
render(
  <Grid.Container
    rowGap
    columnGap
    style={{
      marginInline: 'auto',
      maxInlineSize: 'var(--layout-medium)',
    }}
  >
    <Grid.Item
      span={{
        small: 'full',
        medium: [1, 4],
        large: [5, 12],
      }}
    >
      <List.Container>
        <List.Item.Action icon={fish_medium} title="Navigate to details">
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>

        <List.Item.Action icon={fish_medium} title="Navigate to details">
          <List.Cell.End>
            <NumberFormat currency value={1234} />
          </List.Cell.End>
        </List.Item.Action>
      </List.Container>
    </Grid.Item>

    <Grid.Item
      span={{
        small: 'full',
        medium: [5, 6],
        large: [1, 4],
      }}
      style={{
        display: 'gid',
        placeContent: 'center',
        textAlign: 'center',
        background: 'var(--color-sand-yellow)',
      }}
    >
      <P>Second Grid Item</P>
    </Grid.Item>
  </Grid.Container>
)
```

### Separated lists

Use the `separated` property on `List.Container` to add row gap between list items.

```tsx
render(
  <List.Container separated>
    <List.Item.Basic icon={fish_medium} title="Title 1">
      <List.Cell.End>
        <Value.Currency value={1234} showEmpty />
      </List.Cell.End>
    </List.Item.Basic>

    <List.Item.Basic icon={fish_medium} title="Title 2">
      <List.Cell.End>
        <Value.Currency value={4567} showEmpty />
      </List.Cell.End>
    </List.Item.Basic>
  </List.Container>
)
```

### Dynamic list

```tsx
const myList = [
  {
    name: 'List item 1',
    amount: 10000,
  },
  {
    name: 'List item 2',
    amount: 5000,
  },
  {
    name: 'List item 3',
    amount: 7500,
  },
]
render(
  <List.Container>
    {myList.map((account) => (
      <List.Item.Basic key={account.name} title={account.name}>
        <List.Cell.End>
          <Value.Currency value={account.amount} />
        </List.Cell.End>
      </List.Item.Basic>
    ))}
  </List.Container>
)
```

### With DateFormat

Use [DateFormat](/uilib/components/date-format) in `List.Cell.Start` to show dates in the list row.

```tsx
render(
  <List.Container>
    <List.Item.Basic title="In Basic Item">
      <List.Cell.Start fontSize="small">
        <DateFormat
          value={new Date()}
          dateStyle="medium"
          hideCurrentYear
        />
      </List.Cell.Start>
      <List.Cell.End>
        <Value.Currency value={1234} showEmpty />
      </List.Cell.End>
    </List.Item.Basic>

    <List.Item.Action>
      <List.Cell.Title>
        <List.Cell.Title.Overline>
          <DateFormat
            value={new Date()}
            dateStyle="medium"
            hideCurrentYear
          />
        </List.Cell.Title.Overline>
        In Action Item
      </List.Cell.Title>
      <List.Cell.End>
        <Value.Currency value={5678} showEmpty />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Accordion>
      <List.Item.Accordion.Header>
        <List.Cell.Title>
          <List.Cell.Title.Overline>
            <DateFormat
              value={new Date()}
              dateStyle="medium"
              hideCurrentYear
            />
          </List.Cell.Title.Overline>
          In Accordion Item
        </List.Cell.Title>
        <List.Cell.End>
          <Value.Currency value={1234} showEmpty />
        </List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content innerSpace>
        <P>
          Use <Code>chevronPosition="left"</Code> to place the chevron on
          the left.
        </P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
```

### With Subline

Use `List.Cell.Title.Subline` to add supporting text below the title. The `variant="description"` option uses smaller text for secondary information.

```tsx
render(
  <List.Container>
    <List.Item.Action icon={fish_medium}>
      <List.Cell.Title>
        <span>Item 1</span>
        <List.Cell.Title.Subline>
          <DateFormat
            value={new Date()}
            dateStyle="medium"
            hideCurrentYear
          />
        </List.Cell.Title.Subline>
      </List.Cell.Title>
      <List.Cell.End>
        <Value.Currency value={5678} showEmpty />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Accordion icon={fish_medium}>
      <List.Item.Accordion.Header>
        <List.Cell.Title>
          <span>Item 2</span>
          <List.Cell.Title.Subline>Detail 1</List.Cell.Title.Subline>
          <List.Cell.Title.Subline variant="description">
            Detail 2
          </List.Cell.Title.Subline>
          <List.Cell.Title.Subline>
            <Flex.Horizontal rowGap="x-small">
              <Badge status="neutral" subtle content="Detail 3" />
              <Badge status="neutral" subtle content="Detail 3" />
            </Flex.Horizontal>
          </List.Cell.Title.Subline>
        </List.Cell.Title>
        <List.Cell.End>
          <Value.Currency value={5678} showEmpty />
        </List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content innerSpace>
        <P>Accordion content goes here.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>

    <List.Item.Action title="Title" icon={fish_medium}>
      <List.Cell.End>
        <Flex.Vertical gap={false}>
          <Value.Currency value={5678} showEmpty />
          <List.Cell.Title.Subline variant="description">
            Subline
          </List.Cell.Title.Subline>
        </Flex.Vertical>
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
```

### With form elements

```tsx
render(
  <List.Container>
    <List.Item.Basic>
      <List.Cell.Start>
        <Field.Boolean label="Checkbox" />
      </List.Cell.Start>
      <List.Cell.End>
        <Value.Currency value={5678} showEmpty />
      </List.Cell.End>
    </List.Item.Basic>

    <List.Item.Basic>
      <List.Cell.Start>
        <Radio label="Radio" />
      </List.Cell.Start>
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Basic>

    <List.Item.Action
      icon={fish_medium}
      title="Item with icon"
      onClick={() => console.log('Navigate')}
    >
      <List.Cell.End>
        <Value.Currency value={1234} showEmpty />
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
```

### With avatar

Use [Avatar](/uilib/components/avatar) in `List.Cell.Start` as the left content.

```tsx
render(
  <List.Container>
    <List.Item.Basic title="Alice Andersen">
      <List.Cell.Start>
        <Avatar size="medium">A</Avatar>
      </List.Cell.Start>
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Basic>

    <List.Item.Action title="Bob Berg" onClick={() => {}}>
      <List.Cell.Start>
        <Avatar size="medium">B</Avatar>
      </List.Cell.Start>
      <List.Cell.End>
        <Value.Currency value={5678} showEmpty />
      </List.Cell.End>
    </List.Item.Action>

    <List.Item.Accordion title="Carol with image">
      <List.Item.Accordion.Header>
        <List.Cell.Start>
          <Avatar size="medium">C</Avatar>
        </List.Cell.Start>
        <List.Cell.End>Value</List.Cell.End>
      </List.Item.Accordion.Header>
      <List.Item.Accordion.Content innerSpace>
        <P>Content goes here.</P>
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  </List.Container>
)
```

### Selected state

```tsx
render(
  <List.Container>
    <List.Item.Basic>Normal row</List.Item.Basic>

    <List.Item.Basic selected>Selected row</List.Item.Basic>

    <List.Item.Basic>Another normal row</List.Item.Basic>
  </List.Container>
)
```

### With custom background color

```tsx
render(
  <List.Container>
    <List.Item.Basic>Normal row</List.Item.Basic>

    <List.Item.Basic
      style={{
        ['--item-background-color' as string]:
          'var(--color-mint-green-12)',
      }}
    >
      Custom background color (not selected)
    </List.Item.Basic>

    <List.Item.Basic>Another normal row</List.Item.Basic>
  </List.Container>
)
```

### Pending state

Use the `pending` property on `List.Item.Basic` or `List.Item.Action` to show a skeleton overlay. Click and keyboard are disabled while pending.

```tsx
render(
  <List.Container>
    <List.Item.Action icon={fish_medium} title="Pending item ..." pending>
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
```

### Progress indicator

A single list item with a circular progress indicator in `List.Cell.Start`.

```tsx
render(
  <List.Container>
    <List.Item.Basic>
      <List.Cell.Start>
        <ProgressIndicator
          size="medium"
          showDefaultLabel
          labelDirection="horizontal"
        />
      </List.Cell.Start>
    </List.Item.Basic>
  </List.Container>
)
```

### Skeleton

Use the `skeleton` property on `List.Item.Basic`, `List.Item.Action` or `List.Item.Accordion` to show a skeleton overlay while content is loading.

```tsx
render(
  <List.Container>
    <List.Item.Action icon={fish_medium} title="Loading item…" skeleton>
      <List.Cell.End>
        <NumberFormat currency value={1234} />
      </List.Cell.End>
    </List.Item.Action>
  </List.Container>
)
```

## List.Container

```json
{
  "props": {
    "separated": {
      "doc": "When `true`, adds row gap between items so each row keeps its own outline and border radius instead of running edge-to-edge.",
      "type": "boolean",
      "status": "optional"
    },
    "children": {
      "doc": "List items. Use `List.Item.Basic`, `List.Item.Action`, or `List.Item.Accordion` as direct children.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Item.Basic

```json
{
  "props": {
    "selected": {
      "doc": "When `true`, applies the selected state styling (e.g. background).",
      "type": "boolean",
      "status": "optional"
    },
    "pending": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown (loading state). Disables pointer events on the item.",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, applies skeleton font styling to the item (text placeholder animation). Use for loading state without the full overlay from `pending`.",
      "type": "boolean",
      "status": "optional"
    },
    "icon": {
      "doc": "Optional icon (e.g. `fish_medium` or an icon element). Rendered at the start of the row.",
      "type": "IconIcon",
      "status": "optional"
    },
    "title": {
      "doc": "Optional title. Rendered after the icon when provided.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "children": {
      "doc": "Item content. Typically `List.Cell.Start`, `List.Cell.Center`, `List.Cell.End`, `List.Cell.Title` (use `List.Cell.Title.Overline`/`List.Cell.Title.Subline` for overline/subline text), or the drop-in `List.Cell.Title.Overline`/`List.Cell.Title.Subline` components, or `List.Cell.Footer`.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Item.Action

```json
{
  "props": {
    "title": {
      "doc": "Optional title for the action item.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "icon": {
      "doc": "Optional icon for the action item (e.g. `fish_medium`).",
      "type": "IconIcon",
      "status": "optional"
    },
    "href": {
      "doc": "When set, renders as a native link (`<a>`) so the item navigates to the URL. Use for external or internal navigation. When not set, the item behaves as a button (use `onClick` for custom handling).",
      "type": "string",
      "status": "optional"
    },
    "target": {
      "doc": "Link target (e.g. `_blank` for new tab). Only applicable when `href` is set.",
      "type": "string",
      "status": "optional"
    },
    "rel": {
      "doc": "Link rel (e.g. `noopener noreferrer` for external links). Only applicable when `href` is set.",
      "type": "string",
      "status": "optional"
    },
    "onClick": {
      "doc": "Called when the user clicks or activates the item (Enter/Space key). Receives the native mouse event.",
      "type": "(event) => void",
      "status": "optional"
    },
    "chevronPosition": {
      "doc": "Placement of the chevron icon. Defaults to `right`. Use `left` to show the chevron on the left side.",
      "type": ["'left'", "'right'"],
      "defaultValue": "'right'",
      "status": "optional"
    },
    "pending": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown (loading state). Disables click and keyboard while active.",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, applies skeleton font styling to the item (text placeholder).",
      "type": "boolean",
      "status": "optional"
    },
    "children": {
      "doc": "Additional cells (e.g. `List.Cell.End` for value). A chevron icon is rendered at the end automatically.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "[List.Item.Basic](/uilib/components/list/properties/#listitembasic)": {
      "doc": "Inherits List.Item.Basic properties (variant, selected, spacing, etc.).",
      "type": "Various",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Item.Accordion

```json
{
  "props": {
    "icon": {
      "doc": "Optional icon for the accordion header (e.g. `fish_medium`).",
      "type": "IconIcon",
      "status": "optional"
    },
    "title": {
      "doc": "Optional title for the accordion header.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "chevronPosition": {
      "doc": "Placement of the chevron icon. Defaults to `right`. Use `left` to show the chevron on the left side.",
      "type": ["'left'", "'right'"],
      "defaultValue": "'right'",
      "status": "optional"
    },
    "open": {
      "doc": "Initial open state. Defaults to `false`. The accordion can be toggled by the user via the header.",
      "type": "boolean",
      "defaultValue": "false",
      "status": "optional"
    },
    "children": {
      "doc": "Header cells (e.g. `List.Cell.Start`, `List.Cell.Title`/`List.Cell.Title.Overline`, `List.Cell.End`) and optionally `List.Item.Accordion.Content` for the expandable section.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[List.Item.Basic](/uilib/components/list/properties/#listitembasic)": {
      "doc": "Inherits List.Item.Basic properties (variant, pending, spacing, etc.).",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

## List.Item.Accordion.Header

```json
{
  "props": {
    "children": {
      "doc": "Header cells (e.g. `List.Cell.Start`, `List.Cell.Title.Overline`, `List.Cell.End`). The chevron, icon, and title from the parent accordion are rendered automatically.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "[List.Item.Basic](/uilib/components/list/properties/#listitembasic)": {
      "doc": "Inherits List.Item.Basic properties (variant, pending, spacing, etc.).",
      "type": "Various",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Item.Accordion.Content

```json
{
  "props": {
    "children": {
      "doc": "Content displayed inside the expandable accordion body.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.Title

```json
{
  "props": {
    "fontSize": {
      "doc": "Font size of the title content. Defaults to `basis`. Use `small` for smaller text.",
      "type": ["'small'", "'basis'"],
      "defaultValue": "'basis'",
      "status": "optional"
    },
    "children": {
      "doc": "Title content of the list item. Equivalent to using the `title` prop on `List.Item.Basic` or `List.Item.Action`. You can nest `List.Cell.Title.Overline`/`List.Cell.Title.Subline` inside the component for the overline/subline text.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.Title.Overline

```json
{
  "props": {
    "fontSize": {
      "doc": "Font size of the overline content. Defaults to `x-small`.",
      "type": ["'basis'", "'small'", "'x-small'"],
      "defaultValue": "'x-small'",
      "status": "optional"
    },
    "fontWeight": {
      "doc": "Font weight of the overline content. Defaults to `medium`.",
      "type": ["'regular'", "'medium'"],
      "defaultValue": "'medium'",
      "status": "optional"
    },
    "children": {
      "doc": "Overline content of the list item, shown above the main title row. Use via `List.Cell.Title.Overline` when nesting inside the title block (or drop-in as `List.Cell.Title.Overline`). Pairs with `List.Cell.Title.Subline` inside the block.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.Title.Subline

```json
{
  "props": {
    "variant": {
      "doc": "Visual variant. Use `description` for smaller, muted text style.",
      "type": ["'description'"],
      "status": "optional"
    },
    "fontSize": {
      "doc": "Font size of the subline content. Defaults to `small`. When `variant=\"description\"`, defaults to `x-small`.",
      "type": ["'basis'", "'small'", "'x-small'"],
      "defaultValue": "'small'",
      "status": "optional"
    },
    "fontWeight": {
      "doc": "Font weight of the subline content. Defaults to `regular`.",
      "type": ["'regular'", "'medium'"],
      "defaultValue": "'regular'",
      "status": "optional"
    },
    "children": {
      "doc": "Subline content of the list item, shown below the title. Use via `List.Cell.Title.Subline` when nesting inside the title block (or as standalone `List.Cell.Title.Subline`). Pairs with List.Cell.Title.Overline or `List.Cell.Title.Overline`.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.Start

```json
{
  "props": {
    "fontSize": {
      "doc": "Font size of the start content. Defaults to `basis`. Use `small` for smaller text.",
      "type": ["'small'", "'basis'"],
      "defaultValue": "'basis'",
      "status": "optional"
    },
    "children": {
      "doc": "Start content of the list item (e.g. icon, label).",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.Center

```json
{
  "props": {
    "children": {
      "doc": "Center content of the list item. Grows to fill available space.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.End

```json
{
  "props": {
    "fontWeight": {
      "doc": "Font weight of the end content. Defaults to `medium`.",
      "type": ["'regular'", "'medium'"],
      "defaultValue": "'medium'",
      "status": "optional"
    },
    "fontSize": {
      "doc": "Font size of the end content. Defaults to `basis`. Use `small` for smaller text.",
      "type": ["'small'", "'basis'"],
      "defaultValue": "'basis'",
      "status": "optional"
    },
    "children": {
      "doc": "End content of the list item (e.g. value, action).",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Cell.Footer

```json
{
  "props": {
    "children": {
      "doc": "Footer content of the list item. Grows to fill available space.",
      "type": "React.ReactNode",
      "status": "required"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## List.Item.Action Events

```json
{
  "props": {
    "onClick": {
      "doc": "Fired when the user clicks or activates `List.Item.Action` (click or Enter/Space key). Receives the native event. Only applicable to `List.Item.Action`.",
      "type": "(event) => void",
      "status": "optional"
    }
  }
}
```
