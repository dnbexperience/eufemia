---
showTabs: true
---

## Description

The Pagination component is used to split up larger data sets into pages / sections so the users can interact sequentially through the content. It supports both classical **page pagination** and **infinity scrolling**.

### Screen reader support

To make it easier for screen-readers to navigate, the _navigation bar_ markup is placed above the content, even if it is visually the opposite.

---

### Default pagination and content handling

You can put your content inside the pagination wrapper. This has the advantage that it gives screen-reader users an easier way to interact and understand the content. It will also "keep" the old page height until the next page is inserted while showing an indicator.

The pagination component can be used outside of the content. Then you have to export the `Bar` component directly from Pagination and link it together with your own states.

```jsx
import { Bar } from '@dnb/eufemia/components/Pagination'
```

We recommend contacting one of the developers at Eufemia ([Slack channel #eufemia-web](https://dnb-it.slack.com/archives/CMXABCHEY)) to help you set up `Bar`, so that the pagination becomes screen-reader compliant.

#### Pagination method #1

Returning a component directly inside a function as a child.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination page_count={2}>
    {() => {
      return ReactComponent
    }}
  </Pagination>
)
```

#### Pagination method #2

Returning a function as a child and using `setContent`.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination page_count={2}>
    {({ page, setContent }) => {
      setContent(page, ReactComponent)
    }}
  </Pagination>
)
```

#### Pagination method #3

Using the `on_change` event together with `setContent`.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination
    page_count={2}
    on_change={({ page, setContent }) => {
      setContent(page, ReactComponent)
    }}
  />
)
```

#### Pagination method #4

Create the instance before using it.

```jsx
import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { Pagination, setContent, resetContent } = createPagination()

// Later we can do call this
setContent(page, ReactComponent)

render(<Pagination page_count={2} />)
```

---
