import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../Forms'

describe('validator returning a Promise without being declared async', () => {
  const delayed = <Result,>(result: Result) => {
    return new Promise<Result>((resolve) => {
      setTimeout(() => resolve(result), 50)
    })
  }

  it('should submit when async behavior is first detected during submit', async () => {
    const onBlurValidator = vi.fn(function () {
      return delayed(undefined)
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    fireEvent.submit(document.querySelector('form'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should not submit while an onBlurValidator Promise is still pending', async () => {
    // Not declared async, but returns a Promise
    const onBlurValidator = vi.fn(function () {
      return delayed(new Error('Not valid'))
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')

    // Submit while the validation is still in flight
    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Not valid'
      )
    })

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should submit when an onBlurValidator Promise reports no error', async () => {
    const onBlurValidator = vi.fn(function () {
      return delayed(undefined)
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(document.querySelector('.dnb-form-status')).toBeNull()
  })

  it('should submit when an onChangeValidator Promise reports no error', async () => {
    const onChangeValidator = vi.fn(function () {
      return delayed(undefined)
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onChangeValidator={onChangeValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
    expect(document.querySelector('.dnb-form-status')).toBeNull()
  })

  it('should not submit while an onChangeValidator Promise is still pending', async () => {
    const onChangeValidator = vi.fn(function () {
      return delayed(new Error('Not valid'))
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onChangeValidator={onChangeValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Not valid'
      )
    })

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should not submit while an onBlurValidator returning an async validator is still pending', async () => {
    const asyncValidator = vi.fn(async (value: string) => {
      await delayed(undefined)
      return value === 'x' ? new Error('Not valid') : undefined
    })
    // Not declared async, and returns a list containing an async validator
    const onBlurValidator = vi.fn(function () {
      return [asyncValidator]
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    fireEvent.submit(document.querySelector('form'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Not valid'
      )
    })

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should show the field as validating while an onBlurValidator Promise is pending', async () => {
    let resolveValidator!: (value: undefined) => void
    const validation = new Promise<undefined>((resolve) => {
      resolveValidator = resolve
    })
    const onBlurValidator = vi.fn(function () {
      return validation
    })

    render(
      <Form.Handler>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    await userEvent.type(input, 'x')
    await userEvent.tab()

    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeInTheDocument()
      expect(input).toBeDisabled()
    })

    resolveValidator(undefined)

    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeNull()
    })
    expect(input).not.toBeDisabled()
  })

  it('should behave the same as an onBlurValidator declared async', async () => {
    const onBlurValidator = vi.fn(async function () {
      return delayed(new Error('Not valid'))
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Not valid'
      )
    })

    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should keep working for a synchronous onBlurValidator', async () => {
    const onBlurValidator = vi.fn(function (value: string) {
      return value === 'x' ? new Error('Not valid') : undefined
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    await userEvent.type(input, 'x')
    await userEvent.tab()

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Not valid'
      )
    })
    expect(input).not.toBeDisabled()

    await userEvent.click(document.querySelector('button[type="submit"]'))
    expect(onSubmit).toHaveBeenCalledTimes(0)

    await userEvent.type(input, 'y')
    await userEvent.tab()

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })

    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
