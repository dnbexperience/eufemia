---
showTabs: true
---

## Description

The Pagination component supports both classical **page pagination** and **infinity scrolling**.

### When to use it:

Use it to split up larger data sets into pages / sections so the users can interact sequential through the content.

### Async data handling

Infinity scrolling requires additional handling of already loaded content. To do so, it stores already shown content and interacts from there.

### Gotchas

Once content inside a page changes, we have to tell the component explicit on what page number that happened, including the new content.

### Screen reader support

To make it easier for screen-readers to navigate, the _navigation bar_ markup is placed above the content, even if it is visually the opposite.

### Default pagination and content handling

You can either only use the pagination component with the buttons (bar) and have your content outside, but linked together by your own state.

- or you put your content inside the pagination wrapper. This has the advantage that it gives screen-reader users an easier way to interact and understand the content.
- and it will "keep" the old page height until the next page is inserted, while showing an indicator.

**Method #1**

```jsx
import { Pagination } from 'dnb-ui-lib/components'

render(
  <Pagination page_count={2}>
    {() => {
      return ReactComponent
    }}
  </Pagination>
)
```

**Method #2**

```jsx
import { Pagination } from 'dnb-ui-lib/components'

render(
  <Pagination page_count={2}>
    {({ page, setContent }) => {
      setContent(page, ReactComponent)
    }}
  </Pagination>
)
```

**Method #3**

```jsx
import { Pagination } from 'dnb-ui-lib/components'

render(
  <Pagination
    page_count={2}
    on_change={({ page, setContent }) => {
      setContent(page, ReactComponent)
    }}
  />
)
```

**Method #4**

```jsx
import { createPagination } from 'dnb-ui-lib/components/Pagination'

// create our Pagination instance
const { Pagination, setContent, resetContent } = createPagination()

// Later we can do call this
setContent(page, ReactComponent)

render(<Pagination page_count={2} />)
```

### Infinity scroller and content handling

In order to update content into the internal pages stack, we have to get access to the component instance. There are several ways to do so.

**Method #1**

```jsx
import { createPagination } from 'dnb-ui-lib/components/Pagination'

// create our Pagination instance
const {
  Pagination,
  updateContent,
  resetContent,
  endInfinity
} = createPagination()

// Later we can do call this (make sure the page is set by listening to the events)
updateContent(page, ReactComponent)

render(<Pagination mode="infinity" />)
```

**Method #2**

```jsx
import { Pagination } from 'dnb-ui-lib/components'

render(
  <Pagination
    mode="infinity"
    on_change={({ page, updateContent }) => {
      updateContent(page, ReactComponent)
    }}
  />
)
```

**Method #3**

```jsx
import { Pagination } from 'dnb-ui-lib/components'

const updateContent = React.createRef()

React.useEffect(() => {
  updateContent.current(myCurrentPage, ReactComponent)
}, [])

render(
  <Pagination
    mode="infinity"
    set_content_handler={fn => (updateContent = fn)}
  />
)
```
