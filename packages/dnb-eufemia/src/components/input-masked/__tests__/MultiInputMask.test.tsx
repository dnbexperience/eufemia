/**
 * InputMasked Test
 *
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as helpers from '../../../shared/helpers'
import MultiInputMask, {
  MultiInputMaskInput,
  MultiInputMaskProps,
} from '../MultiInputMask'

const defaultProps: MultiInputMaskProps<'day' | 'month' | 'year'> = {
  inputs: [
    {
      id: 'day',
      label: 'the day',
      placeholder: 'dd',
      mask: [/[0-9]/, /[0-9]/],
    },
    {
      id: 'month',
      label: 'the month',
      placeholder: 'mm',
      mask: [/[0-9]/, /[0-9]/],
    },
    {
      id: 'year',
      label: 'the year',
      placeholder: 'yyyy',
      mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
    },
  ],
}

describe('MultiInputMask', () => {
  beforeEach(() => {
    window.requestAnimationFrame = jest.fn((callback) => {
      return setTimeout(callback, 0)
    })
    window.cancelAnimationFrame = jest.fn((id) => {
      clearTimeout(id)
      return id
    })
  })

  it('should update input values when typing', async () => {
    const onChange = jest.fn()

    render(<MultiInputMask {...defaultProps} onChange={onChange} />)

    const firstInput = document.querySelectorAll(
      '.dnb-multi-input-mask__input'
    )[0] as HTMLInputElement

    fireEvent.focus(firstInput)

    await userEvent.keyboard('08122023')

    expect(onChange).toHaveBeenCalledTimes(8)
    expect(onChange.mock.calls[0][0]).toEqual({
      day: '0',
      month: '',
      year: '',
    })
    expect(onChange.mock.calls[1][0]).toEqual({
      day: '08',
      month: '',
      year: '',
    })
    expect(onChange.mock.calls[2][0]).toEqual({
      day: '08',
      month: '1',
      year: '',
    })
    expect(onChange.mock.calls[3][0]).toEqual({
      day: '08',
      month: '12',
      year: '',
    })
    expect(onChange.mock.calls[4][0]).toEqual({
      day: '08',
      month: '12',
      year: '2',
    })
    expect(onChange.mock.calls[5][0]).toEqual({
      day: '08',
      month: '12',
      year: '20',
    })
    expect(onChange.mock.calls[6][0]).toEqual({
      day: '08',
      month: '12',
      year: '202',
    })
    expect(onChange.mock.calls[7][0]).toEqual({
      day: '08',
      month: '12',
      year: '2023',
    })
    expect(onChange.mock.calls[7][0]).toEqual({
      day: '08',
      month: '12',
      year: '2023',
    })
  })

  it('render inputs based on inputs prop', () => {
    render(<MultiInputMask {...defaultProps} id="given-id" />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    expect(first.id).toBe('given-id-day')
    expect(first.tagName).toBe('INPUT')

    expect(second.id).toBe('given-id-month')
    expect(second.tagName).toBe('INPUT')

    expect(third.id).toBe('given-id-year')
    expect(third.tagName).toBe('INPUT')
  })

  it('should apply labels to input inputs', () => {
    render(<MultiInputMask {...defaultProps} id="given-id" />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    expect(first).toHaveAttribute('aria-label', 'the day')
    expect(second).toHaveAttribute('aria-label', 'the month')
    expect(third).toHaveAttribute('aria-label', 'the year')
  })

  it('should show legend based on label prop', () => {
    const { rerender } = render(
      <MultiInputMask {...defaultProps} label="My awesome label" />
    )

    const label = () => document.querySelector('.dnb-form-label')

    expect(label()).toHaveTextContent('My awesome label')
    expect(label().tagName).toBe('LEGEND')

    rerender(<MultiInputMask {...defaultProps} label="New label" />)

    expect(label()).toHaveTextContent('New label')
    expect(label().tagName).toBe('LEGEND')
  })

  it('should be wrapped in a `fieldset` if label is provided', () => {
    render(<MultiInputMask {...defaultProps} label="Label" />)

    const label = document.querySelector('.dnb-form-label')
    const wrapper = document.querySelector(
      '.dnb-multi-input-mask__fieldset'
    )

    expect(label).toHaveTextContent('Label')
    expect(label.tagName).toBe('LEGEND')

    expect(wrapper.tagName).toBe('FIELDSET')
    expect(wrapper.tagName).not.toBe('DIV')
  })

  it('should be wrapped in a `div` if no label is provided', () => {
    render(<MultiInputMask {...defaultProps} />)

    const label = document.querySelector('.dnb-form-label')
    const wrapper = document.querySelector(
      '.dnb-multi-input-mask__fieldset'
    )

    expect(label).not.toBeInTheDocument()

    expect(wrapper.tagName).toBe('DIV')
    expect(wrapper.tagName).not.toBe('FIELDSET')
  })

  it('should change label layout direction', () => {
    const { rerender } = render(
      <MultiInputMask {...defaultProps} label="Directions" />
    )

    const input = document.querySelector('.dnb-input')
    const fieldset = document.querySelector(
      '.dnb-multi-input-mask__fieldset'
    )

    expect(input.classList).toContain('dnb-input--horizontal')
    expect(fieldset.classList).toContain(
      'dnb-multi-input-mask__fieldset--horizontal'
    )

    rerender(
      <MultiInputMask
        {...defaultProps}
        label="Directions"
        labelDirection="vertical"
      />
    )

    expect(input.classList).toContain('dnb-input--vertical')
  })

  it('onChange should have object params based on step ids', async () => {
    const onChange = jest.fn()

    render(<MultiInputMask {...defaultProps} onChange={onChange} />)

    const [first] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)

    await userEvent.keyboard('11223333')

    expect(onChange).toHaveBeenCalledTimes(8)
    expect(Object.keys(onChange.mock.calls[7][0])).toEqual([
      'day',
      'month',
      'year',
    ])
  })

  it('step id, value and onChange param properties should all match', async () => {
    const onChange = jest.fn()

    const inputs: MultiInputMaskInput<'first' | 'second' | 'third'>[] = [
      {
        id: 'first',
        label: 'first',
        mask: [/f/],
        placeholder: 'f',
      },
      {
        id: 'second',
        label: 'second',
        mask: [/s/],
        placeholder: 's',
      },
      {
        id: 'third',
        label: 'third',
        mask: [/t/],
        placeholder: 't',
      },
    ]

    const values = {
      first: '',
      second: '',
      third: '',
    }

    render(
      <MultiInputMask
        inputs={inputs}
        values={values}
        onChange={onChange}
      />
    )

    const [first] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)
    first.setSelectionRange(0, 0)

    await userEvent.keyboard('fst')

    expect(onChange).toHaveBeenCalledTimes(3)

    const onChangeParamKeys = Object.keys(onChange.mock.calls[2][0])
    const valueKeys = Object.keys(values)

    expect(onChangeParamKeys[0]).toEqual(valueKeys[0])
    expect(onChangeParamKeys[0]).toEqual(inputs[0].id)

    expect(onChangeParamKeys[1]).toEqual(valueKeys[1])
    expect(onChangeParamKeys[1]).toEqual(inputs[1].id)

    expect(onChangeParamKeys[2]).toEqual(valueKeys[2])
    expect(onChangeParamKeys[2]).toEqual(inputs[2].id)
  })

  it('should show placeholder text', () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    expect(first).toHaveAttribute('placeholder', 'dd')
    expect(second).toHaveAttribute('placeholder', 'mm')
    expect(third).toHaveAttribute('placeholder', 'yyyy')
  })

  it('inputs should only allow values defined by mask', async () => {
    const inputs = [
      {
        id: 'numbers',
        label: 'just numbers',
        placeholder: 'nn',
        mask: [/[0-9]/, /[0-9]/],
      },
      {
        id: 'letters',
        label: 'just letters',
        placeholder: 'll',
        mask: [/[a-zA-Z]/, /[a-zA-Z]/],
      },
      {
        id: 'mix',
        label: 'numbers and letters',
        placeholder: 'nnmm',
        mask: [/[0-9]/, /[0-9]/, /[a-zA-Z]/, /[a-zA-Z]/],
      },
    ]

    render(<MultiInputMask inputs={inputs} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)
    first.setSelectionRange(0, 0)

    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('1a')

    expect(first.selectionStart).toBe(1)
    expect(first.selectionEnd).toBe(1)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('bc')

    expect(first.selectionStart).toBe(1)
    expect(first.selectionEnd).toBe(1)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('2a')

    expect(second.selectionStart).toBe(1)
    expect(second.selectionEnd).toBe(1)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('bc')

    // On final move, focus is on third; selection may reflect ghost
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('123')

    expect(third.selectionStart).toBe(2)
    expect(third.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('ab')

    expect(third.selectionStart).toBe(4)
    expect(third.selectionEnd).toBe(4)
    expect(document.activeElement).toBe(third)
    await userEvent.keyboard(
      '{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}'
    )

    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('12ab34cd')

    expect(third.selectionStart).toBe(4)
    expect(third.selectionEnd).toBe(4)
    expect(document.activeElement).toBe(third)
  })

  it('inputs size should match mask length', () => {
    const inputs: MultiInputMaskInput<string>[] = [
      {
        id: 'short',
        label: 'long',
        placeholder: 'ss',
        mask: [/[0-9]/, /[0-9]/],
      },
      {
        id: 'medium',
        label: 'long',
        placeholder: 'mmmm',
        mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
      },
      {
        id: 'long',
        label: 'long',
        placeholder: 'llllll',
        mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
      },
    ]

    render(<MultiInputMask inputs={inputs} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    expect(first.size).toBe(2)
    expect(second.size).toBe(4)
    expect(third.size).toBe(6)
  })

  it('should display delimiter when given', () => {
    const { rerender } = render(
      <MultiInputMask {...defaultProps} delimiter="/" />
    )

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    expect(first.nextElementSibling).toHaveTextContent('/')
    expect(second.nextElementSibling).toHaveTextContent('/')
    expect(third.nextElementSibling).not.toBeInTheDocument()

    rerender(<MultiInputMask {...defaultProps} delimiter="-" />)

    expect(first.nextElementSibling).toHaveTextContent('-')
    expect(second.nextElementSibling).toHaveTextContent('-')
    expect(third.nextElementSibling).not.toBeInTheDocument()

    rerender(<MultiInputMask {...defaultProps} delimiter="." />)

    expect(first.nextElementSibling).toHaveTextContent('.')
    expect(second.nextElementSibling).toHaveTextContent('.')
    expect(third.nextElementSibling).not.toBeInTheDocument()

    rerender(<MultiInputMask {...defaultProps} />)

    expect(first.nextElementSibling).toBe(second)
    expect(second.nextElementSibling).toBe(third)
    expect(third.nextElementSibling).not.toBeInTheDocument()
  })

  it('should show error state', () => {
    render(
      <MultiInputMask
        {...defaultProps}
        status="error"
        statusState="error"
      />
    )

    const errorInput = document.querySelector('.dnb-input__status--error')

    expect(errorInput).toBeInTheDocument()
  })

  it('should be disabled based on prop', () => {
    render(<MultiInputMask {...defaultProps} label="disabled" disabled />)

    const inputWrapper = document.querySelector('.dnb-multi-input-mask')
    const label = document.querySelector('.dnb-form-label')

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    expect(inputWrapper.getAttribute('data-input-state')).toBe('disabled')
    expect(label.getAttribute('aria-disabled')).toBe('true')

    expect(first.disabled).toBe(true)
    expect(second.disabled).toBe(true)
    expect(third.disabled).toBe(true)
  })

  it('should support spacing props', () => {
    render(<MultiInputMask {...defaultProps} top="2rem" />)

    const fieldset = document.querySelector(
      '.dnb-multi-input-mask__fieldset'
    )

    expect(fieldset.classList).toContain('dnb-space__top--large')
  })

  it('should change caret position when one input is filled out', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)
    first.setSelectionRange(0, 0)

    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('08')

    expect(first.selectionStart).toBe(2)
    expect(first.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('12')

    // After entering two chars, caret is at end
    expect(second.selectionStart).toBe(2)
    expect(second.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('2023')

    expect(third.selectionStart).toBe(4)
    expect(third.selectionEnd).toBe(4)
    expect(document.activeElement).toBe(third)
  })

  it('should change caret on backspace', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)

    await userEvent.keyboard('11223333')

    expect(third.selectionStart).toBe(4)
    expect(third.selectionEnd).toBe(4)
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard(
      '{Backspace}{Backspace}{Backspace}{Backspace}{Backspace}'
    )

    expect(second.selectionStart).toBe(1)
    expect(second.selectionEnd).toBe(1)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{Backspace}{Backspace}{Backspace}')

    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(first)
  })

  it('should be able to navigate between inputs using arrow keys', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, _, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)
    first.setSelectionRange(0, 0)

    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(first)

    // Move forward enough times to reach second and then third
    await userEvent.keyboard('{ArrowRight>5}')
    expect(document.activeElement).toBe(third)

    // Move back enough times to reach first
    await userEvent.keyboard('{ArrowLeft>8}')
    expect(document.activeElement).toBe(first)
  })

  it('does not jump to next input on first typed char at end', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [day, month] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    // Place caret at end of first input
    fireEvent.focus(day)
    day.setSelectionRange(2, 2)

    await userEvent.keyboard('1')

    // Still in day, caret at end
    expect(document.activeElement).toBe(day)
    expect(day.selectionStart).toBe(2)
    expect(day.selectionEnd).toBe(2)

    // After second char, it should jump to month
    await userEvent.keyboard('2')
    expect(document.activeElement).toBe(month)
  })

  it('carries typed digit into next input when current is full and caret at end', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [day, month] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    // Fill day (auto-advances to month), then move caret back to end of day
    await userEvent.click(day)
    await userEvent.keyboard('08')
    day.focus()
    day.setSelectionRange(2, 2)

    // Type one more digit — should carry into month as first char
    await userEvent.keyboard('1')

    expect(document.activeElement).toBe(month)
    expect(month.value).toBe('1m')
    expect(month.selectionStart).toBe(1)
    expect(month.selectionEnd).toBe(1)
  })

  it('Backspace on empty field jumps to previous with caret at end', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [day, month] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    // Focus the month field while it is empty
    fireEvent.focus(month)
    month.setSelectionRange(0, 0)

    expect(document.activeElement).toBe(month)
    expect(month.selectionStart).toBe(0)
    expect(month.selectionEnd).toBe(0)

    // Press Backspace on empty month -> should jump to day with caret at end
    await userEvent.keyboard('{Backspace}')

    expect(document.activeElement).toBe(day)
    expect(day.selectionStart).toBe(2)
    expect(day.selectionEnd).toBe(2)
  })

  it('should set cursor at the start or end of the input when value is selected', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    // ArrowRight from start should enable navigating to next
    fireEvent.focus(first)
    first.setSelectionRange(0, 0)
    await userEvent.keyboard('{ArrowRight>2}')
    expect(document.activeElement).toBe(second)

    // From last: Backspace and ArrowLeft should land on previous field
    fireEvent.focus(third)
    await userEvent.keyboard('{Backspace}{ArrowLeft}')
    expect(document.activeElement).toBe(second)
    // Caret is collapsed within the previous field
    expect(second.selectionStart).toBe(second.selectionEnd)
  })

  it('should be able to tab between inputs', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)

    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('{Tab}')
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{Tab}')
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}')
    expect(document.activeElement).toBe(first)
  })

  describe('click', () => {
    it('should focus and select input on label click', async () => {
      render(<MultiInputMask {...defaultProps} label="label" />)

      const label = document.querySelector('.dnb-form-label')

      const [first] = Array.from(
        document.querySelectorAll('.dnb-multi-input-mask__input')
      ) as HTMLInputElement[]

      await userEvent.click(label)

      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(0)
      expect(document.activeElement).toBe(first)
    })

    it('should select whole input value on click', async () => {
      render(<MultiInputMask {...defaultProps} />)

      const [first, second, third] = Array.from(
        document.querySelectorAll('.dnb-multi-input-mask__input')
      ) as HTMLInputElement[]

      await userEvent.click(first)
      expect(document.activeElement).toBe(first)

      await userEvent.click(second)
      expect(document.activeElement).toBe(second)

      await userEvent.click(third)
      expect(document.activeElement).toBe(third)
    })
  })

  it('will set highlight class on fields with a number value', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [month, year] = Array.from(document.querySelectorAll('input'))

    const test = async (elem: HTMLInputElement) => {
      expect(elem.classList).not.toContain(
        'dnb-multi-input-mask__input--highlight'
      )

      await userEvent.type(elem, '1')

      expect(elem.classList).toContain(
        'dnb-multi-input-mask__input--highlight'
      )

      await userEvent.type(elem, '{Backspace>4}') // use 4 because of year

      expect(elem.classList).not.toContain(
        'dnb-multi-input-mask__input--highlight'
      )
    }

    await test(month)
    await test(year)
  })

  it('should support onFocus', async () => {
    const onFocus = jest.fn()
    render(<MultiInputMask {...defaultProps} onFocus={onFocus} />)

    const day = document.querySelector('input')

    await userEvent.type(day, '11012024')

    expect(onFocus).toHaveBeenCalledTimes(1)

    await userEvent.click(document.body)
    await userEvent.click(day)

    expect(onFocus).toHaveBeenCalledTimes(2)
    expect(onFocus).toHaveBeenCalledWith({
      day: '11',
      month: '01',
      year: '2024',
    })
  })

  it('should support onBlur', async () => {
    const onBlur = jest.fn()
    render(<MultiInputMask {...defaultProps} onBlur={onBlur} />)

    const day = document.querySelector('input')

    await userEvent.click(day)

    expect(onBlur).toHaveBeenCalledTimes(0)

    await userEvent.click(document.body)

    expect(onBlur).toHaveBeenCalledTimes(1)

    await userEvent.type(day, '11012024')

    expect(onBlur).toHaveBeenCalledTimes(1)

    await userEvent.click(document.body)

    expect(onBlur).toHaveBeenCalledTimes(2)
    expect(onBlur).toHaveBeenCalledWith({
      day: '11',
      month: '01',
      year: '2024',
    })
  })

  it('iOS: focus places caret at start (no select all)', async () => {
    const originalIOS = Object.getOwnPropertyDescriptor(helpers, 'IS_IOS')
    Object.defineProperty(helpers, 'IS_IOS', {
      get: () => true,
      configurable: true,
    })

    try {
      render(<MultiInputMask {...defaultProps} />)

      const day = document.querySelector(
        '.dnb-multi-input-mask__input'
      ) as HTMLInputElement

      await userEvent.click(day)

      // Allow deferred selection correction
      await new Promise((r) => setTimeout(r, 20))

      expect(day.selectionStart).toBe(0)
      expect(day.selectionEnd).toBe(0)
    } finally {
      if (originalIOS) {
        Object.defineProperty(helpers, 'IS_IOS', originalIOS)
      }
    }
  })

  it('iOS: next input keeps numeric keyboard (inputmode="numeric")', async () => {
    const originalIOS = Object.getOwnPropertyDescriptor(helpers, 'IS_IOS')
    Object.defineProperty(helpers, 'IS_IOS', {
      get: () => true,
      configurable: true,
    })

    try {
      render(<MultiInputMask {...defaultProps} inputMode="numeric" />)

      const [day, month] = Array.from(
        document.querySelectorAll('.dnb-multi-input-mask__input')
      ) as HTMLInputElement[]

      await userEvent.click(day)
      await userEvent.keyboard('08')

      // Allow iOS deferred nav/selection
      await new Promise((r) => setTimeout(r, 20))

      expect(month.getAttribute('inputmode')).toBe('numeric')
    } finally {
      if (originalIOS) {
        Object.defineProperty(helpers, 'IS_IOS', originalIOS)
      }
    }
  })

  it('Android: deleteContentBackward triggers Backspace navigation', async () => {
    const originalAndroid = Object.getOwnPropertyDescriptor(
      helpers,
      'IS_ANDROID'
    )
    Object.defineProperty(helpers, 'IS_ANDROID', {
      get: () => true,
      configurable: true,
    })

    try {
      render(<MultiInputMask {...defaultProps} />)

      const [day, month] = Array.from(
        document.querySelectorAll('.dnb-multi-input-mask__input')
      ) as HTMLInputElement[]

      // Put some content in day and move focus to month at start
      await userEvent.type(day, '08')
      month.focus()
      month.setSelectionRange(0, 0)

      // Dispatch a native-like InputEvent with inputType=deleteContentBackward
      fireEvent.input(month, {
        // React SyntheticEvent exposes nativeEvent with inputType, but RTL also provides inputType here
        // Our handler checks both nativeEvent.inputType and event.inputType
        inputType: 'deleteContentBackward',
      } as any)
      // Allow the async navigation to take effect
      await new Promise((r) => setTimeout(r, 0))
      // Should jump to previous (day) with caret at end
      expect(document.activeElement).toBe(day)
      expect(day.selectionStart).toBe(2)
      expect(day.selectionEnd).toBe(2)
    } finally {
      if (originalAndroid) {
        Object.defineProperty(helpers, 'IS_ANDROID', originalAndroid)
      }
    }
  })

  it('should not fire focus event while navigating between inputs', async () => {
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    render(
      <>
        <MultiInputMask
          {...defaultProps}
          label="First"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <MultiInputMask
          label="Second"
          inputs={[
            {
              id: 'first',
              label: 'the first',
              placeholder: '00',
              mask: [/[0-9]/, /[0-9]/],
            },
            {
              id: 'second',
              label: 'the second',
              placeholder: '00',
              mask: [/[0-9]/, /[0-9]/],
            },
            {
              id: 'third',
              label: 'the third',
              placeholder: '00',
              mask: [/[0-9]/, /[0-9]/],
            },
          ]}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </>
    )

    const [firstLabel, secondLabel] = Array.from(
      document.querySelectorAll('legend')
    )

    await userEvent.click(firstLabel)
    expect(onFocus).toHaveBeenCalledTimes(1)

    await userEvent.keyboard('{Tab>3}')
    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledTimes(2)

    await userEvent.keyboard('{Tab>2}')
    expect(onBlur).toHaveBeenCalledTimes(1)
    expect(onFocus).toHaveBeenCalledTimes(2)

    await userEvent.keyboard('{Shift>}{Tab>3}{/Shift}')
    expect(onBlur).toHaveBeenCalledTimes(2)
    expect(onFocus).toHaveBeenCalledTimes(3)

    await userEvent.click(secondLabel)
    expect(onBlur).toHaveBeenCalledTimes(3)
    expect(onFocus).toHaveBeenCalledTimes(4)

    await userEvent.click(firstLabel)
    expect(onBlur).toHaveBeenCalledTimes(4)
    expect(onFocus).toHaveBeenCalledTimes(5)

    await userEvent.keyboard('{Tab>3}')
    expect(onBlur).toHaveBeenCalledTimes(5)
    expect(onFocus).toHaveBeenCalledTimes(6)

    await userEvent.click(document.body)
    expect(onBlur).toHaveBeenCalledTimes(6)
    expect(onFocus).toHaveBeenCalledTimes(6)
  })
})
