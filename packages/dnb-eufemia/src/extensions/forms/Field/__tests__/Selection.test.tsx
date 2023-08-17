import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Field from '..'

describe('Select', () => {
  describe('props', () => {
    it('renders selected option', () => {
      render(
        <Field.Selection value="bar">
          <Field.Option value="foo">Fooo</Field.Option>
          <Field.Option value="bar">Baar</Field.Option>
        </Field.Selection>
      )

      expect(screen.getByText('Baar')).toBeInTheDocument()
      expect(screen.queryAllByRole('option').length).toEqual(0)
      expect(screen.queryByText('Fooo')).not.toBeInTheDocument()
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

  describe('error handling', () => {
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
