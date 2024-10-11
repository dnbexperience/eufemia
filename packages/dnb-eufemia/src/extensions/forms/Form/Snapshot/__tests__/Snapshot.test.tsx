import React, { createRef, useCallback, useEffect, useRef } from 'react'
import { render, screen } from '@testing-library/react'
import { Field, Form } from '../../..'
import userEvent from '@testing-library/user-event'

describe('Form.Snapshot', () => {
  it('should handle sliced snapshots', async () => {
    const MockComponent = () => {
      const { createSnapshot, applySnapshot } = Form.useSnapshot()
      const pointerRef = useRef(0)

      useEffect(() => {
        createSnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [createSnapshot])

      const changeHandler = useCallback(() => {
        pointerRef.current += 1
        createSnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [createSnapshot])

      const undoHandler = useCallback(() => {
        pointerRef.current -= 1
        applySnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [applySnapshot])

      const redoHandler = useCallback(() => {
        pointerRef.current += 1
        applySnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [applySnapshot])

      return (
        <>
          <Form.Snapshot name="my-snapshot-slice">
            <Field.String
              path="/foo"
              label="Will be reverted"
              onChange={changeHandler}
            />
          </Form.Snapshot>

          <Field.String path="/bar" label="Will stay" />

          <button onClick={undoHandler}>Undo</button>
          <button onClick={redoHandler}>Redo</button>
        </>
      )
    }

    render(
      <Form.Handler>
        <MockComponent />
      </Form.Handler>
    )

    const willBeRevertedInput = screen.getByLabelText(
      'Will be reverted'
    ) as HTMLInputElement
    const willStayInput = screen.getByLabelText(
      'Will stay'
    ) as HTMLInputElement
    const undoButton = screen.getByText('Undo')
    const redoButton = screen.getByText('Redo')

    expect(willBeRevertedInput.value).toBe('')
    expect(willStayInput.value).toBe('')

    await userEvent.type(willBeRevertedInput, 'Hello World')

    expect(willBeRevertedInput.value).toBe('Hello World')
    expect(willStayInput.value).toBe('')

    await userEvent.click(undoButton)
    await userEvent.click(undoButton)
    await userEvent.click(undoButton)

    expect(willBeRevertedInput.value).toBe('Hello Wo')

    await userEvent.type(willStayInput, 'Stay')

    await userEvent.click(redoButton)
    await userEvent.click(redoButton)

    expect(willBeRevertedInput.value).toBe('Hello Worl')
    expect(willStayInput.value).toBe('Stay')

    await userEvent.click(redoButton)

    expect(willBeRevertedInput.value).toBe('Hello World')
    expect(willStayInput.value).toBe('Stay')

    await userEvent.type(willBeRevertedInput, ' 123')

    expect(willBeRevertedInput.value).toBe('Hello World 123')
    expect(willStayInput.value).toBe('Stay')

    await userEvent.click(undoButton)

    expect(willBeRevertedInput.value).toBe('Hello World 12')
    expect(willStayInput.value).toBe('Stay')
  })

  it('should handle sliced snapshots from outside of the form', async () => {
    const pointerRef: React.MutableRefObject<number> = createRef()
    pointerRef.current = 0

    const MockHookFromOutside = () => {
      const { createSnapshot, applySnapshot } = Form.useSnapshot('form-id')

      useEffect(() => {
        createSnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [createSnapshot])

      const undoHandler = useCallback(() => {
        pointerRef.current -= 1
        applySnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [applySnapshot])

      const redoHandler = useCallback(() => {
        pointerRef.current += 1
        applySnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [applySnapshot])

      return (
        <>
          <button onClick={undoHandler}>Undo</button>
          <button onClick={redoHandler}>Redo</button>
        </>
      )
    }

    const MockComponent = () => {
      const { createSnapshot } = Form.useSnapshot()

      const changeHandler = useCallback(() => {
        pointerRef.current += 1
        createSnapshot(pointerRef.current, 'my-snapshot-slice')
      }, [createSnapshot])

      return (
        <>
          <Form.Snapshot name="my-snapshot-slice">
            <Field.String
              path="/foo"
              label="Will be reverted"
              onChange={changeHandler}
            />
          </Form.Snapshot>

          <Field.String path="/bar" label="Will stay" />
        </>
      )
    }

    render(
      <>
        <Form.Handler id="form-id">
          <MockComponent />
        </Form.Handler>

        <MockHookFromOutside />
      </>
    )

    const willBeRevertedInput = screen.getByLabelText(
      'Will be reverted'
    ) as HTMLInputElement
    const willStayInput = screen.getByLabelText(
      'Will stay'
    ) as HTMLInputElement
    const undoButton = screen.getByText('Undo')
    const redoButton = screen.getByText('Redo')

    expect(willBeRevertedInput.value).toBe('')
    expect(willStayInput.value).toBe('')

    await userEvent.type(willBeRevertedInput, 'Hello World')

    expect(willBeRevertedInput.value).toBe('Hello World')
    expect(willStayInput.value).toBe('')

    await userEvent.click(undoButton)
    await userEvent.click(undoButton)
    await userEvent.click(undoButton)

    expect(willBeRevertedInput.value).toBe('Hello Wo')

    await userEvent.type(willStayInput, 'Stay')

    await userEvent.click(redoButton)
    await userEvent.click(redoButton)

    expect(willBeRevertedInput.value).toBe('Hello Worl')
    expect(willStayInput.value).toBe('Stay')

    await userEvent.click(redoButton)

    expect(willBeRevertedInput.value).toBe('Hello World')
    expect(willStayInput.value).toBe('Stay')

    await userEvent.type(willBeRevertedInput, ' 123')

    expect(willBeRevertedInput.value).toBe('Hello World 123')
    expect(willStayInput.value).toBe('Stay')

    await userEvent.click(undoButton)

    expect(willBeRevertedInput.value).toBe('Hello World 12')
    expect(willStayInput.value).toBe('Stay')
  })
})
