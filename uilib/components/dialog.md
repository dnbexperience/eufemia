---
title: 'Dialog'
description: 'The Dialog component is a Modal variation that appears at the center of the screen.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.279Z
checksum: 6146c02e2ec2d9b56850e52773452480f012e0218157924a5c1255deac391a7a
---

# Dialog

## Import

```tsx
import { Dialog } from '@dnb/eufemia'
```

## Description

The Dialog component is a [Modal](/uilib/components/modal) variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window. Similar to Modal, it has to be triggered by the user to appear. Typical usage would be to read an explanation, then close it.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=21007-9783)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/dialog)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/dialog)

### Variants

There are two variants of the Dialog component: `information` and `confirmation`.

<InlineImg
  height="230"
  width="auto"
  src={DialogInformExample}
  caption="Example of an informational Dialog"
  className="mint-green-12"
/>
<InlineImg
  height="230"
  width="auto"
  src={DialogConfirmExample}
  caption="Example of a confirmation Dialog"
  className="mint-green-12"
/>

The informational variant (`information`) is used for informational purposes, for example explaining a word or something on the page. It has to be triggered by the user to appear. Typical usage would be to read an explanation, then close it.

The confirmation variant (`confirmation`) is used when some action is needed, or if we need to inform the user of something without them triggering it. A couple of examples would be a scenario where the user confirms deleting something, or if the user has been logged out automatically and we need to inform them, or a cookie consent dialog.

### Parts in Dialog

To provide custom content to parts of the Dialog, a set of component parts are provided:

- `<Dialog.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the property `navContent`).
- `<Dialog.Header>`: The header field of the component, where the `title` will appear (Equal to the property `headerContent`).
- `<Dialog.Action>`: An optional field for buttons at the bottom of the component. This field will appear by default for variant `confirmation`.

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).

## Table of contents

1. [Inform demos](/uilib/components/dialog/demos#demos-for-variant-information)
1. [Confirm demos](/uilib/components/dialog/demos#demos-for-variant-confirmation)

## Demos for variant `information`

### Basic Dialog

```tsx
render(
  <Dialog title="What is a Dialog?">
    <P>
      The Dialog component is a Modal variation that appears at the center
      of the screen. The Dialog has similar functionality to a traditional
      popup window and is mostly used for informational purposes (for
      example explaining a word on the page). Similar to Modal, it has to
      be triggered by the user to appear. Typical usage would be to read an
      explanation, then closing it.
    </P>
    <Button variant="secondary" size="large" top="large">
      Read more
    </Button>
  </Dialog>
)
```

### Dialog as help button

```tsx
render(
  <Input
    label="Input"
    placeholder="Placeholder ..."
    suffix={
      <Dialog>
        <P>Some additional information for the input field.</P>
      </Dialog>
    }
  />
)
```

### Top aligned Dialog

```tsx
render(
  <Dialog
    title="Vertical alignment top"
    verticalAlignment="top"
    triggerAttributes={{
      text: 'Vertical alignment',
    }}
    modalContent="The Dialog component is a Modal aligned at the top of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
  />
)
```

### Dialog with custom trigger

```tsx
render(
  <Dialog
    title="Modal Title"
    trigger={(props) => (
      <Button {...props} variant="primary" icon="information">
        Custom trigger button
      </Button>
    )}
  >
    <P>This Modal was opened by a custom trigger component.</P>
  </Dialog>
)
```

### Dialog with custom content

```tsx
const handleBack = () => null
render(
  <>
    <Dialog title="Custom title">
      <Dialog.Navigation>
        <Breadcrumb onClick={handleBack} />
      </Dialog.Navigation>
      <Dialog.Header>
        <P bottom>This is in the Dialog header</P>
      </Dialog.Header>
      <Button bottom size="large" right top>
        Read more
      </Button>
      <Button bottom size="large" variant="secondary">
        Open example
      </Button>
      <FormStatus state="info">
        This is a formstatus in a Dialog
      </FormStatus>
    </Dialog>
  </>
)
```

### Fullscreen Dialog

```tsx
render(
  <Dialog
    title={<span className="dnb-sr-only">"Hidden" Dialog title</span>}
    fullscreen
    triggerAttributes={{
      variant: 'tertiary',
      text: 'Open a fullscreen dialog',
      icon: 'bell',
    }}
    modalContent="The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
  />
)
```

### Dialog as progress indicator

```tsx
render(
  <Dialog
    spacing={false}
    fullscreen={false}
    alignContent="centered"
    hideCloseButton
    triggerAttributes={{
      text: 'Show',
    }}
    preventClose={false}
    maxWidth="12rem"
  >
    <ProgressIndicator
      showDefaultLabel
      labelDirection="vertical"
      top="large"
      bottom="large"
    />
  </Dialog>
)
```

### Dialog with close delay

```tsx
render(
  <Dialog
    title=".5s close delay"
    triggerAttributes={{
      text: 'Click me',
    }}
    focusSelector=".dnb-input__input:first-of-type"
    preventClose
    hideCloseButton
    onOpen={(e) => console.log('on_open', e)}
    onClose={(e) => console.log('on_close', e)}
    onClosePrevent={({ close, triggeredBy }) => {
      console.log('triggeredBy', triggeredBy)
      const timeout = setTimeout(close, 500)
      return () => clearTimeout(timeout) // clear timeout on unmount
    }}
  >
    <P>This is a Dialog with no close button.</P>
    <P>Click outside me, and I will be closed within 1 second.</P>
    <Input label="Focus" top>
      Focus me with Tab key
    </Input>
  </Dialog>
)
```

## Demos for variant `confirmation`

### Confirm dialog

```tsx
render(
  <Dialog
    variant="confirmation"
    title="Dialog confirmation title"
    icon={bell_medium}
    description="Some content describing the situation."
    onConfirm={({ close }) => close()}
    triggerAttributes={{
      text: 'Trigger button',
    }}
  />
)
```

### Deletion Dialog

A `confirmType="warning"` will enhance the context by applying a red color to the icon, as in the deletion scenario.

```tsx
render(
  <Dialog
    variant="confirmation"
    confirmType="warning"
    title="Are you sure you want to delete this?"
    icon={trash_medium}
    description="This action cannot be undone."
    confirmText="Delete"
    declineText="Cancel"
    onConfirm={({ close }) => close()}
    triggerAttributes={{
      text: 'Delete record',
      icon: trash_medium,
    }}
  />
)
```

### Logged out Dialog

Use the `openState` property to automatically trigger the Dialog, here demonstrated with a button for simplicity. You can also change the default confirm text and hide the decline button when suited.

```tsx
const DemoComponent = () => {
  const [open, setOpen] = React.useState(false)
  const loginHandler = () => null
  return (
    <>
      <Button
        id="custom-triggerer"
        text="Manually trigger"
        on_click={() => setOpen(true)}
      />
      <Dialog
        variant="confirmation"
        title="Du har blitt logget ut"
        icon={log_out_medium}
        description="For å fortsette må du logge inn igjen."
        confirmText="Logg inn"
        hideDecline
        openState={open}
        onClose={({ triggeredBy }) => {
          console.log('triggeredBy', triggeredBy)
          setOpen(false)
        }}
        onConfirm={() => {
          setOpen(false)
          loginHandler()
        }}
        labelledBy="custom-triggerer"
      />
    </>
  )
}
render(<DemoComponent />)
```

### Cookie concent Dialog

Provide a custom set of buttons, like this cookie concent Dialog that has a `tertiary` "Administrate" button. Notice that the `close` function will be provided for every child of type [Button](/uilib/components/button) given to `Dialog.Action`.

```tsx
render(
  <Dialog
    triggerAttributes={{
      text: 'Show cookie dialog',
    }}
    icon={cookie_medium}
    variant="confirmation"
    title="Informasjonskapsler (cookies)"
  >
    Vi bruker cookies for å gi deg den beste opplevelsen i nettbanken vår.
    <br />
    <Anchor target="_blank" href="https://www.dnb.no/cookies">
      Les mer om cookies
    </Anchor>
    <Dialog.Action>
      <Button
        variant="tertiary"
        text="Administrer"
        icon={edit}
        icon_position="left"
        on_click={({ close }) => {
          close()
        }}
      />
      <Button
        text="Jeg godtar"
        on_click={({ close }) => {
          close()
        }}
      />
    </Dialog.Action>
  </Dialog>
)
```

```tsx
const MockComponent = () => {
  const scrollRef = React.useRef(null)
  return (
    <Dialog
      triggerAttributes={{
        text: 'Show cookie dialog',
      }}
      variant="confirmation"
      title="Informasjonskapsler (cookies)"
      scrollRef={scrollRef}
      onOpen={() => {
        if (
          document.documentElement.classList.contains('scroll-to-bottom')
        ) {
          scrollRef.current.scrollTop = 100000
        }
      }}
    >
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      <br />
      <Anchor target="_blank" href="https://www.dnb.no/cookies">
        Les mer om cookies
      </Anchor>
      <Dialog.Action>
        <Button
          variant="tertiary"
          text="Administrer"
          icon_position="left"
          on_click={({ close }) => {
            close()
          }}
        />
        <Button
          text="Jeg godtar"
          on_click={({ close }) => {
            close()
          }}
        />
      </Dialog.Action>
    </Dialog>
  )
}
render(<MockComponent />)
```

```tsx
const MockComponent = () => {
  const scrollRef = React.useRef(null)
  return (
    <Dialog
      variant="information"
      scrollRef={scrollRef}
      onOpen={() => {
        if (
          document.documentElement.classList.contains(
            'scroll-to-bottom-info'
          )
        ) {
          scrollRef.current.scrollTop = 100000
        }
      }}
    >
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      Newline
      <br />
      <br />
      Last line
    </Dialog>
  )
}
render(<MockComponent />)
```

## Properties

```json
{
  "variant": {
    "doc": "The dialog variant. Can either be `information` or `confirmation`. Defaults to `information`.",
    "type": "string",
    "status": "optional"
  },
  "title": {
    "doc": "The dialog title. Displays on the very top of the content.",
    "type": "string",
    "status": "optional"
  },
  "minWidth": {
    "doc": "The minimum Dialog content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`).",
    "type": "string",
    "status": "optional"
  },
  "maxWidth": {
    "doc": "The maximum Dialog content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).",
    "type": "string",
    "status": "optional"
  },
  "className": {
    "doc": "Give the Dialog content a class name (maps to `dnb-dialog`).",
    "type": "string",
    "status": "optional"
  },
  "spacing": {
    "doc": "If set to `false` then the dialog content will be shown without any spacing. Defaults to `true`.",
    "type": "boolean",
    "status": "optional"
  },
  "preventCoreStyle": {
    "doc": "By default the dialog content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.",
    "type": "boolean",
    "status": "optional"
  },
  "navContent": {
    "doc": "The content which will appear in the navigation, above the header, and side-by-side the close button.",
    "type": "React.Node",
    "status": "optional"
  },
  "headerContent": {
    "doc": "The content which will appear in the header of the dialog.",
    "type": "React.Node",
    "status": "optional"
  },
  "modalContent": {
    "doc": "The content which will appear when triggering the dialog.",
    "type": "React.Node",
    "status": "optional"
  },
  "description": {
    "doc": "A description will be positioned below the title, but before the content. Used for Dialog variant `confirmation` to further describe what the actions will do.",
    "type": "string",
    "status": "optional"
  },
  "verticalAlignment": {
    "doc": "Define the vertical alignment of the container. Can be set to `top` or `center`. Defaults to `center`.",
    "type": "string",
    "status": "optional"
  },
  "alignContent": {
    "doc": "Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.",
    "type": "string",
    "status": "optional"
  },
  "fullscreen": {
    "doc": "If set to `true` then the dialog content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.",
    "type": "boolean",
    "status": "optional"
  },
  "icon": {
    "doc": "An icon to display at the top of the component. Should be of size medium, so make sure you import the `_medium` version of the Eufemia icon.",
    "type": "React.Node",
    "status": "optional"
  },
  "confirmType": {
    "doc": "For variant confirmation, the dialog is either an informational (`info`) or a warning (`warning`) message. Defaults to `info`.",
    "type": "string",
    "status": "optional"
  },
  "declineText": {
    "doc": "For dialog actions, give a custom text for the decline button.",
    "type": "string",
    "status": "optional"
  },
  "confirmText": {
    "doc": "For dialog actions, give a custom text for the confirmation button.",
    "type": "string",
    "status": "optional"
  },
  "hideDecline": {
    "doc": "For variant confirmation, hide the default decline button and only show the confirmation button.",
    "type": "boolean",
    "status": "optional"
  },
  "hideConfirm": {
    "doc": "For variant confirmation, hide the default confirm button and only show the decline button.",
    "type": "boolean",
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
  }
}
```

### More properties

The properties of [Modal](/uilib/components/modal) formatted as camel case are also provided.
See the table below:

<PropertiesTable props={ModalProperties} />

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Dialog.confirmText": {
      "nb-NO": "Godta",
      "en-GB": "Approve",
      "sv-SE": "Godkänn",
      "da-DK": "Godkend"
    },
    "Dialog.declineText": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
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

```json
{
  "onConfirm": {
    "doc": "For variant confirmation, handle the confirm action click. Provided with the mouse event and the Modal function `close` as arguments.",
    "type": "function",
    "status": "optional"
  },
  "onDecline": {
    "doc": "For variant confirmation, handle the decline action click. Provided with the mouse event and the Modal function `close` as arguments.",
    "type": "function",
    "status": "optional"
  }
}
```

Dialog also includes the same events as [Modal](/uilib/components/modal), only formatted as camel case.

<PropertiesTable props={ModalEvents} />
