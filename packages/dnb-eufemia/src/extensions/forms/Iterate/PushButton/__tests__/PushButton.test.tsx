import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import PushButton from '../PushButton'

describe('PushButton', () => {
  it('should call handlePush when clicked inside an Iterate element', () => {
    const handlePush = jest.fn()
    const pushValue = 'push value'

    render(<PushButton pushValue={pushValue}>Push Button</PushButton>, {
      wrapper: ({ children }) => (
        <IterateElementContext.Provider value={{ handlePush }}>
          {children}
        </IterateElementContext.Provider>
      ),
    })

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handlePush).toHaveBeenCalledWith(pushValue)
  })

  it('should call handleChange when clicked outside an Iterate element', () => {
    const handleChange = jest.fn()
    const pushValue = 'push value'

    render(
      <PushButton onChange={handleChange} pushValue={pushValue}>
        Push Button
      </PushButton>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenCalledWith([pushValue])
  })

  it('should accept "pushValue" from a function call', () => {
    const handleChange = jest.fn()
    const pushValue = jest.fn(() => 'push value')

    render(
      <PushButton onChange={handleChange} pushValue={pushValue}>
        Push Button
      </PushButton>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenCalledWith(['push value'])
    expect(pushValue).toHaveBeenCalledWith(undefined)
  })

  it('should throw an error if value is not an array', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation()
    const invalidValue = 'invalid value'
    const error = 'PushButton received a non-array value.'

    expect(() => {
      render(
        <PushButton
          value={invalidValue as unknown as string[]}
          pushValue="push value"
        >
          Push Button
        </PushButton>
      )
    }).toThrow()

    expect(consoleErrorSpy.mock.calls[0][0].toString()).toContain(error)
    consoleErrorSpy.mockRestore()
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
})
