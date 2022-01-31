---
showTabs: true
---

## Description

The InfinityScroller component is a `mode` of the Pagination component which loads content continuously as the user scrolls down the page. Go to [Pagination](/uilib/components/pagination) for information on properties and events.

You can choose to use either `<Pagination mode="infinity" />` or `<InfinityScroller />`.

### Async data handling

Infinity scrolling requires additional handling of already loaded content. To do so, it stores already shown content and interacts from there.

### Gotchas

**Infinity scroller:** Once content inside a page changes, we have to tell the component explicitly what "page" number happened, including the new content.

```jsx
setContent(pageNumber, ReactComponent)
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
import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { Pagination, setContent, endInfinity, resetContent } =
  React.useState(createPagination)

// Later we can do call this (make sure the page is set by listening to the events)
setContent(page, ReactComponent)

render(<Pagination mode="infinity" />)
```

#### Infinity scroller method #2

Using the `on_change` event together with `setContent`.

```jsx
import { Pagination } from '@dnb/eufemia/components'

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
import InfinityScroller from '@dnb/eufemia/components/pagination/InfinityScroller'

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

Using a `InfinityMarker` only. See [code example on GitHub](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia-sandbox/stories/components/PaginationTableMarker.js).

This method will basically add a load button on top, if `startup_page` or `current_page` is higher than `1` at the first render.

Also, it adds an indicator at the bottom until next render, and as long as `page_count` has not reached the internal page count. But instead of setting `page_count` (total pages), you can pragmatically call `endInfinity()` instead.

```jsx
import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { InfinityMarker, endInfinity, resetInfinity } =
  React.useState(createPagination)

render(<InfinityMarker>ReactComponent</InfinityMarker>)
```

### Legacy browser support (Internet Explorer 11)

The **infinity scroller** is using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). This API is supported by all nowadays browsers. But if your applications need support for outdated browser, you can install e.g. [this IntersectionObserver polyfill](https://www.npmjs.com/package/intersection-observer) and import it:

```js
import 'intersection-observer'
```
