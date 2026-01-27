---
title: 'Modal'
description: 'Modal dialogs appear on top of the main content changing the mode of the system into a special mode requiring user interaction.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:26.852Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Modal

## Import

```tsx
import { Modal } from '@dnb/eufemia'
```

## Description

Modal is the root component for [Drawer](/uilib/components/drawer) and [Dialog](/uilib/components/dialog). If one of these satisfies your needs, use them instead of directly using Modal. The Modal component allows you to implement other modal variants beyond what we currently provide (Drawer and Dialog).

**Note:** Modal dialogs interrupt users and demand action. They're appropriate when the user's attention needs to be directed toward important information.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/modal)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/modal)

### Behavior

The modal can be triggered from either a button or by using the `open_state` property. Triggering a modal will activate the opaque overlay and display the contents.

### Help button

Since Modal is often used with other components and frequently enhances contextual content, it includes a trigger button ([HelpButton](/uilib/components/help-button)) with a question mark icon by default. You can disable this behavior with `omitTriggerButton={true}`.

You can also use the broadly available `suffix` property, like so:

```tsx
render(
  <Input
    label="Input"
    placeholder="Placeholder ..."
    suffix={<HelpButton>Help text</HelpButton>}
  />
)
```

### Accessibility

Modals implement many accessibility considerations.

Entering a Modal (all variants) will:

1. Set focus on the heading or close button
2. Enable escape key listener
3. Make every DOM element outside the Modal/Drawer inaccessible to keyboard and screen reader users. A [helper function](/uilib/helpers/functions#interactioninvalidation-example) is available for use in your application
4. Disable body scrolling
5. Make the Modal/Drawer scrollable if needed
6. Dim the body/background with an overlay

### Structure and content

Typically an opaque cover over the main content (fullscreen) and a small centered box containing information and interactive elements (buttons, forms etc.)

### What is it

Modal dialogs appear on top of the main content changing the _mode_ of the system into a special mode requiring user interaction. The main content is disabled until the user interacts with the modal dialog.

### Disadvantages of Modal

1. They require immediate attention
1. They interrupt users
1. They cause users to forget what they were doing
1. They add extra goals: reading, interacting, and closing the Modal
1. They block the content in the background

### Guidelines

1. Use for important warnings to prevent or correct critical errors
1. Do not use for nonessential information unrelated to the user's current workflow
1. Use for requesting user input critical to the current process

#### Nested modals

While it is possible to nest a Modal within another Modal, you as a developer must ensure the browser's back button (alongside the URL path) handles the nested Modal situation. A user should still be able to use the back button as expected and return to the last visited "page".

## Root Element (React Portal)

The Modal component uses [PortalRoot](/uilib/components/portal-root) internally to render its content. See the [PortalRoot documentation](/uilib/components/portal-root) for information on how to control where the portal content appears in the DOM.

### Z-index

The Modal component is using **3000** as the `z-index`.

```css
:root {
  --modal-z-index: 3000;
}
```

### data-dnb-modal-active

When a Modal/Drawer is open, it will set an HTML attribute on the main HTML element called `data-dnb-modal-active`. The attribute value will be the ID of the current Modal/Drawer.

This can be used to handle z-index issues from within CSS only:

```css
html[data-dnb-modal-active='MODAL-ID'] {
  /* Your css */
}
```

## Demos

The following examples are to demonstrate the functionality of Modal. Please go to [Drawer demos](/uilib/components/drawer/demos) or [Dialog demos](/uilib/components/dialog/demos) for complete component demos.

### Example

```tsx
render(
  <Modal>
    <ExampleCard>
      <P>This is a Modal that you can use to make custom variations</P>
    </ExampleCard>
  </Modal>
)
```

### Open Modal by the state only

Use a custom trigger button and state handling by setting `omitTriggerButton` to Modal.

```tsx
const Component = () => {
  const [modalIsActive, setModalState] = React.useState(false)
  return (
    <>
      <Button
        id="custom-triggerer"
        text="Custom trigger Button"
        on_click={() => setModalState((s) => !s)}
      />
      <Modal
        title="Modal Title"
        omit_trigger_button
        open_state={modalIsActive}
        labelled_by="custom-triggerer"
        on_close={() => setModalState(false)}
      >
        <ExampleCard>
          <P>This Modal was opened by a custom trigger button.</P>
        </ExampleCard>
      </Modal>
    </>
  )
}
render(<Component />)
```

### Close Modal by handlers

Use the `close_modal` property to set another close handler, like a timeout for when the modal should close.

```tsx
render(
  <Modal
    title="Auto close"
    triggerAttributes={{
      text: 'Click me',
    }}
    align_content="center"
    max_width="40rem"
    close_modal={(close) => {
      const timeout = setTimeout(close, 3e3)
      return () => clearTimeout(timeout)
    }}
  >
    <ExampleCard>
      <P>This Modal will close in 3 seconds.</P>
    </ExampleCard>
  </Modal>
)
```

## Properties

<PropertiesTable props={ModalPropertiesWithSnakeCase} />

## Trigger Properties

Properties targeting the trigger component (Button), but they will be set the same way as all the other properties:

```tsx
render(
  <Modal
    triggerAttributes={{
      icon: 'bell',
    }}
    right="small"
  >
    ... content ...
  </Modal>
)
```

## Modal Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Modal.close_title": {
      "nb-NO": "Lukk",
      "en-GB": "Close",
      "sv-SE": "Stäng",
      "da-DK": "Luk"
    },
    "Modal.dialog_title": {
      "nb-NO": "Separat Vindu",
      "en-GB": "Dialog Window",
      "sv-SE": "Separat Fönster",
      "da-DK": "Separat vindue"
    }
  }
}
```

## Events

<PropertiesTable props={ModalEventsWithSnakeCase} />

## `triggeredBy`

The `triggeredBy` property is given when the `onClose` or the `onClosePrevent` event is triggered. It can contain one of the following values:

- `button`: The close button that triggered the event.
- `handler`: The `close` handler given by the function (as the content/children).
- `keyboard`: The escape key that triggered the event.
- `overlay`: The overlay element that triggered the event.
- `unmount`: The unmount event that triggered the `openState` property change.

### Selective on_close_prevent

```tsx
render(
  <Modal
    preventClose={true}
    onClosePrevent={({ triggeredBy, close /* id, event */ }) => {
      switch (triggeredBy) {
        case 'keyboard':
        case 'button':
          close()
          break
        case 'overlay': {
          const timeout = setTimeout(close, 1e3)
          return () => clearTimeout(timeout) // clear timeout on unmount
        }
      }
    }}
  >
    ...
  </Modal>
)
```
