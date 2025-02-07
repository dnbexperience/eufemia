import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataContext, Field, FieldBlock, Form } from '../../..'

describe('Field.Expiry', () => {
  beforeEach(() => {
    window.requestAnimationFrame = jest.fn((callback) => {
      return setTimeout(callback, 0)
    })
    window.cancelAnimationFrame = jest.fn((id) => {
      clearTimeout(id)
      return id
    })
  })

  it('should set value as a string', () => {
    render(<Field.Expiry value="0835" />)

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    expect(monthInput.value).toBe('08')
    expect(yearInput.value).toBe('35')
  })

  it('should handle value as undefined', () => {
    render(<Field.Expiry value={undefined} />)

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
  })

  it('should handle value as null', () => {
    render(<Field.Expiry value={null} />)

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
  })

  describe('should handle non existing values for month', () => {
    it('when month is 90', () => {
      render(<Field.Expiry value="9022" />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      expect(monthInput.value).toBe('mm')
      expect(yearInput.value).toBe('22')
    })

    it('when month is 23', () => {
      render(<Field.Expiry value="2335" />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      expect(monthInput.value).toBe('mm')
      expect(yearInput.value).toBe('35')
    })

    it('when month is 13', () => {
      render(<Field.Expiry value="1312" />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      expect(monthInput.value).toBe('mm')
      expect(yearInput.value).toBe('12')
    })

    it('when month is 00', () => {
      render(<Field.Expiry value="0000" />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      expect(monthInput.value).toBe('mm')
      expect(yearInput.value).toBe('00')
    })
  })

  it('should return month and year values as a concatenated string', async () => {
    const onChange = jest.fn()

    render(<Field.Expiry onChange={onChange} />)

    const input = document.querySelector('input')

    act(() => {
      input.focus()
    })

    await userEvent.keyboard('1235')

    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenLastCalledWith('1235')
  })

  it('should have autofill attributes', () => {
    render(<Field.Expiry />)

    const [month, year] = Array.from(document.querySelectorAll('input'))

    expect(month).toHaveAttribute('autocomplete', 'cc-exp-month')
    expect(year).toHaveAttribute('autocomplete', 'cc-exp-year')
  })

  describe('keydown', () => {
    beforeEach(() => {
      window.requestAnimationFrame = jest.fn((callback) => {
        return setTimeout(callback, 0)
      })
      window.cancelAnimationFrame = jest.fn((id) => {
        clearTimeout(id)
        return id
      })
    })

    it('should not change cursor position when a letter is typed', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      await userEvent.type(monthInput, '12')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(0)

      await userEvent.type(monthInput, '12A')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(0)

      expect(document.activeElement).toBe(yearInput)
    })

    it('should change cursor position to year when month is filled out', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      await userEvent.type(monthInput, '12')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(0)
      expect(document.activeElement).toBe(yearInput)
    })

    it('should change cursor position to year after backspace through year', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      await userEvent.type(monthInput, '1212')

      expect(yearInput.selectionStart).toBe(2)
      expect(yearInput.selectionEnd).toBe(2)
      expect(document.activeElement).toBe(yearInput)

      await userEvent.type(yearInput, '{Backspace}{Backspace}{Backspace}')

      expect(monthInput.selectionStart).toBe(2)
      expect(monthInput.selectionEnd).toBe(2)
      expect(document.activeElement).toBe(monthInput)
    })

    it('should be able to navigate between inputs using arrow keys', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      act(() => {
        monthInput.focus()
      })

      monthInput.setSelectionRange(0, 0)

      await userEvent.keyboard('{ArrowRight}{ArrowRight}')

      expect(document.activeElement).toBe(monthInput)

      await userEvent.keyboard('{ArrowRight}')

      expect(document.activeElement).toBe(yearInput)

      await userEvent.keyboard('{ArrowLeft}')

      expect(document.activeElement).toBe(monthInput)

      await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')

      expect(document.activeElement).toBe(monthInput)

      await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')

      expect(document.activeElement).toBe(yearInput)
    })

    it('should be able to tab between month and year', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      act(() => {
        monthInput.focus()
      })

      expect(document.activeElement).toBe(monthInput)

      await userEvent.keyboard('{Tab}')
      expect(document.activeElement).toBe(yearInput)

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      expect(document.activeElement).toBe(monthInput)

      await userEvent.keyboard('{Tab}')
      expect(document.activeElement).toBe(yearInput)

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      expect(document.activeElement).toBe(monthInput)
    })
  })

  describe('click', () => {
    it('should select whole input value on click', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      await userEvent.click(monthInput)

      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      await userEvent.click(yearInput)

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(2)

      await userEvent.click(monthInput)

      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      await userEvent.click(yearInput)

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(2)
    })
  })

  describe('validation', () => {
    it('should validate required', async () => {
      render(<Field.Expiry required />)

      const input = document.querySelector('input')
      const inputWrapper = document.querySelector('.dnb-input')

      expect(inputWrapper.classList).not.toContain(
        'dnb-input__status--error'
      )
      expect(
        document.querySelector('.dnb-form-status__text')
      ).not.toBeInTheDocument()

      await userEvent.type(input, '1')

      expect(inputWrapper.classList).not.toContain(
        'dnb-input__status--error'
      )
      expect(
        document.querySelector('.dnb-form-status__text')
      ).not.toBeInTheDocument()

      await userEvent.keyboard('{Backspace}')
      await userEvent.click(document.body)

      const formStatusText = document.querySelector(
        '.dnb-form-status__text'
      )

      expect(inputWrapper.classList).toContain('dnb-input__status--error')
      expect(formStatusText).toBeInTheDocument()
      expect(formStatusText).toHaveTextContent('Du må angi en gyldig dato')

      await userEvent.type(input, '12')

      expect(inputWrapper.classList).not.toContain(
        'dnb-input__status--error'
      )
      expect(formStatusText).not.toBeInTheDocument()
    })
  })

  it('should store "displayValue" in data context', async () => {
    let dataContext = null

    render(
      <Form.Handler>
        <Field.Expiry defaultValue="0835" path="/myValue" />
        <DataContext.Consumer>
          {(context) => {
            dataContext = context
            return null
          }}
        </DataContext.Consumer>
      </Form.Handler>
    )

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '08/35',
      },
    })

    await userEvent.tab()
    await userEvent.keyboard('1236')

    expect(dataContext.fieldDisplayValueRef.current).toEqual({
      '/myValue': {
        type: 'field',
        value: '12/36',
      },
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Expiry label="Label" required validateInitially />
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Expiry required />)

      const [month, year] = Array.from(document.querySelectorAll('input'))
      expect(month).toHaveAttribute('aria-required', 'true')
      expect(year).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Expiry required validateInitially />)

      const [month, year] = Array.from(document.querySelectorAll('input'))
      expect(month).toHaveAttribute('aria-invalid', 'true')
      expect(year).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('renders error', () => {
    render(<Field.Expiry error={new Error('Error message')} />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Error message')

    const input = document.querySelector('.dnb-input')
    expect(input).toHaveClass('dnb-input__status--error')
  })

  it('shows error style in FieldBlock', () => {
    render(
      <FieldBlock>
        <Field.Expiry error={new Error('Error message')} />
      </FieldBlock>
    )

    const input = document.querySelector('.dnb-input')
    expect(input).toHaveClass('dnb-input__status--error')
  })
})
