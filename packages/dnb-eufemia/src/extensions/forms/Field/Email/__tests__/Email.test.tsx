import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Email, { Props } from '..'
import { Form } from '../../..'

describe('Field.Email', () => {
  it('should render with props', () => {
    const props: Props = {}
    render(<Email {...props} />)
  })

  it('should show errors if field is empty on submit', () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Email required />
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
        <Email required path="/email" />
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

  it.only('should show errors if field is invalid on submit', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Email required path="/email" />
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
        <Email path="/email" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenLastCalledWith(undefined, expect.anything())

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
    render(<Email />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('autocomplete', 'email')
  })

  it('should have inputmode of email', () => {
    render(<Email />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('inputmode', 'email')
  })

  it('should have type="text" to avoid browser input manipulation', () => {
    const { rerender } = render(<Email />)

    const input = document.querySelector('input')

    expect(input).toHaveAttribute('type', 'text')

    rerender(<Email type="email" />)

    expect(input).toHaveAttribute('type', 'email')
  })

  it('should allow a custom pattern', async () => {
    render(<Email pattern="[A-Z]" required />)

    const input = document.querySelector('input')

    await userEvent.type(input, 'foo')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await userEvent.type(input, 'FOO')
    fireEvent.blur(input)

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('should validate with ARIA rules', async () => {
    const result = render(<Email value="me@mail.com" />)

    expect(await axeComponent(result)).toHaveNoViolations()
  })
})
