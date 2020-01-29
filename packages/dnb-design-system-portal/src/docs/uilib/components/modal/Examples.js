/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Triggered by a icon button"
          data-dnb-test="modal-trigger-default"
        >
          {/* @jsx */ `
<Modal
  title="Modal Title"
  trigger_title="Click me"
  modal_content={() => (
    <Section spacing style_type="mint-green">
      <P>This is the modal text. Triggered by a icon button.</P>
    </Section>
  )}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Fullscreen Modal, triggered by a tertiary button">
          {/* @jsx */ `
<Modal
  title="Modal Title"
  fullscreen="true"
  trigger_variant="tertiary"
  trigger_text="Click me"
  modal_content="This is the modal text. Triggered by a tertiary button."
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Hide the Close Button and Prevent Close for 1sec">
          {/* @jsx */ `
<Modal
  title="1s close delay"
  trigger_text="Click me"
  prevent_close="true"
  hide_close_button="true"
  on_open={(e) => console.log('on_open', e)}
  on_close={(e) => console.log('on_close', e)}
  on_close_prevent={({ close }) => setTimeout(close, 1e3)}
>
  <P>This is a Modal Window with no close button.</P>
  <P>Click outside me, and I will be closed within 1 second.</P>
  <Section spacing style_type="divider">
    <Input label="Focus:">Focus me with Tab key</Input>
  </Section>
</Modal>
          `}
        </ComponentBox>
        <ComponentBox caption="Triggered by custom trigger button">
          {/* @jsx */ `
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
          `}
        </ComponentBox>
        <ComponentBox caption="Close Modal by handlers">
          {/* @jsx */ `
<Modal
  title="Auto close"
  trigger_text="Click me"
  close_modal={close => {
    setTimeout(close, 3e3)
  }}
>
  <Section spacing style_type="emerald-green">
    <P>This Modal will close in 3 seconds.</P>
  </Section>
</Modal>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
