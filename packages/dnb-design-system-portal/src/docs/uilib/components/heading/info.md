---
showTabs: true
---

## Description

The Heading component is a helper to create automated semantic headings within a boundary of the web heading rules.

> Basically, only assistive technologies do need semantic headings. But they need them correct.

How does it work? The heading leveling is handled synchronously. But you can easily isolate one level, or a part by using a context provider: `<Heading.Level ...`. This allows you to later, asynchronous, add new headings inside. You can nest several contexts inside each.

The first code example is without using context provider. To handle levels in batches or asynchronous, use a `Heading.Level` context provider.

```jsx
import { Heading } from '@dnb/eufemia/components'

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

**NB:** Instead of `increase` and `decrease` you can use `up` and `down` as well.

### Heading level core-concept

- A **heading** will inherit its level from its previous sibling.
- A **level provider** will create an isolated level context (`Heading.Level`).
- A heading, nested inside a context (`Heading.Level`) will likewise inherit the previous context level.
- A heading can have a set of different [size](/uilib/typography/heading#headings) properties. More details below.

### Defining heading styles / sizes

For the visual part, we simply use [typography styles](/uilib/typography/heading) with the `size` property, e.g. `size="x-large"`

```jsx
import { Heading } from '@dnb/eufemia/components'

render(
  <Heading increase size="xx-large">
    h2, but looks like h1
  </Heading>
)
```

### Heading level rules and corrections

The correction will ensure that:

1. a heading will start with a level **1**.
1. the second level will get corrected be level **2**.
1. if a level will increase with a factor of more than one (level={>1}), it will get corrected to only increase by one (**1**).
1. if a level will be set to **1** a second time, it will get corrected to level **2**.

You get a `console.warn` warning (only in development) about corrections. You can attach a custom warning / handler if you need that: `<Heading.Level debug={(...logs) => console.info(...logs)}>`

You can also disable corrections by using the property `skip_correction={true}`.

### Heading level context provider / asynchronous

In order to control leveling of headings systematically, you can make use of the `Heading.Level`, `Heading.Increase` or `Heading.Decrease` providers.

They are completely optional. But can help out to solve some kinds of challenges or logic.

```jsx
import { Heading } from '@dnb/eufemia/components'

render(
  <article>
    <Heading>h1</Heading>
    <Heading.Level level="2">
      <Heading>h2</Heading>
      <Heading increase>h3</Heading>
      <Heading>still h3</Heading>
      <Heading.Increase>
        <Heading>h4</Heading>
        <Heading>still h4</Heading>
      </Heading.Increase>
    </Heading.Level>
  </article>
)
```

_TODO:_ Integration with the [global Provider](/uilib/usage/customisation/provider).

### Skip auto correction and warnings

First, warnings will not show up in production builds. And to skip the auto correction of heading levels, simply use the `skip_correction` property.

### Heading levels interceptor modification

```js
import { resetLevels, setNextLevel } from '@dnb/eufemia/components/Heading'

// e.g. during Gatsby route change
export const onRouteUpdate = () => {
  resetLevels(1)

  // You can also call this method like this:
  Heading.resetLevels(1)
}

// e.g. if you for some reason have to force setting a new level (Heading.setNextLevel)
setNextLevel(3)
```

**Limitations:** `resetLevels` and `setNextLevel` does not change contexts with an entry level higher than one (1).
In order to change also contexts, you can set `overwriteContext` to true:

```js
Heading.resetLevels(1, { overwriteContext: true })
Heading.setNextLevel(4, { overwriteContext: true })
```

#### Heading and routers

In order to reset the leveling during a page transition on using `react-router-dom` v5, you can make use of `withRouter`.
In v6 or `@reach/router`, you just cal it in the correct "page" component.
You could additionally define "what is a page change" and what not, by using the `location: { pathname }` property you get inside these routing components.

### Basic heading elements

You may still consider of using the basic elements. But keep in mind, you have to define headings responsibly.

```jsx
import { H1, H2 } from '@dnb/eufemia/elements'

render(
  <article>
    <H1 size="large">h1</H1>
    <H2 size="xx-large">h2</H2>
  </article>
)
```
