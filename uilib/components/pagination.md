---
title: 'Pagination'
description: 'The Pagination component supports both classical pagination and infinity scrolling.'
metadata: https://eufemia.dnb.no/uilib/components/pagination/metadata.json
---

## Import

```tsx
import { Pagination } from '@dnb/eufemia'
```

## Description

The Pagination component is used to split up larger data sets into pages / sections so users can interact sequentially through the content. It supports both classical **page pagination** and **infinite scrolling**.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=20703-8887)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/pagination)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination)

### Screen reader support

To make it easier for screen readers to navigate, the _navigation bar_ markup is placed above the content, even if it is visually the opposite.

---

### Default pagination and content handling

You can put your content inside the pagination wrapper. This has the advantage of giving screen reader users an easier way to interact with and understand the content. It will also "keep" the old page height until the next page is inserted while showing an indicator.

The pagination component can be used outside of the content. Then you have to export the `Bar` component directly from Pagination and link it together with your own states.

```jsx
import { Bar } from '@dnb/eufemia/components/Pagination'
```

We recommend contacting one of the developers at Eufemia ([Slack channel #eufemia-web](https://dnb-it.slack.com/archives/CMXABCHEY)) to help you set up `Bar`, so that the pagination becomes screen reader compliant.

#### Pagination method #1

Returning a component directly inside a function as a child.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination page_count={2}>
    {() => {
      return ReactComponent
    }}
  </Pagination>,
)
```

#### Pagination method #2

Returning a function as a child and using `setContent`.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination page_count={2}>
    {({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  </Pagination>,
)
```

#### Pagination method #3

Using the `on_change` event together with `setContent`.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination
    page_count={2}
    on_change={({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  />,
)
```

#### Pagination method #4

Create the instance before using it.

```jsx
import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { Pagination, setContent, resetContent } = createPagination()

// Later we can call this
setContent(pageNumber, ReactComponent)

render(<Pagination page_count={2} />)
```

---

## Demos

### Default pagination

```tsx
render(
  <Pagination
    page_count={888}
    current_page={4}
    on_change={({ pageNumber }) => {
      console.log('on_change:', pageNumber)
    }}
  >
    <P>Current Page Content</P>
  </Pagination>,
)
```

If you need to access methods provided by the render property arguments.

```tsx
render(
  <Pagination
    page_count={5}
    startup_page={3}
    on_change={({ pageNumber }) => {
      console.log('on_change:', pageNumber)
    }}
  >
    {({ pageNumber }) => <P>Page {pageNumber}</P>}
  </Pagination>,
)
```

### Horizontal pagination

```tsx
render(
  <Pagination
    page_count={888}
    current_page={4}
    on_change={({ pageNumber }) => {
      console.log('on_change:', pageNumber)
    }}
    paginationBarLayout="horizontal"
  >
    <P>Current Page Content</P>
  </Pagination>,
)
```

### Centered Pagination with random delay

Note that we keep the height of the previous page. All pages can for sure have their own height.

```tsx
render(
  <Pagination align="center" page_count={30}>
    {({ pageNumber, setContent }) => {
      // simulate server communication delay
      const timeout = setTimeout(
        () => {
          setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
        },
        Math.ceil(Math.random() * 500),
      )
      return () => clearTimeout(timeout)
    }}
  </Pagination>,
)
```

### Infinity scroller demos

Check out [demos for the Infinity Scroller](/uilib/components/pagination/infinity-scroller).
