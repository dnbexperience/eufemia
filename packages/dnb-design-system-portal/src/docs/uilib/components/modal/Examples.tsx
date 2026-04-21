/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia/src'

export const ModalExampleStandard = () => (
  <ComponentBox data-visual-test="modal-standard">
    <Modal>
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'var(--token-color-background-neutral)',
        }}
      >
        <P>This is a Modal that you can use to make custom variations</P>
      </div>
    </Modal>
  </ComponentBox>
)

export const ModalExampleStateOnly = () => (
  <ComponentBox>
    {() => {
      const Component = () => {
        const [modalIsActive, setModalState] = React.useState(false)
        return (
          <>
            <Button
              id="custom-triggerer"
              text="Custom trigger Button"
              onClick={() => setModalState((s) => !s)}
            />
            <Modal
              title="Modal Title"
              omitTriggerButton
              open={modalIsActive}
              labelledBy="custom-triggerer"
              onClose={() => setModalState(false)}
            >
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: 'var(--token-color-background-neutral)',
                }}
              >
                <P>This Modal was opened by a custom trigger button.</P>
              </div>
            </Modal>
          </>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const ModalExampleCloseByHandler = () => (
  <ComponentBox>
    <Modal
      title="Auto close"
      triggerAttributes={{ text: 'Click me' }}
      alignContent="center"
      maxWidth="40rem"
      closeModal={(close) => {
        const timeout = setTimeout(close, 3e3)
        return () => clearTimeout(timeout)
      }}
    >
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'var(--token-color-background-neutral)',
        }}
      >
        <P>This Modal will close in 3 seconds.</P>
      </div>
    </Modal>
  </ComponentBox>
)

export const ModalExampleSuffix = () => (
  <ComponentBox hidePreview>
    <Input
      label="Input"
      placeholder="Placeholder ..."
      suffix={<HelpButton>Help text</HelpButton>}
    />
  </ComponentBox>
)

export const ModalExampleTriggerProps = () => (
  <ComponentBox hidePreview>
    <Modal triggerAttributes={{ icon: 'bell' }} right="small">
      ... content ...
    </Modal>
  </ComponentBox>
)

export const ModalExampleOnClosePrevent = () => (
  <ComponentBox hidePreview>
    <Modal
      preventClose={true}
      onClosePrevent={({ triggeredBy, close /* id, event */ }) => {
        switch (triggeredBy) {
          case 'keyboard':
          case 'button':
            close()
            break
          case 'overlay': {
            const timeout = setTimeout(close, 1e3)
            return () => clearTimeout(timeout) // clear timeout on unmount
          }
        }
      }}
    >
      ...
    </Modal>
  </ComponentBox>
)
