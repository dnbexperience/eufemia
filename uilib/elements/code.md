---
title: 'Code'
description: 'The code element is used for code and syntax highlighting.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.042Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Code

## Import

```tsx
import { Code } from '@dnb/eufemia/elements'
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/code)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/code)

## Code and Syntax highlighting

[Prism](https://prismjs.com) is a popular Syntax Highlighting tool. DNB has its own **theme** you can use:

- `@dnb/eufemia/style/themes/theme-ui/prism/dnb-prism-theme.js`

You can find the theme and its definitions in the [GitHub repository](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/theme-ui/prism/dnb-prism-theme.js).

## Code and Pre Tag usage

Styling for both the `<code>` and the `<pre>` tags is built into `@dnb/eufemia`.

So simply use them for your code syntax:

```html
<p class="dnb-p">
  My <code class="dnb-code">formatted text</code> inside a paragraph
</p>

<pre class="dnb-pre">
  Code Syntax
</pre>
```

### Code and Typography

When you use `<code>` or `<pre>`, the DNB DNBMono font is used:

```css
font-family: var(--font-family-monospace);
```
