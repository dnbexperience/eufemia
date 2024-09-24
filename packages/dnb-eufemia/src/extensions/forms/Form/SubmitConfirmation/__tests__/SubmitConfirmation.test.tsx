import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Form } from '../../..'
import { Button, Dialog } from '../../../../../components'
import { ConfirmParams } from '../SubmitConfirmation'
import userEvent from '@testing-library/user-event'

describe('Form.SubmitConfirmation', () => {
  it('should keep pending state when submitState is "beforeSubmit"', async () => {
    const onSubmit = jest.fn()
    const submitStateRef: React.MutableRefObject<
      ConfirmParams['submitState']
    > = React.createRef()
    const submitHandlerRef: React.MutableRefObject<
      ConfirmParams['submitHandler']
    > = React.createRef()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation
          onStateChange={({ submitHandler }) => {
            submitHandlerRef.current = submitHandler
          }}
          renderWithState={({ submitState }) => {
            submitStateRef.current = submitState
            return null
          }}
        >
          <Form.SubmitButton />
        </Form.SubmitConfirmation>
      </Form.Handler>
    )

    const submitButton = document.querySelector('button')
    fireEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalledTimes(0)

    expect(
      submitButton.querySelector(
        '.dnb-forms-submit-indicator--state-pending'
      )
    ).toBeTruthy()

    await act(submitHandlerRef.current)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(
        submitButton.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeFalsy()
    })
  })

  it('should keep pending state when submitState is "beforeSubmit" and onSubmit is async', async () => {
    const onSubmit = jest.fn(async () => null)
    const submitStateRef: React.MutableRefObject<
      ConfirmParams['submitState']
    > = React.createRef()
    const submitHandlerRef: React.MutableRefObject<
      ConfirmParams['submitHandler']
    > = React.createRef()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation
          onStateChange={({ submitHandler }) => {
            submitHandlerRef.current = submitHandler
          }}
          renderWithState={({ submitState }) => {
            submitStateRef.current = submitState
            return null
          }}
        >
          <Form.SubmitButton />
        </Form.SubmitConfirmation>
      </Form.Handler>
    )

    const submitButton = document.querySelector('button')
    fireEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalledTimes(0)

    expect(
      submitButton.querySelector(
        '.dnb-forms-submit-indicator--state-pending'
      )
    ).toBeTruthy()

    await act(submitHandlerRef.current)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    await waitFor(() => {
      expect(
        submitButton.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeFalsy()
    })
  })

  describe('connectWithDialog', () => {
    it('should provide "connectWithDialog"', async () => {
      const onSubmit = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      })
      const submitStateRef: React.MutableRefObject<
        ConfirmParams['submitState']
      > = React.createRef()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitButton />

          <Form.SubmitConfirmation
            onStateChange={async ({ submitState, setSubmitState }) => {
              submitStateRef.current = submitState
              await new Promise((resolve) => setTimeout(resolve, 100))
              switch (submitState) {
                case 'submissionComplete':
                  setSubmitState('idle')
                  break
              }
            }}
            renderWithState={({ connectWithDialog }) => {
              return (
                <Dialog
                  title="Title"
                  variant="confirmation"
                  {...connectWithDialog}
                />
              )
            }}
          />
        </Form.Handler>
      )

      expect(submitStateRef.current).toBe(null)

      const submitButton = document.querySelector('button')
      await userEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(submitStateRef.current).toBe('beforeSubmit')
      expect(
        submitButton.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeTruthy()

      const [cancelButton] = Array.from(
        document.querySelectorAll('.dnb-dialog button')
      )
      await userEvent.click(cancelButton)
      expect(submitStateRef.current).toBe('idle')

      await userEvent.click(submitButton)
      expect(submitStateRef.current).toBe('beforeSubmit')

      const [, confirmButton] = Array.from(
        document.querySelectorAll('.dnb-dialog button')
      )
      await userEvent.click(confirmButton)
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(submitStateRef.current).toBe('submitInProgress')

      await waitFor(() => {
        expect(submitStateRef.current).toBe('submissionComplete')
      })
      await waitFor(() => {
        expect(submitStateRef.current).toBe('idle')
      })
    })

    it('should support esc key', async () => {
      const onSubmit = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      })
      const submitStateRef: React.MutableRefObject<
        ConfirmParams['submitState']
      > = React.createRef()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitButton />

          <Form.SubmitConfirmation
            onStateChange={({ submitState, setSubmitState }) => {
              switch (submitState) {
                case 'submissionComplete':
                  setSubmitState('idle')
                  break
              }
            }}
            renderWithState={({ submitState, connectWithDialog }) => {
              submitStateRef.current = submitState
              return (
                <Dialog
                  title="Title"
                  variant="confirmation"
                  {...connectWithDialog}
                />
              )
            }}
          />
        </Form.Handler>
      )

      expect(submitStateRef.current).toBe('idle')

      const submitButton = document.querySelector('button')
      await userEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(submitStateRef.current).toBe('beforeSubmit')
      expect(
        submitButton.querySelector(
          '.dnb-forms-submit-indicator--state-pending'
        )
      ).toBeTruthy()

      await act(async () => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { keyCode: 27 })
        )
      })
      await waitFor(() => {
        expect(submitStateRef.current).toBe('idle')
      })
    })
  })

  it('should render given content during the state changes', async () => {
    const onSubmit = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100))
    })

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitButton />

        <Form.SubmitConfirmation
          onStateChange={({ submitState, setSubmitState }) => {
            switch (submitState) {
              case 'submissionComplete':
                setSubmitState('idle')
                break
            }
          }}
          renderWithState={({ submitState, connectWithDialog }) => {
            let content = null

            switch (submitState) {
              case 'beforeSubmit':
                content = <output>Is waiting</output>
                break
              case 'submitInProgress':
                content = <output>Is submitting</output>
                break
            }

            return (
              <>
                {content}
                <Dialog
                  title="Title"
                  variant="confirmation"
                  {...connectWithDialog}
                />
              </>
            )
          }}
        />
      </Form.Handler>
    )

    const submitButton = document.querySelector('button')
    await userEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(document.querySelector('output')).toHaveTextContent(
      'Is waiting'
    )
    expect(
      submitButton.querySelector(
        '.dnb-forms-submit-indicator--state-pending'
      )
    ).toBeTruthy()

    const [cancelButton] = Array.from(
      document.querySelectorAll('.dnb-dialog button')
    )
    await userEvent.click(cancelButton)
    expect(document.querySelector('output')).toBeNull()

    await userEvent.click(submitButton)
    expect(document.querySelector('output')).toHaveTextContent(
      'Is waiting'
    )

    const [, confirmButton] = Array.from(
      document.querySelectorAll('.dnb-dialog button')
    )
    await userEvent.click(confirmButton)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(document.querySelector('output')).toHaveTextContent(
      'Is submitting'
    )

    await waitFor(() => {
      expect(document.querySelector('output')).toBeNull()
    })
  })

  it('should prevent the original onSubmit from being called', () => {
    const onSubmit = jest.fn()

    const { rerender } = render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation>content</Form.SubmitConfirmation>
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    rerender(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation>content</Form.SubmitConfirmation>
        <Form.SubmitButton />
      </Form.Handler>
    )

    fireEvent.click(document.querySelector('button'))
    expect(onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should call onSubmit when submitHandler is called', async () => {
    const onSubmit = jest.fn()
    const submitHandlerRef: React.MutableRefObject<
      ConfirmParams['submitHandler']
    > = React.createRef()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation
          onStateChange={({ submitHandler }) => {
            submitHandlerRef.current = submitHandler
          }}
        >
          content
        </Form.SubmitConfirmation>
      </Form.Handler>
    )

    fireEvent.submit(document.querySelector('form'))
    expect(onSubmit).toHaveBeenCalledTimes(0)

    await act(submitHandlerRef.current)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should set submitState to idle when cancelHandler is called', () => {
    const submitStateRef: React.MutableRefObject<
      ConfirmParams['submitState']
    > = React.createRef()
    const cancelHandlerRef: React.MutableRefObject<
      ConfirmParams['cancelHandler']
    > = React.createRef()

    render(
      <Form.Handler>
        <Form.SubmitConfirmation
          onStateChange={({ cancelHandler }) => {
            cancelHandlerRef.current = cancelHandler
          }}
          renderWithState={({ submitState }) => {
            submitStateRef.current = submitState
            return null
          }}
        >
          content
        </Form.SubmitConfirmation>
      </Form.Handler>
    )

    expect(submitStateRef.current).toBe('idle')
    fireEvent.submit(document.querySelector('form'))
    expect(submitStateRef.current).toBe('beforeSubmit')

    act(cancelHandlerRef.current)
    expect(submitStateRef.current).toBe('idle')
  })

  it('should not disable buttons when disabled is set to true', () => {
    render(
      <Form.Handler disabled>
        <Form.SubmitConfirmation
          renderWithState={() => {
            return <Button>I'm not disabled</Button>
          }}
        />
      </Form.Handler>
    )

    expect(document.querySelector('button')).not.toBeDisabled()
  })
})
