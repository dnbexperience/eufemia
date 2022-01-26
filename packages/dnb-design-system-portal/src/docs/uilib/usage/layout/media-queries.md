---
title: 'Media Queries'
order: 2
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import MediaQuery from '@dnb/eufemia/src/shared/MediaQuery'
import useMediaQuery from '@dnb/eufemia/src/shared/useMediaQuery'

# Media Queries and Breakpoints

In order to make it as declarative and easy to handle media queries from JavaScript, you may be interested to [use both](/uilib/usage/layout/media-queries#mediaquery-component-and-the-usemediaquery-hook) the `MediaQuery` React component and the `useMediaQuery` React hook.

## Media Queries Properties Table

UX designers are using a 12 column system during their design processes.

| Pixel | Type       | Rem      | Custom Property     | Comments    |
| ----- | ---------- | -------- | ------------------- | ----------- |
| 640   | `small`    | **40em** | `--layout-small`    | Mobile      |
| 800   | `medium`   | **50em** | `--layout-medium`   |             |
| 960   | `large`    | **60em** | `--layout-large`    | DNB default |
| 1152  | `x-large`  | **72em** | `--layout-x-large`  |             |
| 1280  | `xx-large` | **80em** | `--layout-xx-large` |             |

<!-- | 1440  | `xxx-large` | **90em** | `--layout-xxx-large` |             | -->

## MediaQuery component and the useMediaQuery hook

Both the component and the hook uses the JavaScript API [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

### Re-render and performance

By using `matchMedia` we only render when the requested media query actually changes. So we do not need to listen to e.g. `window.addEventListener('resize', ...)` which is a performance waste, even with a debounce helper.

### CSS similarity

It uses the same query API as CSS uses. You are able to provide your query also raw, by using e.g. `query="(min-width: 50em)"`. But your custom queries will quickly grow and mess up your application code unnecessarily.

### Properties

You can both use `min` and `max`, they are equivalent to `minWidth` and `maxWidth`.

CamelCase properties will be converted to kebab-case.

### SSR

During a SSR (Server Side Render) we do not have the clients `window.matchMedia`. In order to make the initial render to a positive match, you can set the `matchOnSSR={true}` property.

### Units

Numeric values will be handled as an `em` unit.

### `MediaQuery` usage

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

<MediaQuery when={[{ min: 'small', max: 'x-large' }, { print: true }]}>
  matches all between small and x-large screens or all print media
</MediaQuery>

<MediaQuery when={{ max: '80em' }}>
  matches screens to a max of 80em
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

### `useMediaQuery` hook usage

```js
import { useMediaQuery } from '@dnb/eufemia/shared'
// or
import useMediaQuery from '@dnb/eufemia/shared/useMediaQuery'
```

```jsx
function Component() {
  const match = useMediaQuery({
    matchOnSSR: true,
    when: { min: 'medium' },
  })

  return match ? 'true' : 'false'
}
```

### Live example

This example uses the `not` property to reverse the behavior.

<!-- prettier-ignore-start -->

<ComponentBox
  data-visual-test="media-query"
  scope={{ MediaQuery, useMediaQuery }}
  useRender
  hideCode
>
{`
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
  console.log('mediaQuery:', match1, match2)
  return (<>
    <Button
      onClick={() => {
        updateQuery({
          ...query,
          screen: !query.screen,
        })
      }}
      right
    >
      Change
    </Button>
    <MediaQuery when={query}>
      <Code>when</Code>
    </MediaQuery>
    <MediaQuery not when={query}>
      <Code>not when</Code>
    </MediaQuery>
  </>)
}
render(Playground)
`}
</ComponentBox>

<!-- prettier-ignore-end -->

### Use different breakpoints

It is possible to change the used breakpoint types by providing them to the Eufemia Provider.

Both the `MediaQuery` component and the `useMediaQuery` hook will merge and use these custom breakpoints.

```jsx
import { Provider } from '@dnb/eufemia/shared'
...
<Provider
  value={{
    breakpoints: {
      xsmall: '20em',
      medium: '30em',
      large: '60em',
    },
  }}
>
  ...
  <MediaQuery when={{ min: 'xsmall' }}>
    matches all above xsmall screens
  </MediaQuery>
  ...
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
@import '@dnb/eufemia/style/core/utilities.scss';

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
  /* small (mobile) */
}
@media screen and (max-width: 50em) {
  /* medium */
}
@media screen and (max-width: 60em) {
  /* large (default) */
}
@media screen and (min-width: 60em) and (max-width: 72em) {
  /* x-large */
}
@media screen and (min-width: 70em) and (max-width: 80em) {
  /* xx-large */
}
```

Based of the findings of [this article](https://zellwk.com/blog/media-query-units/) and [this webkit bug](https://bugs.webkit.org/show_bug.cgi?id=156684) Eufemia recommends to use `em` units for media query usage to meet the best overall browser support. Read [more about units](/uilib/usage/best-practices/for-styling#units).
