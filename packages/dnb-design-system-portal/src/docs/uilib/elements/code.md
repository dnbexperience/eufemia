---
title: 'Code'
---

## Code

### Code and Syntax highlighting

[Prism](https://prismjs.com) is a popular Syntax Highlighting tool. DNB has its own **theme** You can use:

- `@dnb/eufemia/style/themes/theme-ui/prism/dnb-prism-theme.js`

You find the theme and its definitions in the [GitHub repository](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/theme-ui/prism/dnb-prism-theme.js).

### Code and Pre Tag usage

Styling for both the `<code>` and the `<pre>` tags are build in the `@dnb/eufemia`.

So simply use them for your code syntax:

```html
<p class="dnb-p">
  My <code class="dnb-code">formatted text</code> inside a paragraph
</p>

<pre class="dnb-pre">
  Code Syntax
</pre>
```

#### Code and Typography

When you use `<code>` or `<pre>` – the DNB _DNBMono_ font is used, like so:

```css
font-family: var(--font-family-monospace);
```
