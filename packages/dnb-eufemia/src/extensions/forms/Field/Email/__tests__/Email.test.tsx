import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Props } from '..'
import { Field, Form } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('Field.Email', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Field.Email {...props} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should show errors if field is empty on submit', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Email required />
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
        <Field.Email required path="/email" />
      </Form.Handler>
    )

    const input = document.querySelector('input')
    await userEvent.type(input, 'user')

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.type(input, '@example.com')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenLastCalledWith(
      { email: 'user@example.com' },
      expect.anything()
    )
  })

  it('should trim whitespaces', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.Email path="/email" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { email: undefined },
      expect.anything()
    )

    const input = document.querySelector('input')
    await userEvent.type(input, ' user@example.com ')
    fireEvent.blur(input)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenLastCalledWith(
      { email: 'user@example.com' },
      expect.anything()
    )
  })

  it('should have autocomplete (autofill)', () => {
    render(<Field.Email />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('autocomplete', 'email')
  })

  it('should have inputmode of email', () => {
    render(<Field.Email />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('inputmode', 'email')
  })

  it('should have type="text" to avoid browser input manipulation', () => {
    const { rerender } = render(<Field.Email />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('type', 'text')

    rerender(<Field.Email type="email" />)

    expect(input).toHaveAttribute('type', 'email')
  })

  it('should allow a custom pattern', async () => {
    render(<Field.Email pattern="[A-Z]" required />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.type(input, 'FOO')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  describe('should validate the correctness of email addresses', () => {
    const validNames = [
      'simple@example.com',
      'user.name+tag@example.co.uk',
      'user-name@example.org',
      'user_name@sub.domain.com',
      'user.name@domain.io',
      'user%email@example.com',
      'user.name@example.travel',
      'user123@example.info',
      'user@example123.com',
      'firstname.lastname@example.co',

      // IP address literal
      'user@[192.168.1.1]',
      'user@[255.255.255.255]',
      'user@[0.0.0.0]',
      'user@[10.0.0.1]',
      'user@[172.16.254.1]',

      // IPv6 address literal
      'user@[IPv6:2001:db8::1]',
      'admin@[IPv6:2607:fe80::1ff:fe23:4567:890a]',
      'info@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      'contact@[IPv6:2001:db8:1234:5678:9abc:def0:1234:5678]',
      'support@[IPv6:2001:db8:85a3:0000:0000:8a2e:0370:7334]',
      'user@[IPv6:::1]',
      'user@[IPv6:2001:db8:ff00:42:8329]',
      'user@[IPv6:2001:db8:abcd:1234::]',
      'service@[IPv6:2001:0db8:85a3:0000:0000:8a2e:0370:7334]',
      'test@[IPv6:2001:db8:1234::abcd]',
    ]

    const invalidNames = [
      'user..name@example.com', // Consecutive dots in local part
      'user.name.@example.com', // Dot at the end of the local part
      '.username@example.com', // Dot at the beginning of the local part
      'user.@example.com', // Dot before @
      'user@.example.com', // Dot at the beginning of the domain
      'user@sub_domain.com', // Underscore in domain part
      'user@domain.com-', // Hyphen at the end of domain
      'user@domain..com', // Consecutive dots in the domain
      'user@domain.c', // TLD too short
      'user@-domain.com', // Hyphen at the start of the domain

      // The regex we have does not take such invalid addresses into account
      // 'user@[256.100.50.25]', // Invalid IPv4, 256 is out of range
      // 'user@[192.168.1.300]', // Invalid IPv4, 300 is out of range
      // 'user@[192.168.1.1.1]', // Invalid IPv4, too many octets
      // 'user@[192.168.1]', // Invalid IPv4, too few octets
      // 'user@[abc.def.ghi.jkl]', // Invalid IPv4, non-numeric characters
      // 'user@[300.168.1.1]', // Invalid IPv4 address
      // 'user@[192.168.1.256]', // Invalid IPv4 address
      // 'user@[IPv6:2001::85a3::8a2e]', // Invalid IPv6 address
    ]

    it.each(validNames)('Valid email: %s', (email) => {
      render(<Field.Email validateInitially value={email} />)
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it.each(invalidNames)('Invalid email: %s', (email) => {
      render(<Field.Email validateInitially value={email} />)
      expect(screen.queryByRole('alert')).toBeInTheDocument()
      expect(screen.queryByRole('alert')).toHaveTextContent(
        nb.Email.errorPattern
      )
    })
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(<Field.Email required validateInitially />)

      expect(await axeComponent(result)).toHaveNoViolations()
    })

    it('should have aria-required', () => {
      render(<Field.Email required />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-required', 'true')
    })

    it('should have aria-invalid', () => {
      render(<Field.Email required validateInitially />)

      const input = document.querySelector('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
