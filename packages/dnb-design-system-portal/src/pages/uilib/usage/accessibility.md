---
title: 'Accessibility'
draft: false
order: 5
---

# Accessibility

## WCAG 2.1 and UU

Make sure Your Web Applications are [**UU**](https://uu.difi.no) and [**WCAG 2.1**](https://www.w3.org/TR/WCAG21/) compliant. This means, You as a developer has to:

- follow semantics properly
- use different **screen readers** and test [regularly](/uilib/usage/accessibility/screenreader)
- make sure, everything is [responsive](/uilib/usage/layout#web-applications) - use mostly the `rem` [unit](/uilib/usage/best-practices/for-styling#units)
- define the tab navigation and [focus management](/uilib/usage/accessibility/focus#managing-the-focus-state)
- have a [Skip Link](/uilib/usage/accessibility/focus#skip-link) in place
- properly use the `for="#id"` attribute on [labels](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#Attributes)
- make good use of `area-label` and `aria-hidden`, e.g. of [decorative content](/uilib/usage/accessibility/icons#decorative-icons)
- have `aria-live` in place for dynamic content
- hide "hidden" content with `display: none;` or remove the markup entierly (like React States)
- allow zooming in web pages. Example:

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=yes"
/>
```

## Tooling tips

Use [ESLint](https://eslint.org) with [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) in Your Code Editor setup.

Use **axe** in [integration tests](/uilib/usage/best-practices/for-testing#integration-tests)

There are several integrations for Developer Tools, including [axe-core](https://www.deque.com/axe/)

Testing semantics is never enough, use actually [screen readers](/uilib/usage/accessibility/screenreader)

## HTML Accessibility

There are many good Articles about accessibility for web standards out there. Start with the one from [Mozilla Documentation](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
