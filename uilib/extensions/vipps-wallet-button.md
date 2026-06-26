---
title: 'VippsWalletButton'
description: 'A branded Vipps wallet call-to-action button extension.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:10.497Z
checksum: 5dee467b3ed2e8b744c4c9c5107384e1da5443f73853be7c18cc0676e5965df6
---

# VippsWalletButton

## Import

```tsx
import VippsWalletButton from '@dnb/eufemia/extensions/vipps-wallet-button'
import '@dnb/eufemia/extensions/vipps-wallet-button/style'
```

## Description

A branded Vipps wallet call-to-action button extension.

It uses a primary [Button](/uilib/components/button/) under the hood.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/vipps-wallet-button)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/vipps-wallet-button)


## Demos

### Default


```tsx
render(<VippsWalletButton onClick={() => {
  console.log('VippsWalletButton clicked');
}} data-visual-test="vipps-wallet-button" />)
```


### With SubmitIndicator

Example with property `pending` set to `true`.


```tsx
render(<VippsWalletButton pending onClick={() => {
  console.log('VippsWalletButton clicked');
}} data-visual-test="vipps-wallet-button-pending" />)
```

## Properties


```json
{
  "props": {
    "pending": {
      "doc": "Set to `true` to show a pending state with a [SubmitIndicator](/uilib/extensions/forms/Form/SubmitIndicator/). The button is disabled while pending. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "[Button](/uilib/components/button/properties)": {
      "doc": "All button properties, except `variant` which is always set to `primary`.",
      "type": "Various",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "VippsWalletButton.text": {
      "nb-NO": "Legg til i",
      "en-GB": "Add to",
      "sv-SE": "Lägg till i",
      "da-DK": "Tilføj til"
    }
  }
}
```
