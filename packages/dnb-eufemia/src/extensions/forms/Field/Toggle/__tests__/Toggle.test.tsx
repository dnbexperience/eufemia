import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    describe('switch', () => {
      it('should support size', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            label="Boolean label"
            size="large"
          />
        )

        const fieldToggleElement: HTMLInputElement =
          document.querySelector('.dnb-forms-field-toggle')
        expect(fieldToggleElement.classList).toContain(
          'dnb-forms-field-block--label-height-large'
        )

        const switchElement: HTMLInputElement =
          document.querySelector('.dnb-switch')
        expect(switchElement.classList).toContain('dnb-switch--large')
      })

      it('renders label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            label="Boolean label"
          />
        )
        expect(screen.getByLabelText('Boolean label')).toBeInTheDocument()
      })

      it('label should render only once', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            label="Boolean label"
          />
        )
        expect(screen.queryAllByLabelText('Boolean label')).toHaveLength(1)
        expect(screen.queryByText('Ja')).not.toBeInTheDocument()
        expect(screen.queryByText('Nei')).not.toBeInTheDocument()
      })

      it('renders help', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            help={{ title: 'Help title', content: 'Help content' }}
          />
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        const helpButton = document.querySelector(
          '.dnb-switch__suffix .dnb-help-button'
        )
        expect(helpButton).toBeInTheDocument()
        expect(document.querySelector('input')).toHaveAttribute(
          'aria-describedby'
        )
        expect(
          document.querySelector('input').getAttribute('aria-describedby')
        ).toContain(document.querySelector('.dnb-help-button').id)
      })

      it('renders error', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            error={new Error('This is what went wrong')}
          />
        )
        expect(
          screen.getByText('This is what went wrong')
        ).toBeInTheDocument()
      })

      it('shows error border', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            error={new Error('This is what went wrong')}
          />
        )
        const element = document.querySelector('.dnb-switch')
        expect(element.className).toContain('dnb-switch__status--error')
      })

      it('should toggle when clicking', async () => {
        const onChange = jest.fn()
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            value={false}
            onChange={onChange}
          />
        )
        const input = screen.getByRole('switch')
        await userEvent.click(input)
        await userEvent.click(input)
        await userEvent.click(input)
        await waitFor(() => {
          expect(onChange.mock.calls).toHaveLength(3)
          expect(onChange.mock.calls[0][0]).toEqual('on')
          expect(onChange.mock.calls[1][0]).toEqual('off')
          expect(onChange.mock.calls[2][0]).toEqual('on')
        })
      })

      it('should show error when no value is given', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            required
            validateInitially
          />
        )
        expect(screen.getByRole('alert')).toBeInTheDocument()
      })

      it('should not show error when a true-value is given', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            value={true}
            validateInitially
            required
          />
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })

      it('should not show error when a false-value is given', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="switch"
            value={false}
            validateInitially
            required
          />
        )
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
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
              variant="switch"
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

      it('should not change the state when calling preventDefault on the onClick event', async () => {
        const onClick = jest.fn((value, { preventDefault }) => {
          preventDefault()
        })

        render(
          <Field.Toggle
            label="Label {itemNo}"
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            onClick={onClick}
          />
        )

        const checkbox = document.querySelector('input')
        expect(checkbox.checked).toBe(false)

        await userEvent.click(checkbox)

        expect(checkbox.checked).toBe(false)
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick).toHaveBeenLastCalledWith(
          'off',
          expect.objectContaining({
            checked: false,
          })
        )

        await userEvent.click(checkbox)

        expect(checkbox.checked).toBe(false)
        expect(onClick).toHaveBeenCalledTimes(2)
        expect(onClick).toHaveBeenLastCalledWith(
          'off',
          expect.objectContaining({
            checked: false,
          })
        )
      })

      it('should not change the state when calling preventDefault on the onClick event when default value is true', async () => {
        const onClick = jest.fn((value, { preventDefault }) => {
          preventDefault()
        })

        render(
          <Field.Toggle
            label="Label {itemNo}"
            value="on"
            valueOn="on"
            valueOff="off"
            variant="switch"
            onClick={onClick}
          />
        )

        const switchElem = document.querySelector('input')
        expect(switchElem.checked).toBe(true)

        await userEvent.click(switchElem)

        expect(switchElem.checked).toBe(true)
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick).toHaveBeenLastCalledWith(
          'on',
          expect.objectContaining({
            checked: true,
          })
        )

        await userEvent.click(switchElem)

        expect(switchElem.checked).toBe(true)
        expect(onClick).toHaveBeenCalledTimes(2)
        expect(onClick).toHaveBeenLastCalledWith(
          'on',
          expect.objectContaining({
            checked: true,
          })
        )
      })

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Toggle
              valueOn="on"
              valueOff="off"
              label="Label"
              variant="switch"
              validateInitially
              required
            />
          )

          expect(await axeComponent(result)).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Toggle
              valueOn="on"
              valueOff="off"
              label="Label"
              variant="switch"
              required
            />
          )

          const input = document.querySelector('input')
          expect(input).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Toggle
              valueOn="on"
              valueOff="off"
              label="Label"
              variant="switch"
              validateInitially
              required
            />
          )

          const input = document.querySelector('input')
          expect(input).toHaveAttribute('aria-invalid', 'true')
        })
      })
    })

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

      it('should have aria-labelledby and role="radiogroup" on fieldset when label is given', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            label="Legend"
          />
        )

        const fieldset = document.querySelector('fieldset')
        const legend = document.querySelector('legend')

        expect(fieldset).toHaveAttribute('aria-labelledby', legend.id)
        expect(fieldset).toHaveAttribute('role', 'radiogroup')
        expect(legend).toHaveAttribute('id')
      })

      it('should not have fieldset when no label is given', () => {
        render(
          <Field.Toggle valueOn="on" valueOff="off" variant="buttons" />
        )

        const fieldset = document.querySelector('fieldset')
        expect(fieldset).not.toBeInTheDocument()

        // Toggle buttons don't have individual labels
        expect(document.querySelectorAll('label')).toHaveLength(0)
      })

      it('should have correct aria-labelledby when fieldset is created by label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            label="Test Label"
          />
        )

        const fieldset = document.querySelector('fieldset')
        const legend = document.querySelector('legend')

        expect(fieldset).toHaveAttribute('aria-labelledby', legend.id)
        expect(legend).toHaveTextContent('Test Label')
      })

      it('should validate with ARIA rules when using fieldset', async () => {
        const Comp = render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="buttons"
            label="Legend"
          />
        )
        expect(await axeComponent(Comp)).toHaveNoViolations()
      })

      it('should validate with ARIA rules when not using fieldset', async () => {
        const Comp = render(
          <Field.Toggle valueOn="on" valueOff="off" variant="buttons" />
        )
        expect(await axeComponent(Comp)).toHaveNoViolations()
      })
    })

    describe('radio', () => {
      it('should support size', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="radio"
            label="Toggle label"
            size="large"
          />
        )

        const fieldToggleElement: HTMLInputElement =
          document.querySelector('.dnb-forms-field-toggle')
        expect(fieldToggleElement.classList).toContain(
          'dnb-forms-field-block--label-height-large'
        )

        const radioElementOne: Element =
          document.querySelectorAll('.dnb-radio')[1]
        expect(radioElementOne.classList).toContain('dnb-radio--large')

        const radioElementTwo: Element =
          document.querySelectorAll('.dnb-radio')[0]
        expect(radioElementTwo.classList).toContain('dnb-radio--large')
      })

      it('renders label', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="radio"
            label="Radio label"
          />
        )
        expect(screen.getByText('Radio label')).toBeInTheDocument()
      })

      it('renders help', () => {
        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="radio"
            help={{ title: 'Help title', content: 'Help content' }}
          />
        )
        expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-radio__input')
        ).toHaveAttribute('aria-describedby')
      })

      it('should render correct HTML', () => {
        const onChange = jest.fn()

        render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="radio"
            value="on"
            onChange={onChange}
          />
        )

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(document.querySelectorAll('.dnb-radio__input'))

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

      it('should reset both radio when value is "undefined"', () => {
        const { rerender } = render(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="radio"
            value="on"
          />
        )

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(document.querySelectorAll('.dnb-radio__input'))

        expect(yesElement).toHaveAttribute('aria-checked', 'true')
        expect(noElement).toHaveAttribute('aria-checked', 'false')

        rerender(
          <Field.Toggle
            valueOn="on"
            valueOff="off"
            variant="radio"
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
              variant="radio"
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
              variant="radio"
              required
            />
          )

          const [first, second] = Array.from(
            document.querySelectorAll('.dnb-radio__input')
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
              variant="radio"
              required
              validateInitially
            />
          )

          const [first, second] = Array.from(
            document.querySelectorAll('.dnb-radio__input')
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
            variant="radio"
            value="on"
            error={errorMessage}
          />
        )

        const element = document.querySelector('.dnb-form-status')
        expect(element).toHaveTextContent('Error message')

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(document.querySelectorAll('.dnb-radio'))
        expect(yesElement).toHaveClass('dnb-radio__status--error')
        expect(noElement).toHaveClass('dnb-radio__status--error')
      })

      it('shows error style in FieldBlock', () => {
        const errorMessage = new Error('Error message')

        render(
          <FieldBlock>
            <Field.Toggle
              label="Label"
              valueOn="on"
              valueOff="off"
              variant="radio"
              value="on"
              error={errorMessage}
            />
          </FieldBlock>
        )

        const [yesElement, noElement]: Array<HTMLButtonElement> =
          Array.from(document.querySelectorAll('.dnb-radio'))
        expect(yesElement).toHaveClass('dnb-radio__status--error')
        expect(noElement).toHaveClass('dnb-radio__status--error')
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
        const helpButton = document.querySelector(
          '.dnb-checkbox__suffix .dnb-help-button'
        )
        expect(helpButton).toBeInTheDocument()
        expect(document.querySelector('input')).toHaveAttribute(
          'aria-describedby'
        )
        expect(
          document.querySelector('input').getAttribute('aria-describedby')
        ).toContain(document.querySelector('.dnb-help-button').id)
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

      it('should not change the state when calling preventDefault on the onClick event', async () => {
        const onClick = jest.fn((value, { preventDefault }) => {
          preventDefault()
        })

        render(
          <Field.Toggle
            label="Label {itemNo}"
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            onClick={onClick}
          />
        )

        const checkbox = document.querySelector('input')
        expect(checkbox.checked).toBe(false)

        await userEvent.click(checkbox)

        expect(checkbox.checked).toBe(false)
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick).toHaveBeenLastCalledWith(
          'off',
          expect.objectContaining({
            checked: false,
          })
        )

        await userEvent.click(checkbox)

        expect(checkbox.checked).toBe(false)
        expect(onClick).toHaveBeenCalledTimes(2)
        expect(onClick).toHaveBeenLastCalledWith(
          'off',
          expect.objectContaining({
            checked: false,
          })
        )
      })

      it('should not change the state when calling preventDefault on the onClick event when default value is true', async () => {
        const onClick = jest.fn((value, { preventDefault }) => {
          preventDefault()
        })

        render(
          <Field.Toggle
            label="Label {itemNo}"
            value="on"
            valueOn="on"
            valueOff="off"
            variant="checkbox"
            onClick={onClick}
          />
        )

        const checkbox = document.querySelector('input')
        expect(checkbox.checked).toBe(true)

        await userEvent.click(checkbox)

        expect(checkbox.checked).toBe(true)
        expect(onClick).toHaveBeenCalledTimes(1)
        expect(onClick).toHaveBeenLastCalledWith(
          'on',
          expect.objectContaining({
            checked: true,
          })
        )

        await userEvent.click(checkbox)

        expect(checkbox.checked).toBe(true)
        expect(onClick).toHaveBeenCalledTimes(2)
        expect(onClick).toHaveBeenLastCalledWith(
          'on',
          expect.objectContaining({
            checked: true,
          })
        )
      })
    })
  })
})
