---
title: 'Accessibility'
draft: false
order: 5
---

import AboutAccessibility from 'Docs/uilib/usage/accessibility/about-accessibility.md'

# Accessibility

<AboutAccessibility />

## Checklist of best practices

- follow **semantics** properly, use **landmarks** ([landmark and semantic example](/uilib/usage/accessibility#semantic-elements)) and ensure correct [heading levels](/uilib/usage/best-practices/for-typography#headings-and-styling)
- use different **screen readers** and test [regularly](/uilib/usage/accessibility/screenreader)
- make sure, everything is [responsive](/uilib/usage/layout#web-applications) - use mostly the `rem` [unit](/uilib/usage/best-practices/for-styling#units)
- define the tab navigation and [focus management](/uilib/usage/accessibility/focus#managing-the-focus-state) properly
- have a [Skip Link](/uilib/usage/accessibility/focus#skip-link) in place
- properly use the `for="#id"` attribute on [labels](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#Attributes)
- make good use of `aria-label` and `aria-hidden`, e.g. of [decorative content](/uilib/usage/accessibility/icons#decorative-icons)
- have `aria-live` in place for dynamic content
- hide "hidden" content with `display: none;`, HTML `hidden` attribute or remove the markup entirely (like React States)
- allow zooming in web pages. Example:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
/>
```

## Tooling tips

- Use [ESLint](https://eslint.org) with [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) in Your Code Editor setup.
- Use **axe** in [integration tests](/uilib/usage/best-practices/for-testing#integration-tests)
- There are several integrations for Developer Tools, including [axe-core](https://www.deque.com/axe/)
- Testing semantics is never enough, use actually [screen readers](/uilib/usage/accessibility/screenreader)

### Landmark- and semantics example

Example usage of HTML5 `landmarks` (e.g. `<nav>` or `<section>` etc.):

```html
<body>
  <header>Header</header>
  <nav>Main Navigation</nav>
  <section>
    <h1 class="dnb-h2">h1 styled as h2</h1>
    ...
  </section>
  <article>
    <h2 class="dnb-h1">h2 styled as h1</h2>
    <h3 class="dnb-h3">h3</h2>
    <h4 class="dnb-h4">h4</h2>
    ...
  </article>
  <article>
    <h2>Article</h2>
    ...
  </article>
  <aside>Aside the Section and the Articles</aside>
  <footer>Footer</footer>
</body>
```
