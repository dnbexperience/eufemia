import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '../'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.Name', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.Name {...props} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should show errors if field is empty on submit', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Name required />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()
  })

  it('should show errors if field is invalid on submit', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Name.First required path="/firstName" />
      </Form.Handler>
    )

    const input = document.querySelector('input')
    await userEvent.type(input, '@')

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.type(input, '{Backspace}My Name')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenLastCalledWith(
      { firstName: 'My Name' },
      expect.anything()
    )
  })

  it('should trim whitespaces', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Name path="/myValue" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myValue: undefined },
      expect.anything()
    )

    const input = document.querySelector('input')
    await userEvent.type(input, ' Nora ')
    fireEvent.blur(input)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenLastCalledWith(
      { myValue: 'Nora' },
      expect.anything()
    )
  })

  it('should have name autocomplete (autofill)', () => {
    render(<Field.Name />)

    const input = document.querySelector('input')
    expect(input).toHaveAttribute('autocomplete', 'name')
  })

  it('should have first name autocomplete (autofill)', () => {
    render(<Field.Name.First />)

    const input = document.querySelector('input')
    expect(input).toHaveAttribute('autocomplete', 'given-name')
  })

  it('should have last name autocomplete (autofill)', () => {
    render(<Field.Name.Last />)

    const input = document.querySelector('input')
    expect(input).toHaveAttribute('autocomplete', 'family-name')
  })

  it('should have company name autocomplete (autofill)', () => {
    render(<Field.Name.Company />)

    const input = document.querySelector('input')
    expect(input).toHaveAttribute('autocomplete', 'organization')
  })

  it('should capitalize the entered value when prop is true', async () => {
    const onChange = jest.fn()

    render(
      <Field.Name capitalize onChange={onChange} value="first NAME" />
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('First Name')

    await userEvent.type(input, ' second')
    expect(input).toHaveValue('First Name Second')

    expect(onChange).toHaveBeenLastCalledWith(
      'First Name Second',
      expect.anything()
    )

    await userEvent.type(input, '-NAME')
    expect(input).toHaveValue('First Name Second-Name')

    expect(onChange).toHaveBeenLastCalledWith(
      'First Name Second-Name',
      expect.anything()
    )

    await userEvent.type(input, '{Backspace>22}')
    expect(input).toHaveValue('')

    await userEvent.type(input, 'æøå')
    expect(input).toHaveValue('Æøå')
  })

  it('First name should support capitalize prop', async () => {
    render(<Field.Name.First capitalize />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo-BAR')
    expect(input).toHaveValue('Foo-Bar')
  })

  it('Last name should support capitalize prop', async () => {
    render(<Field.Name.Last capitalize />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo-BAR')
    expect(input).toHaveValue('Foo-Bar')
  })

  it('Company name should trim whitespace for entered value', async () => {
    render(<Field.Name.Company />)

    const input = document.querySelector('input')

    await userEvent.type(input, ' foo ')
    fireEvent.blur(input)

    expect(input).toHaveValue('foo')
  })

  it('should allow a custom pattern', async () => {
    render(<Field.Name pattern="[A-Z]" capitalize={false} required />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.type(input, 'FOO')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  describe('should validate the correctness of a name', () => {
    const validNames = [
      'Ole',
      'Anne-Marie',
      'Hans Christian',
      'Åse',
      'Müller',
      'García-López',
      'Frédéric-Jean',
    ]

    const invalidNames = [
      'Ole1',
      'Hans  Christian',
      'Anne--Marie',
      '@nna',
      'Ole--',
      'Liv-',
      ' Martin',
      'Anders ',
    ]

    it.each(validNames)('Valid name: %s', (name) => {
      render(<Field.Name validateInitially value={name} />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it.each(invalidNames)('Invalid name: %s', (name) => {
      render(<Field.Name validateInitially value={name} />)
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.Field.errorPattern
      )
    })
  })

  describe('should validate the correctness of a company name', () => {
    const validNames = [
      'Acme Inc. 123',
      'XYZ Corporation',
      'Global Co.',
      'Tech Solutions Ltd.',
      'Alpha & Omega Enterprises',
      'Beta Industries',
      'Gamma-Group',
      'Ink @ Nine',
      'Non–Breaking Space',
      'Corp!',
    ]

    const invalidNames = [
      'Tech  Solutions',
      'XYZ--Corp',
      '@nna',
      'Acme--',
      ' Limited',
      'Limited ',
      '123',
      '0',
    ]

    it.each(validNames)('Valid name: %s', (name) => {
      render(<Field.Name.Company validateInitially value={name} />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it.each(invalidNames)('Invalid name: %s', (name) => {
      render(<Field.Name.Company validateInitially value={name} />)
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.Field.errorPattern
      )
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <>
          <Field.Name.First required validateInitially />
          <Field.Name.Last required validateInitially />
          <Field.Name.Company required validateInitially />
        </>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Name required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Name required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
