import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Toggle, { Props } from '../Toggle'

describe('Field.Toggle', () => {
  it('should render with props', () => {
    const props: Props = { valueOn: 'checked', valueOff: 'unchecked' }
    render(<Toggle {...props} />)
  })

  it('should support disabled prop', () => {
    const { rerender } = render(
      <Toggle
        valueOn="checked"
        valueOff="unchecked"
        label="Disabled label"
        disabled
      />
    )

    const labelElement = () => document.querySelector('label')

    expect(labelElement()).toHaveAttribute('disabled')

    rerender(
      <Toggle
        valueOn="checked"
        valueOff="unchecked"
        label="Disabled label"
      />
    )

    expect(labelElement()).not.toHaveAttribute('disabled')
  })

  describe('variants', () => {
    describe('button', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Toggle
            valueOn="on"
            valueOff="off"
            variant="button"
            value="on"
            onChange={onChange}
          />
        )

        const element = document.querySelector(
          '.dnb-toggle-button__button'
        )

        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('aria-pressed', 'true')

        fireEvent.click(element)

        expect(element).toHaveAttribute('aria-pressed', 'false')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith('off')

        fireEvent.click(element)

        expect(element).toHaveAttribute('aria-pressed', 'true')
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on')
      })
    })

    describe('buttons', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            value="on"
            onChange={onChange}
          />
        )

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(
            document.querySelectorAll('.dnb-toggle-button__button')
          )

        expect(yesElement).toHaveAttribute('aria-pressed', 'true')
        expect(noElement).toHaveAttribute('aria-pressed', 'false')

        fireEvent.click(noElement)

        expect(yesElement).toHaveAttribute('aria-pressed', 'false')
        expect(noElement).toHaveAttribute('aria-pressed', 'true')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith('off')

        fireEvent.click(yesElement)

        expect(yesElement).toHaveAttribute('aria-pressed', 'true')
        expect(noElement).toHaveAttribute('aria-pressed', 'false')
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on')
      })
    })

    describe('checkbox-button', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox-button"
            value="on"
            onChange={onChange}
          />
        )

        const element = document.querySelector(
          '.dnb-toggle-button__button .dnb-checkbox__input'
        )

        expect(element).toBeInTheDocument()
        expect(element).toHaveAttribute('data-checked', 'true')

        fireEvent.click(element)

        expect(element).toHaveAttribute('data-checked', 'false')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith('off')

        fireEvent.click(element)

        expect(element).toHaveAttribute('data-checked', 'true')
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on')
      })
    })

    describe('checkbox', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            value="on"
            onChange={onChange}
          />
        )

        const element = document.querySelector('.dnb-checkbox__input')

        expect(element).toBeInTheDocument()
        expect(element).toBeChecked()

        fireEvent.click(element)

        expect(element).not.toBeChecked()
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith('off')

        fireEvent.click(element)

        expect(element).toBeChecked()
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on')
      })
    })
  })
})
