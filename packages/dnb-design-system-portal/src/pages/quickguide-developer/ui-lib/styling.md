---
header: 'UI Library'
title: 'Styling'
draft: false
---

# Styling

All components imports their styles automatically. The CSS is a compiled and minified version.

Anyhow, to include the whole `dnb-ui-lib` style lib, do this:

```js
import 'dnb-ui-lib/style'
```

But You may want to import only styles for a couple of components? Then do this:

```js
import 'dnb-ui-lib/components/button/style'
```

You may have a look at the guides about [colors](/quickguide-designer/colors/) and [fonts](/quickguide-designer/fonts/#fonts-to-show-code).

# Fonts to show Code

`<Code>` snippets shows best on a _Monotype_ font. Developers will normally have installed some of these fonts on their devices. Example of CSS `font-family` usage:

```css
font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
  monospace;
```

Read more about [fonts at DNB](/quickguide-designer/fonts/)
