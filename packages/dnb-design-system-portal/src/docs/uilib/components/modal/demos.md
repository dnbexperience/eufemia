---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'

## Demos

### Triggered by the help button

<ComponentBox data-dnb-test="modal-trigger-default">
	{
	/* @jsx */ `
<Modal title="Modal Title">
  <Section spacing style_type="mint-green">
    <P>This is the modal text. Triggered by the help button.</P>
  </Section>
</Modal>
	`
	}
</ComponentBox>

### Help button and suffix

Most of the components do have a `suffix` property you can make use of.

<ComponentBox data-dnb-test="modal-help-button">
	{
	/* @jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Modal>
      Help text
    </Modal>
  }
/>
	`
	}
</ComponentBox>

### Drawer mode

With placement on the left side.

<ComponentBox>
	{
	/* @jsx */ `
<Modal
  mode="drawer"
  container_placement="left"
  align_content="center"
  title={<span className="dnb-sr-only">"Hidden" Drawer title</span>}
  trigger_text="Open Drawer"
  trigger_title="Click me"
  modal_content={() => (
    <P>This is the left aligned Drawer content.</P>
  )}
/>
	`
	}
</ComponentBox>

### Fullscreen Modal, triggered by a tertiary button

<ComponentBox>
	{
	/* @jsx */ `
<Modal
  title="Modal Title"
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
  prevent_close="true"
  hide_close_button="true"
  on_open={(e) => console.log('on_open', e)}
  on_close={(e) => console.log('on_close', e)}
  on_close_prevent={({ close }) => {
    const timeout = setTimeout(close, 1e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <P>This is a Modal Window with no close button.</P>
  <P>Click outside me, and I will be closed within 1 second.</P>
  <Section spacing style_type="divider">
    <Input label="Focus:">Focus me with Tab key</Input>
  </Section>
</Modal>
	`
	}
</ComponentBox>

### Triggered by custom trigger button

<ComponentBox>
	{
	/* @jsx */ `
<Button
  id="custom-triggerer"
  text="Custom trigger Button"
  on_click={() => (
    <Modal
      title="Modal Title"
      trigger_hidden="true"
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

<ComponentBox>
	{
	/* @jsx */ `
<Modal
  title="Auto close"
  trigger_text="Click me"
  align_content="center"
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
