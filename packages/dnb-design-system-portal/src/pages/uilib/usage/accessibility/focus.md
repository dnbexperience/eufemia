---
title: 'Focus'
status: 'wip'
draft: false
---

# Focus Management

Page Focus is an important part of keyboard-only navigation.

From the technical side, we have to assign an _invisible_ focus, so the user can continue the navigation inside this new content.

**Example setup:**

```html
<body>
  <aside><!-- focusable navigation --></aside>
  <main class="dnb-no-focus" tabindex="-1">
    <!-- more markup with focusable HTMLElements -->
    <h1>Main Title</h1>
    <a href="/path">I'm now focusable on next tab</a>
  </main>
</body>
```

## Helper tool

The `dnb-ui-lib` has an build in helper, to manage basic focus handling.
This helper also handles both the `tabindex="-1"` and the `class="dnb-no-focus"` situation.

```js
import {
  setPageFocusElement,
  applyPageFocus
} from 'dnb-ui-lib/shared/tools'

// 1. Somewhere in Your app, set either an element, or a CSS Selector
setPageFocusElement('.css-selector', 'MyCustomName')

// 2. Later You can call this action, once it's time to activate the new focus state
applyPageFocus('MyCustomName')
```

**So, make sure You:**

- set the focus on the content (e.g. `<h1>`) after a navigation action, initiated by the user.
- set the focus into a _menu or navigation_ area, if it has an opening mechanism.
- also set the focus back to the content, once the menu or navigation area gets closed.

A more complex focus management is build in already to the [Modal Component](/uilib/components/modal). There we actually also disable focus possibility on the content behind, so the user only can navigate inside the modal.
