import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import RemoveButton from '../RemoveButton'
import nbNO from '../../../constants/locales/nb-NO'
import { Form } from '../../..'

const nb = nbNO['nb-NO'].RemoveButton

describe('RemoveButton', () => {
  const handleRemove = jest.fn()

  const wrapper = ({ children }) => (
    <IterateItemContext.Provider value={{ handleRemove }}>
      {children}
    </IterateItemContext.Provider>
  )

  it('should call handleRemove when clicked inside an Iterate element', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleRemove).toHaveBeenCalledWith()
  })

  it('should throw an error if value is not an array', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()
    const invalidValue = 'invalid value'

    expect(() => {
      render(
        <RemoveButton value={invalidValue as unknown as string[]}>
          Remove Button
        </RemoveButton>
      )
    }).toThrow('RemoveButton must be inside an Iterate.Array')

    log.mockRestore()
  })

  it('should render with the correct class name', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-forms-iterate-remove-element-button')
  })

  it('should be a tertiary variant', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have correct text by default', () => {
    render(<RemoveButton />, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent(nb.text)
  })

  it('should accept "text" prop', () => {
    render(<RemoveButton text="text" />, { wrapper })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(<RemoveButton>text</RemoveButton>, {
      wrapper,
    })

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(<RemoveButton aria-label="Aria Label">text</RemoveButton>, {
      wrapper,
    })

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "trash" icon', () => {
    render(<RemoveButton>Remove Button</RemoveButton>, { wrapper })

    const button = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'trash icon'
    )
  })

  it('supports translations from Form.Handler', () => {
    const remove = 'custom-translation-remove-button-text'

    render(
      <Form.Handler
        translations={{
          'nb-NO': {
            'RemoveButton.text': remove,
          },
          'en-GB': {
            'RemoveButton.text': remove,
          },
        }}
      >
        <RemoveButton />
      </Form.Handler>,
      { wrapper }
    )

    expect(screen.getByText(remove)).toBeInTheDocument()
  })
})
