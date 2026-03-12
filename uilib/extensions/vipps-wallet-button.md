---
title: 'VippsWalletButton'
description: 'A branded Vipps wallet call-to-action button extension.'
version: 10.100.1
generatedAt: 2026-03-12T13:34:03.448Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
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
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/vipps-wallet-button.mdx)

## Demo

### Default

```tsx
render(
  <VippsWalletButton
    onClick={() => {
      console.log('VippsWalletButton clicked')
    }}
    data-visual-test="vipps-wallet-button"
  />
)
```

### With SubmitIndicator

Example with property `pending` set to `true`.

```tsx
render(
  <VippsWalletButton
    pending
    onClick={() => {
      console.log('VippsWalletButton clicked')
    }}
    data-visual-test="vipps-wallet-button-pending"
  />
)
```

## Translations

The label text is translated internally and follows `Provider` locale.

| **nb-NO**  | **en-GB** | **sv-SE**   | **da-DK**  |
| ---------- | --------- | ----------- | ---------- |
| Legg til i | Add to    | Lägg till i | Tilføj til |
