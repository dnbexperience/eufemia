/**
 * InputMasked Test
 *
 */

import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MultiInputMask, {
  MultiInputMaskInput,
  MultiInputMaskProps,
} from '../MultiInputMask'

const defaultProps: MultiInputMaskProps<'day' | 'month' | 'year'> = {
  inputs: [
    {
      id: 'day',
      label: 'the day',
      placeholderCharacter: 'd',
      mask: [/[0-9]/, /[0-9]/],
    },
    {
      id: 'month',
      label: 'the month',
      placeholderCharacter: 'm',
      mask: [/[0-9]/, /[0-9]/],
    },
    {
      id: 'year',
      label: 'the year',
      placeholderCharacter: 'y',
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

    expect(first.nextElementSibling).toHaveTextContent('the day')
    expect(first.labels[0].id).toBe('given-id-day__label')
    expect(first.nextElementSibling.tagName).toBe('LABEL')

    expect(second.nextElementSibling).toHaveTextContent('the month')
    expect(second.labels[0].id).toBe('given-id-month__label')
    expect(second.nextElementSibling.tagName).toBe('LABEL')

    expect(third.nextElementSibling).toHaveTextContent('the year')
    expect(third.labels[0].id).toBe('given-id-year__label')
    expect(third.nextElementSibling.tagName).toBe('LABEL')
  })

  it('should show legend based on label prop', () => {
    const { rerender } = render(
      <MultiInputMask {...defaultProps} label="My awesome label" />
    )

    const label = document.querySelector('.dnb-multi-input-mask__legend')

    expect(label).toHaveTextContent('My awesome label')
    expect(label.tagName).toBe('LEGEND')

    rerender(<MultiInputMask {...defaultProps} label="New label" />)

    expect(label).toHaveTextContent('New label')
    expect(label.tagName).toBe('LEGEND')
  })

  it('should be wrapped in a `fieldset` if label is provided', () => {
    render(<MultiInputMask {...defaultProps} label="Label" />)

    const label = document.querySelector('.dnb-multi-input-mask__legend')
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

    const label = document.querySelector('.dnb-multi-input-mask__legend')
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

    const label = document.querySelector('.dnb-multi-input-mask__legend')
    const fieldset = document.querySelector(
      '.dnb-multi-input-mask__fieldset'
    )

    expect(label).toHaveTextContent('Directions')

    expect(label.classList).toContain(
      'dnb-multi-input-mask__legend--horizontal'
    )
    expect(label.classList).not.toContain('dnb-form-label--vertical')
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

    expect(label).toHaveTextContent('Directions')

    expect(label.classList).not.toContain(
      'dnb-multi-input-mask__legend--horizontal'
    )
    expect(label.classList).toContain('dnb-form-label--vertical')
    expect(fieldset.classList).not.toContain(
      'dnb-multi-input-mask__fieldset--horizontal'
    )
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
        placeholderCharacter: 'f',
      },
      {
        id: 'second',
        label: 'second',
        mask: [/s/],
        placeholderCharacter: 's',
      },
      {
        id: 'third',
        label: 'third',
        mask: [/t/],
        placeholderCharacter: 't',
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

  it('should show placeholder character', () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
      // _valueTracker is whats controlling the placeholder, no idea where this property comes form though, can't find it when searching for it
    ) as (HTMLInputElement & { _valueTracker: Record<string, any> })[]

    expect(first?._valueTracker.getValue()).toBe('dd')
    expect(second?._valueTracker.getValue()).toBe('mm')
    expect(third?._valueTracker.getValue()).toBe('yyyy')
  })

  it('inputs should only allow values defined by mask', async () => {
    const inputs = [
      {
        id: 'numbers',
        label: 'just numbers',
        placeholderCharacter: 'n',
        mask: [/[0-9]/, /[0-9]/],
      },
      {
        id: 'letters',
        label: 'just letters',
        placeholderCharacter: 'l',
        mask: [/[a-zA-Z]/, /[a-zA-Z]/],
      },
      {
        id: 'mix',
        label: 'numbers and letters',
        placeholderCharacter: 'm',
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

    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(0)
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
        placeholderCharacter: 's',
        mask: [/[0-9]/, /[0-9]/],
      },
      {
        id: 'medium',
        label: 'long',
        placeholderCharacter: 'm',
        mask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
      },
      {
        id: 'long',
        label: 'long',
        placeholderCharacter: 'l',
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

    expect(first.labels[0].nextElementSibling).toHaveTextContent('/')
    expect(second.labels[0].nextElementSibling).toHaveTextContent('/')
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()

    rerender(<MultiInputMask {...defaultProps} delimiter="-" />)

    expect(first.labels[0].nextElementSibling).toHaveTextContent('-')
    expect(second.labels[0].nextElementSibling).toHaveTextContent('-')
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()

    rerender(<MultiInputMask {...defaultProps} delimiter="." />)

    expect(first.labels[0].nextElementSibling).toHaveTextContent('.')
    expect(second.labels[0].nextElementSibling).toHaveTextContent('.')
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()

    rerender(<MultiInputMask {...defaultProps} />)

    expect(first.labels[0].nextElementSibling).toBe(second)
    expect(second.labels[0].nextElementSibling).toBe(third)
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()
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
    const label = document.querySelector('.dnb-multi-input-mask__legend')

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

    expect(second.selectionStart).toBe(2)
    expect(second.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{Backspace}{Backspace}{Backspace}')

    expect(first.selectionStart).toBe(2)
    expect(first.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(first)
  })

  it('should be able to navigate between inputs using arrow keys', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    fireEvent.focus(first)
    first.setSelectionRange(0, 0)

    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('{ArrowRight>3}')

    expect(second.selectionStart).toBe(0)
    expect(second.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{ArrowRight>3}')

    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('{ArrowLeft}')

    expect(second.selectionStart).toBe(2)
    expect(second.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{ArrowLeft>3}')

    expect(first.selectionStart).toBe(2)
    expect(first.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('{ArrowRight>3}{ArrowRight}')

    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(third)
  })

  it('should set cursor at the start or end of the input when value is selected', async () => {
    render(<MultiInputMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-multi-input-mask__input')
    ) as HTMLInputElement[]

    // 1. Test the ArrowRight

    fireEvent.focus(first)

    expect(document.activeElement).toBe(first)
    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(2)

    await userEvent.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(first)
    expect(first.selectionStart).toBe(2)
    expect(first.selectionEnd).toBe(2)

    await userEvent.keyboard('{ArrowRight}')

    expect(document.activeElement).toBe(second)
    expect(second.selectionStart).toBe(0)
    expect(second.selectionEnd).toBe(0)

    // 2. Test the same but with the last input and backspace

    fireEvent.focus(third)

    expect(document.activeElement).toBe(third)
    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(4)

    await userEvent.keyboard('{Backspace}')

    expect(document.activeElement).toBe(third)
    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(0)

    await userEvent.keyboard('{ArrowLeft}')

    expect(document.activeElement).toBe(second)
    expect(second.selectionStart).toBe(2)
    expect(second.selectionEnd).toBe(2)
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

      const label = document.querySelector('.dnb-multi-input-mask__legend')

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
      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(2)

      await userEvent.click(second)
      expect(second.selectionStart).toBe(0)
      expect(second.selectionEnd).toBe(2)

      await userEvent.click(third)
      expect(third.selectionStart).toBe(0)
      expect(third.selectionEnd).toBe(4)
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

    expect(onFocus).toHaveBeenCalledTimes(3)

    await userEvent.click(day)

    expect(onFocus).toHaveBeenCalledTimes(4)
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

    expect(onBlur).toHaveBeenCalledTimes(3)

    await userEvent.click(document.body)

    expect(onBlur).toHaveBeenCalledTimes(4)
    expect(onBlur).toHaveBeenCalledWith({
      day: '11',
      month: '01',
      year: '2024',
    })
  })
})
