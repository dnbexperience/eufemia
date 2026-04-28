---
title: 'Modal'
description: 'Modal dialogs appear on top of the main content changing the mode of the system into a special mode requiring user interaction.'
version: 11.0.3
generatedAt: 2026-04-28T21:06:11.806Z
checksum: 0f1328ec8c9ab15b2d0358b83bfa13d94aaed954143bcd737eb68567b59cd7d9
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

The modal can be triggered from either a button or by using the `open` property. Triggering a modal will activate the opaque overlay and display the contents.

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
3. Make every DOM element outside the Modal/Drawer inaccessible to keyboard and screen reader users. A [helper function](/uilib/helpers/functions#interactioninvalidation) is available for use in your application
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
    <div
      style={{
        padding: '2rem',
        backgroundColor: 'var(--token-color-background-neutral)',
      }}
    >
      <P>This is a Modal that you can use to make custom variations</P>
    </div>
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
        onClick={() => setModalState((s) => !s)}
      />
      <Modal
        title="Modal Title"
        omitTriggerButton
        open={modalIsActive}
        labelledBy="custom-triggerer"
        onClose={() => setModalState(false)}
      >
        <div
          style={{
            padding: '2rem',
            backgroundColor: 'var(--token-color-background-neutral)',
          }}
        >
          <P>This Modal was opened by a custom trigger button.</P>
        </div>
      </Modal>
    </>
  )
}
render(<Component />)
```

### Close Modal by handlers

Use the `closeModal` property to set another close handler, like a timeout for when the modal should close.

```tsx
render(
  <Modal
    title="Auto close"
    triggerAttributes={{
      text: 'Click me',
    }}
    alignContent="center"
    maxWidth="40rem"
    closeModal={(close) => {
      const timeout = setTimeout(close, 3e3)
      return () => clearTimeout(timeout)
    }}
  >
    <div
      style={{
        padding: '2rem',
        backgroundColor: 'var(--token-color-background-neutral)',
      }}
    >
      <P>This Modal will close in 3 seconds.</P>
    </div>
  </Modal>
)
```

## Properties

```json
{
  "props": {
    "id": {
      "doc": "The id used internal for the trigger button and Modal component.",
      "type": "string",
      "status": "optional"
    },
    "contentId": {
      "doc": "Defines a unique identifier to a modal. Use it in case you have to refer in some way to the modal content.",
      "type": "string",
      "status": "optional"
    },
    "labelledBy": {
      "doc": "The ID of the trigger component, describing the modal content. Defaults to the internal `trigger`, so make sure you define the `title` in `triggerAttributes`.",
      "type": "string",
      "status": "optional"
    },
    "children": {
      "doc": "The content which will appear when triggering open the modal. If a function is given, you get a close method `() => ({ close })` in the arguments.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "fullscreen": {
      "doc": "If set to `true` then the modal content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
      "type": ["boolean", "string"],
      "status": "optional"
    },
    "open": {
      "doc": "Use this property to control the open/close state by setting `true` / `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "openDelay": {
      "doc": "Forces the modal to delay the opening. The delay is given in `ms`.",
      "type": ["number", "string"],
      "status": "optional"
    },
    "disabled": {
      "doc": "Will disable the trigger button.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimation": {
      "doc": "If set to `true`, no open/close animation will be shown. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "noAnimationOnMobile": {
      "doc": "Same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "animationDuration": {
      "doc": "Duration of animation open/close in ms. Defaults to `300ms`.",
      "type": ["number", "string"],
      "status": "optional"
    },
    "preventClose": {
      "doc": "If set to `true` (boolean or string), then the user can't close the modal.",
      "type": "boolean",
      "status": "optional"
    },
    "preventOverlayClose": {
      "doc": "Disable clicking the background overlay to close the modal. PS! Pressing `esc` key will still close the modal.",
      "type": "boolean",
      "status": "optional"
    },
    "openModal": {
      "doc": "Set a function to call the callback function, once the modal should open: `openModal={(open) => open()}`.",
      "type": "function",
      "status": "optional"
    },
    "closeModal": {
      "doc": "Set a function to call the callback function, once the modal should close: `closeModal={(close) => close()}`.",
      "type": "function",
      "status": "optional"
    },
    "focusSelector": {
      "doc": "The Modal handles the first focus – automatically. However, you can define a custom focus selector the will be used instead `focusSelector=\".css-selector\"`.",
      "type": "string",
      "status": "optional"
    },
    "overlayClass": {
      "doc": "Give the page overlay a custom class name (maps to `dnb-modal__overlay`).",
      "type": "string",
      "status": "optional"
    },
    "contentClass": {
      "doc": "Give the content wrapper a custom class name (maps to `dnb-modal__content`).",
      "type": "string",
      "status": "optional"
    },
    "omitTriggerButton": {
      "doc": "Omits default showing trigger button.",
      "type": "boolean",
      "status": "optional"
    },
    "trigger": {
      "doc": "Provide a custom trigger component. Like `trigger={<Anchor href=\"/\" />}`. It will set the focus on it when the modal gets closed.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "triggerAttributes": {
      "doc": "Send along with custom HTML attributes or properties to the trigger button.",
      "type": "Various",
      "status": "optional"
    },
    "dialogTitle": {
      "doc": "The aria label of the dialog when no labelledBy and no title is given. Defaults to `Vindu`.",
      "type": "string",
      "status": "optional"
    },
    "directDomReturn": {
      "doc": "If true, the modal will not open in a new DOM but directly in current DOM. Defaults to `false`. Be aware of the side effects of setting this property to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "bypassInvalidationSelectors": {
      "doc": "Define an array with HTML class selectors (`['.element-selector']`) which should not get invalidated when the modal opens/closes. Use this in order to let some parts of your site still be accessible by screen readers.",
      "type": "Array<string>",
      "status": "optional"
    },
    "scrollRef": {
      "doc": "To get the scroll Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "contentRef": {
      "doc": "To get the inner content Element, pass in your own React ref.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    },
    "spacing": {
      "doc": "If set to `false` then the modal content will be shown without any spacing. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "title": {
      "doc": "The modal/drawer title. Displays on the very top of the content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "modalContent": {
      "doc": "The content which will appear when triggering the modal/drawer. Alternative to `children`.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "barContent": {
      "doc": "The content which will appear in the bar, above the header, and side-by-side the close button.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "headerContent": {
      "doc": "The content which will appear in the header of the modal/drawer.",
      "type": ["React.ReactNode", "function"],
      "status": "optional"
    },
    "minWidth": {
      "doc": "The minimum Modal content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem`.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "maxWidth": {
      "doc": "The maximum Modal content width, defined by a CSS width value like `20rem`. Defaults to `60rem`.",
      "type": ["string", "number"],
      "status": "optional"
    },
    "alignContent": {
      "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
      "type": ["\"left\"", "\"center\"", "\"centered\"", "\"right\""],
      "status": "optional"
    },
    "containerPlacement": {
      "doc": "For `drawer` mode only. Defines the placement on what side the Drawer should be opened. Defaults to `right`.",
      "type": ["\"left\"", "\"right\"", "\"top\"", "\"bottom\""],
      "status": "optional"
    },
    "verticalAlignment": {
      "doc": "Define the vertical alignment of the container. Defaults to `center`.",
      "type": ["\"top\"", "\"center\""],
      "status": "optional"
    },
    "closeTitle": {
      "doc": "The title of the close button. Defaults to _Lukk_.",
      "type": "string",
      "status": "optional"
    },
    "hideCloseButton": {
      "doc": "If `true`, the close button will not be shown.",
      "type": "boolean",
      "status": "optional"
    }
  }
}
```

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
    "Modal.closeTitle": {
      "nb-NO": "Lukk",
      "en-GB": "Close",
      "sv-SE": "Stäng",
      "da-DK": "Luk"
    },
    "Modal.dialogTitle": {
      "nb-NO": "Separat Vindu",
      "en-GB": "Dialog Window",
      "sv-SE": "Separat fönster",
      "da-DK": "Separat vindue"
    }
  }
}
```

## Events

```json
{
  "props": {
    "onOpen": {
      "doc": "This event gets triggered once the modal shows up. Returns the modal id: `{ id }`.",
      "type": "function",
      "status": "optional"
    },
    "onClose": {
      "doc": "This event gets triggered once the modal gets closed. Returns the modal id: `{ id, event, triggeredBy }`.",
      "type": "function",
      "status": "optional"
    },
    "onClosePrevent": {
      "doc": "This event gets triggered once the user tries to close the modal, but `preventClose` is set to `true`. Returns a callback `close` you can call to trigger the close mechanism. More details below. Returns the modal id: `{ id, event, close: Method, triggeredBy }`.",
      "type": "function",
      "status": "optional"
    }
  }
}
```

## `triggeredBy`

The `triggeredBy` property is given when the `onClose` or the `onClosePrevent` event is triggered. It can contain one of the following values:

- `button`: The close button that triggered the event.
- `handler`: The `close` handler given by the function (as the content/children).
- `keyboard`: The escape key that triggered the event.
- `overlay`: The overlay element that triggered the event.
- `unmount`: The unmount event that triggered the `open` property change.

### Selective onClosePrevent

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
