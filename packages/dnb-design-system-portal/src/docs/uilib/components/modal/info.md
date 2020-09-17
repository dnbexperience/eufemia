---
showTabs: true
---

import Img from 'Tags/Img'
import ModalExample from './assets/modal-example.svg'
import ModalExampleButtons from './assets/modal-example-buttons.svg'

## Description

NB! Modal dialogs interrupt users and demand an action. They are appropriate when user’s attention needs to be directed toward important information.

### Behavior

The modal can be triggered from either a button or by using the `open_state` property. Triggering a modal will activate the opaque overlay and display the contents.

### Accessibility

In order to make modals accessible, a lot of things are considered.

Entering a Modal / Drawer will:

1. Set focus on the heading or close button.
2. Enable escape key listener.
3. Invalidate every DOM element outside of the Modal / Drawer, so they are not accessible to keyboard and screen reader users. For doing that, there is a [helper function](/uilib/helpers/functions#interactioninvalidation-example) to be used in your application as well.
4. Disable the body scroll possibility.
5. Make the Modal / Drawer scrollable if needed.
6. Dim the body / background with an overlay

### Structure and content

Typically an opaque cover over the main content (fullscreen) and a small centered box containing information and interactive elements (buttons, forms etc.)

### What is it

Modal dialogs appear on top of the main content changing the _mode_ of the system into a special mode requiring user interaction. The main content is disabled until the user interacts with the modal dialog.

### Disadvantages of modal Dialogs

1.  They require immediate attention
1.  They interrupt users
1.  They cause users to forget what they were doing
1.  They add extra goals - reading, interacting and closing the Modal
1.  They block the content in the background

### Guidelines

1.  Use for important warnings as a way to prevent or correct critical errors.
1.  Do not use for unessential information that is not related to the users current workflow.
1.  Use for requesting the user to enter information critical to the current process.

### Design Patterns

<Img src={ModalExample} caption="Modal with header, text and close button (spacing suggestions in blue and pink)" alt="Image showing Modal with header" />

<Img src={ModalExampleButtons} caption="Modal with header, text, buttons and close button" alt="Image showing Modal with header and clsoe button" />

## Root Element

**NB:** If the wrapper is not set manually, a wrapper is inserted automatically as a child node to the body.

To make sure the HTML structure is decoupled from all the page content, You can optionally define a wrapper div like `<div class="dnb-modal-root" />`.

Just place this as a sibling of Your App root HTML element. This ensures that we always can stack the modal content above the App Content.

```html
<body>
  <div id="app" />
  <div id="dnb-modal-root" />
</body>
```

### Z-index

The Modal component is using **3000** as the `z-index`.

```css
:root {
  --modal-z-index: 3000;
}
```

## Sizing and spacing

You have the properties `min_width` and `max_width`. But by using these, the width styles get injected inline, which normal circumstances works fine. But in case you want to set it by CSS, you can do so:

```css
/* Change the Modal size  */
.dnb-modal__content__inner {
  min-width: 20vw;
  max-width: 40rem;
}

/* Change the Modal spacing  */
:root {
  /* Defaults to --spacing-large */
  --modal-spacing: var(--spacing-small);
}

/* Change the Modal fullscreen height calculation  */
:root {
  /* Defaults to 0 */
  --modal-height-offset: 3rem;
}
```

## Styles and `dnb-core-style`

The Modal component comes with the `dnb-core-style` class predefined by default. If you don't want this behavior because of e.g. CSS specificity, you can opt out by setting this property `prevent_core_style="true"`.

```jsx
/* The CSS class is set by default */
<Modal className="dnb-core-style">...</Modal>

/* You have the option to set it like this as well */
<body>
  <div id="app" />
  <div id="dnb-modal-root" class="dnb-core-style" />
</body>
```
