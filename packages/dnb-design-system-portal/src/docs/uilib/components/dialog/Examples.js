/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const DialogExampleDefault = () => (
  <ComponentBox data-visual-test="dialog-default">
    {() => /* jsx */ `
<Dialog title="What is a Dialog?">
  <P>The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes (for example explaining a word on the page). Similar to Modal, it has to be triggered by the user to appear. Typical usage would be to read an explanation, then closing it.</P>
  <Button variant="secondary" size="large" top="large">Read more</Button>
</Dialog>
	`}
  </ComponentBox>
)

export const DialogExampleHelpButton = () => (
  <ComponentBox data-visual-test="dialog-help-button">
    {() => /* jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Dialog>
      <P>Some additional information for the input field.</P>
    </Dialog>
  }
/>
	`}
  </ComponentBox>
)

export const DialogExampleFullscreen = () => (
  <ComponentBox data-visual-test="dialog-fullscreen">
    {() => /* jsx */ `
<Dialog
  title={<span className="dnb-sr-only">"Hidden" Dialog title</span>}
  fullscreen
  triggerAttributes={{
    variant: "tertiary",
    text: "Open a fullscreen dialog",
    icon: "bell"
  }}
  modalContent="The Dialog component is a Modal variation that appears at the center of the screen. The Dialog has similar functionality to a traditional popup window and is mostly used for informational purposes."
/>
	`}
  </ComponentBox>
)

export const DialogExampleDelayClose = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Dialog
  title=".5s close delay"
  triggerAttributes={{
      text: "Click me"
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
  <Input label="Focus:" top spacing>Focus me with Tab key</Input>
</Dialog>
	`}
  </ComponentBox>
)

export const DialogExampleCustomTrigger = () => (
  <ComponentBox data-visual-test="dialog-custom-trigger">
    {() => /* jsx */ `
<Dialog
  title="Modal Title"
  trigger={(props) => (
    <Button {...props} variant="primary" icon="information">Custom trigger button</Button>
  )}
>
    <P>This Modal was opened by a custom trigger component.</P>
</Dialog>
	`}
  </ComponentBox>
)

export const FullDialogExample = () => (
  <ComponentBox
    data-visual-test="full-dialog"
    scope={{ handleBack: () => {} }}
  >
    {() => /* jsx */ `
<Dialog
  title="Custom title"
  >
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
  <FormStatus state="info">This is a formstatus in a Dialog</FormStatus>
</Dialog>
`}
  </ComponentBox>
)

export const DialogExampleProgressIndicator = () => (
  <ComponentBox data-visual-test="dialog-progress-indicator">
    {() => /* jsx */ `
<Dialog
  spacing={false}
  fullscreen={false}
  alignContent="centered"
  hideCloseButton
  triggerText="Show"
  preventClose={false}
  maxWidth="12rem"
>
  <ProgressIndicator
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
  />
</Dialog>
	`}
  </ComponentBox>
)
