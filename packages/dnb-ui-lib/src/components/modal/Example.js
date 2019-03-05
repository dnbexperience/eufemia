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
  title="Modal Title"
  trigger_variant="tertiary"
  trigger_text="Click me"
  modal_content="This is the modal text. Triggered by a tertiary button."
/>
<Modal
  title="Modal Title"
  trigger_title="Click me"
  modal_content={() => (
      <p className="dnb-p">This is the modal text. Triggered by a icon button.</p>
  )}
/>
<Modal
  title="Modal Title"
  trigger_text="Click me"
  on_open={(e) => console.log('on_open', e)}
  on_close={(e) => console.log('on_close', e)}
>
  <p className="dnb-p">This is the modal text. Triggered by a secondary button.</p>
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
