import React from 'react'
import { screen, render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Field from '../../'

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

    it('renders selected option', () => {
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

    it('sends undefined out when selecting the clear-option', async () => {
      const onChange = jest.fn()
      render(
        <Field.Selection onChange={onChange} clear>
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )
      // Open the menu
      const selectionButton = screen.getByRole('button')
      await userEvent.click(selectionButton)
      // Click the second option, which should be the "foo" option if the clear-option is the first one
      const options1 = screen.queryAllByRole('option')
      await userEvent.click(options1[1])

      expect(onChange.mock.calls).toHaveLength(1)
      expect(onChange.mock.calls[0][0]).toEqual('foo')

      // Then reopen the menu and click the first option, which should be the clear-option, providing undefined
      await userEvent.click(selectionButton)
      const options2 = screen.queryAllByRole('option')
      await userEvent.click(options2[0])

      expect(onChange.mock.calls).toHaveLength(2)
      expect(onChange.mock.calls[1][0]).toEqual(undefined)
    })

    it('should send the provided emptyValue when clicking the clear option', async () => {
      const onChange = jest.fn()
      render(
        <Field.Selection onChange={onChange} emptyValue="nothing" clear>
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )
      // Open the menu
      const selectionButton = screen.getByRole('button')
      await userEvent.click(selectionButton)
      const options = screen.queryAllByRole('option')
      await userEvent.click(options[0])

      expect(onChange.mock.calls).toHaveLength(1)
      expect(onChange.mock.calls[0][0]).toEqual('nothing')
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
    render(
      <Field.Selection error={new Error('This is what went wrong')}>
        <Field.Option value="foo">Fooo</Field.Option>
        <Field.Option value="bar">Baar</Field.Option>
      </Field.Selection>
    )
    const element = document.querySelector('.dnb-dropdown')
    expect(element.className).toContain('dnb-dropdown__status--error')
  })
})
