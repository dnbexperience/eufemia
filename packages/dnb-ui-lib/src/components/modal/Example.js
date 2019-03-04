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
  modal_trigger_text="Click me"
  modal_content="This is the modal text. Triggered by text."
/>
<Modal
  modal_trigger_title="Click me"
  modal_content={() => (
    <strong>
      This is the modal text. Triggered by a button.
    </strong>
  )}
/>
<Modal title="Hello" modal_trigger_text="Click me">
  <h2>Some content</h2>
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
