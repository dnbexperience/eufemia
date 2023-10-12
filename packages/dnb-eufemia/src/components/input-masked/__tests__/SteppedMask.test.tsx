/**
 * InputMasked Test
 *
 */

import React from 'react'

import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SteppedMask, { SteppedMaskProps } from '../SteppedMask'

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
      placeholderCharacter: 'å',
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
    expect(first.nextElementSibling.id).toBe('day__label')
    expect(first.nextElementSibling.tagName).toBe('LABEL')

    expect(second.nextElementSibling).toHaveTextContent('the month')
    expect(second.nextElementSibling.id).toBe('month__label')
    expect(second.nextElementSibling.tagName).toBe('LABEL')

    expect(third.nextElementSibling).toHaveTextContent('the year')
    expect(third.nextElementSibling.id).toBe('year__label')
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
