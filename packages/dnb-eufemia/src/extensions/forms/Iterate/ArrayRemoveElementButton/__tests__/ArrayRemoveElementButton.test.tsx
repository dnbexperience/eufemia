import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import ArrayRemoveElementButton from '../ArrayRemoveElementButton'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].Iterate

describe('ArrayRemoveElementButton', () => {
  const handleRemove = jest.fn()

  const wrapper = ({ children }) => (
    <IterateElementContext.Provider value={{ handleRemove }}>
      {children}
    </IterateElementContext.Provider>
  )

  it('should call handleRemove when clicked inside an Iterate element', () => {
    render(
      <ArrayRemoveElementButton>Push Button</ArrayRemoveElementButton>,
      { wrapper }
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleRemove).toHaveBeenCalledWith()
  })

  it('should throw an error if value is not an array', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation()
    const invalidValue = 'invalid value'
    const error =
      'ArrayRemoveElementButton must be inside an Iterate.Array component.'

    expect(() => {
      render(
        <ArrayRemoveElementButton
          value={invalidValue as unknown as string[]}
        >
          Push Button
        </ArrayRemoveElementButton>
      )
    }).toThrow()

    expect(consoleErrorSpy.mock.calls[0][0].toString()).toContain(error)
    consoleErrorSpy.mockRestore()
  })

  it('should render with the correct class name', () => {
    render(
      <ArrayRemoveElementButton>Push Button</ArrayRemoveElementButton>,
      { wrapper }
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-form-iterate-remove-element-button')
  })

  it('should be a tertiary variant', () => {
    render(
      <ArrayRemoveElementButton>Push Button</ArrayRemoveElementButton>,
      { wrapper }
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have correct text by default', () => {
    render(<ArrayRemoveElementButton />, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.remove)
  })

  it('should accept "text" prop', () => {
    render(<ArrayRemoveElementButton text="text" />, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(<ArrayRemoveElementButton>text</ArrayRemoveElementButton>, {
      wrapper,
    })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(
      <ArrayRemoveElementButton aria-label="Aria Label">
        text
      </ArrayRemoveElementButton>,
      { wrapper }
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "trash" icon', () => {
    render(
      <ArrayRemoveElementButton>Push Button</ArrayRemoveElementButton>,
      { wrapper }
    )

    const button = document.querySelector(
      '.dnb-form-iterate-remove-element-button'
    )

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'trash icon'
    )
  })
})
