---
title: 'VisuallyHidden'
description: 'VisuallyHidden has all the styles necessary to hide it from visual clients, but keep it for screen readers.'
metadata: https://eufemia.dnb.no/uilib/components/visually-hidden/metadata.json
---

## Import

```tsx
import { VisuallyHidden } from '@dnb/eufemia'
```

## Description

`VisuallyHidden` is a utility component that can be used to hide its children visually while keeping them visible to screen readers and other assistive technology. It uses the global helper class `.dnb-sr-only` under the hood.

**NOTE:** Many semantic elements, such as button elements, have meaning to assistive devices and browsers that provide context for the user and, in many cases, provide or restrict interactive behaviors. Use caution when overriding our defaults and make sure that the element you choose to render provides the same experience for all users. In short, the component shouldn't be used to hide interactive content.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/visually-hidden)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/visually-hidden)

## Demos

### VisuallyHidden

```tsx
render(
  <P>
    <span>before|</span>
    <VisuallyHidden>hidden content</VisuallyHidden>
    <span>|after</span>
  </P>,
)
```

### VisuallyHidden with focusable content

Use `VisuallyHidden` with `focusable={true}` to visually hide an element by default, but to display it when it’s focused (e.g. by a keyboard-only user). The container will be displayed when any child element of the container receives focus.

```tsx
render(
  <VisuallyHidden focusable>
    <Anchor href="/">Hidden, but focusable content</Anchor>
  </VisuallyHidden>,
)
```

### VisuallyHidden with example of use case

```tsx
render(
  <Anchor href="/">
    Read more <VisuallyHidden>about Eufemia</VisuallyHidden>
  </Anchor>,
)
```

### VisuallyHidden with custom element

```tsx
const Box = styled.div`
  width: 1rem;
  height: 1rem;
`
const BoxBefore = styled(Box)`
  background-color: var(--color-summer-green);
`
const BoxAfter = styled(Box)`
  background-color: var(--color-emerald-green);
`
render(
  <>
    <BoxBefore />
    <VisuallyHidden aria-label="I'm a region" element={Section}>
      <P>but, not visible to you!</P>
    </VisuallyHidden>
    <BoxAfter />
  </>,
)
```
