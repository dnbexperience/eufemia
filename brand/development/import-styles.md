---
title: 'Import styles'
version: 11.2.1
generatedAt: 2026-05-08T08:59:09.343Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Import styles

In order to apply the Sbanken styles, you need to both define;

the CSS package:

```diff
import '@dnb/eufemia/style/core' // or /basis, when "dnb-core-style" is used
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/sbanken'
```

and the Theme:

```jsx
import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme name="sbanken">
    <App />
  </Theme>
)
```

## Runtime theme swap

However, the above solution will not work for changing the theme in runtime.

Changing theme during runtime, without pre-loading all CSS styles and fonts together, requires a more sophisticated solution.

The Eufemia Portal handles this by preloading the available theme assets and updating the active theme at runtime.
