---
title: 'Ingress'
description: 'Ingress is a brief, introductory paragraph that follows immediately after the title of an article.'
metadata: https://eufemia.dnb.no/uilib/elements/ingress/metadata.json
---

## Import

```tsx
import { Ingress } from '@dnb/eufemia/elements'
```

## Description

An ingress is a brief, introductory paragraph that follows immediately after the title of an article.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/Ingress.ts)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/ingress)

## Demos

```tsx
render(
  <div>
    <Ingress>Default ingress</Ingress>
    <Ingress>
      Ingress with <Anchor href="/">Anchor / Text Link</Anchor> looks
      great!
    </Ingress>
  </div>,
)
```
