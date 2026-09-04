import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../Forms'
import { DEFAULT_ASYNC_SUBMIT_TIMEOUT } from '../../defaults'

describe('field pending state with asyncSubmitTimeout', () => {
  it('should re-enable the field after asyncSubmitTimeout when an onBlurValidator never settles', async () => {
    const onBlurValidator = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })

    render(
      <Form.Handler asyncSubmitTimeout={300}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    await userEvent.type(input, 'x')
    await userEvent.tab()

    // Disabled while the validation is in flight
    await waitFor(() => {
      expect(onBlurValidator).toHaveBeenCalledTimes(1)
      expect(input).toBeDisabled()
    })

    // The Promise never settles, so the asyncSubmitTimeout recovers the field
    // instead of leaving it disabled with no way out
    await waitFor(() => {
      expect(input).not.toBeDisabled()
    })
    expect(
      document.querySelector('.dnb-forms-submit-indicator--state-pending')
    ).toBeNull()
  })

  it('should submit after asyncSubmitTimeout when an async onChange never settles', async () => {
    const onChange = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler asyncSubmitTimeout={300} onSubmit={onSubmit}>
        <Field.String path="/name" onChange={onChange} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeInTheDocument()
    })

    // The field would stay pending forever, and the pending field state is
    // what blocks the submit, so the form would never submit again
    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeNull()
    })

    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should cancel a deferred submit when a pending field times out', async () => {
    const onChange = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })
    const onSubmit = vi.fn(async () => undefined)

    render(
      <Form.Handler asyncSubmitTimeout={300} onSubmit={onSubmit}>
        <Field.String path="/name" onChange={onChange} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeInTheDocument()
    })

    const submitButton = document.querySelector('button[type="submit"]')

    fireEvent.submit(document.querySelector('form'))
    expect(onSubmit).toHaveBeenCalledTimes(0)

    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })

    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeNull()
    })

    await new Promise<void>((resolve) => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => resolve())
      })
    })
    expect(onSubmit).toHaveBeenCalledTimes(0)

    fireEvent.submit(document.querySelector('form'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should inherit asyncSubmitTimeout in Form.Isolation', async () => {
    const onChange = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })

    render(
      <Form.Handler asyncSubmitTimeout={300}>
        <Form.Isolation>
          <Field.String path="/name" onChange={onChange} />
        </Form.Isolation>
      </Form.Handler>
    )

    const input = document.querySelector('input')

    await userEvent.type(input, 'x')

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeNull()
    })
  })

  it('should clear the pending state after asyncSubmitTimeout when an onChangeValidator never settles', async () => {
    const onChangeValidator = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })

    render(
      <Form.Handler asyncSubmitTimeout={300}>
        <Field.String path="/name" onChangeValidator={onChangeValidator} />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')

    await waitFor(() => {
      expect(onChangeValidator).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeInTheDocument()
    })

    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeNull()
    })
  })

  it('should not cut off an async validator that settles before the timeout', async () => {
    const onBlurValidator = vi.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      return new Error('Not valid')
    })
    const onSubmit = vi.fn()

    render(
      <Form.Handler asyncSubmitTimeout={10000} onSubmit={onSubmit}>
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
  })

  it('should keep the field pending while an async validator is still in flight', async () => {
    let resolveValidator!: (value: undefined) => void
    const validation = new Promise<undefined>((resolve) => {
      resolveValidator = resolve
    })
    // The same Promise for every call, so a re-validation during submit does
    // not start a new never-settling process
    const onBlurValidator = vi.fn(async () => validation)
    const onSubmit = vi.fn()

    render(
      <Form.Handler asyncSubmitTimeout={10000} onSubmit={onSubmit}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
        <Form.SubmitButton />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    await userEvent.type(input, 'x')
    await userEvent.tab()

    await waitFor(() => {
      expect(input).toBeDisabled()
    })

    // The deadline has not passed, so the field stays pending
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(input).toBeDisabled()

    resolveValidator(undefined)

    await waitFor(() => {
      expect(input).not.toBeDisabled()
    })

    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })

  it('should clear the pending state timeout on unmount', async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')
    const clearTimeoutSpy = vi.spyOn(globalThis, 'clearTimeout')
    const onBlurValidator = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })

    const { unmount } = render(
      <Form.Handler asyncSubmitTimeout={12345}>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    await userEvent.tab()

    await waitFor(() => {
      expect(document.querySelector('input')).toBeDisabled()
    })

    const timers = setTimeoutSpy.mock.calls
      .map((call, index) => {
        return call[1] === 12345
          ? setTimeoutSpy.mock.results[index].value
          : undefined
      })
      .filter(Boolean)

    expect(timers).toHaveLength(1)

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalledWith(timers[0])

    setTimeoutSpy.mockRestore()
    clearTimeoutSpy.mockRestore()
  })

  it('should use 30 seconds as the default field pending timeout', async () => {
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout')
    const onBlurValidator = vi.fn(async () => {
      return new Promise<undefined>(() => undefined)
    })

    const { unmount } = render(
      <Form.Handler>
        <Field.String path="/name" onBlurValidator={onBlurValidator} />
      </Form.Handler>
    )

    await userEvent.type(document.querySelector('input'), 'x')
    await userEvent.tab()

    await waitFor(() => {
      expect(onBlurValidator).toHaveBeenCalledTimes(1)
    })

    // The documentation states this value in prose ("30 seconds by default"),
    // so those texts need to be updated when the default changes.
    expect(DEFAULT_ASYNC_SUBMIT_TIMEOUT).toBe(30000)

    expect(
      setTimeoutSpy.mock.calls.some(
        ([, delay]) => delay === DEFAULT_ASYNC_SUBMIT_TIMEOUT
      )
    ).toBe(true)

    unmount()
    setTimeoutSpy.mockRestore()
  })
})
