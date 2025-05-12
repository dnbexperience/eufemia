import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen } from '@testing-library/react'
import DataContext from '../../../DataContext/Context'
import { Props } from '../Toggle'
import { Field, FieldBlock, Form, Iterate } from '../../..'
import userEvent from '@testing-library/user-event'

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
      it('should support size', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="button"
            label="Toggle label"
            size="large"
          />
        )

        const fieldToggleElement: HTMLInputElement =
          document.querySelector('.dnb-forms-field-toggle')
        expect(fieldToggleElement.classList).toContain(
          'dnb-forms-field-block--label-height-large'
        )

        const buttonElement: HTMLInputElement = document.querySelector(
          '.dnb-toggle-button__button'
        )
        expect(buttonElement.classList).toContain('dnb-button--size-large')
      })

      it('renders label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="button"
            label="Toggle label"
          />
        )
        expect(screen.getByText('Toggle label')).toBeInTheDocument()
      })

      it('renders help', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="button"
            help={{ title: 'Help title', content: 'Help content' }}
          />
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-toggle-button__button')
        ).toHaveAttribute('aria-describedby')
        expect(
          document
            .querySelector('.dnb-toggle-button__button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-help-button').id)
        expect(
          document
            .querySelector('.dnb-help-button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-tooltip__content').id)
      })

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
        expect(element).toHaveAttribute('aria-checked', 'true')

        fireEvent.click(element)

        expect(element).toHaveAttribute('aria-checked', 'false')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith('off', expect.anything())

        fireEvent.click(element)

        expect(element).toHaveAttribute('aria-checked', 'true')
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on', expect.anything())
      })

      it('should store "displayValue" in data context', async () => {
        let dataContext = null

        render(
          <Form.Handler>
            <Field.Toggle
              path="/mySelection"
              valueOn="on"
              valueOff="off"
              textOn="On!"
              textOff="Off!"
              variant="button"
              defaultValue="on"
            />
            <DataContext.Consumer>
              {(context) => {
                dataContext = context
                return null
              }}
            </DataContext.Consumer>
          </Form.Handler>
        )

        expect(dataContext.fieldDisplayValueRef.current).toEqual({
          '/mySelection': {
            type: 'field',
            value: 'On!',
          },
        })

        await userEvent.tab()
        await userEvent.keyboard('{Enter}')

        expect(dataContext.fieldDisplayValueRef.current).toEqual({
          '/mySelection': {
            type: 'field',
            value: 'Off!',
          },
        })
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

          expect(await axeComponent(result)).toHaveNoViolations()
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
      it('should support size', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            label="Toggle label"
            size="large"
          />
        )

        const fieldToggleElement: HTMLInputElement =
          document.querySelector('.dnb-forms-field-toggle')
        expect(fieldToggleElement.classList).toContain(
          'dnb-forms-field-block--label-height-large'
        )

        const buttonElementOne: Element = document.querySelectorAll(
          '.dnb-toggle-button__button'
        )[1]
        expect(buttonElementOne.classList).toContain(
          'dnb-button--size-large'
        )

        const buttonElementTwo: Element = document.querySelectorAll(
          '.dnb-toggle-button__button'
        )[0]
        expect(buttonElementTwo.classList).toContain(
          'dnb-button--size-large'
        )
      })

      it('renders label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            label="Toggle label"
          />
        )
        expect(screen.getByText('Toggle label')).toBeInTheDocument()
      })

      it('renders help', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            help={{ title: 'Help title', content: 'Help content' }}
          />
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-toggle-button__button')
        ).toHaveAttribute('aria-describedby')
        expect(
          document
            .querySelector('.dnb-help-button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-tooltip__content').id)
      })

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

        expect(yesElement).toHaveAttribute('aria-checked', 'true')
        expect(noElement).toHaveAttribute('aria-checked', 'false')

        fireEvent.click(noElement)

        expect(yesElement).toHaveAttribute('aria-checked', 'false')
        expect(noElement).toHaveAttribute('aria-checked', 'true')
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenLastCalledWith('off', expect.anything())

        fireEvent.click(yesElement)

        expect(yesElement).toHaveAttribute('aria-checked', 'true')
        expect(noElement).toHaveAttribute('aria-checked', 'false')
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on', expect.anything())
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

        expect(yesElement).toHaveAttribute('aria-checked', 'true')
        expect(noElement).toHaveAttribute('aria-checked', 'false')

        rerender(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            value={undefined}
          />
        )

        expect(yesElement).toHaveAttribute('aria-checked', 'false')
        expect(noElement).toHaveAttribute('aria-checked', 'false')
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

          expect(await axeComponent(result)).toHaveNoViolations()
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
      it('should support size', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox-button"
            label="Toggle label"
            size="large"
          />
        )

        const fieldToggleElement: HTMLInputElement =
          document.querySelector('.dnb-forms-field-toggle')
        expect(fieldToggleElement.classList).toContain(
          'dnb-forms-field-block--label-height-large'
        )

        const checkboxButtonElement: HTMLInputElement =
          document.querySelector('.dnb-toggle-button__button')
        expect(checkboxButtonElement.classList).toContain(
          'dnb-button--size-large'
        )
      })

      it('renders label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox-button"
            label="Toggle label"
          />
        )
        expect(screen.getByText('Toggle label')).toBeInTheDocument()
      })

      it('renders help', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox-button"
            help={{ title: 'Help title', content: 'Help content' }}
          />
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-toggle-button__button')
        ).toHaveAttribute('aria-describedby')
        expect(
          document
            .querySelector('.dnb-toggle-button__button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-help-button').id)
        expect(
          document
            .querySelector('.dnb-help-button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-tooltip__content').id)
      })

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
        expect(onChange).toHaveBeenLastCalledWith('off', expect.anything())

        fireEvent.click(element)

        expect(element).toHaveAttribute('data-checked', 'true')
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on', expect.anything())
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

          expect(await axeComponent(result)).toHaveNoViolations()
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
      it('should support size', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            label="Toggle label"
            size="large"
          />
        )

        const fieldToggleElement: HTMLInputElement =
          document.querySelector('.dnb-forms-field-toggle')
        expect(fieldToggleElement.classList).toContain(
          'dnb-forms-field-block--label-height-large'
        )

        const checkboxElement: HTMLInputElement =
          document.querySelector('.dnb-checkbox')
        expect(checkboxElement.classList).toContain('dnb-checkbox--large')
      })

      it('renders label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            label="Toggle label"
          />
        )
        expect(screen.getByLabelText('Toggle label')).toBeInTheDocument()
      })

      it('should set correct class when labelSrOnly is true', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            label="Toggle label"
            labelSrOnly
          />
        )

        const element = document.querySelector('.dnb-form-label')

        expect(element).toHaveTextContent('Toggle label')
        expect(element).toHaveClass('dnb-sr-only')
        expect(element).not.toHaveClass('dnb-form-label--interactive')
      })

      it('renders help', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            help={{ title: 'Help title', content: 'Help content' }}
          />
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        expect(document.querySelector('input')).toHaveAttribute(
          'aria-describedby'
        )
        expect(
          document.querySelector('input').getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-help-button').id)
        expect(
          document
            .querySelector('.dnb-help-button')
            .getAttribute('aria-describedby')
        ).toBe(document.querySelector('.dnb-tooltip__content').id)
      })

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
        expect(onChange).toHaveBeenLastCalledWith('off', expect.anything())

        fireEvent.click(element)

        expect(element).toBeChecked()
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(onChange).toHaveBeenLastCalledWith('on', expect.anything())
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

      it('should should support {itemNo} in label', async () => {
        render(
          <Iterate.Array value={['foo', 'bar']}>
            <Field.Toggle
              label="Label {itemNo}"
              valueOn="on"
              valueOff="off"
              variant="checkbox"
            />
          </Iterate.Array>
        )

        expect(screen.getByText('Label 1')).toBeInTheDocument()
        expect(screen.getByText('Label 2')).toBeInTheDocument()
      })
    })
  })
})
