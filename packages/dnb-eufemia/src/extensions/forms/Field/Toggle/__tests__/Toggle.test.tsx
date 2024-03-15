import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import { Props } from '../Toggle'
import { Field, FieldBlock } from '../../..'

describe('Field.Toggle', () => {
  it('should render with props', () => {
    const props: Props = { valueOn: 'checked', valueOff: 'unchecked' }
    render(<Field.Toggle {...props} />)
    expect(document.querySelector('input')).toBeInTheDocument()
  })

  it('should support disabled prop', () => {
    const { rerender } = render(
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        label="Disabled label"
        disabled
      />
    )

    const labelElement = () => document.querySelector('label')

    expect(labelElement()).toHaveAttribute('disabled')

    rerender(
      <Field.Toggle
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
          <Field.Toggle
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

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="button"
              required
              validateInitially
            />
          )

          expect(
            await axeComponent(result, {
              rules: {
                // Because of aria-required is not allowed on buttons – but VO still reads it
                'aria-allowed-attr': { enabled: false },
              },
            })
          ).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="button"
              required
            />
          )

          const button = document.querySelector('button')
          expect(button).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="button"
              required
              validateInitially
            />
          )

          const button = document.querySelector('button')
          expect(button).toHaveAttribute('aria-invalid', 'true')
        })
      })

      it('renders error', () => {
        const errorMessage = new Error('Error message')

        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            value="on"
            error={errorMessage}
          />
        )

        const element = document.querySelector('.dnb-form-status')
        expect(element).toHaveTextContent('Error message')

        const input = document.querySelector('.dnb-toggle-button')
        expect(input).toHaveClass('dnb-toggle-button__status--error')
      })

      it('shows error style in FieldBlock', () => {
        const errorMessage = new Error('Error message')

        render(
          <FieldBlock>
            <Field.Toggle
              valueOn="on"
              valueOff="off"
              variant="buttons"
              value="on"
              error={errorMessage}
            />
          </FieldBlock>
        )

        const input = document.querySelector('.dnb-toggle-button')
        expect(input).toHaveClass('dnb-toggle-button__status--error')
      })
    })

    describe('buttons', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Field.Toggle
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

      it('should reset both buttons when value is "undefined"', () => {
        const { rerender } = render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            value="on"
          />
        )

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(
            document.querySelectorAll('.dnb-toggle-button__button')
          )

        expect(yesElement).toHaveAttribute('aria-pressed', 'true')
        expect(noElement).toHaveAttribute('aria-pressed', 'false')

        rerender(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            value={undefined}
          />
        )

        expect(yesElement).toHaveAttribute('aria-pressed', 'false')
        expect(noElement).toHaveAttribute('aria-pressed', 'false')
      })

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="buttons"
              required
              validateInitially
            />
          )

          expect(
            await axeComponent(result, {
              rules: {
                // Because of aria-required is not allowed on buttons – but VO still reads it
                'aria-allowed-attr': { enabled: false },
              },
            })
          ).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="buttons"
              required
            />
          )

          const [first, second] = Array.from(
            document.querySelectorAll('button')
          )
          expect(first).toHaveAttribute('aria-required', 'true')
          expect(second).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="buttons"
              required
              validateInitially
            />
          )

          const [first, second] = Array.from(
            document.querySelectorAll('button')
          )
          expect(first).toHaveAttribute('aria-invalid', 'true')
          expect(second).toHaveAttribute('aria-invalid', 'true')
        })
      })

      it('renders error', () => {
        const errorMessage = new Error('Error message')

        render(
          <Field.Toggle
            label="Label"
            valueOn="on"
            valueOff="off"
            variant="buttons"
            value="on"
            error={errorMessage}
          />
        )

        const element = document.querySelector('.dnb-form-status')
        expect(element).toHaveTextContent('Error message')

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(document.querySelectorAll('.dnb-toggle-button'))
        expect(yesElement).toHaveClass('dnb-toggle-button__status--error')
        expect(noElement).toHaveClass('dnb-toggle-button__status--error')
      })

      it('shows error style in FieldBlock', () => {
        const errorMessage = new Error('Error message')

        render(
          <FieldBlock>
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="buttons"
              value="on"
              error={errorMessage}
            />
          </FieldBlock>
        )

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(document.querySelectorAll('.dnb-toggle-button'))
        expect(yesElement).toHaveClass('dnb-toggle-button__status--error')
        expect(noElement).toHaveClass('dnb-toggle-button__status--error')
      })
    })

    describe('checkbox-button', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Field.Toggle
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

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox-button"
              required
              validateInitially
            />
          )

          expect(
            await axeComponent(result, {
              rules: {
                // Because of aria-required is not allowed on buttons – but VO still reads it
                'aria-allowed-attr': { enabled: false },
              },
            })
          ).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox-button"
              required
            />
          )

          const button = document.querySelector('button')
          expect(button).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox-button"
              required
              validateInitially
            />
          )

          const button = document.querySelector('button')
          expect(button).toHaveAttribute('aria-invalid', 'true')
        })
      })

      it('renders error', () => {
        const errorMessage = new Error('Error message')

        render(
          <Field.Toggle
            label="Label"
            valueOn="on"
            valueOff="off"
            variant="checkbox-button"
            value="on"
            error={errorMessage}
          />
        )

        const element = document.querySelector('.dnb-form-status')
        expect(element).toHaveTextContent('Error message')

        const input = document.querySelector('.dnb-toggle-button')
        expect(input).toHaveClass('dnb-toggle-button__status--error')
      })

      it('shows error style in FieldBlock', () => {
        const errorMessage = new Error('Error message')

        render(
          <FieldBlock>
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox-button"
              value="on"
              error={errorMessage}
            />
          </FieldBlock>
        )

        const input = document.querySelector('.dnb-toggle-button')
        expect(input).toHaveClass('dnb-toggle-button__status--error')
      })
    })

    describe('checkbox', () => {
      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Field.Toggle
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

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox"
              required
              validateInitially
            />
          )

          expect(await axeComponent(result)).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox"
              required
            />
          )

          const input = document.querySelector('input')
          expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox"
              required
              validateInitially
            />
          )

          const input = document.querySelector('input')
          expect(input).toHaveAttribute('aria-invalid', 'true')
        })
      })

      it('renders error', () => {
        const errorMessage = new Error('Error message')

        render(
          <Field.Toggle
            label="Label"
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            value="on"
            error={errorMessage}
          />
        )

        const element = document.querySelector('.dnb-form-status')
        expect(element).toHaveTextContent('Error message')

        const input = document.querySelector('.dnb-checkbox')
        expect(input).toHaveClass('dnb-checkbox__status--error')
      })

      it('shows error style in FieldBlock', () => {
        const errorMessage = new Error('Error message')

        render(
          <FieldBlock>
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="checkbox"
              value="on"
              error={errorMessage}
            />
          </FieldBlock>
        )

        const input = document.querySelector('.dnb-checkbox')
        expect(input).toHaveClass('dnb-checkbox__status--error')
      })

      it('should have aria-required', () => {
        render(
          <Field.Toggle
            label="Label"
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            required
          />
        )

        const checkbox = document.querySelector('input')
        expect(checkbox).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Toggle
            label="Label"
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            required
            validateInitially
          />
        )

        const checkbox = document.querySelector('input')
        expect(checkbox).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })
})
