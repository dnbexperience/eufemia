---
showTabs: true
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'
import ModalExample from './assets/modal-example.svg'
import ModalExampleButtons from './assets/modal-example-buttons.svg'

## Description

NB! Modal dialogs interrupt users and demand an action. They are appropriate when the user’s attention needs to be directed toward important information.

### Behavior

The modal can be triggered from either a button or by using the `open_state` property. Triggering a modal will activate the opaque overlay and display the contents.

### Help button

As the Modal is very often used in combination with other components and often as an enhancement of contextual content, it comes with a trigger button ([HelpButton](/uilib/components/help-button)) with a question mark icon by default. You can for sure disable that behavior by using `trigger_hidden="true"`.

You can also used the broadly available `suffix` property, like so:

```jsx
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={<HelpButton>Help text</HelpButton>}
/>
```

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
1.  They add extra goals - reading, interacting, and closing the Modal
1.  They block the content in the background

### Guidelines

1.  Use for important warnings as a way to prevent or correct critical errors.
1.  Do not use for unessential information that is not related to the user's current workflow.
1.  Use for requesting the user to enter information critical to the current process.

#### Nested modals

While it is possible to nest a Modal within another Modal, you as a developer have to ensure the Browsers back-button (alongside the URL path), does take care of the nested Modal situation. Because a user should still be able to use the back button as expected and return to the last visited "page".

### Design Patterns

<InlineImg src={ModalExample} caption="Modal with header, text and close button (spacing suggestions in blue and pink)" alt="Image showing Modal with header" />

<InlineImg src={ModalExampleButtons} caption="Modal with header, text, buttons and close button" alt="Image showing Modal with header and close button" />

## Root Element

**NB:** If the wrapper is not set manually, a wrapper is inserted automatically as a child node to the body.

To make sure the HTML structure is decoupled from all the page content, you can optionally define a wrapper div like `<div class="dnb-modal-root" />`.

Just place this as a sibling of your app root HTML element. This ensures that we always can stack the modal content above the App Content.

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

### data-dnb-modal-active

When a Modal / Drawer is open, it will set an HTML attribute on the main HTML Element called `data-dnb-modal-active`. The attribute value will be the ID of the current Modal / Drawer.

This can be used to handle z-index issues from within CSS only:

```css
html[data-dnb-modal-active='MODAL-ID'] {
  /* Your css */
}
```

## The Drawer mode

The modal comes with a `drawer` mode. The drawer is made to be used in different content usage than the modal. Typically in context interactions.

See more in [Drawer](/uilib/components/modal/drawer).

## Sizing and spacing

You have the properties `min_width` and `max_width`. But by using these, the width styles get injected inline, which normal circumstances work fine. But in case you want to set it by CSS, you can do so:

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
```
