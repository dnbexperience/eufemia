---
title: 'Media Queries'
order: 2
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
MediaQueryLiveExample,
MediaQueryUseMedia,
} from 'dnb-design-system-portal/src/docs/uilib/usage/layout/Examples'

# Media Queries and Breakpoints

In order to make it as declarative and easy to handle media queries from JavaScript, you may be interested to [use both](/uilib/usage/layout/media-queries#mediaquery-component-and-the-usemediaquery-hook) the `MediaQuery` React component and the `useMediaQuery` React hook.

## Media Queries Properties Table

UX designers are using a 12 column system during their design processes.

| Pixel | Type     | Rem      | Custom Property   | Comments   |
| ----- | -------- | -------- | ----------------- | ---------- |
| 640   | `small`  | **40em** | `--layout-small`  | 4 columns  |
| 960   | `medium` | **60em** | `--layout-medium` | 6 columns  |
| 1152  | `large`  | **72em** | `--layout-large`  | 12 columns |

<!-- (not documented yet) | 1280  | `x-large`  | **80em** | `--layout-x-large`  | 12 columns | -->
<!-- (not documented yet) | 1440  | `xx-large` | **90em** | `--layout-xx-large` |            | -->

## MediaQuery component and React Hooks

Both the component and the React Hooks uses the JavaScript API [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

- [useMedia](/uilib/usage/layout/media-queries/#usemedia-hook-usage) React Hook for screen width only.
- [useMediaQuery](/uilib/usage/layout/media-queries/#usemediaquery-hook-usage) React Hook for all kinds of media queries.
- [MediaQuery](/uilib/usage/layout/media-queries/#mediaquery-component) Component for all kinds of media queries.

### Re-render and performance

By using `matchMedia` we only render when the requested media query actually changes. So we do not need to listen to e.g. `window.addEventListener('resize', ...)` which is a performance waste, even with a debounce helper.

### CSS similarity

It uses the same query API as CSS uses. You are able to provide your query also raw, by using e.g. `query="(min-width: 60em)"`. But your custom queries will quickly grow and mess up your application code unnecessarily.

### Properties

You can both use `min` and `max`, they are equivalent to `minWidth` and `maxWidth`.

CamelCase properties will be converted to kebab-case.

### SSR

During a SSR (Server Side Render) we do not have the clients `window.matchMedia`. In order to make the initial render to a positive match, you can set the `matchOnSSR={true}` property.

### Units

Numeric values will be handled as an `em` unit.

### `useMedia` hook usage

```js
import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()

  return isSmall ? 'true' : 'false'
}
```

To lower the possibility of CLS (Cumulative Layout Shift) on larger screens – you can make use of the `isSSR` property. Try to use it in combination with `isLarge`, because the negative CLS experience is most recoginzeable on larger screens:

```js
import { useMedia } from '@dnb/eufemia/shared'

function Component() {
  const { isSmall, isMedium, isLarge, isSSR } = useMedia()

  return isLarge || isSSR ? 'true' : 'false'
}
```

<MediaQueryUseMedia />

You can disable the usage of `window.matchMedia` by providing `useMedia({ disabled: true })`.

You can log the media query by providing `useMedia({ log: true })`.

### `useMediaQuery` hook usage

This React Hook is a more extended version, where you can define all sorts of Media Queries.

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

<MediaQueryLiveExample />

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

You find the [properties on this page](/uilib/shared/media-query/properties).

#### Interceptor on change listener

```jsx
import { onMediaQueryChange } from '@dnb/eufemia/shared/MediaQuery'

const remove = onMediaQueryChange({ min: 'medium' }, (match, event) => {
  // callback
})

// Will remove the listeners
remove()
```

### Use different breakpoints

It is possible to change the used breakpoint types by providing them to the Eufemia Provider.

Both the `MediaQuery` component and the hooks `useMedia` and `useMediaQuery` will merge and use these custom breakpoints.

**NB:** It should be done only temporary, because DNB should align on one set of breakpoints for best UX and consistency.

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

Based of the findings of [this article](https://zellwk.com/blog/media-query-units/) and [this webkit bug](https://bugs.webkit.org/show_bug.cgi?id=156684) Eufemia recommends to use `em` units for media query usage to meet the best overall browser support. Read [more about units](/uilib/usage/best-practices/for-styling#units).

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
