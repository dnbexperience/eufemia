import '@testing-library/jest-dom'
import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DataInput from '..'

describe('DataInput.Boolean', () => {
  describe('variant: checkbox', () => {
    it('renders label', () => {
      render(
        <DataInput.Boolean variant="checkbox" label="Boolean label" />
      )
      expect(screen.getByLabelText('Boolean label')).toBeInTheDocument()
    })

    it('renders error', () => {
      render(
        <DataInput.Boolean
          variant="checkbox"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('should toggle when clicking', () => {
      const onChange = jest.fn()
      render(
        <DataInput.Boolean
          variant="checkbox"
          value={false}
          onChange={onChange}
        />
      )
      const input = screen.getByTestId('data-input-boolean')
      userEvent.click(input)
      userEvent.click(input)
      userEvent.click(input)
      expect(onChange.mock.calls).toHaveLength(3)
      expect(onChange.mock.calls[0][0]).toEqual(true)
      expect(onChange.mock.calls[1][0]).toEqual(false)
      expect(onChange.mock.calls[2][0]).toEqual(true)
    })

    it('should show error when no value is given', () => {
      render(
        <DataInput.Boolean variant="checkbox" required validateInitially />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <DataInput.Boolean
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
        <DataInput.Boolean
          variant="checkbox"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('variant: toggle-button', () => {
    it('renders label', () => {
      render(
        <DataInput.Boolean variant="toggle-button" label="Boolean label" />
      )
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
    })

    it('renders error', () => {
      render(
        <DataInput.Boolean
          variant="toggle-button"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('should show error when no value is given', () => {
      render(
        <DataInput.Boolean
          variant="toggle-button"
          required
          validateInitially
        />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <DataInput.Boolean
          variant="toggle-button"
          value={true}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not show error when a false-value is given', () => {
      render(
        <DataInput.Boolean
          variant="toggle-button"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('variant: toggle-checkbox', () => {
    it('renders label', () => {
      render(
        <DataInput.Boolean
          variant="toggle-checkbox"
          label="Boolean label"
        />
      )
      expect(screen.getByText('Boolean label')).toBeInTheDocument()
    })

    it('renders error', () => {
      render(
        <DataInput.Boolean
          variant="toggle-checkbox"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('should show error when no value is given', () => {
      render(
        <DataInput.Boolean
          variant="toggle-checkbox"
          required
          validateInitially
        />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <DataInput.Boolean
          variant="toggle-checkbox"
          value={true}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('should not show error when a false-value is given', () => {
      render(
        <DataInput.Boolean
          variant="toggle-checkbox"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('variant: buttons', () => {
    it('renders label', () => {
      render(<DataInput.Boolean variant="buttons" label="Boolean label" />)
      expect(screen.getByLabelText('Boolean label')).toBeInTheDocument()
    })

    it('renders error', () => {
      render(
        <DataInput.Boolean
          variant="buttons"
          error={new Error('This is what went wrong')}
        />
      )
      expect(
        screen.getByText('This is what went wrong')
      ).toBeInTheDocument()
    })

    it('should show error when no value is given', () => {
      render(
        <DataInput.Boolean variant="buttons" required validateInitially />
      )
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should not show error when a true-value is given', () => {
      render(
        <DataInput.Boolean
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
        <DataInput.Boolean
          variant="buttons"
          value={false}
          validateInitially
          required
        />
      )
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
