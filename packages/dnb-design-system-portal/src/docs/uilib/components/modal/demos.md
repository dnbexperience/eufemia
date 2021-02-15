---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Demos

### Triggered by the help button

<ComponentBox data-visual-test="modal-trigger-default">
	{
	/* @jsx */ `
<Modal title="Modal Title">
  <Modal.Inner spacing style_type="mint-green">
    <P>This is the modal text. Triggered by the help button.</P>
  </Modal.Inner>
</Modal>
	`
	}
</ComponentBox>

### Help button and suffix

Most of the components do have a `suffix` property you can make use of.

<ComponentBox data-visual-test="modal-help-button">
	{
	/* @jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Modal>
      <Modal.Inner spacing style_type="pistachio">
        <P>Help text</P>
      </Modal.Inner>
    </Modal>
  }
/>
	`
	}
</ComponentBox>

### Drawer mode

With placement on the left side.

<ComponentBox data-visual-test="modal-drawer">
	{
	/* @jsx */ `
<Modal
  mode="drawer"
  title="Drawer Title"
  trigger_text="Open Drawer"
  trigger_title="Click me"
>
  <Modal.Inner>
    <P>This is a left aligned Drawer content.</P>
  </Modal.Inner>
</Modal>
	`
	}
</ComponentBox>

### Fullscreen Modal, triggered by a tertiary button

<ComponentBox data-visual-test="modal-fullscreen">
	{
	/* @jsx */ `
<Modal
  title={<span className="dnb-sr-only">"Hidden" Modal title</span>}
  fullscreen="true"
  trigger_variant="tertiary"
  trigger_text="Click me"
  trigger_icon="bell"
  modal_content="This is the modal text. Triggered by a tertiary button."
/>
	`
	}
</ComponentBox>

### Hide the Close Button and Prevent Close for 1sec

<ComponentBox>
	{
	/* @jsx */ `
<Modal
  title="1s close delay"
  trigger_text="Click me"
  focus_selector=".dnb-input__input:first-of-type"
  prevent_close="true"
  hide_close_button="true"
  on_open={(e) => console.log('on_open', e)}
  on_close={(e) => console.log('on_close', e)}
  on_close_prevent={({ close, triggeredBy }) => {
    console.log('triggeredBy', triggeredBy)
    const timeout = setTimeout(close, 1e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <P>This is a Modal Window with no close button.</P>
  <P>Click outside me, and I will be closed within 1 second.</P>
  <Section top spacing style_type="divider">
    <Input label="Focus:">Focus me with Tab key</Input>
  </Section>
</Modal>
	`
	}
</ComponentBox>

### Custom trigger component

<ComponentBox>
	{
	/* @jsx */ `
<Modal
  title="Modal Title"
  trigger={(props) => <Button {...props}>Custom trigger Button</Button>}
>
  <Section spacing style_type="divider">
    <P>This Modal was opened by a custom trigger component.</P>
  </Section>
</Modal>
	`
	}
</ComponentBox>

### Open Modal by state only

While the trigger button is not used anymore by using `trigger_hidden`.

<ComponentBox>
	{
	/* @jsx */ `
<Button
  id="custom-triggerer"
  text="Custom trigger Button"
  on_click={() => (
    <Modal
      title="Modal Title"
      trigger_hidden
      open_state="opened"
      labelled_by="custom-triggerer"
    >
      <Section spacing style_type="divider">
        <P>This Modal was opened by a custom trigger button.</P>
      </Section>
    </Modal>
  )}
/>
	`
	}
</ComponentBox>

### Close Modal by handlers

With a `max_width` of `40rem`.

<ComponentBox>
	{
	/* @jsx */ `
<Modal
  title="Auto close"
  trigger_text="Click me"
  align_content="center"
  max_width="40rem"
  close_modal={close => {
    const timeout = setTimeout(close, 3e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <Section spacing style_type="emerald-green">
    <P>This Modal will close in 3 seconds.</P>
  </Section>
</Modal>
	`
	}
</ComponentBox>

### ProgressIndicator inside a Modal

Also, `fullscreen` and `spacing` is disabled and the `align_content` is centered.

<ComponentBox data-visual-test="modal-no-spacing">
	{/* @jsx */ `
<Modal
  spacing={false}
  fullscreen={false}
  align_content="centered"
  hide_close_button
  trigger_text="Show"
  prevent_close={false}
  max_width="20rem"
>
  <ProgressIndicator
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
    size="large"
  />
</Modal>
	`}
</ComponentBox>
