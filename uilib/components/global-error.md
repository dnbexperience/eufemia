---
title: 'GlobalError (404)'
description: 'The GlobalError is a simple component to integrate where a 404 or 500 message has to be shown.'
metadata: https://eufemia.dnb.no/uilib/components/global-error/metadata.json
---

## Import

```tsx
import { GlobalError } from '@dnb/eufemia'
```

## Description

The GlobalError is a simple component to integrate when a `404` or `500` has to be shown.

This page component is **responsive** and should be used as a **client wide** (fullscreen) component.

You may also take a look at how it behaves once [404](/404) or [500](/500) is used in an application.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=22259-19235)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/global-error)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/global-error)

## Demos

### To showcase the 404 status code component

```tsx
render(<GlobalError statusCode="404" />)
```

### To showcase the 500 status code component

```tsx
render(<GlobalError statusCode="500" />)
```

### To showcase a custom status code component

```tsx
const links = [
  {
    text: 'Forside',
    url: 'https://www.dnb.no/',
  },
  {
    text: 'Forsikring',
    url: 'https://www.dnb.no/forsikring/',
  },
  {
    text: 'Sparing',
    url: 'https://www.dnb.no/sparing/',
  },
  {
    text: 'Lån',
    url: 'https://www.dnb.no/lan/',
  },
  {
    text: 'Kontakt',
    url: 'https://www.dnb.no/hjelp-og-veiledning/',
  },
]
render(
  <GlobalError
    statusCode="403"
    title="Access Denied"
    text="More related text"
    links={links}
  >
    Additional Content
  </GlobalError>,
)
```
