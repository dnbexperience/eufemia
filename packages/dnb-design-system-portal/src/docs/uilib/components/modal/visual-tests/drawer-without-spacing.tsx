import React from 'react'
import { Modal, P } from '@dnb/eufemia/src'

export default function DrawerWithoutSpacing() {
  return (
    <div data-visual-test="drawer-no-spacing">
      <Modal
        mode="drawer"
        title="Drawer without spacing"
        trigger_text="Open Drawer with no spacing"
        spacing={false}
      >
        <Modal.Content>
          <P top>This is a left aligned Drawer content.</P>
        </Modal.Content>
      </Modal>
    </div>
  )
}
