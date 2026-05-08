---
title: 'Pagination'
description: 'The Pagination component supports both classical pagination and infinity scrolling.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:10.512Z
checksum: 07a66f925b4762223c976ee4ee900c3db782d6d0b1b999811b43fb1bfef280f6
---

# Pagination

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
  <Pagination pageCount={2}>
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
  <Pagination pageCount={2}>
    {({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  </Pagination>
)
```

#### Pagination method #3

Using the `onChange` event together with `setContent`.

```jsx
import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination
    pageCount={2}
    onChange={({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
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

// Later we can call this
setContent(pageNumber, ReactComponent)

render(<Pagination pageCount={2} />)
```

---


## Demos

### Default pagination


```tsx
render(<Pagination pageCount={888} currentPage={4} onChange={({
  pageNumber
}) => {
  console.log('onChange:', pageNumber);
}}>
      <P>Current Page Content</P>
    </Pagination>)
```


If you need to access methods provided by the render property arguments.


```tsx
render(<Pagination pageCount={5} startupPage={3} onChange={({
  pageNumber
}) => {
  console.log('onChange:', pageNumber);
}}>
      {({
    pageNumber
  }) => <P>Page {pageNumber}</P>}
    </Pagination>)
```


### Horizontal pagination


```tsx
render(<Pagination pageCount={888} currentPage={4} onChange={({
  pageNumber
}) => {
  console.log('onChange:', pageNumber);
}} paginationBarLayout="horizontal">
      <P>Current Page Content</P>
    </Pagination>)
```


### Centered Pagination with random delay

Note that we keep the height of the previous page. All pages can for sure have their own height.


```tsx
render(<Pagination align="center" pageCount={30}>
      {({
    pageNumber,
    setContent
  }) => {
    // simulate server communication delay
    const timeout = setTimeout(() => {
      setContent(pageNumber, <LargePage>{pageNumber}</LargePage>);
    }, Math.ceil(Math.random() * 500));
    return () => clearTimeout(timeout);
  }}
    </Pagination>)
```


### Infinity scroller demos

Check out [demos for the Infinity Scroller](/uilib/components/pagination/infinity-scroller).

## Properties


```json
{
  "props": {
    "mode": {
      "doc": "If set to `infinity`, then the pagination bar will not be shown, but infinity scrolling will do the content presentation. For more information, check out the [Infinity Scroller](/uilib/components/pagination/infinity-scroller). Defaults to `pagination`.",
      "type": [
        "\"pagination\"",
        "\"infinity\""
      ],
      "status": "optional"
    },
    "paginationBarLayout": {
      "doc": "The layout of the pagination bar. Defaults to `vertical`.",
      "type": [
        "\"vertical\"",
        "\"horizontal\""
      ],
      "status": "optional"
    },
    "children": {
      "doc": "The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.",
      "type": [
        "React.ReactNode",
        "function"
      ],
      "status": "optional"
    },
    "align": {
      "doc": "Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.",
      "type": [
        "\"left\"",
        "\"center\"",
        "\"right\""
      ],
      "status": "optional"
    },
    "startupPage": {
      "doc": "The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "currentPage": {
      "doc": "The page shown at the moment the component renders. Defaults to `1`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "pageCount": {
      "doc": "The total pages count. Defaults to `1`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "startupCount": {
      "doc": "Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "parallelLoadCount": {
      "doc": "Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "minWaitTime": {
      "doc": "The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "placeMarkerBeforeContent": {
      "doc": "If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "useLoadButton": {
      "doc": "If set to `true`, it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.",
      "type": "boolean",
      "status": "optional"
    },
    "hideProgressIndicator": {
      "doc": "If set to `true`, no indicator will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "pageElement": {
      "doc": "By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.",
      "type": [
        "string",
        "object",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "fallbackElement": {
      "doc": "(infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.",
      "type": [
        "string",
        "object",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "indicatorElement": {
      "doc": "(infinity mode) is used by the _indicator_. Falls back to `fallbackElement` if not defined.",
      "type": [
        "string",
        "object",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "markerElement": {
      "doc": "(infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.",
      "type": [
        "string",
        "object",
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "setContentHandler": {
      "doc": "Callback function to get the `setContent` handler from the current pagination instance, e.g. `setContentHandler={fn => (...)}`. Use this handler to insert content during infinity mode.",
      "type": "function",
      "status": "optional"
    },
    "resetContentHandler": {
      "doc": "Callback function to get the `resetContent` handler from the current pagination instance, e.g. `resetContentHandler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.",
      "type": "function",
      "status": "optional"
    },
    "resetPaginationHandler": {
      "doc": "Callback function to get the `resetInfinity` handler from the current pagination instance, e.g. `resetPaginationHandler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.",
      "type": "function",
      "status": "optional"
    },
    "endInfinityHandler": {
      "doc": "Callback function to get the `endInfinity` handler from the current pagination instance, e.g. `endInfinityHandler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.",
      "type": "function",
      "status": "optional"
    },
    "buttonTitle": {
      "doc": "The title used in every button shown in the bar. Defaults to `Side %s`.",
      "type": "string",
      "status": "optional"
    },
    "nextTitle": {
      "doc": "The title used in the next page button. Defaults to `Neste side`.",
      "type": "string",
      "status": "optional"
    },
    "prevTitle": {
      "doc": "The title used in the previous page button. Defaults to `Forrige side`.",
      "type": "string",
      "status": "optional"
    },
    "morePages": {
      "doc": "The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.",
      "type": "string",
      "status": "optional"
    },
    "isLoadingText": {
      "doc": "Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.",
      "type": "string",
      "status": "optional"
    },
    "barSpace": {
      "doc": "Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or `16px`. See property [space](/uilib/layout/space/properties).",
      "type": "Various",
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
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Pagination.buttonTitle": {
      "nb-NO": "Side %s",
      "en-GB": "Page %s",
      "sv-SE": "Sida %s",
      "da-DK": "Side %s"
    },
    "Pagination.isLoadingText": {
      "nb-NO": "Laster nytt innhold",
      "en-GB": "Loading new content",
      "sv-SE": "Laddar nytt innehåll",
      "da-DK": "Indlæser nyt indhold"
    },
    "Pagination.loadButtonText": {
      "nb-NO": "Vis mer innhold",
      "en-GB": "Show more content",
      "sv-SE": "Visa mer innehåll",
      "da-DK": "Vis mere indhold"
    },
    "Pagination.morePages": {
      "nb-NO": "%s flere sider",
      "en-GB": "%s more pages",
      "sv-SE": "%s fler sidor",
      "da-DK": "%s flere sider"
    },
    "Pagination.nextTitle": {
      "nb-NO": "Neste side",
      "en-GB": "Next page",
      "sv-SE": "Nästa sida",
      "da-DK": "Næste side"
    },
    "Pagination.prevTitle": {
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
  "props": {
    "onChange": {
      "doc": "Will be called for every page change, regardless if the mode is `mode=\"infinity\"` or not. Returns an object with number of useful properties and methods. See below for more details.",
      "type": "function",
      "status": "optional"
    },
    "onStartup": {
      "doc": "Only on **infinity** mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. **NB:** Will be called again as soon as we reset the content by calling `resetContent()`.",
      "type": "function",
      "status": "optional"
    },
    "onLoad": {
      "doc": "Only on **infinity** mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.",
      "type": "function",
      "status": "optional"
    },
    "onEnd": {
      "doc": "Only on **infinity** mode. Will be called once `pageCount` is reached or `endInfinity` was called.",
      "type": "function",
      "status": "optional"
    }
  }
}
```


## Returned object

Events have several useful methods to change / manipulate the content.

### Pagination mode

```jsx
<Pagination
  onChange={({ pageNumber, ...methods }) => {
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
  onChange={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
```

- `pageNumber` the current page number
- `setContent` use it to add update a page including content: `setContent(pageNumber, ReactComponent, position = 'after')`
- `endInfinity` use it to tell the infinity pagination to end the infinity scrolling interaction. Use this handler to end the infinity scrolling procedure, in case the pageCount is unknown: `endInfinity(pageNumber)`
- `resetContent` use it to invalidate all internal pages: `resetContent()`
- `resetInfinity` use it to reset the internal pagination states: `resetInfinity(pageNumber = startupPage)`
- `items` internal stored pages
