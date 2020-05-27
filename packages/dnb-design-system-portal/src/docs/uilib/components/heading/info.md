---
showTabs: true
# import { Heading } from 'dnb-ui-lib/src'
---

## Description

The Heading component is a helper to create automated semantic headings within a boundary of some rules.

> Basically, only assistive technologies do have need for semantic headings. But they need them correct.

```jsx
import { Heading } from 'dnb-ui-lib/components'

render(
  <article>
    <Heading>h1</Heading>
    <Heading>h2</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>h3</Heading>
    <Heading decrease>h2</Heading>
    ...
  </article>
)
```

### Defining heading styles

For the visual part, we simply use [typography styles](/uilib/typography/heading) with the `size` property.

### Level context

In order to control leveling of headings accordingly, you can make use of the `Heading.Level` provider.

The first inherited Heading, inside of `Heading.Level` will get a new level by default.

```jsx
import { Heading } from 'dnb-ui-lib/components'

render(
  <Heading.Level>
    <Heading>h1</Heading>
    <Heading.Level>
      <Heading>h2</Heading>
      <Heading>h2</Heading>
    </Heading.Level>
  </Heading.Level>
)
```

### Heading levels interceptor modification

```js
import {
  resetLevels,
  setNextLevel
} from 'dnb-ui-lib/components/heading/Heading'

// e.g. during Gatsby route change
export const onRouteUpdate = () => {
  resetLevels()
}

// e.g. if you for some reason have to force setting a new level
setNextLevel(3)
```

### Basic heading elements

You may still consider of using the basic elements. But keep in mind, you have to define headings responsibly.

```jsx
import { H1, H2 } from 'dnb-ui-lib/elements'

render(
  <article>
    <H1 size="large">h1</H1>
    <H2 size="xx-large">h2</H2>
  </article>
)
```
