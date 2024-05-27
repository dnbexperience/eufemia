import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { screen, render, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataContext, Field, Form } from '../../..'

describe('Field.Boolean', () => {
  describe('variant: checkbox', () => {
    it('renders label', () => {
      render(<Field.Boolean variant="checkbox" label="Boolean label" />)
      expect(screen.getByLabelText('Boolean label')).toBeInTheDocument()
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
    it('renders label', () => {
      render(<Field.Boolean variant="button" label="Boolean label" />)
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
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
    it('renders label', () => {
      render(
        <Field.Boolean variant="checkbox-button" label="Boolean label" />
      )
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
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
    it('renders label', () => {
      render(<Field.Boolean variant="buttons" label="Boolean label" />)
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
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
})
