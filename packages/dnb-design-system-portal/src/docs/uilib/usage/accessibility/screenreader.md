---
title: 'Screen readers'
---

# Screen readers

In order for screen reader users to be able to properly navigate and access content, you need to architect and develop navigation and content presentation with screen readers in mind.

To avoid much work afterwards, make sure you actually check your application with a screen reader **regularly during development**.

## Mobile

Also, screen readers **behave differently** on mobile phones than desktop browsers. So, use both in your frontend tooling.

## Focus Highlight for NVDA

If you are using NVDA on Windows to test your application, there is an NVDA add-on, called [Focus Highlight](https://addons.nvda-project.org/addons/focusHighlight.en.html), showing the current focus visually. This makes it so much easier to navigate and understand where you currently are in the context.

## Images and illustrations

Example usage of `role`, `aria-label`, `aria-labelledby` and `aria-hidden`. There is no one fits all. It depends on the situation what accessibility features you have to prefer over others. But in general:

> Try to use HTML 5 first, and use ARIA as sugar on top.

Some random examples of image and illustration usage:

```html
<a class="dnb-anchor" aria-label="descriptive text" href="/action">
  <svg aria-hidden="true">icon only ...</svg>
</a>

<a class="dnb-anchor" href="/action">
  <svg>
    <title>descriptive text</title>
    icon only ...
  </svg>
</a>

<img role="presentation" aria-label="descriptive text" src="..." />

<svg role="img" alt="descriptive text" src="..." />

<figure>
  <img alt="image alt" src="..." aria-hidden="true" />
  <figcaption>Descriptive text <cite>reference etc.</cite></figcaption>
</figure>

<object data="..." aria-labelledby="figure-id" />
<label id="figure-id">descriptive text</label>
```
