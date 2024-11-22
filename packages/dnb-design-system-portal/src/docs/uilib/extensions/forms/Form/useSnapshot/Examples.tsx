import React from 'react'
import { Button } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Tools,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'

export const InWizard = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          const { createSnapshot, revertSnapshot } =
            Form.useSnapshot('my-form')

          return (
            <Form.Handler id="my-form">
              <Wizard.Container
                onStepChange={(index, mode, args) => {
                  if (mode === 'previous') {
                    revertSnapshot(String(args.id), 'my-snapshot-slice')
                  } else {
                    createSnapshot(
                      args.previousStep.id,
                      'my-snapshot-slice',
                    )
                  }
                }}
              >
                <Wizard.Step title="Step A" id="step-a">
                  <Form.Snapshot name="my-snapshot-slice">
                    <Field.String path="/foo" label="Will be reverted" />
                  </Form.Snapshot>
                  <Field.String path="/bar" label="Will stay" />
                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title="Step B" id="step-b">
                  <Field.String path="/foo" label="Will be reverted" />
                  <Field.String path="/bar" label="Will stay" />
                  <Wizard.Buttons />
                </Wizard.Step>
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const UndoRedo = () => {
  return (
    <ComponentBox scope={{ Tools }}>
      {() => {
        const MyComponent = () => {
          const { createSnapshot, applySnapshot } = Form.useSnapshot()
          const pointerRef = React.useRef(0)

          React.useEffect(() => {
            createSnapshot(pointerRef.current, 'my-snapshot-slice')
          }, [createSnapshot])

          const changeHandler = React.useCallback(() => {
            pointerRef.current += 1
            createSnapshot(pointerRef.current, 'my-snapshot-slice')
          }, [createSnapshot])
          const undoHandler = React.useCallback(() => {
            pointerRef.current -= 1
            applySnapshot(pointerRef.current, 'my-snapshot-slice')
          }, [applySnapshot])
          const redoHandler = React.useCallback(() => {
            pointerRef.current += 1
            applySnapshot(pointerRef.current, 'my-snapshot-slice')
          }, [applySnapshot])

          return (
            <>
              <Form.Card>
                <Form.Snapshot name="my-snapshot-slice">
                  <Field.String
                    path="/foo"
                    label="Will be reverted"
                    onChange={changeHandler}
                  />
                </Form.Snapshot>
                <Field.String path="/bar" label="Will stay" />
              </Form.Card>

              <Form.ButtonRow>
                <Button variant="secondary" onClick={undoHandler}>
                  Undo
                </Button>
                <Button variant="secondary" onClick={redoHandler}>
                  Redo
                </Button>
              </Form.ButtonRow>

              <Tools.Log top />
            </>
          )
        }

        return (
          <Form.Handler>
            <MyComponent />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
