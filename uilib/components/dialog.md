---
title: 'Dialog'
description: 'The Dialog component is a Modal variation that appears at the center of the screen.'
metadata: https://eufemia.dnb.no/uilib/components/dialog/metadata.json
---

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
  </Dialog>,
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
  />,
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
  />,
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
  </Dialog>,
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
  </>,
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
  />,
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
  </Dialog>,
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
  </Dialog>,
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
  />,
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
  />,
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
  </Dialog>,
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
            'scroll-to-bottom-info',
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
