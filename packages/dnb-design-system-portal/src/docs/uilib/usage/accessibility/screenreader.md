---
title: 'Screen readers'
status: 'wip'
draft: false
---

# Screen readers

In order for screen reader users to be able to properly navigate and access content, you need to plan navigation and contentent presentation with screen readers in mind.

To avoid much work afterwards, make sure you actually check your application with a screen reader **regularly during development**.

## Mobile

Also, screen readers **behave differently** on mobile phones than desktop browsers. So, use both in your frontend tooling.

## ARIA Examples

Example usage of `role`, `aria-label`, `aria-labelledby` and `aria-hidden`.

```html
<a aria-label="Describe the action" href="/action" className="dnb-anchor">
  <svg aria-hidden="true" ... />
</a>

<div role="alert">Dynamic content alert message</div>

<img role="presentation" alt="image alt" src="..." />

<figure aria-labelledby="figure-id" role="group">
  <img alt="image alt" src="..." />
  <figcaption id="figure-id">Description <cite>Name</cite> ...</figcaption>
</figure>
```
