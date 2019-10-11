---
title: 'Focus'
description: 'Accessibility helpers to handle focus management and Skip Link usage.'
draft: false
---

import SkipLinkExample from 'Pages/uilib/usage/accessibility/examples/skip-link-example.js'

# Focus Management

Page Focus is an important part of keyboard-only navigation.

From the technical side, we have to assign an _invisible_ focus, so the user can continue the navigation inside this new content.

**Example setup:**

```html
<body>
  <nav><!-- focusable navigation --></nav>
  <main>
    <!-- more markup with focusable HTMLElements -->
    <h1 class="dnb-no-focus" tabindex="-1">Main Title</h1>
    <a href="/path">I'm now focusable on next tab</a>
  </main>
</body>
```

## Managing the Focus state

Make sure You ...

- set the focus on the content (e.g. `<h1 class="dnb-h1">`) after a navigation action, initiated by the user.
- set the focus into a _menu or navigation_ area, if it has an opening mechanism.
- also set the focus back to the content, once the menu or navigation area gets closed.

A more complex focus management is build in already to the [Modal Component](/uilib/components/modal). There we actually also disable focus possibility on the content behind, so the user only can navigate inside the modal.

## Helper tool

The `dnb-ui-lib` has an build in helper, to manage basic focus handling.
This helper also handles both the `tabindex="-1"` and the `class="dnb-no-focus"` situation.

### Focus helper

```js
import {
  setPageFocusElement,
  applyPageFocus
} from 'dnb-ui-lib/shared/helpers'

// 1. Somewhere in Your app, set either an element, or a CSS Selector
setPageFocusElement('.css-selector', 'MyCustomName')

// 2. Later You can call this action, once it's time to activate the new focus state
applyPageFocus('MyCustomName')
```

### Skip Link

The `dnb-ui-lib` also has a small setup for a [skip link](https://www.w3.org/TR/WCAG20-TECHS/G1.html)

Our solution is CSS only and should work for all kinds of App setups.

1. Place an Anchor like this one blow, on the very top of Your App content:

<SkipLinkExample />

```html
<a class="dnb-skip-link" href="#dnb-app-content">Skip to content</a>
```

2. Place a unique element id, like `id="dnb-app-content"` on your content wrapper:

```html
<body>
  <a class="dnb-skip-link" href="#dnb-app-content">Skip to content</a>
  <header>
    <nav>
      <!-- Nav links to skip -->
    </nav>
  </header>
  <main id="dnb-app-content">
    <!-- Content goes here -->
  </main>
</body>
```

Thanks it. The styles are included in both the **dnb-ui-basis** and **dnb-ui-core** styling packages.
