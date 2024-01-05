import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Field from '../../'

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

    it('should validate with ARIA rules', async () => {
      const element = render(
        <Field.Boolean
          label="Label"
          variant="checkbox"
          value={false}
          validateInitially
          required
        />
      )

      expect(await axeComponent(element)).toHaveNoViolations()
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

    it('should validate with ARIA rules', async () => {
      const element = render(
        <Field.Boolean
          label="Label"
          variant="button"
          value={false}
          validateInitially
          required
        />
      )

      expect(await axeComponent(element)).toHaveNoViolations()
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

    it('should validate with ARIA rules', async () => {
      const element = render(
        <Field.Boolean
          label="Label"
          variant="checkbox-button"
          value={false}
          validateInitially
          required
        />
      )

      expect(await axeComponent(element)).toHaveNoViolations()
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

    it('should validate with ARIA rules', async () => {
      const element = render(
        <Field.Boolean
          label="Label"
          variant="buttons"
          value={false}
          validateInitially
          required
        />
      )

      expect(await axeComponent(element)).toHaveNoViolations()
    })
  })
})
