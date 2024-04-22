import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import ArrayPushButton from '../ArrayPushButton'

describe('ArrayPushButton', () => {
  it('should call handlePush when clicked inside an Iterate element', () => {
    const handlePush = jest.fn()
    const pushValue = 'push value'

    render(
      <ArrayPushButton pushValue={pushValue}>Push Button</ArrayPushButton>,
      {
        wrapper: ({ children }) => (
          <IterateElementContext.Provider value={{ handlePush }}>
            {children}
          </IterateElementContext.Provider>
        ),
      }
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handlePush).toHaveBeenCalledWith(pushValue)
  })

  it('should call handleChange when clicked outside an Iterate element', () => {
    const handleChange = jest.fn()
    const pushValue = 'push value'

    render(
      <ArrayPushButton onChange={handleChange} pushValue={pushValue}>
        Push Button
      </ArrayPushButton>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenCalledWith([pushValue])
  })

  it('should throw an error if value is not an array', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation()
    const invalidValue = 'invalid value'
    const error = 'ArrayPushButton received a non-array value.'

    expect(() => {
      render(
        <ArrayPushButton
          value={invalidValue as unknown as string[]}
          pushValue="push value"
        >
          Push Button
        </ArrayPushButton>
      )
    }).toThrow()

    expect(consoleErrorSpy.mock.calls[0][0].toString()).toContain(error)
    consoleErrorSpy.mockRestore()
  })

  it('should render with the correct class name', () => {
    render(
      <ArrayPushButton pushValue="push value">Push Button</ArrayPushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-form-iterate-push-button')
  })

  it('should be a secondary variant', () => {
    render(
      <ArrayPushButton pushValue="push value">Push Button</ArrayPushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--secondary')
  })

  it('should have no text by default', () => {
    render(<ArrayPushButton pushValue="push value" />)

    const button = document.querySelector('button')
    expect(button.textContent).toBe('‌')
  })

  it('should accept "text" prop', () => {
    render(<ArrayPushButton pushValue="push value" text="text" />)

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(<ArrayPushButton pushValue="push value">text</ArrayPushButton>)

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(
      <ArrayPushButton pushValue="push value" aria-label="Aria Label">
        text
      </ArrayPushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "add" icon', () => {
    render(
      <ArrayPushButton pushValue="push value">Push Button</ArrayPushButton>
    )

    const button = document.querySelector('.dnb-form-iterate-push-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'add icon'
    )
  })
})
