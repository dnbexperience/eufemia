---
title: 'Focus'
description: 'Accessibility helpers to handle focus management and Skip Link usage.'
---

import SkipLinkExample from 'Pages/uilib/usage/accessibility/examples/skip-link-example.js'

# Focus Management

Page Focus is an important part of keyboard-only and screen reader navigation.

Make sure you handle or your setup like a SPA Router is setting the focus properly on page or context changes. Consider of using Reach Router [because of the build-in accessibility feature](https://reach.tech/router/accessibility).

From the technical side, we have to assign an _invisible_ focus, so the user can continue the navigation inside this new content.

**Example setup:**

```html
<body>
  <nav><!-- focusable navigation --></nav>
  <main role="main">
    <!-- more markup with focusable HTMLElements -->
    <h1 class="dnb-h--xx-large dnb-no-focus" tabindex="-1">Main Title</h1>
    <a href="/path">I'm now focusable on next tab</a>
  </main>
</body>
```

## Managing the Focus state

Make sure You ...

- set the focus on the content (e.g. `<h1 class="dnb-h--xx-large">`) after a navigation action, initiated by the user.
- set the focus into a _menu or navigation_ area, if it has an opening mechanism.
- also set the focus back to the content, once the menu or navigation area gets closed.

A more complex focus management is build in already to the [Modal Component](/uilib/components/modal). There we actually also disable focus possibility on the content behind, so the user only can navigate inside the modal.

## Helper tool

The `@dnb/eufemia` has a build-in helper, to manage basic focus handling.
This helper also handles both the `tabindex="-1"` and the `class="dnb-no-focus"` situation. So what does it do?

1. You define on beforehand what should get focus with a css selector (_class or id_). This (**setPageFocusElement**) can be set on the very first application start.
1. Later one, once the focus should be set, you call a second function **_applyPageFocus_**. This function will use the beforehand defined selector and execute `domNode.focus()`.

### Focus helper

```js
import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/shared/helpers'

// 1. Somewhere in Your app, set either an element, or a CSS Selector
setPageFocusElement('.css-selector', 'MyCustomName')

// 2. Later You can call this action, once it's time to activate the new focus state
applyPageFocus('MyCustomName', (element) => {
  /* optional callback */
})
```

### Skip Link

The `@dnb/eufemia` also has a small setup for a [skip link](https://www.w3.org/TR/WCAG20-TECHS/G1.html)

Our solution is CSS only and should work for all kinds of application setups. Demo example below:

<SkipLinkExample />

1. Place an Anchor with a HTML class `.dnb-skip-link` like blow, as the very **first HTML element** tag:

```html
<a class="dnb-skip-link" href="#content-id">Skip to content</a>
```

2. Define an unique element **id**, like `id="content-id"`, on your content wrapper:

```html
<body>
  <a class="dnb-skip-link" href="#content-id">Skip to content</a>
  <header>
    <nav>
      <!-- Nav links or content to skip -->
    </nav>
  </header>
  <main id="content-id">
    <!-- Content goes here -->
  </main>
</body>
```

That's it. The styles are included in both the **dnb-ui-basis** and **dnb-ui-core** styling packages.

**NP:** If you link the anchor to only a `<div id="content-id">`, then you have to make sure you also add a tabindex.

```html
...
<div id="content-id" tabindex="-1" class="dnb-no-focus">
  <!-- Content goes here -->
</div>
...
```
