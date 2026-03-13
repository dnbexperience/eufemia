import React from 'react'
import { axeComponent } from '../../../core/jest/jestSetup'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SegmentedField, {
  type SegmentedFieldItem,
  type SegmentedFieldProps,
} from '../segmented-field/SegmentedField'

const digit = /[0-9]/

const twoDigitInputs: SegmentedFieldItem<'first' | 'second'>[] = [
  {
    id: 'first',
    label: 'First',
    mask: [digit, digit],
    placeholder: 'ff',
  },
  {
    id: 'second',
    label: 'Second',
    mask: [digit, digit],
    placeholder: 'ss',
  },
]

const threeSegmentInputs: SegmentedFieldItem<'day' | 'month' | 'year'>[] =
  [
    {
      id: 'day',
      label: 'Day',
      mask: [digit, digit],
      placeholder: 'dd',
    },
    {
      id: 'month',
      label: 'Month',
      mask: [digit, digit],
      placeholder: 'mm',
    },
    {
      id: 'year',
      label: 'Year',
      mask: [digit, digit, digit, digit],
      placeholder: 'yyyy',
    },
  ]

function renderSegmentedField(
  props: Partial<SegmentedFieldProps<'first' | 'second'>> = {}
) {
  return render(
    <SegmentedField inputs={twoDigitInputs} delimiter="/" {...props} />
  )
}

const getSections = () =>
  Array.from(
    document.querySelectorAll('.dnb-segmented-field__section')
  ) as Array<HTMLInputElement>

const getFirst = () => getSections()[0]

const getSecond = () => getSections()[1]

describe('SegmentedField', () => {
  describe('rendering', () => {
    it('should render sections for each input', () => {
      renderSegmentedField()

      const sections = getSections()
      expect(sections).toHaveLength(2)
    })

    it('should display placeholder when no values are provided', () => {
      renderSegmentedField()

      expect(getFirst().value).toBe('ff')
      expect(getSecond().value).toBe('ss')
    })

    it('should display values when provided', () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      expect(getFirst().value).toBe('12')
      expect(getSecond().value).toBe('34')
    })

    it('should render delimiter between sections', () => {
      renderSegmentedField({ delimiter: '/' })

      const delimiter = document.querySelector(
        '.dnb-segmented-field__delimiter'
      )
      expect(delimiter).toBeInTheDocument()
      expect(delimiter).toHaveTextContent('/')
    })

    it('should render without delimiter when not provided', () => {
      renderSegmentedField({ delimiter: undefined })

      const delimiter = document.querySelector(
        '.dnb-segmented-field__delimiter'
      )
      expect(delimiter).not.toBeInTheDocument()
    })

    it('should render label as legend', () => {
      renderSegmentedField({ label: 'My label' })

      const legend = document.querySelector('legend')
      expect(legend).toHaveTextContent('My label')
    })

    it('should render with horizontal label direction by default', () => {
      renderSegmentedField({ label: 'My label' })

      const fieldset = document.querySelector(
        '.dnb-segmented-field__fieldset'
      )
      expect(fieldset.classList).toContain(
        'dnb-segmented-field__fieldset--horizontal'
      )
    })

    it('should render with vertical label direction', () => {
      renderSegmentedField({
        label: 'My label',
        labelDirection: 'vertical',
      })

      const fieldset = document.querySelector(
        '.dnb-segmented-field__fieldset'
      )
      expect(fieldset.classList).not.toContain(
        'dnb-segmented-field__fieldset--horizontal'
      )
    })

    it('should render hidden input with joined value', () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
        delimiter: '/',
      })

      const hiddenInput: HTMLInputElement = document.querySelector(
        '.dnb-segmented-field__hidden-input'
      )
      expect(hiddenInput).toBeInTheDocument()
      expect(hiddenInput.value).toBe('12/34')
    })

    it('should support size prop', () => {
      renderSegmentedField({ size: 'large' })

      const input = document.querySelector('.dnb-input')
      expect(input.classList).toContain('dnb-input--large')
    })

    it('should support disabled state', () => {
      renderSegmentedField({ disabled: true })

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('aria-disabled', 'true')
        expect(section).toHaveAttribute('contenteditable', 'false')
      })
    })

    it('should render status', () => {
      renderSegmentedField({ status: 'error', statusState: 'error' })

      const input = document.querySelector('.dnb-input')
      expect(input.classList).toContain('dnb-input__status--error')
    })
  })

  describe('typing', () => {
    it('should accept digit input', async () => {
      renderSegmentedField()

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('12')

      expect(first.value).toBe('12')
    })

    it('should reject non-digit input', async () => {
      renderSegmentedField()

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('ab')

      expect(first.value).toBe('ff')
    })

    it('should auto-advance to next section when current section is filled', async () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)
      await userEvent.keyboard('12')

      expect(document.activeElement).toBe(second)
      expect(second.selectionStart).toBe(0)
      expect(second.selectionEnd).toBe(second.value.length)
    })

    it('should type across multiple sections continuously', async () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)
      await userEvent.keyboard('1234')

      expect(first.value).toBe('12')
      expect(second.value).toBe('34')
    })

    it('should shift digits when typing at the start of a filled section', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      first.setSelectionRange(0, 0)

      await userEvent.keyboard('3')

      expect(first.value).toBe('31')
      expect(first.selectionStart).toBe(1)
      expect(first.selectionEnd).toBe(1)
    })

    it('should type first digit of next section when typing at end of a filled section', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)
      first.setSelectionRange(2, 2)
      await userEvent.keyboard('7')

      await waitFor(() => {
        expect(document.activeElement).toBe(second)
      })

      expect(second.value).toBe('7s')
      await waitFor(() => {
        expect(second.selectionStart).toBe(1)
        expect(second.selectionEnd).toBe(1)
      })
    })

    it('should replace selected section when typing after focus', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      await userEvent.keyboard('5')
      expect(first.value).toBe('5f')
    })

    it('should use replace mode when overwriteMode is replace', async () => {
      renderSegmentedField({
        overwriteMode: 'replace',
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      first.setSelectionRange(0, 0)

      await userEvent.keyboard('3')

      expect(first.value).toBe('32')
    })
  })

  describe('backspace', () => {
    it('should delete a character on backspace', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      first.setSelectionRange(2, 2)

      await userEvent.keyboard('{Backspace}')

      expect(first.value).toBe('1f')
    })

    it('should clear section when all is selected', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      await userEvent.keyboard('{Backspace}')

      expect(first.value).toBe('ff')
    })

    it('should move to previous section when backspacing at start of section', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(second)
      await userEvent.keyboard('{Backspace}')

      await waitFor(() => {
        expect(document.activeElement).toBe(first)
      })
    })

    it('should clear all sections on backspace after select-all', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(second)

      fireEvent.keyDown(second, {
        key: 'a',
        ctrlKey: true,
      })

      fireEvent.keyDown(second, {
        key: 'Backspace',
      })

      expect(first.value).toBe('ff')
      expect(second.value).toBe('ss')
      expect(document.activeElement).toBe(first)
    })
  })

  describe('delete', () => {
    it('should delete a character at current position', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      first.setSelectionRange(0, 0)

      fireEvent.keyDown(first, { key: 'Delete' })

      expect(first.value).toBe('2f')
    })

    it('should clear section when all is selected and delete is pressed', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)

      fireEvent.keyDown(first, { key: 'Delete' })

      expect(first.value).toBe('ff')
    })
  })

  describe('arrow keys', () => {
    it('should move cursor right within a section', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      first.setSelectionRange(0, 0)

      await userEvent.keyboard('{ArrowRight}')

      expect(first.selectionStart).toBe(1)
      expect(first.selectionEnd).toBe(1)
    })

    it('should advance to next section when pressing right at end', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      await userEvent.keyboard('{ArrowRight}')
      expect(first.selectionStart).toBe(2)
      expect(first.selectionEnd).toBe(2)

      await userEvent.keyboard('{ArrowRight}')
      expect(document.activeElement).toBe(second)
    })

    it('should move cursor left within a section', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      first.setSelectionRange(2, 2)

      await userEvent.keyboard('{ArrowLeft}')

      expect(first.selectionStart).toBe(1)
      expect(first.selectionEnd).toBe(1)
    })

    it('should go to previous section when pressing left at start', async () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(second)
      expect(second.selectionStart).toBe(0)
      expect(second.selectionEnd).toBe(2)

      // First ArrowLeft collapses the selection to the start
      await userEvent.keyboard('{ArrowLeft}')

      // Second ArrowLeft moves to prev section
      await userEvent.keyboard('{ArrowLeft}')
      expect(document.activeElement).toBe(first)
    })

    it('should set caret to end when pressing right with full selection', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      await userEvent.keyboard('{ArrowRight}')

      expect(first.selectionStart).toBe(2)
      expect(first.selectionEnd).toBe(2)
    })

    it('should set caret to start when pressing left with full selection', async () => {
      renderSegmentedField({
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      await userEvent.keyboard('{ArrowLeft}')

      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(0)
    })
  })

  describe('spinbutton', () => {
    it('should increment value on ArrowUp', async () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12 },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
        values: { first: '05', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('{ArrowUp}')

      expect(first.value).toBe('06')
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)
    })

    it('should decrement value on ArrowDown', async () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12 },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
        values: { first: '05', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('{ArrowDown}')

      expect(first.value).toBe('04')
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)
    })

    it('should wrap from max to min on ArrowUp', async () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12, wrap: true },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('{ArrowUp}')

      expect(first.value).toBe('01')
    })

    it('should wrap from min to max on ArrowDown', async () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12, wrap: true },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
        values: { first: '01', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('{ArrowDown}')

      expect(first.value).toBe('12')
    })

    it('should not wrap when wrap is false', async () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12, wrap: false },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
        values: { first: '12', second: '' },
      })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('{ArrowUp}')

      expect(first.value).toBe('12')
    })

    it('should set ARIA spinbutton attributes', () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12 },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
        values: { first: '05', second: '' },
      })

      const first = getFirst()
      const second = getSecond()
      expect(first).toHaveAttribute('role', 'spinbutton')
      expect(second).toHaveAttribute('role', 'textbox')
      expect(first).toHaveAttribute('aria-valuemin', '1')
      expect(first).toHaveAttribute('aria-valuemax', '12')
      expect(first).toHaveAttribute('aria-valuenow', '5')
      expect(first).toHaveAttribute('aria-valuetext', '05')
    })

    it('should set aria-valuetext to Empty when no value', () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            spinButton: { min: 1, max: 12 },
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
          },
        ],
      })

      const first = getFirst()
      expect(first).toHaveAttribute('aria-valuetext', 'Empty')
    })
  })

  describe('tab navigation', () => {
    it('should tab between sections', async () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      act(() => {
        first.focus()
      })
      expect(document.activeElement).toBe(first)

      await userEvent.keyboard('{Tab}')
      expect(document.activeElement).toBe(second)

      await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
      expect(document.activeElement).toBe(first)
    })

    it('should clear selection when tabbing out of the last section', async () => {
      render(
        <>
          <SegmentedField
            inputs={twoDigitInputs}
            delimiter="/"
            values={{ first: '12', second: '34' }}
          />
          <button type="button">Next</button>
        </>
      )

      const second = getSecond()

      await userEvent.click(second)

      expect(second.selectionStart).toBe(0)
      expect(second.selectionEnd).toBe(second.value.length)

      await userEvent.tab()

      expect(document.activeElement).toBe(
        document.querySelector('button[type="button"]')
      )
      expect(second.selectionStart).toBe(second.value.length)
      expect(second.selectionEnd).toBe(second.value.length)
    })
  })

  describe('focus and blur', () => {
    it('should select entire section on focus', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      await userEvent.click(first)

      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)
    })

    it('should select entire section on repeated blur and focus', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      first.blur()

      await userEvent.click(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)
    })

    it('should call onFocus when the group receives focus', async () => {
      const onFocus = jest.fn()
      renderSegmentedField({
        onFocus,
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      await userEvent.click(first)

      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onFocus).toHaveBeenCalledWith({
        first: '12',
        second: '34',
      })
    })

    it('should not call onFocus again when moving between sections', async () => {
      const onFocus = jest.fn()
      renderSegmentedField({ onFocus })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)
      expect(onFocus).toHaveBeenCalledTimes(1)

      await userEvent.click(second)
      expect(onFocus).toHaveBeenCalledTimes(1)
    })

    it('should call onBlur when leaving the group', async () => {
      window.requestAnimationFrame = jest.fn((callback) => {
        return setTimeout(callback, 0) as unknown as number
      })

      const onBlur = jest.fn()
      renderSegmentedField({
        onBlur,
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.click(document.body)

      await waitFor(() => {
        expect(onBlur).toHaveBeenCalledTimes(1)
        expect(onBlur).toHaveBeenCalledWith({
          first: '12',
          second: '34',
        })
      })
    })

    it('should not call onBlur when moving between sections', async () => {
      window.requestAnimationFrame = jest.fn((callback) => {
        return setTimeout(callback, 0) as unknown as number
      })

      const onBlur = jest.fn()
      renderSegmentedField({ onBlur })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)
      await userEvent.click(second)

      // Wait a tick and verify no blur was called
      await new Promise((resolve) => setTimeout(resolve, 50))
      expect(onBlur).not.toHaveBeenCalled()
    })
  })

  describe('onChange', () => {
    it('should call onChange when value changes', async () => {
      const onChange = jest.fn()
      renderSegmentedField({ onChange })

      const first = getFirst()

      await userEvent.click(first)
      await userEvent.keyboard('12')

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(
        expect.objectContaining({ first: '12' })
      )
    })

    it('should provide all values in onChange', async () => {
      const onChange = jest.fn()
      renderSegmentedField({
        onChange,
        values: { first: '12', second: '' },
      })

      const second = getSecond()

      await userEvent.click(second)
      await userEvent.keyboard('34')

      expect(onChange).toHaveBeenLastCalledWith({
        first: '12',
        second: '34',
      })
    })
  })

  describe('select all (Ctrl+A)', () => {
    it('should select all segments on Ctrl+A', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(second)

      fireEvent.keyDown(second, {
        key: 'a',
        ctrlKey: true,
      })

      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(first.value.length)
      expect(second.selectionStart).toBe(0)
      expect(second.selectionEnd).toBe(second.value.length)
    })

    it('should restart typing from first section after Ctrl+A and typing', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(second)

      fireEvent.keyDown(second, {
        key: 'a',
        ctrlKey: true,
      })

      await userEvent.keyboard('5')

      expect(document.activeElement).toBe(first)
      expect(first.value).toBe('5f')
      expect(second.value).toBe('ss')
    })

    it('should not prevent unrelated browser shortcuts while a section is focused', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const second = getSecond()

      await userEvent.click(second)

      const event = new KeyboardEvent('keydown', {
        key: 'r',
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      })

      second.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(false)
    })
  })

  describe('copy', () => {
    it('should copy the whole joined value', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
        delimiter: '/',
      })

      const second = getSecond()

      await userEvent.click(second)

      fireEvent.keyDown(second, {
        key: 'a',
        ctrlKey: true,
      })

      const setData = jest.fn()
      fireEvent.copy(second, {
        clipboardData: { setData },
      })

      expect(setData).toHaveBeenCalledWith('text/plain', '12/34')
    })
  })

  describe('paste', () => {
    it('should paste a delimited value into both sections', async () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)

      fireEvent.paste(first, {
        clipboardData: {
          getData: () => '12/34',
        },
      })

      expect(first.value).toBe('12')
      expect(second.value).toBe('34')
    })

    it('should paste a short value into the current section only', async () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      await userEvent.click(first)

      fireEvent.paste(first, {
        clipboardData: {
          getData: () => '56',
        },
      })

      expect(first.value).toBe('56')
      expect(second.value).toBe('ss')
    })

    it('should distribute paste across three segments', () => {
      render(<SegmentedField inputs={threeSegmentInputs} delimiter="." />)

      const sections = getSections()

      fireEvent.paste(sections[0], {
        clipboardData: {
          getData: () => '01.04.2025',
        },
      })

      expect(sections[0].value).toBe('01')
      expect(sections[1].value).toBe('04')
      expect(sections[2].value).toBe('2025')
    })
  })

  describe('click', () => {
    it('should select whole section value on click', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      fireEvent.mouseDown(first)
      expect(document.activeElement).toBe(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)
    })

    it('should not reselect the whole section on repeated click when already focused', async () => {
      renderSegmentedField({
        values: { first: '12', second: '34' },
      })

      const first = getFirst()

      fireEvent.mouseDown(first)
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      first.setSelectionRange(1, 1)
      fireEvent.click(first)

      expect(first.selectionStart).toBe(1)
      expect(first.selectionEnd).toBe(1)
    })

    it('should focus first input on legend click', () => {
      renderSegmentedField({ label: 'My label' })

      const legend = document.querySelector('legend')

      fireEvent.click(legend)

      expect(document.activeElement).toBe(getFirst())
    })

    it('should not focus on legend click when disabled', () => {
      renderSegmentedField({ label: 'My label', disabled: true })

      const legend = document.querySelector('legend')

      fireEvent.click(legend)

      expect(document.activeElement).not.toBe(getFirst())
    })
  })

  describe('three segments', () => {
    it('should auto-advance through all three segments', async () => {
      render(<SegmentedField inputs={threeSegmentInputs} delimiter="." />)

      const sections = getSections()
      const [day, month, year] = sections

      await userEvent.click(day)
      await userEvent.keyboard('30062025')

      expect(day.value).toBe('30')
      expect(month.value).toBe('06')
      expect(year.value).toBe('2025')
    })

    it('should backspace through segments', async () => {
      render(
        <SegmentedField
          inputs={threeSegmentInputs}
          delimiter="."
          values={{ day: '30', month: '06', year: '2025' }}
        />
      )

      const sections = getSections()
      const [, month, year] = sections

      await userEvent.click(year)
      year.setSelectionRange(4, 4)

      await userEvent.keyboard('{Backspace>4}')
      expect(year.value).toBe('yyyy')

      await userEvent.keyboard('{Backspace}')
      await waitFor(() => {
        expect(document.activeElement).toBe(month)
      })
    })
  })

  describe('ARIA', () => {
    it('should have proper aria-label on sections', () => {
      renderSegmentedField()

      const first = getFirst()
      const second = getSecond()

      expect(first).toHaveAttribute('aria-label', 'First')
      expect(second).toHaveAttribute('aria-label', 'Second')
    })

    it('should have role textbox on sections without spinButton', () => {
      renderSegmentedField()

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('role', 'textbox')
        expect(section).not.toHaveAttribute('aria-valuenow')
        expect(section).not.toHaveAttribute('aria-valuetext')
      })
    })

    it('should have role group on the container', () => {
      renderSegmentedField()

      const group = document.querySelector('.dnb-segmented-field__group')
      expect(group).toHaveAttribute('role', 'group')
    })

    it('should validate with ARIA rules', async () => {
      const result = renderSegmentedField({
        label: 'Test label',
        values: { first: '12', second: '34' },
      })

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })

  describe('HTML attributes forwarding', () => {
    it('should forward autoComplete per input', () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            autoComplete: 'cc-exp-month',
          },
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
            autoComplete: 'cc-exp-year',
          },
        ],
      })

      const first = getFirst()
      const second = getSecond()

      expect(first).toHaveAttribute('autocomplete', 'cc-exp-month')
      expect(second).toHaveAttribute('autocomplete', 'cc-exp-year')
    })

    it('should forward shared inputMode to all sections', () => {
      renderSegmentedField({ inputMode: 'numeric' })

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('inputmode', 'numeric')
      })
    })

    it('should forward lang attribute', () => {
      renderSegmentedField({ lang: 'nb-NO' })

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('lang', 'nb-NO')
      })
    })

    it('should forward dir attribute', () => {
      renderSegmentedField({ dir: 'ltr' })

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('dir', 'ltr')
      })
    })

    it('should forward title attribute', () => {
      renderSegmentedField({ title: 'My title' })

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('title', 'My title')
      })
    })

    it('should forward required attribute', () => {
      renderSegmentedField({ required: true })

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('required')
      })
    })

    it('should forward aria-required attribute', () => {
      renderSegmentedField({ 'aria-required': 'true' } as never)

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('aria-required', 'true')
      })
    })

    it('should forward data-* attributes', () => {
      renderSegmentedField({ 'data-testid': 'my-field' } as never)

      const sections = getSections()
      sections.forEach((section) => {
        expect(section).toHaveAttribute('data-testid', 'my-field')
      })
    })

    it('should forward per-input data-* attributes', () => {
      renderSegmentedField({
        inputs: [
          {
            id: 'first',
            label: 'First',
            mask: [digit, digit],
            placeholder: 'ff',
            'data-section': 'month',
          } as SegmentedFieldItem<'first' | 'second'>,
          {
            id: 'second',
            label: 'Second',
            mask: [digit, digit],
            placeholder: 'ss',
            'data-section': 'year',
          } as SegmentedFieldItem<'first' | 'second'>,
        ],
      })

      const first = getFirst()
      const second = getSecond()

      expect(first).toHaveAttribute('data-section', 'month')
      expect(second).toHaveAttribute('data-section', 'year')
    })
  })
})
