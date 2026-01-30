/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import { Modal, P, Button, Input, HelpButton } from '@dnb/eufemia/src'

export const ExampleCard = ({ children }) => (
  <div
    id="example-card"
    style={{ padding: '2rem', backgroundColor: 'white' }}
  >
    {children}
  </div>
)

export const ModalExampleStandard = () => (
  <ComponentBox data-visual-test="modal-standard" scope={{ ExampleCard }}>
    <Modal>
      <ExampleCard>
        <P>This is a Modal that you can use to make custom variations</P>
      </ExampleCard>
    </Modal>
  </ComponentBox>
)

export const ModalExampleStateOnly = () => (
  <ComponentBox scope={{ ExampleCard }}>
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
              <ExampleCard>
                <P>This Modal was opened by a custom trigger button.</P>
              </ExampleCard>
            </Modal>
          </>
        )
      }

      return <Component />
    }}
  </ComponentBox>
)

export const ModalExampleCloseByHandler = () => (
  <ComponentBox scope={{ ExampleCard }}>
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
      <ExampleCard>
        <P>This Modal will close in 3 seconds.</P>
      </ExampleCard>
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
