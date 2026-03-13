import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Validator } from '../../..'
import { DataContext, Field, FieldBlock, Form } from '../../..'

import nbNO from '../../../constants/locales/nb-NO'
import enGB from '../../../constants/locales/en-GB'
import FormHandler from '../../../Form/Handler/Handler'

const no = nbNO['nb-NO'].Expiry
const en = enGB['en-GB'].Expiry

const getExpiryInputs = () =>
  Array.from(
    document.querySelectorAll('.dnb-segmented-field__section')
  ) as Array<HTMLInputElement>

const getMonthInput = () => getExpiryInputs()[0]

const getYearInput = () => getExpiryInputs()[1]

describe('Field.Expiry', () => {
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

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

    expect(monthInput.value).toBe('08')
    expect(yearInput.value).toBe('35')
  })

  it('should handle value as undefined', () => {
    render(<Field.Expiry value={undefined} />)

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
  })

  it('should handle value as null', () => {
    render(<Field.Expiry value={null} />)

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
  })

  it('should return month and year values as a concatenated string', async () => {
    const onChange = jest.fn()

    render(<Field.Expiry onChange={onChange} />)

    const input = getMonthInput()

    await userEvent.click(input)
    await userEvent.keyboard('1235')

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith('1235', expect.anything())
    })
  })

  it('should return month and year values as undefined when removing value', async () => {
    const onChangeContext = jest.fn()
    const onChange = jest.fn()

    render(
      <Form.Handler onChange={onChangeContext}>
        <Field.Expiry path="/myField" onChange={onChange} />
      </Form.Handler>
    )

    const input = getMonthInput()

    act(() => {
      input.focus()
    })

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

    await userEvent.keyboard('1235')
    await userEvent.keyboard('{Backspace>5}')

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')

    expect(onChange).toHaveBeenLastCalledWith(undefined, {
      year: undefined,
      month: undefined,
    })
    expect(onChangeContext).toHaveBeenLastCalledWith(
      {
        myField: undefined,
      },
      expect.anything()
    )
  })

  it('should have autofill attributes', () => {
    render(<Field.Expiry />)

    const [month, year] = getExpiryInputs()

    expect(month).toHaveAttribute('autocomplete', 'cc-exp-month')
    expect(year).toHaveAttribute('autocomplete', 'cc-exp-year')
  })

  it('should select all segments and copy the whole expiry value', async () => {
    render(<Field.Expiry value="1225" />)

    const [monthInput, yearInput] = getExpiryInputs()

    await userEvent.click(yearInput)

    fireEvent.keyDown(yearInput, {
      key: 'a',
      ctrlKey: true,
    })

    const setData = jest.fn()
    fireEvent.copy(yearInput, {
      clipboardData: { setData },
    })

    expect(monthInput.selectionStart).toBe(0)
    expect(monthInput.selectionEnd).toBe(monthInput.value.length)
    expect(yearInput.selectionStart).toBe(0)
    expect(yearInput.selectionEnd).toBe(yearInput.value.length)
    expect(setData).toHaveBeenCalledWith('text/plain', '12/25')
  })

  it('should paste a whole expiry value into both segments', async () => {
    render(<Field.Expiry />)

    const [monthInput, yearInput] = getExpiryInputs()

    await userEvent.click(yearInput)

    fireEvent.paste(yearInput, {
      clipboardData: {
        getData: () => '12/25',
      },
    })

    expect(monthInput.value).toBe('12')
    expect(yearInput.value).toBe('25')
  })

  it('should clear all segments when pressing backspace after select-all', async () => {
    render(<Field.Expiry value="1225" />)

    const [monthInput, yearInput] = getExpiryInputs()

    await userEvent.click(yearInput)

    fireEvent.keyDown(yearInput, {
      key: 'a',
      ctrlKey: true,
    })

    fireEvent.keyDown(yearInput, {
      key: 'Backspace',
    })

    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
    expect(document.activeElement).toBe(monthInput)
    expect(monthInput.selectionStart).toBe(0)
    expect(monthInput.selectionEnd).toBe(0)
  })

  it('should restart typing from month after select-all', async () => {
    render(<Field.Expiry value="1225" />)

    const [monthInput, yearInput] = getExpiryInputs()

    await userEvent.click(yearInput)

    fireEvent.keyDown(yearInput, {
      key: 'a',
      ctrlKey: true,
    })

    await userEvent.keyboard('3')

    expect(document.activeElement).toBe(monthInput)
    expect(monthInput.value).toBe('3m')
    expect(monthInput.selectionStart).toBe(1)
    expect(monthInput.selectionEnd).toBe(1)
    expect(yearInput.value).toBe('åå')
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

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

    expect(monthInput.value).toBe('08')
    expect(yearInput.value).toBe('35')

    await userEvent.click(monthInput)
    await userEvent.keyboard('{Backspace>2}1224')

    await waitFor(() => {
      expect(transformOut).toHaveBeenLastCalledWith('1224', {
        year: '24',
        month: '12',
      })
      expect(transformIn).toHaveBeenLastCalledWith({
        year: '24',
        month: '12',
      })
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

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

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

    // Year should still be intact
    expect(yearInput.value).toBe('35')

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

    const monthInput = getMonthInput()
    const yearInput = getYearInput()

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
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    // Verify final state - both inputs should be empty/placeholder
    expect(monthInput.value).toBe('mm')
    expect(yearInput.value).toBe('åå')
  })

  it('should replace the internal validator with the given one', async () => {
    const myValidator = jest.fn(() => {
      return new Error('My error message')
    })
    const onBlurValidator = jest.fn(() => {
      return [myValidator]
    })

    render(
      <Field.Expiry
        value="121"
        validateInitially
        onBlurValidator={onBlurValidator}
      />
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        'My error message'
      )
    })

    expect(myValidator).toHaveBeenCalledTimes(1)
    expect(myValidator).toHaveBeenCalledWith('121å', expect.anything())
    expect(onBlurValidator).toHaveBeenCalledTimes(1)
    expect(onBlurValidator).toHaveBeenCalledWith('121å', expect.anything())
  })

  it('should support extending internal validator', async () => {
    const decemberValidator = (value: string) => {
      if (value?.startsWith('12')) {
        return new Error('My error message')
      }
    }

    const customValidator: Validator<string> = (value, { validators }) => {
      const { expiryValidator } = validators

      return [decemberValidator, expiryValidator]
    }

    const { rerender } = render(
      <Form.Handler>
        <Field.Expiry
          value={'121'}
          validateInitially
          onBlurValidator={customValidator}
        />
      </Form.Handler>
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        'My error message'
      )
    })

    rerender(
      <Form.Handler>
        <Field.Expiry
          value={'111'}
          validateInitially
          onBlurValidator={customValidator}
        />
      </Form.Handler>
    )

    await waitFor(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert').textContent).toBe(
        no.errorYear.replace(/\{year\}/, '1å')
      )
    })

    rerender(
      <Form.Handler>
        <Field.Expiry
          value={'1112'}
          validateInitially
          onBlurValidator={customValidator}
        />
      </Form.Handler>
    )

    await expect(() => {
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    }).toNeverResolve()
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

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      await userEvent.click(monthInput)
      await userEvent.keyboard('12')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(yearInput.value.length)

      await userEvent.keyboard('A')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(yearInput.value.length)

      expect(document.activeElement).toBe(yearInput)
    })

    it('should change cursor position to year when month is filled out', async () => {
      render(<Field.Expiry />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      await userEvent.click(monthInput)
      await userEvent.keyboard('12')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(yearInput.value.length)
      expect(document.activeElement).toBe(yearInput)
    })

    it('should type first year digit when typing at end of a filled month', async () => {
      render(<Field.Expiry value="12" />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      await userEvent.click(monthInput)
      expect(monthInput.value).toBe('12')
      monthInput.setSelectionRange(2, 2)
      expect(monthInput.selectionStart).toBe(2)
      expect(monthInput.selectionEnd).toBe(2)
      await userEvent.keyboard('7')

      await waitFor(() => {
        expect(document.activeElement).toBe(yearInput)
      })

      expect(yearInput.value).toBe('7å')
      await waitFor(() => {
        expect(yearInput.selectionStart).toBe(1)
        expect(yearInput.selectionEnd).toBe(1)
      })
    })

    it('should shift month digits when typing at the start of a filled month', async () => {
      render(<Field.Expiry value="12" />)

      const monthInput = getMonthInput()

      await userEvent.click(monthInput)
      monthInput.setSelectionRange(0, 0)

      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(0)

      await userEvent.keyboard('3')

      expect(monthInput.value).toBe('31')
      expect(monthInput.selectionStart).toBe(1)
      expect(monthInput.selectionEnd).toBe(1)
      expect(document.activeElement).toBe(monthInput)
    })

    it('should change cursor position to year after backspace through year', async () => {
      render(<Field.Expiry />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      await userEvent.click(monthInput)
      await userEvent.keyboard('1212')

      expect(yearInput.selectionStart).toBe(2)
      expect(yearInput.selectionEnd).toBe(2)
      expect(document.activeElement).toBe(yearInput)

      await userEvent.click(yearInput)
      yearInput.setSelectionRange(
        yearInput.value.length,
        yearInput.value.length
      )
      await userEvent.keyboard('{Backspace>3}')

      await waitFor(() => {
        expect(monthInput.selectionStart).toBe(0)
        expect(monthInput.selectionEnd).toBe(monthInput.value.length)
      })
      expect(document.activeElement).toBe(monthInput)
    })

    it('should support spinbutton stepping on month and year', async () => {
      render(<Field.Expiry value="1298" />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      await userEvent.click(monthInput)
      await userEvent.keyboard('{ArrowUp}')

      expect(monthInput.value).toBe('01')
      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      await userEvent.click(yearInput)
      await userEvent.keyboard('{ArrowDown}')

      expect(yearInput.value).toBe('97')
      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(2)
    })

    it('should seed empty spinbutton values from today', async () => {
      jest
        .useFakeTimers()
        .setSystemTime(new Date('2026-03-13T12:00:00.000Z').getTime())

      try {
        render(<Field.Expiry />)

        const monthInput = getMonthInput()
        const yearInput = getYearInput()

        monthInput.focus()
        fireEvent.keyDown(monthInput, { key: 'ArrowUp' })
        expect(monthInput.value).toBe('03')
        expect(monthInput.selectionStart).toBe(0)
        expect(monthInput.selectionEnd).toBe(2)

        yearInput.focus()
        fireEvent.keyDown(yearInput, { key: 'ArrowUp' })
        expect(yearInput.value).toBe('26')
        expect(yearInput.selectionStart).toBe(0)
        expect(yearInput.selectionEnd).toBe(2)
      } finally {
        jest.useRealTimers()
      }
    })

    it('should be able to navigate between inputs using arrow keys', async () => {
      render(<Field.Expiry />)

      const [monthInput, yearInput] = Array.from(
        getExpiryInputs()
      ) as HTMLInputElement[]

      await userEvent.click(monthInput)

      await userEvent.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(yearInput)

      await userEvent.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(monthInput)

      expect(document.activeElement).toBe(monthInput)

      await userEvent.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(yearInput)
    })

    it('should be able to tab between month and year', async () => {
      render(<Field.Expiry />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

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

    it('should clear selection when tabbing out of the last field', async () => {
      render(
        <>
          <Field.Expiry value="1225" />
          <button type="button">Next</button>
        </>
      )

      const yearInput = getYearInput()

      await userEvent.click(yearInput)

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(yearInput.value.length)

      await userEvent.tab()

      expect(document.activeElement).toBe(
        document.querySelector('button[type="button"]')
      )
      expect(yearInput.selectionStart).toBe(yearInput.value.length)
      expect(yearInput.selectionEnd).toBe(yearInput.value.length)
    })
  })

  describe('click', () => {
    it('should select whole input value on click', async () => {
      render(<Field.Expiry />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      fireEvent.mouseDown(monthInput)
      expect(document.activeElement).toBe(monthInput)
      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      await userEvent.click(monthInput)

      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      fireEvent.mouseDown(yearInput)
      expect(document.activeElement).toBe(yearInput)
      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(2)

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

    it('should select whole value on repeated blur and focus', async () => {
      render(<Field.Expiry value="1234" />)

      const monthInput = getMonthInput()
      const yearInput = getYearInput()

      await userEvent.click(monthInput)
      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      monthInput.blur()

      await userEvent.click(monthInput)
      expect(monthInput.selectionStart).toBe(0)
      expect(monthInput.selectionEnd).toBe(2)

      await userEvent.click(yearInput)
      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(2)

      yearInput.blur()

      await userEvent.click(yearInput)
      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(2)
    })
  })

  describe('validation', () => {
    it('should validate required', async () => {
      render(<Field.Expiry required />)

      const input = getMonthInput()
      const inputWrapper = document.querySelector('.dnb-input')

      expect(inputWrapper.classList).not.toContain(
        'dnb-input__status--error'
      )
      expect(
        document.querySelector('.dnb-form-status__text')
      ).not.toBeInTheDocument()

      await userEvent.click(input)
      await userEvent.keyboard('1')

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
      expect(formStatusText).toHaveTextContent(no.errorRequired)

      await userEvent.click(input)
      await userEvent.keyboard('12')

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

      await userEvent.click(getMonthInput())
      await userEvent.keyboard('0125')

      expect(
        document.querySelector('.dnb-form-status--error')
      ).not.toBeInTheDocument()
    })

    it('should validate month', async () => {
      render(<Field.Expiry />)

      const monthInput = getMonthInput()

      await userEvent.click(monthInput)
      await userEvent.keyboard('1325')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '13')
      )

      await userEvent.click(monthInput)
      await userEvent.keyboard('99')
      await userEvent.click(document.body)
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '99')
      )

      await userEvent.click(monthInput)
      await userEvent.keyboard('0025')
      await userEvent.click(document.body)
      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/, '00')
      )
      await userEvent.click(monthInput)
    })

    it('should validate continuously when validateContinuously is enabled', async () => {
      render(<Field.Expiry validateContinuously />)

      const [monthInput, yearInput] = Array.from(getExpiryInputs())

      await userEvent.click(yearInput)
      await userEvent.keyboard('25')

      // Type invalid month - error should appear during typing
      await userEvent.click(monthInput)
      await userEvent.keyboard('13')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
        expect(document.querySelector('[role="alert"]')).toHaveTextContent(
          no.errorMonth.replace(/\{month\}/, '13')
        )
      })

      // Fix the month - error should disappear during typing
      await userEvent.click(monthInput)
      await userEvent.keyboard('{Backspace>2}01')

      expect(monthInput).toHaveValue('01')
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()
      })

      // Type invalid month again - error should appear again
      await userEvent.click(monthInput)
      await userEvent.keyboard('{Backspace>2}99')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
        expect(document.querySelector('[role="alert"]')).toHaveTextContent(
          no.errorMonth.replace(/\{month\}/, '99')
        )
      })
    })

    it('should show error initially when validateInitially is enabled', async () => {
      // Test with invalid value
      render(<Field.Expiry value="324" validateInitially />)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
      })

      const [firstMessage, secondMessage] = Array.from(
        document.querySelectorAll('.dnb-li')
      )

      expect(firstMessage).toHaveTextContent(
        no.errorMonth.replace(/\{month\}/g, '32')
      )
      expect(secondMessage).toHaveTextContent(
        no.errorYear.replace(/\{year\}/g, '4å')
      )
    })
    it('should show error initially when validateInitially is enabled but required is set', async () => {
      // Test with required but empty
      render(<Field.Expiry required validateInitially />)

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
        expect(document.querySelector('[role="alert"]')).toHaveTextContent(
          no.errorRequired
        )
      })
    })

    it('should validate with onChangeValidator', async () => {
      const onChangeValidator: Validator<string> = (value) => {
        // Custom validation: reject dates before 2025
        if (value && value.length >= 4) {
          const year = parseInt(value.substring(2, 4), 10)
          if (year < 25) {
            return new Error('Expiry date must be in 2025 or later')
          }
        }
        return undefined
      }

      render(
        <Field.Expiry
          onChangeValidator={onChangeValidator}
          validateContinuously
        />
      )

      const monthInput = getMonthInput()

      // Type a date in 2024 (24) - should show error
      await userEvent.click(monthInput)
      await userEvent.keyboard('1224')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
        expect(document.querySelector('[role="alert"]')).toHaveTextContent(
          'Expiry date must be in 2025 or later'
        )
      })

      // Type a date in 2025 (25) - error should disappear
      await userEvent.keyboard('{Backspace}{Backspace}25')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).not.toBeInTheDocument()
      })
    })

    it('should validate year', async () => {
      render(<Field.Expiry />)

      const [monthInput, yearInput] = Array.from(getExpiryInputs())

      await userEvent.click(monthInput)
      await userEvent.keyboard('092')
      await userEvent.click(document.body)

      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeInTheDocument()

      expect(document.querySelector('[role="alert"]')).toHaveTextContent(
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

      const [monthInput, yearInput] = Array.from(getExpiryInputs())

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

      const [monthInput, yearInput] = Array.from(getExpiryInputs())

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

      await userEvent.click(getMonthInput())
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

      const [month, year] = getExpiryInputs()
      expect(month).toHaveAttribute('aria-required', 'true')
      expect(year).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Expiry required validateInitially />)

      const [month, year] = getExpiryInputs()
      expect(month).toHaveAttribute('aria-invalid', 'true')
      expect(year).toHaveAttribute('aria-invalid', 'true')
    })
  })

  it('renders info', () => {
    render(<Field.Expiry info="Info message" />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Info message')

    const input = document.querySelector('.dnb-input')
    expect(input).not.toHaveClass('dnb-input__status--error')
  })

  it('renders warning', () => {
    render(<Field.Expiry warning="Warning message" />)

    const element = document.querySelector('.dnb-form-status')
    expect(element).toHaveTextContent('Warning message')

    const input = document.querySelector('.dnb-input')
    expect(input).not.toHaveClass('dnb-input__status--error')
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

  it('should call onStatusChange when validateContinuously reveals validation errors', async () => {
    const onStatusChange = jest.fn()

    render(
      <Field.Expiry
        onStatusChange={onStatusChange}
        validateContinuously
        required
      />
    )

    const monthInput = getMonthInput()

    // Type invalid month
    await userEvent.click(monthInput)
    await userEvent.keyboard('13')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith(
        expect.objectContaining({
          error: expect.anything(),
        })
      )
    })

    // Clear mock to track new calls
    onStatusChange.mockClear()

    // Type valid month and year
    await userEvent.keyboard('{Backspace>2}0125')

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalled()
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })

  it('should call onStatusChange when error prop changes without validateContinuously', async () => {
    const onStatusChange = jest.fn()
    const error1 = new Error('Error 1')
    const error2 = new Error('Error 2')

    const { rerender } = render(
      <Field.Expiry onStatusChange={onStatusChange} error={undefined} />
    )

    // Initially no error should be called
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(0)
    })

    // Set error prop
    rerender(
      <Field.Expiry onStatusChange={onStatusChange} error={error1} />
    )

    // Wait for onStatusChange to be called with error
    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(1)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error1,
      })
    })

    // Change to different error
    rerender(
      <Field.Expiry onStatusChange={onStatusChange} error={error2} />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(2)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: error2,
      })
    })

    // Clear error
    rerender(
      <Field.Expiry onStatusChange={onStatusChange} error={undefined} />
    )

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledTimes(3)
      expect(onStatusChange).toHaveBeenLastCalledWith({
        info: undefined,
        warning: undefined,
        error: undefined,
      })
    })
  })
})
