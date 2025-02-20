import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataContext, Field, Form, Iterate } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.Boolean', () => {
  describe('variant: checkbox', () => {
    it('should support size', () => {
      render(
        <Field.Boolean
          variant="checkbox"
          label="Boolean label"
          size="large"
        />
      )

      const fieldToggleElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-toggle'
      )
      expect(fieldToggleElement.classList).toContain(
        'dnb-forms-field-block--label-height-large'
      )

      const checkboxElement: HTMLInputElement =
        document.querySelector('.dnb-checkbox')
      expect(checkboxElement.classList).toContain('dnb-checkbox--large')
    })

    it('renders label', () => {
      render(<Field.Boolean variant="checkbox" label="Boolean label" />)
      expect(screen.getByLabelText('Boolean label')).toBeInTheDocument()
    })

    it('label should render only once', () => {
      render(<Field.Boolean variant="checkbox" label="Boolean label" />)
      expect(screen.queryAllByLabelText('Boolean label')).toHaveLength(1)
      expect(screen.queryByText('Ja')).not.toBeInTheDocument()
      expect(screen.queryByText('Nei')).not.toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.Boolean
          variant="checkbox"
          help={{ title: 'Help title', content: 'Help content' }}
        />
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
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

    it('renders error', () => {
      render(
        <Field.Boolean
          variant="checkbox"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('renders trueText', async () => {
      render(
        <Field.Boolean
          variant="checkbox"
          trueText="True text"
          falseText="False text"
        />
      )
      expect(screen.getByText('False text')).toBeInTheDocument()
      await userEvent.click(screen.getByText('False text'))
      expect(screen.getByText('True text')).toBeInTheDocument()
    })

    it('shows error border', () => {
      render(
        <Field.Boolean
          variant="checkbox"
          error={new Error('This is what went wrong')}
        />
      )
      const element = document.querySelector('.dnb-checkbox')
      expect(element.className).toContain('dnb-checkbox__status--error')
    })

    it('should toggle when clicking', async () => {
      const onChange = jest.fn()
      render(
        <Field.Boolean
          variant="checkbox"
          value={false}
          onChange={onChange}
        />
      )
      const input = screen.getByRole('checkbox')
      await userEvent.click(input)
      await userEvent.click(input)
      await userEvent.click(input)
      await waitFor(() => {
        expect(onChange.mock.calls).toHaveLength(3)
        expect(onChange.mock.calls[0][0]).toEqual(true)
        expect(onChange.mock.calls[1][0]).toEqual(false)
        expect(onChange.mock.calls[2][0]).toEqual(true)
      })
    })

    it('should show error when no value is given', () => {
      render(
        <Field.Boolean variant="checkbox" required validateInitially />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <Field.Boolean
          variant="checkbox"
          value={true}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not show error when a false-value is given', () => {
      render(
        <Field.Boolean
          variant="checkbox"
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
          <Field.Boolean
            path="/mySelection"
            variant="button"
            defaultValue
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
          value: 'Ja',
        },
      })

      await userEvent.tab()
      await userEvent.keyboard('{Enter}')

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/mySelection': {
          type: 'field',
          value: 'Nei',
        },
      })
    })

    it('should store "displayValue" when inside iterate', async () => {
      let dataContext = null

      render(
        <Form.Handler
          defaultData={{
            myArray: [{ mySelection: true }, { mySelection: true }],
          }}
        >
          <Iterate.Array path="/myArray">
            <Field.Boolean
              itemPath="/mySelection"
              variant="button"
              defaultValue
            />
          </Iterate.Array>

          <DataContext.Consumer>
            {(context) => {
              dataContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/myArray/0/mySelection': {
          type: 'field',
          value: 'Ja',
        },
        '/myArray/1/mySelection': {
          type: 'field',
          value: 'Ja',
        },
      })

      await userEvent.tab()
      await userEvent.keyboard('{Enter}')

      expect(dataContext.fieldDisplayValueRef.current).toEqual({
        '/myArray/0/mySelection': {
          type: 'field',
          value: 'Nei',
        },
        '/myArray/1/mySelection': {
          type: 'field',
          value: 'Ja',
        },
      })
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Boolean
            label="Label"
            variant="checkbox"
            validateInitially
            required
          />
        )

        expect(await axeComponent(result)).toHaveNoViolations()
      })

      it('should have aria-required', () => {
        render(<Field.Boolean label="Label" variant="checkbox" required />)

        const input = document.querySelector('input')
        expect(input).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Boolean
            label="Label"
            variant="checkbox"
            validateInitially
            required
          />
        )

        const input = document.querySelector('input')
        expect(input).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('variant: button', () => {
    it('should support size', () => {
      render(
        <Field.Boolean
          variant="button"
          label="Boolean label"
          size="large"
        />
      )

      const fieldToggleElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-toggle'
      )
      expect(fieldToggleElement.classList).toContain(
        'dnb-forms-field-block--label-height-large'
      )

      const buttonElement: HTMLInputElement = document.querySelector(
        '.dnb-toggle-button__button'
      )
      expect(buttonElement.classList).toContain('dnb-button--size-large')
    })

    it('renders label', () => {
      render(<Field.Boolean variant="button" label="Boolean label" />)
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
    })

    it('label should render only once', () => {
      render(<Field.Boolean variant="button" label="Boolean label" />)
      expect(screen.queryAllByLabelText('Boolean label')).toHaveLength(1)
      expect(screen.getByText('Nei')).toBeInTheDocument()
      expect(screen.queryByText('Ja')).not.toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.Boolean
          variant="button"
          help={{ title: 'Help title', content: 'Help content' }}
        />
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
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

    it('renders error', () => {
      render(
        <Field.Boolean
          variant="button"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('renders trueText', async () => {
      render(
        <Field.Boolean
          variant="button"
          trueText="True text"
          falseText="False text"
        />
      )
      expect(screen.getByText('False text')).toBeInTheDocument()
      await userEvent.click(screen.getByText('False text'))
      expect(screen.getByText('True text')).toBeInTheDocument()
    })

    it('shows error border', () => {
      render(
        <Field.Boolean
          variant="button"
          error={new Error('This is what went wrong')}
        />
      )
      const element = document.querySelector('.dnb-toggle-button')
      expect(element.className).toContain(
        'dnb-toggle-button__status--error'
      )
    })

    it('should show error when no value is given', () => {
      render(<Field.Boolean variant="button" required validateInitially />)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <Field.Boolean
          variant="button"
          value={true}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not show error when a false-value is given', () => {
      render(
        <Field.Boolean
          variant="button"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Boolean
            label="Label"
            variant="button"
            validateInitially
            required
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
        render(<Field.Boolean label="Label" variant="button" required />)

        const button = document.querySelector('button')
        expect(button).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Boolean
            label="Label"
            variant="button"
            validateInitially
            required
          />
        )

        const button = document.querySelector('button')
        expect(button).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('variant: checkbox-button', () => {
    it('should support size', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          label="Boolean label"
          size="large"
        />
      )

      const fieldToggleElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-toggle'
      )
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
        <Field.Boolean variant="checkbox-button" label="Boolean label" />
      )
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
    })

    it('label should render only once', () => {
      render(
        <Field.Boolean variant="checkbox-button" label="Boolean label" />
      )
      expect(screen.queryAllByLabelText('Boolean label')).toHaveLength(1)
      expect(screen.queryByText('Ja')).not.toBeInTheDocument()
      expect(screen.getByText('Nei')).toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          help={{ title: 'Help title', content: 'Help content' }}
        />
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
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

    it('renders error', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('renders trueText', async () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          trueText="True text"
          falseText="False text"
        />
      )
      expect(screen.getByText('False text')).toBeInTheDocument()
      await userEvent.click(screen.getByText('False text'))
      expect(screen.getByText('True text')).toBeInTheDocument()
    })

    it('shows error border', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          error={new Error('This is what went wrong')}
        />
      )
      const element = document.querySelector('.dnb-toggle-button')
      expect(element.className).toContain(
        'dnb-toggle-button__status--error'
      )
    })

    it('should show error when no value is given', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          required
          validateInitially
        />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          value={true}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not show error when a false-value is given', () => {
      render(
        <Field.Boolean
          variant="checkbox-button"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Boolean
            label="Label"
            variant="checkbox-button"
            validateInitially
            required
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
          <Field.Boolean
            label="Label"
            variant="checkbox-button"
            required
          />
        )

        const button = document.querySelector('button')
        expect(button).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Boolean
            label="Label"
            variant="checkbox-button"
            validateInitially
            required
          />
        )

        const button = document.querySelector('button')
        expect(button).toHaveAttribute('aria-invalid', 'true')
      })
    })
  })

  describe('variant: buttons', () => {
    it('should support size', () => {
      render(
        <Field.Boolean
          variant="buttons"
          label="Boolean label"
          size="large"
        />
      )

      const fieldToggleElement: HTMLInputElement = document.querySelector(
        '.dnb-forms-field-toggle'
      )
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
      render(<Field.Boolean variant="buttons" label="Boolean label" />)
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
    })

    it('label should render only once', () => {
      render(<Field.Boolean variant="buttons" label="Boolean label" />)
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
      expect(screen.getByText('Ja')).toBeInTheDocument()
      expect(screen.getByText('Nei')).toBeInTheDocument()
    })

    it('renders help', () => {
      render(
        <Field.Boolean
          variant="buttons"
          help={{ title: 'Help title', content: 'Help content' }}
        />
      )
      expect(document.querySelectorAll('.dnb-help-button')).toHaveLength(1)
      expect(document.querySelector('button')).toHaveAttribute(
        'aria-describedby'
      )
      expect(
        document
          .querySelector('.dnb-help-button')
          .getAttribute('aria-describedby')
      ).toBe(document.querySelector('.dnb-tooltip__content').id)
    })

    it('has no selected value by default', () => {
      render(<Field.Boolean variant="buttons" />)
      const buttons = document.querySelectorAll('button')
      expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
      expect(buttons[1].getAttribute('aria-pressed')).toBe('false')
    })

    it('has "false" selected', () => {
      render(<Field.Boolean variant="buttons" value={false} />)
      const buttons = document.querySelectorAll('button')
      expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
      expect(buttons[1].getAttribute('aria-pressed')).toBe('true')
    })

    it('has "true" selected', () => {
      render(<Field.Boolean variant="buttons" value={true} />)
      const buttons = document.querySelectorAll('button')
      expect(buttons[0].getAttribute('aria-pressed')).toBe('true')
      expect(buttons[1].getAttribute('aria-pressed')).toBe('false')
    })

    it('renders error', () => {
      render(
        <Field.Boolean
          variant="buttons"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('renders trueText', async () => {
      render(
        <Field.Boolean
          variant="buttons"
          trueText="True text"
          falseText="False text"
        />
      )
      expect(screen.getByText('False text')).toBeInTheDocument()
      expect(screen.getByText('True text')).toBeInTheDocument()
    })

    it('shows error border', () => {
      render(
        <Field.Boolean
          variant="buttons"
          error={new Error('This is what went wrong')}
        />
      )
      const element = document.querySelector('.dnb-toggle-button')
      expect(element.className).toContain(
        'dnb-toggle-button__status--error'
      )
    })

    it('should change value when path value changes', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ isTrue: true }}>
          <Field.Boolean variant="buttons" path="/isTrue" />
        </DataContext.Provider>
      )

      const [yesElement, noElement]: Array<HTMLButtonElement> = Array.from(
        document.querySelectorAll('.dnb-toggle-button__button')
      )

      expect(yesElement).toHaveAttribute('aria-pressed', 'true')
      expect(noElement).toHaveAttribute('aria-pressed', 'false')

      rerender(
        <DataContext.Provider data={{ isTrue: false }}>
          <Field.Boolean variant="buttons" path="/isTrue" />
        </DataContext.Provider>
      )

      expect(yesElement).toHaveAttribute('aria-pressed', 'false')
      expect(noElement).toHaveAttribute('aria-pressed', 'true')
    })

    it('should reset both buttons via rerender when undefined was given', () => {
      const { rerender } = render(
        <DataContext.Provider data={{ isTrue: true }}>
          <Field.Boolean variant="buttons" path="/isTrue" />
        </DataContext.Provider>
      )

      const [yesElement, noElement]: Array<HTMLButtonElement> = Array.from(
        document.querySelectorAll('.dnb-toggle-button__button')
      )

      expect(yesElement).toHaveAttribute('aria-pressed', 'true')
      expect(noElement).toHaveAttribute('aria-pressed', 'false')

      rerender(
        <DataContext.Provider data={{ isTrue: undefined }}>
          <Field.Boolean variant="buttons" path="/isTrue" />
        </DataContext.Provider>
      )

      expect(yesElement).toHaveAttribute('aria-pressed', 'false')
      expect(noElement).toHaveAttribute('aria-pressed', 'false')
    })

    it('should reset both buttons via useData update when undefined was given', () => {
      const MockComponent = () => {
        const { update } = Form.useData('unique')

        return (
          <Form.Handler id="unique" data={{}}>
            <Field.Boolean variant="buttons" path="/isTrue" />
            <Form.SubmitButton
              onClick={() => update('/isTrue', () => undefined)}
            />
          </Form.Handler>
        )
      }

      render(<MockComponent />)

      const resetButton = document.querySelector(
        '.dnb-forms-submit-button'
      )
      const [yesElement, noElement]: Array<HTMLButtonElement> = Array.from(
        document.querySelectorAll('.dnb-toggle-button__button')
      )

      expect(yesElement).toHaveAttribute('aria-pressed', 'false')
      expect(noElement).toHaveAttribute('aria-pressed', 'false')

      fireEvent.click(yesElement)

      expect(yesElement).toHaveAttribute('aria-pressed', 'true')
      expect(noElement).toHaveAttribute('aria-pressed', 'false')

      fireEvent.click(noElement)

      expect(yesElement).toHaveAttribute('aria-pressed', 'false')
      expect(noElement).toHaveAttribute('aria-pressed', 'true')

      fireEvent.click(resetButton)

      expect(yesElement).toHaveAttribute('aria-pressed', 'false')
      expect(noElement).toHaveAttribute('aria-pressed', 'false')
    })

    it('should show error when no value is given', () => {
      render(
        <Field.Boolean variant="buttons" required validateInitially />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <Field.Boolean
          variant="buttons"
          value={true}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not show error when a false-value is given', () => {
      render(
        <Field.Boolean
          variant="buttons"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    describe('ARIA', () => {
      it('should validate with ARIA rules', async () => {
        const result = render(
          <Field.Boolean
            label="Label"
            variant="buttons"
            validateInitially
            required
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
        render(<Field.Boolean label="Label" variant="buttons" required />)

        const [first, second] = Array.from(
          document.querySelectorAll('button')
        )
        expect(first).toHaveAttribute('aria-required', 'true')
        expect(second).toHaveAttribute('aria-required', 'true')
      })

      it('should have aria-invalid', () => {
        render(
          <Field.Boolean
            label="Label"
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
  })

  describe('schema', () => {
    it('should validate with schema and const', () => {
      const booleanSchema = {
        type: 'boolean',
        const: true,
      }

      render(
        <Field.Boolean
          value={false}
          schema={booleanSchema}
          validateInitially
        />
      )

      const formStatus = document.querySelector('.dnb-form-status')
      expect(formStatus).toBeInTheDocument()
      expect(formStatus).toHaveTextContent('must be equal to constant')
    })

    it('should validate with schema and enum', () => {
      const booleanSchema = {
        type: 'boolean',
        enum: [true],
      }

      render(
        <Field.Boolean
          value={false}
          schema={booleanSchema}
          validateInitially
        />
      )

      const formStatus = document.querySelector('.dnb-form-status')
      expect(formStatus).toBeInTheDocument()
      expect(formStatus).toHaveTextContent(
        'must be equal to one of the allowed values'
      )
    })

    it('should validate with schema given in context', () => {
      const schema = {
        type: 'object',
        properties: {
          myField: {
            type: 'boolean',
            const: true,
          },
        },
      }

      render(
        <Form.Handler schema={schema} data={{ myField: false }}>
          <Field.Boolean path="/myField" validateInitially />
        </Form.Handler>
      )

      const formStatus = document.querySelector('.dnb-form-status')
      expect(formStatus).toBeInTheDocument()
      expect(formStatus).toHaveTextContent('must be equal to constant')
    })

    it('should validate with schema interactively', async () => {
      const schema = {
        type: 'object',
        properties: {
          myField: {
            type: 'boolean',
            const: true,
          },
        },
      }

      render(
        <Form.Handler schema={schema} data={{ myField: undefined }}>
          <Field.Boolean required path="/myField" />
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const formStatus = () => document.querySelector('.dnb-form-status')

      fireEvent.submit(form)
      expect(formStatus()).toBeInTheDocument()
      expect(formStatus()).toHaveTextContent(nb.Field.errorRequired)

      await userEvent.click(document.querySelector('input'))
      expect(formStatus()).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('input'))

      fireEvent.submit(form)
      expect(formStatus()).toBeInTheDocument()
      expect(formStatus()).toHaveTextContent('must be equal to constant')
    })
  })
})
