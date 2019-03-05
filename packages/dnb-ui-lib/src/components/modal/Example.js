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
        <ComponentBox caption="Diferent ways to open a Modal">
          {/* @jsx */ `
<Modal
  type="text"
  title="Modal Title"
  modal_trigger_text="Click me"
  modal_content="This is the modal text. Triggered by text."
/>
<Modal
  title="Modal Title"
  modal_trigger_title="Click me"
  modal_content={() => (
      <p className="dnb-p">This is the modal text. Triggered by a button.</p>
  )}
/>
<Modal
  title="Modal Title"
  modal_trigger_text="Click me"
>
  <Input label="Label:">Focus me with Tab key</Input>
</Modal>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
