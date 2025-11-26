import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataContext, Field, FieldBlock, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'
import FormHandler from '../../../Form/Handler/Handler'

const noDate = nbNO['nb-NO'].Date
const no = nbNO['nb-NO'].Expiry
const en = enGB['en-GB'].Expiry

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

  it('should support size', () => {
    render(<Field.Expiry value="0835" size="large" />)

    const fieldBlockElement: HTMLInputElement = document.querySelector(
      '.dnb-forms-field-block'
    )
    expect(fieldBlockElement.classList).toContain(
      'dnb-forms-field-block--label-height-large'
    )

    const inputElement: HTMLInputElement =
      document.querySelector('.dnb-input')
    expect(inputElement.classList).toContain('dnb-input--large')
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

  it('should return month and year values as a concatenated string', async () => {
    const onChange = jest.fn()

    render(<Field.Expiry onChange={onChange} />)

    const input = document.querySelector('input')

    act(() => {
      input.focus()
    })

    await userEvent.keyboard('1235')

    expect(onChange).toHaveBeenCalledTimes(4)
    expect(onChange).toHaveBeenLastCalledWith('1235', expect.anything())
  })

  it('should return month and year values as undefined when removing value', async () => {
    const onChange = jest.fn()

    render(<Field.Expiry onChange={onChange} />)

    const input = document.querySelector('input')

    act(() => {
      input.focus()
    })

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    await userEvent.keyboard('1235')
    await userEvent.keyboard('{Backspace>5}')

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')

    expect(onChange).toHaveBeenLastCalledWith(undefined, {
      year: undefined,
      month: undefined,
    })
  })

  it('should have autofill attributes', () => {
    render(<Field.Expiry />)

    const [month, year] = Array.from(document.querySelectorAll('input'))

    expect(month).toHaveAttribute('autocomplete', 'cc-exp-month')
    expect(year).toHaveAttribute('autocomplete', 'cc-exp-year')
  })

  it('should support transformIn and transformOut', async () => {
    const onChange = jest.fn()

    const transformOut = jest.fn((internal, args) => {
      const { year, month } = args
      return { year, month }
    })

    const transformIn = jest.fn((external) => {
      if (external) {
        const { year, month } = external
        return { year, month }
      }
    })

    render(
      <Form.Handler
        onChange={onChange}
        defaultData={{
          myField: {
            year: '35',
            month: '08',
          },
        }}
      >
        <Field.Expiry
          path="/myField"
          transformOut={transformOut}
          transformIn={transformIn}
        />
      </Form.Handler>
    )

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    expect(monthInput.value).toBe('08')
    expect(yearInput.value).toBe('35')

    await userEvent.type(monthInput, '1224')

    // Check that transformOut was called with the correct values
    expect(transformOut).toHaveBeenCalledTimes(9)
    expect(transformOut).toHaveBeenLastCalledWith('1224', {
      year: '24',
      month: '12',
    })
    expect(transformIn).toHaveBeenCalledTimes(6)
    expect(transformIn).toHaveBeenLastCalledWith({
      year: '24',
      month: '12',
    })

    // Check that onChange was called with the transformed data
    expect(onChange).toHaveBeenLastCalledWith(
      {
        myField: {
          year: '24',
          month: '12',
        },
      },
      expect.anything()
    )
  })

  it('should handle removing input values with transformIn and transformOut', async () => {
    const onChange = jest.fn()

    const transformOut = jest.fn((internal, args) => {
      const { year, month } = args
      return { year, month }
    })

    const transformIn = jest.fn((external) => {
      if (external) {
        const { year, month } = external
        return { year, month }
      }
    })

    render(
      <Form.Handler
        onChange={onChange}
        defaultData={{
          myField: {
            year: '35',
            month: '08',
          },
        }}
      >
        <Field.Expiry
          path="/myField"
          transformOut={transformOut}
          transformIn={transformIn}
        />
      </Form.Handler>
    )

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    // Verify initial state
    expect(monthInput.value).toBe('08')
    expect(yearInput.value).toBe('35')

    // Remove month value completely
    await userEvent.click(monthInput)
    await userEvent.keyboard('{Backspace>2}')
    expect(monthInput.value).toBe('mm')

    // Check that transformOut was called with the correct values when month is removed
    expect(transformOut).toHaveBeenCalledWith('mm35', {
      year: '35',
      month: undefined,
    })

    // Remove year value completely
    await userEvent.click(yearInput)
    await userEvent.keyboard('{Backspace>2}')
    expect(yearInput.value).toBe('åå')
    expect(monthInput.value).toBe('mm')

    // Check that transformOut was called with empty values when both are removed
    expect(transformOut).toHaveBeenLastCalledWith(undefined, {
      year: undefined,
      month: undefined,
    })

    // Check that onChange was called with the transformed data
    expect(onChange).toHaveBeenLastCalledWith(
      {
        myField: {
          year: undefined,
          month: undefined,
        },
      },
      expect.anything()
    )

    // Verify final state - both inputs should be empty/placeholder
    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
  })

  it('should handle removing input values and check event state', async () => {
    const onChange = jest.fn()
    const onBlur = jest.fn()
    const onFocus = jest.fn()

    render(
      <Field.Expiry
        value="0835"
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    )

    const monthInput = document.querySelectorAll('input')[0]
    const yearInput = document.querySelectorAll('input')[1]

    // Verify initial state
    expect(monthInput.value).toBe('08')
    expect(yearInput.value).toBe('35')

    // Focus on month input
    await userEvent.click(monthInput)
    expect(onFocus).toHaveBeenCalledTimes(1)

    // Remove month value completely
    await userEvent.keyboard('{Backspace>2}')
    expect(monthInput.value).toBe('mm')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith('mm35', expect.anything())

    // Focus on year input
    await userEvent.click(yearInput)
    // Note: onFocus might not be called again if already focused

    // Remove year value completely
    await userEvent.keyboard('{Backspace>2}')
    expect(yearInput.value).toBe('åå')
    expect(monthInput.value).toBe('mm')
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(undefined, expect.anything())

    // Blur to trigger validation
    await userEvent.click(document.body)
    expect(onBlur).toHaveBeenCalledTimes(1)

    // Verify final state - both inputs should be empty/placeholder
    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
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
      expect(formStatusText).toHaveTextContent(noDate.errorRequired)

      await userEvent.type(input, '12')

      expect(inputWrapper.classList).not.toContain(
        'dnb-input__status--error'
      )
      expect(formStatusText).not.toBeInTheDocument()
    })

    it('should validate month and year', async () => {
      render(<Field.Expiry value="324" />)

      const [firstMessage, secondMessage] = Array.from(
        document.querySelectorAll('.dnb-li')
      )

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(firstMessage).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/g, '32')
      )

      expect(secondMessage).toHaveTextContent(
        no.errorYear.replace(/\{year\}/g, '4å')
      )

      await userEvent.click(document.querySelector('input'))
      await userEvent.keyboard('0125')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should validate month', async () => {
      render(<Field.Expiry />)

      const monthInput = document.querySelector('input')

      await userEvent.click(monthInput)
      await userEvent.keyboard('1325')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '13')
      )

      await userEvent.click(monthInput)
      await userEvent.keyboard('99')
      await userEvent.click(document.body)
      expect(screen.getByRole('alert')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '99')
      )

      await userEvent.click(monthInput)
      await userEvent.keyboard('0025')
      await userEvent.click(document.body)
      expect(screen.getByRole('alert')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '00')
      )
      await userEvent.click(monthInput)
      await userEvent.keyboard('1')
      await userEvent.click(document.body)
      expect(screen.getByRole('alert')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '1m')
      )

      await userEvent.click(monthInput)
      await userEvent.keyboard('09')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should validate year', async () => {
      render(<Field.Expiry />)

      const [monthInput, yearInput] = Array.from(
        document.querySelectorAll('input')
      )

      await userEvent.click(monthInput)
      await userEvent.keyboard('092')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(screen.getByRole('alert')).toHaveTextContent(
        no.errorYear.replace(/\{year\}/, '2å')
      )

      await userEvent.click(yearInput)
      await userEvent.keyboard('25')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should not display error if a valid value is cleared/removed', async () => {
      render(<Field.Expiry value="0835" />)

      const [monthInput, yearInput] = Array.from(
        document.querySelectorAll('input')
      )

      expect(monthInput).toHaveValue('08')
      expect(yearInput).toHaveValue('35')

      await userEvent.click(yearInput)
      await userEvent.keyboard('{Backspace>4}')
      await userEvent.click(document.body)

      expect(monthInput).toHaveValue('mm')
      expect(yearInput).toHaveValue('åå')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should display error if a valid value is cleared/removed when required', async () => {
      render(<Field.Expiry value="0835" required />)

      const [monthInput, yearInput] = Array.from(
        document.querySelectorAll('input')
      )

      expect(monthInput).toHaveValue('08')
      expect(yearInput).toHaveValue('35')

      await userEvent.click(yearInput)
      await userEvent.keyboard('{Backspace>4}')
      await userEvent.click(document.body)

      expect(monthInput).toHaveValue('mm')
      expect(yearInput).toHaveValue('åå')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()
    })

    it('should display month and year messages based on locale', async () => {
      render(
        <FormHandler locale="en-GB">
          <Field.Expiry value="324" />
        </FormHandler>
      )

      const [firstMessage, secondMessage] = Array.from(
        document.querySelectorAll('.dnb-li')
      )

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(firstMessage).toHaveTextContent(
        en.errorMonth.replace(/\{month\}/g, '32')
      )

      expect(secondMessage).toHaveTextContent(
        en.errorYear.replace(/\{year\}/g, '4y')
      )

      await userEvent.click(document.querySelector('input'))
      await userEvent.keyboard('0125')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
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
