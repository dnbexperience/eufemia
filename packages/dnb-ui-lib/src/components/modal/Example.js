/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox caption="Different ways to open a modal">
          {/* @jsx */ `
<Modal
  title="Modal Title"
  trigger_variant="tertiary"
  trigger_text="Click me"
  modal_content="This is the modal text. Triggered by a tertiary button."
/>
<Modal
  title="Modal Title"
  trigger_title="Click me"
  modal_content={() => (
      <p className="dnb-p">
        This is the modal text. Triggered by a icon button.
      </p>
  )}
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
  <p className="dnb-p">
    This is a Modal Window with no close button.
  </p>
  <p className="dnb-p">
    Click outside me, and I will be closed within 1 second.
  </p>
  <br/>
  <Input label="Focus:">Focus me with Tab key</Input>
</Modal>
          `}
        </ComponentBox>
        <ComponentBox caption="Close Modal by handlers">
          {/* @jsx */ `
<Modal
  title="Auto close"
  trigger_text="Click me"
  // open_state="opened"
  close_modal={close => {
    setTimeout(close, 3e3)
  }}
>
  <p className="dnb-p">
    This Modal will close in 3 seconds.
  </p>
</Modal>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
