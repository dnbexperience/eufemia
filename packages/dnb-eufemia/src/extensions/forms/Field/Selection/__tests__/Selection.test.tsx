import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { screen, render, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field } from '../../..'

describe('Selection', () => {
  describe('props', () => {
    it('renders selected option', () => {
      render(
        <Field.Selection value="bar">
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )
      expect(screen.queryAllByRole('button').length).toEqual(1)
      expect(screen.getByText('Baar')).toBeInTheDocument()
      expect(screen.queryAllByRole('option').length).toEqual(0)
      expect(screen.queryByText('Fooo')).not.toBeInTheDocument()
    })

    it('renders selected option with number values', () => {
      render(
        <Field.Selection value="20">
          <Field.Option value="10" title="Ten" />
          <Field.Option value="20" title="Twenty" />
          <Field.Option value="30" title="Thirty" />
        </Field.Selection>
      )
      expect(screen.getByText('Twenty')).toBeInTheDocument()
      expect(screen.queryByText('Ten')).not.toBeInTheDocument()
      expect(screen.queryByText('Thirty')).not.toBeInTheDocument()
    })

    it('should change option based on external value change', async () => {
      const { rerender } = render(
        <Field.Selection value="bar">
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )

      const btn1 = screen.getByRole('button')
      expect(within(btn1).getByText('Baar')).toBeInTheDocument()
      expect(within(btn1).queryByText('Fooo')).not.toBeInTheDocument()

      // This should re-render the mounted Selection-component with a new value-prop
      rerender(
        <Field.Selection value="foo">
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )

      // The selected button should now show the other option based on the value-prop change
      const btn2 = screen.getByRole('button')
      expect(within(btn2).getByText('Fooo')).toBeInTheDocument()
      expect(within(btn2).queryByText('Baar')).not.toBeInTheDocument()
    })

    it('renders given options', async () => {
      render(
        <Field.Selection value="bar">
          <Field.Option value="one">One</Field.Option>
          <Field.Option value="two">Two</Field.Option>
          <Field.Option value="three">Three o'clock</Field.Option>
          <Field.Option value="four">Four o'clock rock</Field.Option>
        </Field.Selection>
      )

      const selectionButton = screen.getByRole('button')
      await userEvent.click(selectionButton)

      expect(screen.getAllByRole('option').length).toEqual(4)
      expect(screen.getByText('One')).toBeInTheDocument()
      expect(screen.getByText('Two')).toBeInTheDocument()
      expect(screen.getByText("Three o'clock")).toBeInTheDocument()
      expect(screen.getByText("Four o'clock rock")).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(
        <Field.Selection placeholder="Select something">
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )
      // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
      expect(screen.getByText('Select something')).toBeInTheDocument()
    })

    it('precede option children over title', async () => {
      render(
        <Field.Selection>
          <Field.Option value="foo" title="title a">
            child a
          </Field.Option>
          <Field.Option value="bar" title="title a">
            child b
          </Field.Option>
        </Field.Selection>
      )

      const selectionButton = document.querySelector('button')
      await userEvent.click(selectionButton)
      const options = document.querySelectorAll('.dnb-drawer-list__option')

      expect(options[0].textContent).toBe('child a')
      expect(options[1].textContent).toBe('child b')
    })
  })

  describe('variants', () => {
    describe('radio', () => {
      it('renders selected option', () => {
        render(
          <Field.Selection variant="radio" value="bar">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )
        const radioButtons = screen.queryAllByRole('radio')
        expect(radioButtons.length).toEqual(2)
        expect(radioButtons[0]).not.toBeChecked()
        expect(radioButtons[1]).toBeChecked()
      })

      it('renders update selected option based on external value change', () => {
        const { rerender } = render(
          <Field.Selection variant="radio" value="bar">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )
        rerender(
          <Field.Selection variant="radio" value="foo">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        const radioButtons = screen.queryAllByRole('radio')
        expect(radioButtons.length).toEqual(2)
        expect(radioButtons[0]).toBeChecked()
        expect(radioButtons[1]).not.toBeChecked()
      })

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Selection
              label="Label"
              variant="radio"
              required
              validateInitially
            >
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          expect(await axeComponent(result)).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Selection variant="radio" value="bar" required>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          const [first, second] = Array.from(
            document.querySelectorAll('input')
          )
          expect(first).toHaveAttribute('aria-required', 'true')
          expect(second).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Selection variant="radio" required validateInitially>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          const [first, second] = Array.from(
            document.querySelectorAll('input')
          )
          expect(first).toHaveAttribute('aria-invalid', 'true')
          expect(second).toHaveAttribute('aria-invalid', 'true')
        })
      })
    })

    describe('button', () => {
      it('has no selected value by default', () => {
        render(
          <Field.Selection variant="button">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        const buttons = document.querySelectorAll('button')
        expect(buttons.length).toEqual(2)
        expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
        expect(buttons[1].getAttribute('aria-pressed')).toBe('false')
      })

      it('renders selected option', () => {
        render(
          <Field.Selection variant="button" value="bar">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        const buttons = document.querySelectorAll('button')
        expect(buttons.length).toEqual(2)
        expect(buttons[0].getAttribute('aria-pressed')).toBe('false')
        expect(buttons[1].getAttribute('aria-pressed')).toBe('true')
      })

      it('renders fieldset/legend if more than two options are given', () => {
        const { rerender } = render(
          <Field.Selection variant="button" label="Legend">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        expect(document.querySelectorAll('fieldset')).toHaveLength(1)
        expect(document.querySelectorAll('legend')).toHaveLength(1)
        expect(document.querySelectorAll('label')).toHaveLength(0)

        rerender(
          <Field.Selection variant="button" label="Label">
            <Field.Option value="foo">Fooo</Field.Option>
          </Field.Selection>
        )

        expect(document.querySelectorAll('fieldset')).toHaveLength(0)
        expect(document.querySelectorAll('legend')).toHaveLength(0)
        expect(document.querySelectorAll('label')).toHaveLength(1)
        expect(document.querySelector('label')).toHaveAttribute('for')
        expect(document.querySelector('label').getAttribute('for')).toBe(
          document.querySelector('button').getAttribute('id')
        )
      })

      it('renders update selected option based on external value change', () => {
        const { rerender } = render(
          <Field.Selection variant="button" value="bar">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        rerender(
          <Field.Selection variant="button" value="foo">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        const buttons = document.querySelectorAll('button')
        expect(buttons.length).toEqual(2)
        expect(buttons[0].getAttribute('aria-pressed')).toBe('true')
        expect(buttons[1].getAttribute('aria-pressed')).toBe('false')
      })

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Selection
              label="Label"
              variant="button"
              required
              validateInitially
            >
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
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
            <Field.Selection variant="button" value="bar" required>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          const [first, second] = Array.from(
            document.querySelectorAll('button')
          )
          expect(first).toHaveAttribute('aria-required', 'true')
          expect(second).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Selection variant="button" required validateInitially>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          const [first, second] = Array.from(
            document.querySelectorAll('button')
          )
          expect(first).toHaveAttribute('aria-invalid', 'true')
          expect(second).toHaveAttribute('aria-invalid', 'true')
        })
      })
    })

    describe('dropdown', () => {
      const open = () =>
        fireEvent.click(document.querySelector('.dnb-dropdown__trigger'))

      it('has no selected value by default', () => {
        render(
          <Field.Selection variant="dropdown">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        open()

        const options = document.querySelectorAll('[role="option"]')
        expect(options.length).toEqual(2)
        expect(options[0].getAttribute('aria-selected')).toBe('false')
        expect(options[1].getAttribute('aria-selected')).toBe('false')
      })

      it('renders selected option', () => {
        render(
          <Field.Selection variant="dropdown" value="bar">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        open()

        const options = document.querySelectorAll('[role="option"]')
        expect(options.length).toEqual(2)
        expect(options[0].getAttribute('aria-selected')).toBe('false')
        expect(options[1].getAttribute('aria-selected')).toBe('true')
      })

      it('renders update selected option based on external value change', () => {
        const { rerender } = render(
          <Field.Selection variant="dropdown" value="bar">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        rerender(
          <Field.Selection variant="dropdown" value="foo">
            <Field.Option value="foo">Fooo</Field.Option>
            <Field.Option value="bar">Baar</Field.Option>
          </Field.Selection>
        )

        open()

        const options = document.querySelectorAll('[role="option"]')
        expect(options.length).toEqual(2)
        expect(options[0].getAttribute('aria-selected')).toBe('true')
        expect(options[1].getAttribute('aria-selected')).toBe('false')
      })

      describe('ARIA', () => {
        it('should validate with ARIA rules', async () => {
          const result = render(
            <Field.Selection
              label="Label"
              variant="dropdown"
              required
              validateInitially
            >
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          open()

          expect(
            await axeComponent(result, {
              rules: {
                // Because of aria-controls and aria-required is not allowed on buttons – but VO still reads it
                'aria-allowed-attr': { enabled: false },
                'aria-valid-attr-value': { enabled: false },
              },
            })
          ).toHaveNoViolations()
        })

        it('should have aria-required', () => {
          render(
            <Field.Selection variant="dropdown" value="bar" required>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          const button = document.querySelector('button')

          open()

          expect(button).toHaveAttribute('aria-required', 'true')
        })

        it('should have aria-invalid', () => {
          render(
            <Field.Selection variant="dropdown" required validateInitially>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )

          open()

          const buttonElement = document.querySelector('button')
          expect(buttonElement).toHaveAttribute('aria-invalid', 'true')
        })
      })
    })
  })

  describe('event handlers', () => {
    it('calls onChange when selecting a different options', async () => {
      const onChange = jest.fn()
      render(
        <Field.Selection value="bar" onChange={onChange}>
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )

      const selectionButton = screen.getByRole('button')
      await userEvent.click(selectionButton)

      const option1 = screen.getByText('Fooo')
      await userEvent.click(option1)

      expect(onChange.mock.calls).toHaveLength(1)
      expect(onChange.mock.calls[0][0]).toEqual('foo')

      await userEvent.click(selectionButton)
      const option2 = screen.getByText('Baar')
      await userEvent.click(option2)

      expect(onChange.mock.calls).toHaveLength(2)
      expect(onChange.mock.calls[0][0]).toEqual('foo')
      expect(onChange.mock.calls[1][0]).toEqual('bar')
    })

    it('calls onFocus when opening the dropdown with selected value as argument', async () => {
      const onFocus = jest.fn()
      render(
        <Field.Selection value="bar" onFocus={onFocus}>
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )

      const selectionButton = screen.getByRole('button')
      await userEvent.click(selectionButton)

      expect(onFocus.mock.calls).toHaveLength(1)
      expect(onFocus.mock.calls[0][0]).toEqual('bar')
    })

    it('calls onBlur when selecting the options so the dropdown closes with selected value as argument', async () => {
      const onBlur = jest.fn()
      render(
        <Field.Selection value="bar" onBlur={onBlur}>
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )

      const selectionButton = screen.getByRole('button')
      await userEvent.click(selectionButton)

      const option1 = screen.getByText('Fooo')
      await userEvent.click(option1)

      expect(onBlur.mock.calls).toHaveLength(1)
      expect(onBlur.mock.calls[0][0]).toEqual('foo')
    })
  })

  describe('validation and error handling', () => {
    describe('required', () => {
      describe('validation based on required-prop', () => {
        it('should show error for empty value', async () => {
          render(
            <Field.Selection required validateInitially>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )
          const selectionButton = screen.getByRole('button')
          await userEvent.click(selectionButton)

          expect(screen.getByRole('alert')).toBeInTheDocument()
        })

        it('should not show error when value is not empty', async () => {
          render(
            <Field.Selection required>
              <Field.Option value="foo">Fooo</Field.Option>
              <Field.Option value="bar">Baar</Field.Option>
            </Field.Selection>
          )
          const selectionButton = screen.getByRole('button')
          await userEvent.click(selectionButton)
          const option1 = screen.getByText('Fooo')
          await userEvent.click(option1)

          expect(screen.queryByRole('alert')).not.toBeInTheDocument()
        })
      })
    })
  })

  it('shows error border', () => {
    const { rerender } = render(
      <Field.Selection error={new Error('This is what went wrong')}>
        <Field.Option value="foo">Fooo</Field.Option>
        <Field.Option value="bar">Baar</Field.Option>
      </Field.Selection>
    )
    const dropdown = document.querySelector('.dnb-dropdown')
    expect(dropdown.className).toContain('dnb-dropdown__status--error')

    rerender(
      <Field.Selection
        variant="radio"
        error={new Error('This is what went wrong')}
      >
        <Field.Option value="foo">Fooo</Field.Option>
        <Field.Option value="bar">Baar</Field.Option>
      </Field.Selection>
    )

    const radio = document.querySelector('.dnb-radio')
    expect(radio.className).toContain('dnb-radio__status--error')

    rerender(
      <Field.Selection
        variant="button"
        error={new Error('This is what went wrong')}
      >
        <Field.Option value="foo">Fooo</Field.Option>
        <Field.Option value="bar">Baar</Field.Option>
      </Field.Selection>
    )

    const button = document.querySelector('.dnb-toggle-button')
    expect(button.className).toContain('dnb-toggle-button__status--error')
  })

  it('shows error in individual button item', () => {
    render(
      <Field.Selection variant="button">
        <Field.Option
          value="foo"
          error={new Error('This is what went wrong')}
        >
          Fooo
        </Field.Option>
        <Field.Option value="bar">Baar</Field.Option>
      </Field.Selection>
    )
    const [first, second] = Array.from(
      document.querySelectorAll('.dnb-toggle-button')
    )
    expect(first.className).toContain('dnb-toggle-button__status--error')
    expect(second.className).not.toContain(
      'dnb-toggle-button__status--error'
    )
  })
})
