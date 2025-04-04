import React, { useCallback, useEffect, useRef } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as helpers from '../../../../shared/helpers'
import InputModeNumber from '../InputModeNumber'

let instance: InputModeNumber = null
const MockComponent = (
  props: React.InputHTMLAttributes<HTMLInputElement>
) => {
  const elementRef = useRef()

  useEffect(() => {
    instance = new InputModeNumber()
    instance.setElement(elementRef.current)

    return () => {
      instance.remove()
    }
  }, [])
  const onChange = useCallback(() => null, [])

  return (
    <>
      <label htmlFor="my-field">Label</label>
      <input
        id="my-field"
        ref={elementRef}
        onChange={onChange}
        {...props}
      />
    </>
  )
}

describe('InputModeNumber', () => {
  describe('on iOS', () => {
    beforeEach(() => {
      Object.defineProperty(helpers, 'IS_IOS', {
        value: true,
      })
    })
    afterEach(() => {
      Object.defineProperty(helpers, 'IS_IOS', {
        value: false,
      })
    })

    it('should not set inputmode on iOS', () => {
      render(<MockComponent />)

      expect(
        document.querySelector('input').hasAttribute('inputmode')
      ).toBeFalsy()
    })

    it('should set custom inputMode', () => {
      const onKeyDown = jest.fn()

      render(<MockComponent onKeyDown={onKeyDown} inputMode="tel" />)

      expect(document.querySelector('input')).toHaveAttribute(
        'inputmode',
        'tel'
      )
    })

    it('should keep value when mouseEnter is called', async () => {
      render(<MockComponent type="text" />)

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement.value).toBe('')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')
      expect(inputElement.value).toBe('')

      fireEvent.focus(inputElement)
      await userEvent.type(inputElement, '1234')

      expect(inputElement.value).toBe('1234')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement).toHaveAttribute('type', 'text')

      await userEvent.type(inputElement, '{Backspace>2}')
      fireEvent.blur(inputElement)
      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')
      expect(inputElement.value).toBe('12')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })
    })

    it('should not change type when focus is called', async () => {
      render(<MockComponent type="text" />)

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveAttribute('type', 'text')

      fireEvent.focus(inputElement)
      await userEvent.type(inputElement, '1234')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement).toHaveAttribute('type', 'text')
    })

    it('should change type from text to number for a fraction of time when mouseEnter is called', async () => {
      render(<MockComponent type="text" />)

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveAttribute('type', 'text')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })
    })

    it('should change type from text to number for a fraction of time after blur and mouseEnter', async () => {
      render(<MockComponent type="text" />)

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveAttribute('type', 'text')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      await userEvent.type(inputElement, '{Backspace>7}')
      fireEvent.blur(inputElement)
      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })
    })

    it('should keep size when mouseEnter is called', async () => {
      render(<MockComponent type="text" value="12" size={2} />)

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement.size).toBe(2)

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')
      expect(inputElement.size).toBe(2)

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement.size).toBe(2)
    })

    it('should keep style when mouseEnter is called', async () => {
      render(
        <MockComponent type="text" value="12" style={{ width: '2rem' }} />
      )

      const inputElement = document.querySelector('input')
      jest.spyOn(inputElement, 'offsetWidth', 'get').mockReturnValue(100)

      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement).toHaveStyle({ width: '2rem' })

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')
      expect(inputElement).toHaveStyle({ width: '100px' })

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement).toHaveStyle({ width: '2rem' })
    })

    it('should add "dnb-input-masked--hide-controls" class when mouseEnter is called', async () => {
      render(
        <MockComponent type="text" value="12" style={{ width: '2rem' }} />
      )

      const inputElement = document.querySelector('input')
      jest.spyOn(inputElement, 'offsetWidth', 'get').mockReturnValue(100)

      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement).not.toHaveClass(
        'dnb-input-masked--hide-controls'
      )

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')
      expect(inputElement).toHaveClass('dnb-input-masked--hide-controls')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement).not.toHaveClass(
        'dnb-input-masked--hide-controls'
      )
    })

    it('should call runCorrectCaretPosition when mouseEnter is called', async () => {
      const runCorrectCaretPosition = jest.fn()

      render(<MockComponent type="text" value="1234" />)

      const inputElement = document.querySelector('input')

      inputElement['runCorrectCaretPosition'] = runCorrectCaretPosition

      expect(inputElement).toHaveAttribute('type', 'text')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(runCorrectCaretPosition).toHaveBeenCalledTimes(1)
      expect(runCorrectCaretPosition).toHaveBeenLastCalledWith()
    })

    it('should keep selection start and end when mouseEnter is called', async () => {
      render(<MockComponent type="text" value="1234" />)

      const inputElement = document.querySelector('input')

      expect(inputElement).toHaveAttribute('type', 'text')
      expect(inputElement.selectionStart).toBe(4)
      expect(inputElement.selectionEnd).toBe(4)

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')
      expect(inputElement.selectionStart).toBe(null)
      expect(inputElement.selectionEnd).toBe(null)

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement.selectionStart).toBe(4)
      expect(inputElement.selectionEnd).toBe(4)
    })

    it('should set type of number on label press', async () => {
      render(<MockComponent value={1234} />)

      const inputElement = document.querySelector('input')
      const labelElement = document.querySelector('label')

      fireEvent.mouseDown(labelElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })

      expect(inputElement).toHaveAttribute('type', 'text')

      await userEvent.type(inputElement, '{Backspace>4}')
      fireEvent.blur(inputElement)

      fireEvent.mouseDown(labelElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      await waitFor(() => {
        expect(inputElement).toHaveAttribute('type', 'text')
      })
    })

    it('should not set type of number on focus when device is not iOS', () => {
      Object.defineProperty(helpers, 'IS_IOS', {
        value: false,
      })

      render(<MockComponent value={1234} />)

      const inputElement = document.querySelector('input')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).not.toHaveAttribute('type')
    })

    it('should call reset on unmount', async () => {
      const { unmount } = render(<MockComponent value={1234} />)

      const inputElement = document.querySelector('input')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      unmount()

      expect(inputElement).toHaveAttribute('type', 'text')
    })

    it('should call reset when remove is called', async () => {
      render(<MockComponent value={1234} />)

      const inputElement = document.querySelector('input')

      fireEvent.mouseEnter(inputElement)

      expect(inputElement).toHaveAttribute('type', 'number')

      instance.remove()

      expect(inputElement).toHaveAttribute('type', 'text')
    })
  })
})
