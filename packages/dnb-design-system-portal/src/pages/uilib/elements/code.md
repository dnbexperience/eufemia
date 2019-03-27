---
draft: true
---

## Code

### Code Highlighting with Prism

[Prism](https://prismjs.com) is a popular Syntax Highlighting tool. DNB has its own **theme** You can use:

- `dnb-ui-lib/style/themes/theme-ui/prism/dnb-prism-theme.js`

### Code and Pre Tag usage

Styling for both the `<code>` and the `<pre>` tags are build in the `dnb-ui-lib`.
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

`<code>` snippets show best on a _Monotype_ font. Developers will normally have installed some of these fonts on their devices. Here is an example of CSS `font-family` usage:

```css
font-family: /* macOS 10.10+ */ Menlo, /* Windows 6+ */ Consolas, /* Android 4+ */
    Roboto Mono, /* Ubuntu 10.10+ */ Ubuntu Monospace, /* KDE Plasma 5+ */
    Noto Mono, /* KDE Plasma 4+ */ Oxygen Mono, /* Linux/OpenOffice fallback */
    Liberation Mono, /* fallback */ monospace; /* 1 */
```
