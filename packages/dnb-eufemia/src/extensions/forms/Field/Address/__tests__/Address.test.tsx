import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '..'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.Address', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.Address {...props} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should show errors if field is empty on submit', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Address required />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should trim whitespaces', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Address path="/address" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { address: undefined },
      expect.anything()
    )

    const input = document.querySelector('input')
    await userEvent.type(input, ' Dronning Eufemias gate 30 ')
    fireEvent.blur(input)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenLastCalledWith(
      { address: 'Dronning Eufemias gate 30' },
      expect.anything()
    )
  })

  it('should have default autocomplete (autofill) as street-address', () => {
    render(<Field.Address />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('autocomplete', 'street-address')
  })

  it('should be possible to set autocomplete (autofill)', () => {
    render(<Field.Address autoComplete="shipping street-address" />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute(
      'autocomplete',
      'shipping street-address'
    )
  })

  it('should have inputmode of text', () => {
    render(<Field.Address />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('inputmode', 'text')
  })

  it('should set label', () => {
    render(<Field.Address label="myLabel" />)

    const label = document.querySelector('label')
    expect(label).toHaveTextContent('myLabel')
  })

  it('should allow a custom pattern', async () => {
    render(<Field.Address pattern="[A-Z]" required />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.type(input, 'FOO')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  describe('Address.Postal', () => {
    it('should have correct label', () => {
      render(<Field.Address.Postal />)

      const label = document.querySelector('label')
      expect(label).toHaveTextContent(nb.PostalAddress.label)
    })

    it('should add (optional) text to the label if required={false}', () => {
      render(
        <Form.Handler required>
          <Field.Address.Postal required={false} />
        </Form.Handler>
      )

      const label = document.querySelector('label')
      expect(label).toHaveTextContent(
        `${nb.PostalAddress.label} ${nb.Field.optionalLabelSuffix}`
      )
    })
  })

  describe('Address.Street', () => {
    it('should have correct label', () => {
      render(<Field.Address.Street />)

      const label = document.querySelector('label')
      expect(label).toHaveTextContent(nb.StreetAddress.label)
    })

    it('should add (optional) text to the label if required={false}', () => {
      render(
        <Form.Handler required>
          <Field.Address.Street required={false} />
        </Form.Handler>
      )

      const label = document.querySelector('label')
      expect(label).toHaveTextContent(
        `${nb.StreetAddress.label} ${nb.Field.optionalLabelSuffix}`
      )
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <>
          <Field.Address.Postal required validateInitially />
          <Field.Address.Street required validateInitially />
        </>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Address required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Address required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
