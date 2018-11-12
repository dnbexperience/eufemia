/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import Input from '../input/Input'
import Modal from './Modal'

class Example extends Component {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Root Element Example</h3>
        <CodeRenderer language="html">{`
<body>
  <div id="app" />
  <div id="dnb-modal-root" />
</body>
      `}</CodeRenderer>
      </Fragment>
    )
  }
  render() {
    return (
      <Fragment>
        <Modal
          type="text"
          modal_trigger_text="Click me"
          modal_content="This is the modal text. Triggered by text."
        />
        <Modal
          modal_trigger_title="Click me"
          modal_content={() => (
            <strong>This is the modal text. Triggered by a button.</strong>
          )}
        />
        <Modal title="Hello" modal_trigger_text="Click me">
          <h2>Some content</h2>
          <Input>Focus me with Tab key</Input>
        </Modal>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
