/**
 * InputMasked Test
 *
 */

import React from 'react'

import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SteppedMask, {
  SteppedMaskInput,
  SteppedMaskProps,
} from '../SteppedMask'

const defaultProps: SteppedMaskProps<'day' | 'month' | 'year'> = {
  steps: [
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

describe('SteppedInput', () => {
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

    render(<SteppedMask {...defaultProps} onChange={onChange} />)

    const firstInput = document.querySelectorAll(
      '.dnb-stepped-mask__input'
    )[0] as HTMLInputElement

    act(() => {
      firstInput.focus()
    })

    await userEvent.keyboard('08122023')

    expect(onChange).toBeCalledTimes(8)
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

  it('render inputs based on steps prop', () => {
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    expect(first.id).toBe('day__input')
    expect(first.tagName).toBe('INPUT')

    expect(second.id).toBe('month__input')
    expect(second.tagName).toBe('INPUT')

    expect(third.id).toBe('year__input')
    expect(third.tagName).toBe('INPUT')
  })

  it('should apply labels to input steps', () => {
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    expect(first.nextElementSibling).toHaveTextContent('the day')
    expect(first.labels[0].id).toBe('day__label')
    expect(first.nextElementSibling.tagName).toBe('LABEL')

    expect(second.nextElementSibling).toHaveTextContent('the month')
    expect(second.labels[0].id).toBe('month__label')
    expect(second.nextElementSibling.tagName).toBe('LABEL')

    expect(third.nextElementSibling).toHaveTextContent('the year')
    expect(third.labels[0].id).toBe('year__label')
    expect(third.nextElementSibling.tagName).toBe('LABEL')
  })

  it('should show legend based on label prop', () => {
    const { rerender } = render(
      <SteppedMask {...defaultProps} label="My awesome label" />
    )

    const label = document.querySelector('.dnb-stepped-mask__legend')

    expect(label).toHaveTextContent('My awesome label')

    rerender(<SteppedMask {...defaultProps} label="New label" />)

    expect(label).toHaveTextContent('New label')
  })

  it('onChange should have object params based on step ids', async () => {
    const onChange = jest.fn()

    render(<SteppedMask {...defaultProps} onChange={onChange} />)

    const [first] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    act(() => {
      first.focus()
    })

    await userEvent.keyboard('11223333')

    expect(onChange).toBeCalledTimes(8)
    expect(Object.keys(onChange.mock.calls[7][0])).toEqual([
      'day',
      'month',
      'year',
    ])
  })

  it('step id, value and onChange param properties should all match', async () => {
    const onChange = jest.fn()

    const steps: SteppedMaskInput<'first' | 'second' | 'third'>[] = [
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
      <SteppedMask steps={steps} values={values} onChange={onChange} />
    )

    const [first] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    act(() => {
      first.focus()
      first.setSelectionRange(0, 0)
    })

    await userEvent.keyboard('fst')

    expect(onChange).toBeCalledTimes(3)

    const onChangeParamKeys = Object.keys(onChange.mock.calls[2][0])
    const valueKeys = Object.keys(values)

    expect(onChangeParamKeys[0]).toEqual(valueKeys[0])
    expect(onChangeParamKeys[0]).toEqual(steps[0].id)

    expect(onChangeParamKeys[1]).toEqual(valueKeys[1])
    expect(onChangeParamKeys[1]).toEqual(steps[1].id)

    expect(onChangeParamKeys[2]).toEqual(valueKeys[2])
    expect(onChangeParamKeys[2]).toEqual(steps[2].id)
  })

  it('should show placeholder character', () => {
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
      // _valueTracker is whats controlling the placeholder, no idea where this property comes form though, can't find it when searching for it
    ) as (HTMLInputElement & { _valueTracker: Record<string, any> })[]

    expect(first?._valueTracker.getValue()).toBe('dd')
    expect(second?._valueTracker.getValue()).toBe('mm')
    expect(third?._valueTracker.getValue()).toBe('yyyy')
  })

  // it('inputs should only allow values defined by mask', async () => {
  //   const steps = [
  //     {
  //       id: 'numbers',
  //       label: 'just numbers',
  //       placeholderCharacter: 'n',
  //       mask: [/[0-9]/, /[0-9]/],
  //     },
  //     {
  //       id: 'letters',
  //       label: 'just letters',
  //       placeholderCharacter: 'l',
  //       mask: [/[a-zA-Z]/, /[a-zA-Z]/],
  //     },
  //     {
  //       id: 'mix',
  //       label: 'numbers and letters',
  //       placeholderCharacter: 'm',
  //       mask: [/[0-9]/, /[0-9]/, /[a-zA-Z]/, /[a-zA-Z]/],
  //     },
  //   ]

  //   render(<SteppedMask steps={steps} />)

  //   const [first, second, third] = Array.from(
  //     document.querySelectorAll('.dnb-stepped-mask__input')
  //   ) as HTMLInputElement[]

  //   act(() => {
  //     first.focus()
  //     first.setSelectionRange(0, 0)
  //   })

  //   expect(first.selectionStart).toBe(0)
  //   expect(first.selectionEnd).toBe(0)
  //   expect(document.activeElement).toBe(first)

  //   await userEvent.keyboard('1a')

  //   expect(first.selectionStart).toBe(1)
  //   expect(first.selectionEnd).toBe(1)
  //   expect(document.activeElement).toBe(first)

  //   await userEvent.keyboard('bc')

  //   expect(first.selectionStart).toBe(1)
  //   expect(first.selectionEnd).toBe(1)
  //   expect(document.activeElement).toBe(first)

  //   await userEvent.keyboard('2a')

  //   expect(second.selectionStart).toBe(1)
  //   expect(second.selectionEnd).toBe(1)
  //   expect(document.activeElement).toBe(second)
  // })

  it('inputs size should match mask length', () => {
    const steps: SteppedMaskInput<string>[] = [
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

    render(<SteppedMask steps={steps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    expect(first.size).toBe(2)
    expect(second.size).toBe(4)
    expect(third.size).toBe(6)
  })

  it('should display delimiter when given', () => {
    const { rerender } = render(
      <SteppedMask {...defaultProps} delimiter="/" />
    )

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    expect(first.labels[0].nextElementSibling).toHaveTextContent('/')
    expect(second.labels[0].nextElementSibling).toHaveTextContent('/')
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()

    rerender(<SteppedMask {...defaultProps} delimiter="-" />)

    expect(first.labels[0].nextElementSibling).toHaveTextContent('-')
    expect(second.labels[0].nextElementSibling).toHaveTextContent('-')
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()

    rerender(<SteppedMask {...defaultProps} delimiter="." />)

    expect(first.labels[0].nextElementSibling).toHaveTextContent('.')
    expect(second.labels[0].nextElementSibling).toHaveTextContent('.')
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()

    rerender(<SteppedMask {...defaultProps} />)

    expect(first.labels[0].nextElementSibling).toBe(second)
    expect(second.labels[0].nextElementSibling).toBe(third)
    expect(third.labels[0].nextElementSibling).not.toBeInTheDocument()
  })

  it('should show error state', () => {
    render(
      <SteppedMask {...defaultProps} status="error" statusState="error" />
    )

    const errorInput = document.querySelector('.dnb-input__status--error')

    expect(errorInput).toBeInTheDocument()
  })

  it('should be disabled based on prop', () => {
    render(<SteppedMask {...defaultProps} label="disabled" disabled />)

    const inputWrapper = document.querySelector('.dnb-stepped-mask')
    const label = document.querySelector('.dnb-stepped-mask__legend')

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    expect(inputWrapper.getAttribute('data-input-state')).toBe('disabled')
    expect(label.getAttribute('aria-disabled')).toBe('true')

    expect(first.disabled).toBe(true)
    expect(second.disabled).toBe(true)
    expect(third.disabled).toBe(true)
  })

  it('should support spacing props', () => {
    render(<SteppedMask {...defaultProps} top="2rem" />)

    const fieldset = document.querySelector('.dnb-stepped-mask__fieldset')

    expect(fieldset.classList).toContain('dnb-space__top--large')
  })

  it('should change caret position when one input is filled out', async () => {
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    act(() => {
      first.focus()
      first.setSelectionRange(0, 0)
    })

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
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    act(() => {
      first.focus()
    })

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
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    act(() => {
      first.focus()
      first.setSelectionRange(0, 0)
    })

    expect(first.selectionStart).toBe(0)
    expect(first.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')

    expect(second.selectionStart).toBe(0)
    expect(second.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{ArrowRight}{ArrowRight}{ArrowRight}')

    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('{ArrowLeft}')

    expect(second.selectionStart).toBe(2)
    expect(second.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}{ArrowLeft}')

    expect(first.selectionStart).toBe(2)
    expect(first.selectionEnd).toBe(2)
    expect(document.activeElement).toBe(first)

    await userEvent.keyboard(
      '{ArrowRight}{ArrowRight}{ArrowRight}{ArrowRight}'
    )

    expect(third.selectionStart).toBe(0)
    expect(third.selectionEnd).toBe(0)
    expect(document.activeElement).toBe(third)
  })

  it('should be able to tab between inputs', async () => {
    render(<SteppedMask {...defaultProps} />)

    const [first, second, third] = Array.from(
      document.querySelectorAll('.dnb-stepped-mask__input')
    ) as HTMLInputElement[]

    act(() => {
      first.focus()
    })

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
      render(<SteppedMask {...defaultProps} label="label" />)

      const label = document.querySelector('.dnb-stepped-mask__legend')

      const [first] = Array.from(
        document.querySelectorAll('.dnb-stepped-mask__input')
      ) as HTMLInputElement[]

      await userEvent.click(label)

      expect(first.selectionStart).toBe(0)
      expect(first.selectionEnd).toBe(0)
      expect(document.activeElement).toBe(first)
    })

    it('should select whole input value on click', async () => {
      render(<SteppedMask {...defaultProps} />)

      const [first, second, third] = Array.from(
        document.querySelectorAll('.dnb-stepped-mask__input')
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
})
