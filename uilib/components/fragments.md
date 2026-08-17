---
title: 'Fragments'
description: 'Fragments are small, low-level and reusable parts used inside other components.'
version: 11.10.1
generatedAt: 2026-08-17T08:59:38.427Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Fragments

## Import

You import them like so:

```jsx
import { DrawerList, TextCounter } from '@dnb/eufemia/fragments'
```

## Description

Fragments are small, low-level and reusable parts used inside other components.

You may use them only to build new components from.

The deprecated `ScrollView` fragment export remains available for backwards compatibility until v13. Import the [ScrollView component](/uilib/components/scroll-view/) from `@dnb/eufemia` instead.

## Available Fragments


## [DrawerList](/uilib/components/fragments/drawer-list/)

Use DrawerList as an internal list pattern inside drawer-based components.

## [TextCounter](/uilib/components/fragments/text-counter/)

Use TextCounter to show how many characters someone has typed or can still type.
