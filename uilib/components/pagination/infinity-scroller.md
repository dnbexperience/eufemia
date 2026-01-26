---
title: 'Infinity Scroller'
description: 'The InfinityScroller component is a mode of the Pagination component which loads content continuously as the user scrolls down the page.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.440Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Infinity Scroller

## Import

```tsx
import { InfinityScroller } from '@dnb/eufemia/components/pagination/InfinityScroller'
```

## Description

The InfinityScroller component is a `mode` of the Pagination component which loads content continuously as the user scrolls down the page. Go to [Pagination](/uilib/components/pagination) for information on properties and events.

You can choose to use either `<Pagination mode="infinity" />` or `<InfinityScroller />`.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/pagination/InfinityScroller)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/infinity-scroller)

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
    on_change={({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
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
    on_change={({ pageNumber }) => {
      setLocalPage(pageNumber)
    }}
  />
)
```

#### Infinity scroller method #4

Using a `InfinityMarker` only. See [code example on GitHub](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/components/pagination/stories/PaginationTableMarker.stories.tsx).

This method will basically add a load button on top, if `startup_page` or `current_page` is higher than `1` at the first render.

Also, it adds an indicator at the bottom until next render, and as long as `page_count` has not reached the internal page count. But instead of setting `page_count` (total pages), you can pragmatically call `endInfinity()` instead.

```jsx
import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { InfinityMarker, endInfinity, resetInfinity } =
  React.useState(createPagination)

render(<InfinityMarker>ReactComponent</InfinityMarker>)
```

## Demos

### Infinity scroller with load button

A load button is shown at the bottom by having `use_load_button={true}` - but here we define our `startup_page={5}`, so we also get a load button on top.

```tsx
render(
  <HeightLimit>
    <Pagination
      mode="infinity"
      use_load_button
      startup_page={5}
      min_wait_time={0}
      on_load={({ pageNumber, setContent }) => {
        // simulate server communication delay
        const timeout = setTimeout(
          () => {
            setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
          },
          Math.ceil(Math.random() * 500)
        )
        return () => clearTimeout(timeout)
      }}
    />
  </HeightLimit>
)
```

### Infinity scroller with custom load indicator

```tsx
render(
  <HeightLimit>
    <Pagination
      mode="infinity"
      indicator_element={() => (
        <LargePage color="lightgreen">Loading ...</LargePage>
      )}
      startup_page={3}
      page_count={10}
      min_wait_time={0}
      on_load={({ pageNumber, setContent }) => {
        // simulate server communication delay
        const timeout = setTimeout(
          () => {
            setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
          },
          Math.ceil(Math.random() * 500)
        )
        return () => clearTimeout(timeout)
      }}
      on_end={({ pageNumber, setContent }) => {
        setContent(
          pageNumber,
          <LargePage color="lightgreen">End</LargePage>
        )
      }}
    />
  </HeightLimit>
)
```

### Infinity scroller with unknown `page_count`

```tsx
render(
  <HeightLimit>
    <Pagination
      mode="infinity"
      parallel_load_count={2}
      min_wait_time={0}
      on_load={({ pageNumber, setContent, endInfinity }) => {
        // simulate server communication delay
        const timeout = setTimeout(
          () => {
            if (pageNumber > 10) {
              endInfinity()
            } else {
              setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
            }
          },
          Math.ceil(Math.random() * 1e3)
        )
        return () => clearTimeout(timeout)
      }}
      on_end={({ pageNumber, setContent }) => {
        setContent(
          pageNumber,
          <LargePage color="lightgreen">End</LargePage>
        )
      }}
    />
  </HeightLimit>
)
```

### Advanced Table infinity scroller

You can find the code either on [GitHub](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/Examples.tsx) or on [CodeSandbox](https://codesandbox.io/s/eufemia-table-pagination-infinity-546f7)

```tsx
render(
  <HeightLimit height="60rem">
    <PaginationTableExample />
  </HeightLimit>
)
```

## Properties

```json
{
  "mode": {
    "doc": "If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the [Infinity Scroller](/uilib/components/pagination/infinity-scroller). Defaults to `pagination`.",
    "type": ["pagination", "infinity"],
    "status": "optional"
  },
  "paginationBarLayout": {
    "doc": "The layout of the pagination bar. Defaults to `vertical`.",
    "type": ["vertical", "horizontal"],
    "status": "optional"
  },
  "children": {
    "doc": "The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.",
    "type": ["React.ReactNode", "function"],
    "status": "optional"
  },
  "align": {
    "doc": "Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.",
    "type": ["left", "center", "right"],
    "status": "optional"
  },
  "startup_page": {
    "doc": "The page shown in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.",
    "type": ["number", "string"],
    "status": "optional"
  },
  "current_page": {
    "doc": "The page shown at the moment the component renders. Defaults to `1`.",
    "type": ["number", "string"],
    "status": "optional"
  },
  "page_count": {
    "doc": "The total pages count. Defaults to `1`.",
    "type": ["number", "string"],
    "status": "optional"
  },
  "startup_count": {
    "doc": "Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.",
    "type": ["number", "string"],
    "status": "optional"
  },
  "parallel_load_count": {
    "doc": "Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.",
    "type": ["number", "string"],
    "status": "optional"
  },
  "min_wait_time": {
    "doc": "The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.",
    "type": ["number", "string"],
    "status": "optional"
  },
  "place_maker_before_content": {
    "doc": "If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`. This prop is deprecated and will be removed in v11, use `place_marker_before_content` instead.",
    "type": "boolean",
    "status": "deprecated"
  },
  "place_marker_before_content": {
    "doc": "If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.",
    "type": "boolean",
    "status": "optional"
  },
  "use_load_button": {
    "doc": "If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.",
    "type": "boolean",
    "status": "optional"
  },
  "hide_progress_indicator": {
    "doc": "If set to `true` no indicator will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "page_element": {
    "doc": "By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.",
    "type": ["string", "object", "React.ReactNode"],
    "status": "optional"
  },
  "fallback_element": {
    "doc": "(infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.",
    "type": ["string", "object", "React.ReactNode"],
    "status": "optional"
  },
  "indicator_element": {
    "doc": "(infinity mode) is used by the _indicator_. Falls back to `fallback_element` if not defined.",
    "type": ["string", "object", "React.ReactNode"],
    "status": "optional"
  },
  "marker_element": {
    "doc": "(infinity mode) is used by the internal marker. Falls back to `fallback_element` if not defined.",
    "type": ["string", "object", "React.ReactNode"],
    "status": "optional"
  },
  "set_content_handler": {
    "doc": "Callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.",
    "type": "function",
    "status": "optional"
  },
  "reset_content_handler": {
    "doc": "Callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.",
    "type": "function",
    "status": "optional"
  },
  "reset_pagination_handler": {
    "doc": "Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.",
    "type": "function",
    "status": "optional"
  },
  "end_infinity_handler": {
    "doc": "Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.",
    "type": "function",
    "status": "optional"
  },
  "button_title": {
    "doc": "The title used in every button shown in the bar. Defaults to `Side %s`.",
    "type": "string",
    "status": "optional"
  },
  "next_title": {
    "doc": "The title used in the next page button. Defaults to `Neste side`.",
    "type": "string",
    "status": "optional"
  },
  "prev_title": {
    "doc": "The title used in the previous page button. Defaults to `Forrige side`.",
    "type": "string",
    "status": "optional"
  },
  "more_pages": {
    "doc": "The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.",
    "type": "string",
    "status": "optional"
  },
  "is_loading_text": {
    "doc": "Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.",
    "type": "string",
    "status": "optional"
  },
  "barSpace": {
    "doc": "Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).",
    "type": "Various",
    "status": "optional"
  },
  "load_button_text": {
    "doc": "Used during infinity mode. If `use_load_button` is set to `true`, then a button is show on the bottom. If the `startup_page` is higher than 1. Defaults to `Vis mer innhold`.",
    "type": "string",
    "status": "optional"
  },
  "loadButton": {
    "doc": "Used to set load button text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.",
    "type": "Various",
    "status": "optional"
  },
  "disabled": {
    "doc": "If set to `true`, all pagination bar buttons are disabled.",
    "type": "boolean",
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Pagination.button_title": {
      "nb-NO": "Side %s",
      "en-GB": "Page %s",
      "sv-SE": "Sida %s",
      "da-DK": "Side %s"
    },
    "Pagination.is_loading_text": {
      "nb-NO": "Laster nytt innhold",
      "en-GB": "Loading new content",
      "sv-SE": "Laddar nytt innehåll",
      "da-DK": "Indlæser nyt indhold"
    },
    "Pagination.load_button_text": {
      "nb-NO": "Vis mer innhold",
      "en-GB": "Show more content",
      "sv-SE": "Visa mer innehåll",
      "da-DK": "Vis mere indhold"
    },
    "Pagination.more_pages": {
      "nb-NO": "%s flere sider",
      "en-GB": "%s more pages",
      "sv-SE": "%s fler sidor",
      "da-DK": "%s flere sider"
    },
    "Pagination.next_title": {
      "nb-NO": "Neste side",
      "en-GB": "Next page",
      "sv-SE": "Nästa sida",
      "da-DK": "Næste side"
    },
    "Pagination.prev_title": {
      "nb-NO": "Forrige side",
      "en-GB": "Previous page",
      "sv-SE": "Föregående sida",
      "da-DK": "Forrige side"
    }
  }
}
```

### Content as a render property

The content can be either a function or a React Node. A function may be more useful if `infinity` mode is used.

```jsx
<Pagination
  ...
>
  {({ pageNumber, setContent, resetContent, ...otherInternalMethods }) => <code>Page {pageNumber}</code>}
</Pagination>
```

## Events

```json
{
  "on_change": {
    "doc": "Will be called for every page change, regardless if the mode is `mode=\"infinity\"` or not. Returns an object with number of useful properties and methods. See below for more details.",
    "type": "function",
    "status": "optional"
  },
  "on_startup": {
    "doc": "Only on **infinity** mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. **NB:** Will be called again as soon as we reset the content by calling `resetContent()`.",
    "type": "function",
    "status": "optional"
  },
  "on_load": {
    "doc": "Only on **infinity** mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.",
    "type": "function",
    "status": "optional"
  },
  "on_end": {
    "doc": "Only on **infinity** mode. Will be called once `page_count` is reached or `endInfinity` was called.",
    "type": "function",
    "status": "optional"
  }
}
```

## Returned object

Events have several useful methods to change / manipulate the content.

### Pagination mode

```jsx
<Pagination
  on_change={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
```

- `pageNumber` the current page number
- `setContent` use it to add update a page including content: `setContent(pageNumber, ReactComponent)`

### Infinity mode

```jsx
<Pagination
  mode="infinity"
  on_change={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
```

- `pageNumber` the current page number
- `setContent` use it to add update a page including content: `setContent(pageNumber, ReactComponent, position = 'after')`
- `endInfinity` use it to tell the infinity pagination to end the infinity scrolling interaction. Use this handler to end the infinity scrolling procedure, in case the page_count is unknown: `endInfinity(pageNumber)`
- `resetContent` use it to invalidate all internal pages: `resetContent()`
- `resetInfinity` use it to reset the internal pagination states: `resetInfinity(pageNumber = startup_page)`
- `items` internal stored pages
