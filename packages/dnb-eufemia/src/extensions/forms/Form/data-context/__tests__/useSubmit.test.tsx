import React from 'react'
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react'
import { Form, Field } from '../../..'
import useSubmit from '../useSubmit'
import { wait } from '../../../../../core/jest/jestSetup'

describe('Form.useSubmit', () => {
  it('should throw when used outside Form.Handler', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    const renderHookFn = () => {
      renderHook(() => useSubmit())
    }

    expect(renderHookFn).toThrow(
      'Form.useSubmit needs to run inside Form.Handler or have a valid id'
    )

    log.mockRestore()
  })

  it('should return submit function when used inside Form.Handler', () => {
    const { result } = renderHook(() => useSubmit(), {
      wrapper: ({ children }) => <Form.Handler>{children}</Form.Handler>,
    })

    expect(result.current).toHaveProperty('submit')
    expect(typeof result.current.submit).toBe('function')
  })

  it('should not throw when using an id that has never been mounted', async () => {
    const { result } = renderHook(() => useSubmit('never-mounted-id'))

    let submitPromise!: ReturnType<typeof result.current.submit>
    expect(() => {
      submitPromise = result.current.submit()
    }).not.toThrow()

    await expect(submitPromise).rejects.toThrow(
      'Form.useSubmit needs to run inside Form.Handler or have a valid id'
    )
  })

  it('should trigger onSubmit when submit is called', async () => {
    const onSubmit = jest.fn()

    const SubmitTrigger = () => {
      const { submit } = Form.useSubmit()
      return (
        <button type="button" onClick={() => submit()}>
          Submit
        </button>
      )
    }

    render(
      <Form.Handler decoupleForm onSubmit={onSubmit}>
        <Form.Element>
          <Field.String path="/foo" value="bar" />
        </Form.Element>
        <SubmitTrigger />
      </Form.Handler>
    )

    const button = document.querySelector('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ foo: 'bar' }),
      expect.any(Object)
    )
  })

  it('should return a Promise from submit', () => {
    const { result } = renderHook(() => useSubmit(), {
      wrapper: ({ children }) => <Form.Handler>{children}</Form.Handler>,
    })

    const returnValue = result.current.submit()

    expect(returnValue).toBeInstanceOf(Promise)
  })

  it('should resolve submit Promise with result when onSubmit returns data', async () => {
    const submitResult = { info: 'Success' }

    const SubmitTrigger = () => {
      const { submit } = Form.useSubmit()
      const [result, setResult] = React.useState<unknown>(null)
      return (
        <>
          <button
            type="button"
            onClick={async () => {
              const value = await submit()
              setResult(value)
            }}
          >
            Submit
          </button>
          <output data-testid="result">{JSON.stringify(result)}</output>
        </>
      )
    }

    render(
      <Form.Handler decoupleForm onSubmit={() => submitResult}>
        <Form.Element>
          <Field.String path="/foo" value="bar" />
        </Form.Element>
        <SubmitTrigger />
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const output = document.querySelector('[data-testid="result"]')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(output).toHaveTextContent(JSON.stringify(submitResult))
  })

  it('should work with id when used outside Form.Handler', async () => {
    const onSubmit = jest.fn()
    const formId = 'my-form-id'

    const SubmitButtonOutside = () => {
      const { submit } = Form.useSubmit(formId)
      return (
        <button type="button" onClick={() => submit()}>
          Submit
        </button>
      )
    }

    render(
      <>
        <Form.Handler id={formId} onSubmit={onSubmit}>
          <Field.String path="/name" value="Jane" />
        </Form.Handler>
        <SubmitButtonOutside />
      </>
    )

    const button = document.querySelector('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Jane' }),
      expect.any(Object)
    )
  })

  it('should work when submit button is inside Form.Handler', async () => {
    const onSubmit = jest.fn()

    const ExternalSubmitButton = () => {
      const { submit } = Form.useSubmit()
      return (
        <button type="button" onClick={() => submit()}>
          Submit outside form
        </button>
      )
    }

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/name" value="John" />
        <div className="external-actions">
          <ExternalSubmitButton />
        </div>
      </Form.Handler>
    )

    const button = document.querySelector('.external-actions button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'John' }),
      expect.any(Object)
    )
  })

  it('should support id when hook runs before Form.Handler mounts', async () => {
    const onSubmit = jest.fn()
    const formId = 'deferred-form-id'

    const OutsideHookBeforeHandler = () => {
      const { submit } = Form.useSubmit(formId)

      return (
        <>
          <button type="button" onClick={() => submit()}>
            Submit
          </button>
          <Form.Handler id={formId} onSubmit={onSubmit}>
            <Field.String path="/name" value="Alex" />
          </Form.Handler>
        </>
      )
    }

    render(<OutsideHookBeforeHandler />)

    const button = document.querySelector('button')

    await act(async () => {
      fireEvent.click(button)
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Alex' }),
      expect.any(Object)
    )
  })

  it('should return isPending as false by default', () => {
    const { result } = renderHook(() => useSubmit(), {
      wrapper: ({ children }) => <Form.Handler>{children}</Form.Handler>,
    })

    expect(result.current.isPending).toBe(false)
  })

  it('should set isPending to true during async submit', async () => {
    const onSubmit = async () => {
      await wait(100)
      return null
    }

    const PendingDisplay = () => {
      const { submit, isPending } = Form.useSubmit()
      return (
        <>
          <button type="button" onClick={() => submit()}>
            Submit
          </button>
          <output data-testid="pending">
            {isPending ? 'true' : 'false'}
          </output>
        </>
      )
    }

    render(
      <Form.Handler decoupleForm onSubmit={onSubmit}>
        <Form.Element>
          <Field.String path="/foo" value="bar" />
        </Form.Element>
        <PendingDisplay />
      </Form.Handler>
    )

    const button = document.querySelector('button')
    const output = document.querySelector('[data-testid="pending"]')

    expect(output).toHaveTextContent('false')

    await act(async () => {
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(output).toHaveTextContent('true')
    })

    await waitFor(() => {
      expect(output).toHaveTextContent('false')
    })
  })
})
