---
showTabs: true
---

## Description

The Pagination component supports both classical **page pagination** and **infinity scrolling**.

### When to use it:

Use it to split up larger data sets into pages / sections so the users can interact sequential through the content.

### Async data handling

Infinity scrolling requires additional handling of already loaded content. To do so, it stores already shown content and interacts from there.

### Screen reader support

To make it easier for screen-readers to navigate, the _navigation bar_ markup is placed above the content, even if it is visually the opposite.

### Gotchas

**Infinity scroller:** Once content inside a page changes, we have to tell the component explicit on what "page" number that happened, including the new content.

```jsx
setContent(pageNo, ReactComponent)
```

### Legacy browser support (Internet Explorer 11)

The **infinity scroller** is using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This API is supported by all now-days browsers. But if your applications needs support for outdated browser, you can install e.g. [this IntersectionObserver polyfill](https://www.npmjs.com/package/intersection-observer) and import it:

```js
import 'intersection-observer'
```

---

### Default pagination and content handling

You can either only use the pagination component with the buttons (bar) and have your content outside, but linked together with your own states.

- or you put your content inside the pagination wrapper. This has the advantage that it gives screen-reader users an easier way to interact and understand the content.
- and it will "keep" the old page height until the next page is inserted, while showing an indicator.

#### Pagination method #1

Returning a component directly inside a function child.

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

#### Pagination method #2

Returning a function as a child and using `setContent`.

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

#### Pagination method #3

Using the `on_change` event together with `setContent`.

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

#### Pagination method #4

Create the instance before using it.

```jsx
import { createPagination } from 'dnb-ui-lib/components/Pagination'

// create our Component instance
const { Pagination, setContent, resetContent } = createPagination()

// Later we can do call this
setContent(page, ReactComponent)

render(<Pagination page_count={2} />)
```

---

### Infinity scroller and content handling

In order to update content into the internal pages stack, we have to get access to the component instance. There are several ways to do so.

Also, there are two type of handling content on:

1. Either you fill the content as "pages" in a page per page basis (methods 1-3),
2. or you have your own stack, and you only want use the infinity part (method 4).

#### Infinity scroller method #1

Create the instance before using it.

**NB:** Keep in mind, you may create the instance first during runtime, either in a class `constructor` or by using `useState`:

```jsx
import { createPagination } from 'dnb-ui-lib/components/Pagination'

// create our Component instance
const {
  Pagination,
  setContent,
  endInfinity,
  resetContent
} = React.useState(createPagination)

// Later we can do call this (make sure the page is set by listening to the events)
setContent(page, ReactComponent)

render(<Pagination mode="infinity" />)
```

#### Infinity scroller method #2

Using the `on_change` event together with `setContent`.

```jsx
import { Pagination } from 'dnb-ui-lib/components'

render(
  <Pagination
    mode="infinity"
    on_change={({ page, setContent }) => {
      setContent(page, ReactComponent)
    }}
  />
)
```

#### Infinity scroller method #3

Using a `set_content_handler` handler.

```jsx
import InfinityScroller from 'dnb-ui-lib/components/pagination/InfinityScroller'

const [localPage, setLocalPage] = React.useState(1)
const setContent = React.createRef()

React.useEffect(() => {
  setContent.current(localPage, ReactComponent)
}, [localPage])

render(
  <InfinityScroller
    set_content_handler={(fn) => (setContent = fn)}
    on_change={({ page }) => {
      setLocalPage(page)
    }}
  />
)
```

#### Infinity scroller method #4

Using a `InfinityMarker` only. See [code example on GitHub](https://github.com/dnbexperience/eufemia/blob/develop/packages/dnb-ui-lib/stories/components/PaginationTableMarker.js).

This method will basically add a load button on top, if `startup_page` or `current_page` is higher than `1` at the first render.

Also, it adds an indicator at the bottom until next render, and as long as `page_count` has not reached the internal page count. But instead of setting `page_count` (total pages), you can pragmatically call `endInfinity()` instead.

```jsx
import { createPagination } from 'dnb-ui-lib/components/Pagination'

// create our Component instance
const { InfinityMarker, endInfinity, resetInfinity } = React.useState(
  createPagination
)

render(<InfinityMarker>ReactComponent</InfinityMarker>)
```
