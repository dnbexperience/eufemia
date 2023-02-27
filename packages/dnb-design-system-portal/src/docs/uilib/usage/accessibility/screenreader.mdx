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

## Usage of aria-label, aria-labelledby, and aria-describedby

There are limitation when on where you can use `aria-label`, `aria-labelledby`, and `aria-describedby` attributes, because they do not work consistently with all HTML elements.

The `aria-label` and `aria-labelledby` attributes can be used to give an element an accessible name.
The `aria-describedby` attribute can be used to give an element an accessible description.

Do **not** use `aria-label`, `aria-labelledby`, or `aria-describedby` with any other elements like:

- `div`, `span`, `p`, `blockquote`, or `strong` etc.

they generally won’t work across all assistive technology combinations (screen readers).

### Where can I use them?

The `aria-label`, `aria-labelledby`, and `aria-describedby` attributes can be used with:

1. interactive HTML elements like `<a>` (when the href attribute is present), `audio` and `video` (when the controls attribute is present), `input` (unless they are of type="hidden"), `button`, and `textarea`.
1. elements that have a landmark role – either implicit (`header`, `footer`, `main`, `nav`, `aside`, `section`, and `form`) or explicitly set via the role attribute.
1. elements that have an explicit widget role applied, using the role attribute – there are 27 widget roles in ARIA 1.1, including `dialog`, `slider`, `progressbar`, and `tooltip`.
1. elements like `img`, `figure` and `iframe`.
