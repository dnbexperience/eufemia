import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataInput from '..'

describe('Select', () => {
  describe('props', () => {
    it('renders selected option', () => {
      render(
        <DataInput.Select value="bar">
          <DataInput.Option value="foo">Fooo</DataInput.Option>
          <DataInput.Option value="bar">Baar</DataInput.Option>
        </DataInput.Select>
      )

      expect(screen.getByText('Baar')).toBeInTheDocument()
      expect(screen.queryAllByRole('option').length).toEqual(0)
      expect(screen.queryByText('Fooo')).not.toBeInTheDocument()
    })

    it('renders given options', () => {
      render(
        <DataInput.Select value="bar">
          <DataInput.Option value="one">One</DataInput.Option>
          <DataInput.Option value="two">Two</DataInput.Option>
          <DataInput.Option value="three">Three o'clock</DataInput.Option>
          <DataInput.Option value="four">
            Four o'clock rock
          </DataInput.Option>
        </DataInput.Select>
      )

      const select = screen.getByTestId('data-input-select')
      userEvent.click(select)

      expect(screen.getAllByRole('option').length).toEqual(4)
      expect(screen.getByText('One')).toBeInTheDocument()
      expect(screen.getByText('Two')).toBeInTheDocument()
      expect(screen.getByText("Three o'clock")).toBeInTheDocument()
      expect(screen.getByText("Four o'clock rock")).toBeInTheDocument()
    })

    it('renders placeholder', () => {
      render(
        <DataInput.Select placeholder="Select something">
          <DataInput.Option value="foo">Fooo</DataInput.Option>
          <DataInput.Option value="bar">Baar</DataInput.Option>
        </DataInput.Select>
      )
      // getByText instead of getByPlaceholderText since eufemia adds placeholder as tag, not placeholder-attribute
      expect(screen.getByText('Select something')).toBeInTheDocument()
    })
  })

  describe('event handlers', () => {
    it('calls onChange when selecting a different options', () => {
      const onChange = jest.fn()
      render(
        <DataInput.Select value="bar" onChange={onChange}>
          <DataInput.Option value="foo">Fooo</DataInput.Option>
          <DataInput.Option value="bar">Baar</DataInput.Option>
        </DataInput.Select>
      )

      const select = screen.getByTestId('data-input-select')
      userEvent.click(select)

      const option1 = screen.getByText('Fooo')
      userEvent.click(option1)

      expect(onChange.mock.calls).toHaveLength(1)
      expect(onChange.mock.calls[0][0]).toEqual('foo')

      userEvent.click(select)
      const option2 = screen.getByText('Baar')
      userEvent.click(option2)

      expect(onChange.mock.calls).toHaveLength(2)
      expect(onChange.mock.calls[0][0]).toEqual('foo')
      expect(onChange.mock.calls[1][0]).toEqual('bar')
    })

    it('calls onFocus when opening the dropdown with selected value as argument', () => {
      const onFocus = jest.fn()
      render(
        <DataInput.Select value="bar" onFocus={onFocus}>
          <DataInput.Option value="foo">Fooo</DataInput.Option>
          <DataInput.Option value="bar">Baar</DataInput.Option>
        </DataInput.Select>
      )

      const select = screen.getByTestId('data-input-select')
      userEvent.click(select)

      expect(onFocus.mock.calls).toHaveLength(1)
      expect(onFocus.mock.calls[0][0]).toEqual('bar')
    })

    it('calls onBlur when selecting the options so the dropdown closes with selected value as argument', () => {
      const onBlur = jest.fn()
      render(
        <DataInput.Select value="bar" onBlur={onBlur}>
          <DataInput.Option value="foo">Fooo</DataInput.Option>
          <DataInput.Option value="bar">Baar</DataInput.Option>
        </DataInput.Select>
      )

      const select = screen.getByTestId('data-input-select')
      userEvent.click(select)

      const option1 = screen.getByText('Fooo')
      userEvent.click(option1)

      expect(onBlur.mock.calls).toHaveLength(1)
      expect(onBlur.mock.calls[0][0]).toEqual('foo')
    })
  })

  describe('error handling', () => {
    describe('validation based on required-prop', () => {
      it('should show error for empty value', () => {
        render(
          <DataInput.Select required validateInitially>
            <DataInput.Option value="foo">Fooo</DataInput.Option>
            <DataInput.Option value="bar">Baar</DataInput.Option>
          </DataInput.Select>
        )
        const select = screen.getByTestId('data-input-select')
        userEvent.click(select)

        expect(screen.getByRole('alert')).toBeInTheDocument()
      })
      it('should not show error when value is not empty', () => {
        render(
          <DataInput.Select required>
            <DataInput.Option value="foo">Fooo</DataInput.Option>
            <DataInput.Option value="bar">Baar</DataInput.Option>
          </DataInput.Select>
        )
        const select = screen.getByTestId('data-input-select')
        userEvent.click(select)
        const option1 = screen.getByText('Fooo')
        userEvent.click(option1)

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
    })
  })
})
