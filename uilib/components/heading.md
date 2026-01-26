---
title: 'Heading'
description: 'The Heading component is a helper to create automated semantic headings within a boundary of some rules.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.339Z
checksum: 400a63665aa7aca0b3826acdfea84d1ee954466136ea1f63030445e5fe2760db
---

# Heading

## Import

```tsx
import { Heading } from '@dnb/eufemia'
```

## Description

The Heading component is a helper to create automated semantic headings within a boundary of the web heading rules.

> Basically, only assistive technologies do need semantic headings. But they need them correct.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/heading)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/heading)

How does it work? The heading leveling is handled synchronously. But you can easily isolate one level, or a part by using a context provider: `<Heading.Level ...`. This allows you to later, asynchronous, add new headings inside. You can nest several contexts inside each.

The first code example is without using context provider. To handle levels in batches or asynchronous, use a `Heading.Level` context provider.

```tsx
render(
  <Heading.Level reset={1}>
    <Heading>h1</Heading>
    <Heading>h2</Heading>
    <Heading increase>h3</Heading>
    <Heading>still h3</Heading>
    <Heading increase>h4</Heading>
    <Heading increase>h5</Heading>
    <Heading decrease>h4</Heading>
    <Heading level={2}>back to h2</Heading>
    <Heading increase>h3</Heading>
  </Heading.Level>
)
```

**NB:** Instead of `increase` and `decrease` you can use `up` and `down` as well.

### Heading level core-concept

- A **heading** will inherit the level from its previous sibling.
- A **level provider** will create an isolated level context (`Heading.Level`).
- A heading, nested inside a context (`Heading.Level`) will likewise inherit the previous context level.
- A heading can have a set of different [size](/uilib/elements/heading#headings) properties. More details below.

### Defining heading styles / sizes

For the visual part, we simply use [typography styles](/uilib/elements/heading) with the `size` property, e.g. `size="x-large"`

```tsx
render(
  <Heading.Level reset={2}>
    <Heading increase size="xx-large">
      h3, but looks like h1
    </Heading>
  </Heading.Level>
)
```

### Heading level rules and corrections

The correction will ensure that:

1. a heading will start with a level **1**.
1. the second level will get corrected be level **2**.
1. if a level will increase with a factor of more than one (level=\{>1\}), it will get corrected to only increase by one (**1**).
1. if a level will be set to **1** a second time, it will get corrected to level **2**.

You get a `console.warn` warning (only in development) about corrections. You can attach a custom warning / handler if you need that: `<Heading.Level debug={(...logs) => console.info(...logs)}>`

You can also disable corrections by using the property `skip_correction={true}`.

### Heading level context provider / asynchronous

In order to control leveling of headings systematically, you can make use of the `Heading.Level`, `Heading.Increase` or `Heading.Decrease` providers.

They are completely optional. But can help out to solve some kinds of challenges or logic.

```tsx
render(
  <Heading.Level reset={1}>
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
  </Heading.Level>
)
```

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
In v6 or `@reach/router`, you just call it in the correct "page" component.
You could additionally define "what is a page change" and what not, by using the `location: { pathname }` property you get inside these routing components.

### Basic heading elements

You may still consider of using the basic elements. But keep in mind, you have to define headings responsibly.

```tsx
render(
  <article>
    <H1 size="large">h1</H1>
    <H2 size="xx-large">h2</H2>
  </article>
)
```

## Demos

**NB:** All the demos do use `<Heading.Level reset={1} ...`. This way every demo does reset the global level handling. You do not need that in your app.

### Default headings

```tsx
render(
  <Style>
    <ComponentBox data-visual-test="heading-default">
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>
        <Heading increase>h3</Heading>
        <Heading increase>h4</Heading>
        <Heading decrease>h3</Heading>
        <Heading level="2" size="x-large">
          h2
        </Heading>
        <Heading skip_correction level={4}>
          h4
        </Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)
```

### Heading level context

```tsx
render(
  <Style>
    <ComponentBox data-visual-test="heading-context">
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>

        <Heading.Increase>
          <Heading>h3</Heading>
          <Heading>h3</Heading>
        </Heading.Increase>

        <Heading inherit>h3</Heading>

        <Heading.Decrease inherit>
          <Heading>h2</Heading>
          <Heading>h2</Heading>
          <Heading increase>h3</Heading>
          <Heading>h3</Heading>
        </Heading.Decrease>
      </Heading.Level>
    </ComponentBox>
  </Style>
)
```

### Level isolation

```tsx
render(
  <Style>
    <ComponentBox>
      {() => {
        const App = () => {
          const [showHeading, setShowHeading] = React.useState(false)
          return (
            <Heading.Level debug reset={1}>
              <Heading>h1</Heading>
              <Heading>h2</Heading>

              <Heading.Increase>
                <ToggleButton
                  text="Toggle h3"
                  checked={showHeading}
                  onChange={() => setShowHeading((c) => !c)}
                />
                {showHeading && (
                  <>
                    <Heading>h3</Heading>
                    <Heading>h3</Heading>
                    <Heading>h3</Heading>
                  </>
                )}
              </Heading.Increase>

              <Heading.Level>
                <Heading>h2</Heading>
              </Heading.Level>
            </Heading.Level>
          )
        }
        return <App />
      }}
    </ComponentBox>
  </Style>
)
```

### Combine with manual heading

```tsx
render(
  <Style>
    <ComponentBox data-visual-test="heading-mixin">
      <Heading.Level debug reset={1}>
        <Heading>h1</Heading>
        <Heading>h2</Heading>

        <H3 level="use">Increase to h3</H3>
        <Heading>h3</Heading>
      </Heading.Level>
    </ComponentBox>
  </Style>
)
```

## Properties

```json
{
  "text": {
    "doc": "A heading, can be text or React.Node.",
    "type": "React.Node",
    "status": "optional"
  },
  "children": {
    "doc": "A heading, can be text or React.Node.",
    "type": "React.Node",
    "status": "optional"
  },
  "size": {
    "doc": "Define the typography [font-size](/uilib/typography/font-size) by a size _type_, e.g. `x-large`. Defaults to the predefined heading sizes.",
    "type": [
      "xx-large",
      "x-large",
      "large",
      "medium",
      "basis",
      "small",
      "x-small"
    ],
    "status": "optional"
  },
  "level": {
    "doc": "Overwrite the automated level handling to use a specific value to ensure correct level hierarchy.",
    "type": ["1", "2", "3", "4", "5", "6"],
    "status": "optional"
  },
  "increase": {
    "doc": "If set to `true`, the heading level will be incremented by 1.",
    "type": "boolean",
    "status": "optional"
  },
  "decrease": {
    "doc": "If set to `true`, the heading level will be decremented by 1.",
    "type": "boolean",
    "status": "optional"
  },
  "inherit": {
    "doc": "If set to `true`, the heading last used level will be inherited. Also from inside a level context.",
    "type": "boolean",
    "status": "optional"
  },
  "reset": {
    "doc": "If set to `true`, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.",
    "type": ["boolean", "number"],
    "status": "optional"
  },
  "skip_correction": {
    "doc": "If set to `true`, the heading will not be corrected and warnings will not be shown. Warnings do not show up in **production builds** else either",
    "type": "boolean",
    "status": "optional"
  },
  "debug": {
    "doc": "If set to `true`, the content will have a prefix, showing the heading level.",
    "type": ["boolean", "function"],
    "status": "optional"
  },
  "debug_counter": {
    "doc": "If set to `true`, the content will have both a prefix and a JSON log attached to both headings and level contexts.",
    "type": ["boolean", "function"],
    "status": "optional"
  },
  "element": {
    "doc": "Define what HTML element should be used. If you use, e.g. a `span`, then `role=\"heading\"` and `aria-level` gets set. Defaults to semantic heading element.",
    "type": ["string", "React.Element"],
    "status": "optional"
  },
  "skeleton": {
    "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
    "type": "boolean",
    "status": "optional"
  },
  "proseMaxWidth": {
    "doc": "Sets the maximum width based on character count. This will limit the text width to approximately the specified number of characters. Use `true` for a default value of 60ch.",
    "type": ["number", "boolean"],
    "status": "optional"
  },
  "[Space](/uilib/layout/space/properties)": {
    "doc": "Spacing properties like `top` or `bottom` are supported.",
    "type": ["string", "object"],
    "status": "optional"
  }
}
```

Properties which do apply to the provider (level context) `Heading.Level` as well:

- `increase`
- `decrease`
- `inherit`
- `reset`
- `skip_correction`
- `debug`
