---
title: 'Customization'
description: 'Customization and tools is a section dedicated to how to use and customize Eufemia in various situations.'
status: null
order: 4
---

import GithubLogo from 'Docs/contribute/assets/github-logo.js'
import { Icon } from '@dnb/eufemia/src'

# Customization

For details, have a look at the submenu for all the customizations topics:

- [Component Properties](/uilib/usage/customisation/component-properties)
- [Event Handling](/uilib/usage/customisation/event-handling)
- [CSS Styles](/uilib/usage/customisation/styling)
  - [Importing the CSS](/uilib/usage/customisation/styling/consume-styles)
  - [Polyfill](/uilib/usage/customisation/styling/polyfill)
- [Colors](/uilib/usage/customisation/colors)
- [Theming](/uilib/usage/customisation/theming)
- [Locale / Translation](/uilib/usage/customisation/localization)

## Favicon and manifest

To make a good looking browser icon, you need more than just one `favicon.ico` file. To get the default DNB brand look, you can use the following setup.

You find the [optimized files on <Icon icon={GithubLogo} size="default" /> GitHub](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/assets/browser).

The `favicon.ico` file you don't need to specify, as long as it is placed in the server root.
The other tags you place inside the head tag. But make sure to customize it, depending on your setup.

### Good to have

```html
<!-- e.g. Firefox needs this -->
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="/favicon-16x16.png"
/>

<!-- Optional, browsers do load ico file as long as the name is like "favicon.ico" -->
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

<!-- More often used Safari feature -->
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/apple-touch-icon.png"
/>

<!-- How to define the manifest, depends on your setup -->
<link rel="manifest" href="/site.webmanifest" />
```

### Nice to have

```html
<!-- Safari feature -->
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#007272" />

<!-- Microsoft feature -->
<meta name="msapplication-TileColor" content="#007272" />

<!-- Chrome feature -->
<meta name="theme-color" content="#007272" />
```
