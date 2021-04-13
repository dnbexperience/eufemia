---
title: 'Code'
---

## Code

### Code and Syntax highlighting

[Prism](https://prismjs.com) is a popular Syntax Highlighting tool. DNB has its own **theme** You can use:

- `@dnb/eufemia/style/themes/theme-ui/prism/dnb-prism-theme.js`

### Code and Pre Tag usage

Styling for both the `<code>` and the `<pre>` tags are build in the `@dnb/eufemia`.
So simply use them in Your Syntax:

```html
<p class="dnb-p">
  My <code class="dnb-code">Formatted example</code> in a Paragraph
</p>

<pre class="dnb-pre">
  One line
  New lines
</pre>
```

### Code and Typography

`<code>` snippets look best when rendered in a _Monotype_ font. Developers will normally have installed some of these fonts on their devices. Here is an example of CSS `font-family` usage:

```css
font-family: var(--font-family-monospace);
```
