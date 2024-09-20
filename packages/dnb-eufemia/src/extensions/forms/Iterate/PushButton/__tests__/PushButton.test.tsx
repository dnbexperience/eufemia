import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IterateItemContext from '../../IterateItemContext'
import { Field, Form, Iterate } from '../../..'

describe('PushButton', () => {
  it('should call handlePush when clicked inside an Iterate element', () => {
    const handlePush = jest.fn()
    const pushValue = 'push value'

    render(
      <Iterate.PushButton pushValue={pushValue}>
        Push Button
      </Iterate.PushButton>,
      {
        wrapper: ({ children }) => (
          <IterateItemContext.Provider value={{ handlePush }}>
            {children}
          </IterateItemContext.Provider>
        ),
      }
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handlePush).toHaveBeenCalledTimes(1)
    expect(handlePush).toHaveBeenLastCalledWith(pushValue)
  })

  it('should call handleChange when clicked outside an Iterate element', () => {
    const handleChange = jest.fn()
    const pushValue = 'push value'

    render(
      <Form.Handler onChange={handleChange}>
        <Iterate.PushButton path="/foo" pushValue={pushValue}>
          Push Button
        </Iterate.PushButton>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenLastCalledWith(
      { foo: [pushValue] },
      expect.anything()
    )
  })

  it('should accept "pushValue" from a function call', () => {
    const handleChange = jest.fn()
    const pushValue = jest.fn(() => 'push value')

    render(
      <Form.Handler onChange={handleChange}>
        <Iterate.PushButton path="/foo" pushValue={pushValue}>
          Push Button
        </Iterate.PushButton>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenLastCalledWith(
      { foo: ['push value'] },
      expect.anything()
    )
    expect(pushValue).toHaveBeenLastCalledWith(undefined)
  })

  it('should render with the correct class name', () => {
    render(
      <Iterate.PushButton pushValue="push value">
        Push Button
      </Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-forms-iterate-push-button')
  })

  it('should be a secondary variant', () => {
    render(
      <Iterate.PushButton pushValue="push value">
        Push Button
      </Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--secondary')
  })

  it('should have no text by default', () => {
    render(<Iterate.PushButton pushValue="push value" />)

    const button = document.querySelector('button')
    expect(button.textContent).toBe('‌')
  })

  it('should accept "text" prop', () => {
    render(<Iterate.PushButton pushValue="push value" text="text" />)

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(
      <Iterate.PushButton pushValue="push value">text</Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(
      <Iterate.PushButton pushValue="push value" aria-label="Aria Label">
        text
      </Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "add" icon', () => {
    render(
      <Iterate.PushButton pushValue="push value">
        Push Button
      </Iterate.PushButton>
    )

    const button = document.querySelector('.dnb-forms-iterate-push-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'add icon'
    )
  })

  it('should not overwrite initial data because of the same path as the Iterate.Array', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Iterate.Array path="/myList" defaultValue={[null]}>
          <Field.String itemPath="/" />
        </Iterate.Array>

        <Iterate.PushButton path="/myList" pushValue="push value" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    const button = document.querySelector('.dnb-forms-iterate-push-button')

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myList: [null] },
      expect.anything()
    )

    await userEvent.click(button)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myList: [null, 'push value'] },
      expect.anything()
    )
  })

  it('should support {nextItemNo}', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/myList">
          <Field.String itemPath="/" />
          <Iterate.RemoveButton />
        </Iterate.Array>

        <Iterate.PushButton
          path="/myList"
          pushValue="push value"
          text="Add no. {nextItemNo}"
        />
      </Form.Handler>
    )

    const pushButton = document.querySelector(
      '.dnb-forms-iterate-push-button'
    )

    expect(pushButton).toHaveTextContent('Add no. 1')

    await userEvent.click(pushButton)
    expect(pushButton).toHaveTextContent('Add no. 2')

    const removeButton = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )
    await userEvent.click(removeButton)
    expect(pushButton).toHaveTextContent('Add no. 1')
  })

  it('should inherit "limit" prop from Array and show warning when limit is reached', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/myList" limit={2}>
          <i />
          <Iterate.RemoveButton />
        </Iterate.Array>

        <Iterate.PushButton path="/myList" pushValue="push value" />
      </Form.Handler>
    )

    const pushButton = document.querySelector(
      '.dnb-forms-iterate-push-button'
    )

    // Add first item
    await userEvent.click(pushButton)

    // Add second item
    await userEvent.click(pushButton)

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    // Try a third one
    await userEvent.click(pushButton)

    await waitFor(() => {
      const element = document.querySelector('.dnb-form-status')
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent('Du har nådd grensen på: 2')
      expect(element).toHaveClass('dnb-form-status--warn')
      expect(document.querySelectorAll('i')).toHaveLength(2)
    })

    const removeButton = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )
    await userEvent.click(removeButton)

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })
  })
})
