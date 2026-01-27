---
title: 'Media Queries'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.344Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Media Queries and Breakpoints

To make media queries more declarative and easier to handle from JavaScript, you may be interested in using both the `MediaQuery` React component and the `useMediaQuery` React hook.

## Media Queries Properties Table

UX designers are using a 12 column system during their design processes.

| Pixel | Type     | Rem      | Custom Property   | Comments   |
| ----- | -------- | -------- | ----------------- | ---------- |
| 640   | `small`  | **40em** | `--layout-small`  | 4 columns  |
| 960   | `medium` | **60em** | `--layout-medium` | 6 columns  |
| 1152  | `large`  | **72em** | `--layout-large`  | 12 columns |

### Breakpoint ranges

Applications in DNB actually break only twice (`small` and `medium`), but have an HTML body max-width of `large`.

| React hook | Range                             | SASS mixin                  | Columns |
| ---------- | --------------------------------- | --------------------------- | ------- |
| `isSmall`  | from 0 to 40em                    | `allBelow(small)`           | 4       |
| `isMedium` | from (not including) 40em to 60em | `allBetween(small, medium)` | 6       |
| `isLarge`  | from (not including) 60em         | `allAbove(medium)`          | 12      |

Note: if you've set [custom sass breakpoints](/uilib/helpers/sass/#custom-offset) using `$breakpoints` or `$breakpoint-offset`, the sass mixins will be different.

So when dealing with the naming of breakpoint ranges (between breakpoints), we use the term "large" when a media query exceeds `medium`:

<img
  width="100%"
  src={BreakpointRanges}
  alt="Breakpoint ranges clarification"
/>

<br />
<br />

Here is how ranges breaks down in pixels:

- The small range goes from 0 to 640px
- The medium range goes from 640.1px to 960px
- The large range goes from 960.1px to infinity

### UX Design and Breakpoints

When dealing with breakpoints, UX often designs only for two sizes. This leads to an unknown size between breakpoints. Check with your UX designer how your application should behave when the screen size is in between.

## MediaQuery component and React Hooks

Both the component and the React Hooks uses the JavaScript API [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

- **[useMedia](/uilib/usage/layout/media-queries/#usemedia-hook-usage)** React Hook for screen width only.

- **[useMediaQuery](/uilib/usage/layout/media-queries/#usemediaquery-hook-usage)** React Hook for all kinds of media queries.

- **[MediaQuery](/uilib/usage/layout/media-queries/#mediaquery-component)** Component for all kinds of media queries.

### Re-render and performance

By using `matchMedia`, we only render when the requested media query actually changes. This means we don't need to listen to `window.addEventListener('resize', ...)`, which is a performance waste, even with a debounce helper.

### CSS similarity

It uses the same query API as CSS. You can also provide your query raw by using, for example, `query="(min-width: 60em)"`. However, custom queries can quickly grow and clutter your application code unnecessarily.

### Properties

You can both use `min` and `max`, they are equivalent to `minWidth` and `maxWidth`.

CamelCase properties will be converted to kebab-case.

### SSR

During SSR (Server Side Render), we don't have access to the client's `window.matchMedia`. To make the initial render result in a positive match, you can set the `matchOnSSR={true}` property.

### Units

Numeric values will be handled as an `em` unit.

### `useMedia` hook usage

The `useMedia` hook acts like a switch, where only one of the properties will be true at a time.

```tsx
import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()

  return isSmall && <IsVisibleWhenSmall />
}
```

The returned constants like `isLarge` etc. are within "breakpoint ranges" – likewise the SCSS mixins such as `allAbove` etc.

See the [table above](#breakpoint-ranges) for the available breakpoints and their corresponding media queries.

#### SSR (Server Side Render) usage

To lower the possibility of CLS (Cumulative Layout Shift) on larger screens, you can use the `isSSR` property. Try to use it in combination with `isLarge` because the negative CLS experience is most noticeable on larger screens:

```tsx
import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()

  return (isLarge || isSSR) && <IsVisibleDuringSsrAndWhenLarge />
}
```

During SSR, when no `window` object is available, all results are negative. But you can provide a `initialValue`:

```tsx
import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall } = useMedia({
    initialValue: {
      isSmall: true,
    },
  })

  return isSmall && <IsVisibleDuringSSR />
}
```

Here are all the options:

```tsx
import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall } = useMedia({
    /**
     * Provide an initial value that is used during SSR as well.
     * Default: null
     */
    initialValue?: Partial<UseMediaResult>

    /**
     * If set to true, no MediaQuery will be used.
     * Default: false
     */
    disabled?: boolean

    /**
     * Provide a custom breakpoint
     * Default: defaultBreakpoints
     */
    breakpoints?: MediaQueryBreakpoints

    /**
     * Provide a custom query
     * Default: defaultQueries
     */
    queries?: Record<string, MediaQueryCondition>

    /**
     * For debugging
     */
    log?: boolean
  })

  return isSmall
}
```

```tsx
const Playground = () => {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()
  const { innerWidth } = useWindowWidth()
  return (
    <Code>
      <pre>
        {JSON.stringify(
          {
            isSmall,
            isMedium,
            isLarge,
            isSSR,
            innerWidth,
          },
          null,
          2
        )}
      </pre>
    </Code>
  )
}
render(<Playground />)
```

You can disable the usage of `window.matchMedia` by providing `useMedia({ disabled: true })`.

You can log the media query by providing `useMedia({ log: true })`.

### `useMediaQuery` hook usage

This React Hook is a more extended version where you can define all sorts of media queries.

```js
import { useMediaQuery } from '@dnb/eufemia/shared'
// or
import useMediaQuery from '@dnb/eufemia/shared/useMediaQuery'

function Component() {
  const match = useMediaQuery({
    matchOnSSR: true,
    when: { min: 'medium' },
  })

  return match ? 'true' : 'false'
}
```

You can disable the usage of `window.matchMedia` by providing `useMedia({ disabled: true })`.

### Live example

This example uses the `not` property to reverse the behavior.

```tsx
const Playground = () => {
  const [query, updateQuery] = React.useState({
    screen: true,
    not: true,
    min: 'small',
    max: 'large',
  })
  const match1 = useMediaQuery({
    matchOnSSR: true,
    when: query,
  })
  const match2 = useMediaQuery({
    matchOnSSR: true,
    not: true,
    when: query,
  })
  React.useEffect(() => {
    console.log('mediaQuery:', match1, match2)
  }, [match1, match2])
  return (
    <>
      <Button
        onClick={() => {
          updateQuery({
            ...query,
            screen: !query.screen,
          })
        }}
        right
      >
        Switch
      </Button>
      <MediaQuery when={query}>
        <Code>when</Code>
      </MediaQuery>
      <MediaQuery not when={query}>
        <Code>not when</Code>
      </MediaQuery>
    </>
  )
}
render(<Playground />)
```

### `MediaQuery` component

```js
import { MediaQuery } from '@dnb/eufemia/shared'
// or
import MediaQuery from '@dnb/eufemia/shared/MediaQuery'
```

You have plenty of possibilities to mix and match:

```jsx
<MediaQuery when={{ min: 'medium' }}>
  matches all above medium screens
</MediaQuery>

<MediaQuery when={{ screen: true, orientation: 'landscape' }}>
  matches orientation landscape screens
</MediaQuery>

<MediaQuery not when={{ min: 'large' }}>
  matches all, but beneath large screens
</MediaQuery>

<MediaQuery matchOnSSR when={{ min: 'small', max: 'medium' }}>
  matches small and medium screens and during SSR
</MediaQuery>

<MediaQuery when={[{ min: 'small', max: 'large' }, { print: true }]}>
  matches all between small and large screens or all print media
</MediaQuery>

<MediaQuery when={{ max: '60em' }}>
  matches screens to a max of 60em
</MediaQuery>

<MediaQuery query="(min-width: 40em) and (max-width: 72em)">
  matches screens between 40em and 72em
</MediaQuery>
```

you can find the [properties on this page](/uilib/shared/media-query/properties).

#### Interceptor on change listener

```jsx
import { onMediaQueryChange } from '@dnb/eufemia/shared/MediaQuery'

const remove = onMediaQueryChange({ min: 'medium' }, (match, event) => {
  // Callback
})

// Remove the listeners
remove()
```

### Use different breakpoints

It is possible to change the used breakpoint types by providing them to the Eufemia Provider.

Both the `MediaQuery` component and the hooks `useMedia` and `useMediaQuery` will merge and use these custom breakpoints.

**NB:** This should only be done temporarily, because DNB should align on one set of breakpoints for the best UX and consistency.

```jsx
import { Provider } from '@dnb/eufemia/shared'
...
<Provider
  value={{
    breakpoints: {
      small: '40em',
      medium: '60em',
      large: '72em',
    },
  }}
>
  <App />
</Provider>
```

### Import breakpoints into JavaScript

You get an object with the values and the types as the keys.

```js
import { defaultBreakpoints } from '@dnb/eufemia/shared/MediaQueryUtils'
```

## SASS / SCSS mixins

You can re-use the SASS mixins from Eufemia:

```scss
// breakpoints.scss
@import '@dnb/eufemia/style/core/utilities';
$layout-small: map-get($breakpoints, 'small');
$layout-medium: map-get($breakpoints, 'medium');
$layout-large: map-get($breakpoints, 'large');
```

or like this:

```scss
@import '@dnb/eufemia/style/core/utilities';

@include allBelow(large) {
  /* Your CSS */
}

@include allAbove(small) {
  /* Your CSS */
}
```

## Media Queries Examples

```css
@media screen and (max-width: 40em) {
  /* small */
}
@media screen and (max-width: 60em) {
  /* medium */
}
@media screen and (max-width: 72em) {
  /* large */
}
```

Based on the findings of [this article](https://zellwk.com/blog/media-query-units/) and [this webkit bug](https://bugs.webkit.org/show_bug.cgi?id=156684), Eufemia recommends using `em` units for media queries to achieve the best overall browser support. Read [more about units](/uilib/usage/best-practices/for-styling#units).

## How to deal with Jest

You can mock `window.matchMedia` with e.g. [jest-matchmedia-mock](https://www.npmjs.com/package/jest-matchmedia-mock).

```js
import MatchMediaMock from 'jest-matchmedia-mock'

const matchMedia = new MatchMediaMock()

it('your test', () => {
  matchMedia.useMediaQuery('(min-width: 40em) and (max-width: 60em)')
  ...
})
```
