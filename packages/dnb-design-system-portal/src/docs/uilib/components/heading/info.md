---
showTabs: true
# import { Heading } from 'dnb-ui-lib/src'
---

## Description

The Heading component is a helper to create automated semantic headings within a boundary of some rules.

> Basically, only assistive technologies do have need for semantic headings. But they need them correct.

**NB:** Instead of `increase` and `decrease` you can use `up` and `down` as well.

This Example is without using provider/context. To handle levels more smart, use the `Heading.Level` provider.

```jsx
import { Heading } from 'dnb-ui-lib/components'

render(
  <article>
    <Heading>h1</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>still h3</Heading>
    <Heading increase>h4</Heading>
    <Heading increase>h5</Heading>
    <Heading decrease>h4</Heading>
    <Heading level={2}>back to h2</Heading>
    <Heading increase>h3</Heading>
    ...
  </article>
)
```

### Heading level rules and corrections

The correction will ensure that:

1. a heading will always start with a level **1**
1. the second will automatically be level **2**
1. if a level will increase with a factor of more than one (level={>1}), it will get corrected to only increase by one (**1**).
1. if a level will be set to **1** a second time, it will get corrected to level **2**.

You get a `console.warn` warning (only in development) about corrections. You can attach a custom warning / handler if you want: `<Heading.Level debug={(...logs) => console.info(...logs)}>`
You can also disable corrections by using the property `skip_correction={true}`.

### Defining heading styles

For the visual part, we simply use [typography styles](/uilib/typography/heading) with the `size` property.

### Level context

In order to control leveling of headings accordingly, you can make use of the `Heading.Level`, `Heading.Increase` or `Heading.Decrease` providers.

They are completely optional. But can some times help out to solve some kinds of challenges.

The first inherited Heading, inside of `Heading.Increase`, will get a new level by default.

```jsx
import { Heading } from 'dnb-ui-lib/components'

render(
  <Heading.Level reset_on_url_change={true}>
    <Heading>h1</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>still h3</Heading>
    <Heading.Increase>
      <Heading>h4</Heading>
      <Heading>still h4</Heading>
    </Heading.Increase>
  </Heading.Level>
)
```

### Skip auto correction and warnings

First, the warnings will not show up in production builds. And to skip the auto correction of heading levels, simply use the `skip_correction` property.

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
