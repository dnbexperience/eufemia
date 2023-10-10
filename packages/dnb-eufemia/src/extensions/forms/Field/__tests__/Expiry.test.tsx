import React from 'react'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Field from '../'
import { ExpiryValue } from '../Expiry'

const initialValue: ExpiryValue = { month: '', year: '' }

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

  it('should return month and year value when input is fully filled out', async () => {
    const onChange = jest.fn()

    render(<Field.Expiry value={initialValue} onChange={onChange} />)

    const input = document.querySelector('input')

    act(() => {
      input.focus()
    })

    await userEvent.keyboard('1235')

    expect(onChange).toBeCalledTimes(2)
    expect(onChange.mock.calls[0][0]).toEqual({
      month: '',
      year: '',
    })
    expect(onChange.mock.calls[1][0]).toEqual({
      month: '12',
      year: '35',
    })
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
      render(<Field.Expiry value={initialValue} />)

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
      render(<Field.Expiry value={initialValue} />)

      const monthInput = document.querySelectorAll('input')[0]
      const yearInput = document.querySelectorAll('input')[1]

      await userEvent.type(monthInput, '12')

      expect(yearInput.selectionStart).toBe(0)
      expect(yearInput.selectionEnd).toBe(0)
      expect(document.activeElement).toBe(yearInput)
    })

    it('should change cursor position to year after backspace through year', async () => {
      render(<Field.Expiry value={initialValue} />)

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
      render(<Field.Expiry value={initialValue} />)

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
      render(<Field.Expiry value={initialValue} />)

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
      render(<Field.Expiry value={initialValue} />)

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
})
