---
title: 'GlobalError (404)'
description: 'The GlobalError is a simple component to integrate where a 404 or 500 message has to be shown.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.746Z
checksum: 4324f46f1ca330649e6d2284e2e49931506e145839e3e8f0c2ea7cc3bee65ee3
---

# GlobalError (404)

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
  </GlobalError>
)
```

## Properties

```json
{
  "props": {
    "statusCode": {
      "doc": "Defines a status code as a string. When `404` or `500` is given, predefined `text` and `title` will be shown. Defaults to `404`.",
      "type": ["404", "500", "string"],
      "status": "optional"
    },
    "status": {
      "doc": "Defines a status code as a string. When `404` or `500` is given, predefined `text` and `title` will be shown. Defaults to `404`. This prop is deprecated and will be removed in v11, please use `statusCode` instead.",
      "type": ["404", "500", "string"],
      "status": "deprecated"
    },
    "title": {
      "doc": "Overwrites the default title for the provided `statusCode`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "text": {
      "doc": "Overwrites the default text for the provided `statusCode`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "code": {
      "doc": "Overwrites the default error message code text `Feilmeldings-kode:`. . This prop is deprecated and will be removed in v11, please use `errorMessageCode` instead.",
      "type": "React.ReactNode",
      "status": "deprecated"
    },
    "errorMessageCode": {
      "doc": "Overwrites the default error message code text `Feilmeldings-kode: %statusCode`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "help": {
      "doc": "Overwrites the default additional help text `Her er noen lenker som kanskje kan hjelpe:`. This text is only rendered when `links` are provided.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "links": {
      "doc": "Provide an array with objects `{ text: \"Text\", url: \"https://...\" }` to display a list of anchor links.",
      "type": ["Array<GlobalErrorLink>"],
      "status": "optional"
    },
    "center": {
      "doc": "If true, it will use `80vh` as the height and center its content.",
      "type": "boolean",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "locale": {
      "doc": "Set a [supported locale](/uilib/usage/customisation/localization/) if needed.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "To display additional related content, like useful links etc.",
      "type": "React.Node",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "GlobalError.404.text": {
      "nb-NO": "Sikker på at du har skrevet riktig adresse? Eller har vi rotet med lenkene?",
      "en-GB": "Are you sure you have entered the correct address? Or have we messed with the links?",
      "sv-SE": "Är du säker på att du har skrivit rätt adress?",
      "da-DK": "Er du sikker på, at du har skrevet den rigtige adresse?"
    },
    "GlobalError.404.title": {
      "nb-NO": "Vi finner ikke siden du leter etter …",
      "en-GB": "We can't find the page you're looking for …",
      "sv-SE": "Vi kan inte hitta sidan du letar efter …",
      "da-DK": "Vi kan ikke finde den siden du leder efter …"
    },
    "GlobalError.500.text": {
      "nb-NO": "Tjenesten fungerer ikke slik den skal for øyeblikket, men prøv igjen senere.",
      "en-GB": "The service is not working properly at the moment. Try again later.",
      "sv-SE": "Tjänsten fungerar inte som den ska just nu, men försök igen senare.",
      "da-DK": "Tjenesten fungerer ikke som den skal i øjeblikket, prøv igen senere."
    },
    "GlobalError.500.title": {
      "nb-NO": "Beklager, her skjedde det noe feil!",
      "en-GB": "Sorry, a technical error happened!",
      "sv-SE": "Tyvärr, något gick fel!",
      "da-DK": "Beklager, der opstod en fejl!"
    },
    "GlobalError.code": {
      "nb-NO": "Feilmeldings-kode:",
      "en-GB": "Error code:",
      "sv-SE": "Felmeddelande-kod:",
      "da-DK": "Fejlkode:"
    },
    "GlobalError.errorMessageCode": {
      "nb-NO": "Feilmeldings-kode: %statusCode",
      "en-GB": "Error code: %statusCode",
      "sv-SE": "Felmeddelande-kod: %statusCode",
      "da-DK": "Fejlkode: %statusCode"
    },
    "GlobalError.help": {
      "nb-NO": "Her er noen lenker som kanskje kan hjelpe:",
      "en-GB": "Here are some links that might help:",
      "sv-SE": "Här är några länkar som kanske kan hjälpa:",
      "da-DK": "Her er nogle links, der måske kan hjælpe:"
    }
  }
}
```
