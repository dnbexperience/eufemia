import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IterateItemContext from '../../IterateItemContext'
import PushButton from '../PushButton'
import { Field, Form, Iterate } from '../../..'

describe('PushButton', () => {
  it('should call handlePush when clicked inside an Iterate element', () => {
    const handlePush = jest.fn()
    const pushValue = 'push value'

    render(<PushButton pushValue={pushValue}>Push Button</PushButton>, {
      wrapper: ({ children }) => (
        <IterateItemContext.Provider value={{ handlePush }}>
          {children}
        </IterateItemContext.Provider>
      ),
    })

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
        <PushButton path="/foo" pushValue={pushValue}>
          Push Button
        </PushButton>
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
        <PushButton path="/foo" pushValue={pushValue}>
          Push Button
        </PushButton>
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
    render(<PushButton pushValue="push value">Push Button</PushButton>)

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-forms-iterate-push-button')
  })

  it('should be a secondary variant', () => {
    render(<PushButton pushValue="push value">Push Button</PushButton>)

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--secondary')
  })

  it('should have no text by default', () => {
    render(<PushButton pushValue="push value" />)

    const button = document.querySelector('button')
    expect(button.textContent).toBe('‌')
  })

  it('should accept "text" prop', () => {
    render(<PushButton pushValue="push value" text="text" />)

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(<PushButton pushValue="push value">text</PushButton>)

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(
      <PushButton pushValue="push value" aria-label="Aria Label">
        text
      </PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "add" icon', () => {
    render(<PushButton pushValue="push value">Push Button</PushButton>)

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

        <PushButton path="/myList" pushValue="push value" />
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
})
