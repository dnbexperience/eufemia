---
title: 'Customization'
description: 'Customization and tools is a section dedicated to how to use and customize Eufemia in various situations.'
status: null
draft: false
order: 4
---

import GithubLogo from 'Pages/uilib/development/assets/github-logo.js'
import { Icon } from 'dnb-ui-lib/src'

# Customization

For details, have a look at the submenu for all the customizations topics:

- [Component Properties](/uilib/usage/customisation/component-properties)
- [Event Handling](/uilib/usage/customisation/event-handling)
- [CSS Styles](/uilib/usage/customisation/styling)
- [Importing the CSS](/uilib/usage/customisation/consume-styles)
- [Colors](/uilib/usage/customisation/colors)
- [Theming](/uilib/usage/customisation/theming)

## Favicon and manifest

To make a good looking browser icon, you need more than just one `favicon.ico` file. To get the default DNB brand look, you can use the following setup and [optimized files on <Icon icon={GithubLogo} size="default" /> GitHub](https://github.com/dnbexperience/eufemia/tree/develop/packages/dnb-ui-lib/assets/browser):

```html
<!-- Place this inside the head tag -->
<!-- Make sure to customize it, depending on your setup. -->
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/apple-touch-icon.png"
/>
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
<link rel="manifest" href="/site.webmanifest" />
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#007272" />
<meta name="msapplication-TileColor" content="#007272" />
<meta name="theme-color" content="#007272" />
```
