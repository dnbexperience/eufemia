import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import { Form } from '../../..'
import { Button, Dialog } from '../../../../../components'
import { ConfirmParams } from '../SubmitConfirmation'
import userEvent from '@testing-library/user-event'

describe('Form.SubmitConfirmation', () => {
  describe('with preventSubmitWhen', () => {
    it('should keep pending state when confirmationState is "readyToBeSubmitted"', async () => {
      const onSubmit = jest.fn()
      const confirmationStateRef: React.MutableRefObject<
        ConfirmParams['confirmationState']
      > = React.createRef()
      const submitHandlerRef: React.MutableRefObject<
        ConfirmParams['submitHandler']
      > = React.createRef()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitConfirmation
            preventSubmitWhen={() => true}
            onStateChange={({ submitHandler }) => {
              submitHandlerRef.current = submitHandler
            }}
            renderWithState={({ confirmationState }) => {
              confirmationStateRef.current = confirmationState
              return null
            }}
          >
            <Form.SubmitButton />
          </Form.SubmitConfirmation>
        </Form.Handler>
      )

      const submitButton = document.querySelector(
        '.dnb-forms-submit-button'
      )
      await userEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)

      await waitFor(() => {
        expect(
          submitButton.querySelector(
            '.dnb-forms-submit-indicator--state-pending'
          )
        ).toBeTruthy()
      })

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

    it('should keep pending state when confirmationState is "readyToBeSubmitted" and onSubmit is async', async () => {
      const onSubmit = jest.fn(async () => null)
      const confirmationStateRef: React.MutableRefObject<
        ConfirmParams['confirmationState']
      > = React.createRef()
      const submitHandlerRef: React.MutableRefObject<
        ConfirmParams['submitHandler']
      > = React.createRef()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitConfirmation
            preventSubmitWhen={() => true}
            onStateChange={({ submitHandler }) => {
              submitHandlerRef.current = submitHandler
            }}
            renderWithState={({ confirmationState }) => {
              confirmationStateRef.current = confirmationState
              return null
            }}
          >
            <Form.SubmitButton />
          </Form.SubmitConfirmation>
        </Form.Handler>
      )

      const submitButton = document.querySelector(
        '.dnb-forms-submit-button'
      )
      await userEvent.click(submitButton)
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

    describe('focus handling', () => {
      it('should set focus on submit button when submitHandler is called', async () => {
        const submitHandlerRef: React.MutableRefObject<
          ConfirmParams['submitHandler']
        > = React.createRef()

        render(
          <Form.Handler>
            <Form.SubmitConfirmation
              preventSubmitWhen={() => true}
              onStateChange={({ submitHandler }) => {
                submitHandlerRef.current = submitHandler
              }}
            >
              <Form.SubmitButton />
            </Form.SubmitConfirmation>
          </Form.Handler>
        )

        expect(document.body).toHaveFocus()

        const submitButton = document.querySelector(
          '.dnb-forms-submit-button'
        ) as HTMLButtonElement

        const focus = jest.fn()
        jest.spyOn(submitButton, 'focus').mockImplementation(focus)

        await userEvent.click(submitButton)

        await waitFor(() => {
          expect(
            submitButton.querySelector(
              '.dnb-forms-submit-indicator--state-pending'
            )
          ).toBeTruthy()
        })
        expect(focus).toHaveBeenCalledTimes(1)

        await act(submitHandlerRef.current)

        await waitFor(() => {
          expect(
            submitButton.querySelector(
              '.dnb-forms-submit-indicator--state-pending'
            )
          ).toBeFalsy()
        })
        expect(focus).toHaveBeenCalledTimes(2)
        expect(focus).toHaveBeenLastCalledWith()
      })

      it('should set focus on submit button when cancelHandler is called', async () => {
        const cancelHandlerRef: React.MutableRefObject<
          ConfirmParams['cancelHandler']
        > = React.createRef()

        render(
          <Form.Handler>
            <Form.SubmitConfirmation
              preventSubmitWhen={() => true}
              onStateChange={({ cancelHandler }) => {
                cancelHandlerRef.current = cancelHandler
              }}
            >
              <Form.SubmitButton />
            </Form.SubmitConfirmation>
          </Form.Handler>
        )

        expect(document.body).toHaveFocus()

        const submitButton = document.querySelector(
          '.dnb-forms-submit-button'
        ) as HTMLButtonElement

        const focus = jest.fn()
        jest.spyOn(submitButton, 'focus').mockImplementation(focus)

        await userEvent.click(submitButton)

        await waitFor(() => {
          expect(
            submitButton.querySelector(
              '.dnb-forms-submit-indicator--state-pending'
            )
          ).toBeTruthy()
        })
        expect(focus).toHaveBeenCalledTimes(1)

        await act(cancelHandlerRef.current)

        await waitFor(() => {
          expect(
            submitButton.querySelector(
              '.dnb-forms-submit-indicator--state-pending'
            )
          ).toBeFalsy()
        })
        expect(focus).toHaveBeenCalledTimes(2)
        expect(focus).toHaveBeenLastCalledWith()
      })
    })

    it('when inactive, it should not prevent "onSubmit" from being called', async () => {
      const onSubmit = jest.fn()
      let preventSubmit = false

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitConfirmation
            preventSubmitWhen={() => preventSubmit}
            onStateChange={({
              confirmationState,
              setConfirmationState,
            }) => {
              switch (confirmationState) {
                case 'submitInProgress':
                  setConfirmationState('idle')
                  break
              }
            }}
          >
            content
          </Form.SubmitConfirmation>
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))
      expect(onSubmit).toHaveBeenCalledTimes(1)

      preventSubmit = true

      fireEvent.submit(document.querySelector('form'))
      expect(onSubmit).toHaveBeenCalledTimes(1)

      preventSubmit = false

      fireEvent.submit(document.querySelector('form'))
      expect(onSubmit).toHaveBeenCalledTimes(2)
    })

    it('should get result from "onSubmit" including "customStatus"', async () => {
      const error = new Error('Error message')
      const customStatus = 'custom'

      const onSubmit = jest.fn(() => {
        return { error, customStatus }
      })
      const preventSubmitWhen = jest.fn(() => {
        return false
      })
      const onSubmitResult = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitConfirmation
            preventSubmitWhen={preventSubmitWhen}
            onSubmitResult={onSubmitResult}
          >
            content
          </Form.SubmitConfirmation>
        </Form.Handler>
      )

      await act(async () => {
        fireEvent.submit(document.querySelector('form'))
      })
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(preventSubmitWhen).toHaveBeenCalledTimes(1)
      expect(onSubmitResult).toHaveBeenCalledTimes(1)
      expect(onSubmitResult).toHaveBeenLastCalledWith(
        expect.objectContaining({
          submitState: { error, customStatus },
        })
      )

      await act(async () => {
        fireEvent.submit(document.querySelector('form'))
      })
      expect(onSubmit).toHaveBeenCalledTimes(2)
      expect(preventSubmitWhen).toHaveBeenCalledTimes(1)
      expect(onSubmitResult).toHaveBeenCalledTimes(2)
      expect(onSubmitResult).toHaveBeenLastCalledWith(
        expect.objectContaining({
          submitState: { error, customStatus },
        })
      )
    })
  })

  describe('connectWithDialog', () => {
    it('should provide "connectWithDialog"', async () => {
      const onSubmit = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      })
      const confirmationStateRef: React.MutableRefObject<
        ConfirmParams['confirmationState']
      > = React.createRef()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitButton />

          <Form.SubmitConfirmation
            preventSubmitWhen={() => true}
            onStateChange={async ({
              confirmationState,
              setConfirmationState,
            }) => {
              confirmationStateRef.current = confirmationState
              await new Promise((resolve) => setTimeout(resolve, 100))
              switch (confirmationState) {
                case 'submissionComplete':
                  setConfirmationState('idle')
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

      expect(confirmationStateRef.current).toBe(null)

      const submitButton = document.querySelector(
        '.dnb-forms-submit-button'
      )
      await userEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(confirmationStateRef.current).toBe('readyToBeSubmitted')
      await waitFor(() => {
        expect(
          submitButton.querySelector(
            '.dnb-forms-submit-indicator--state-pending'
          )
        ).toBeTruthy()
      })

      const [cancelButton] = Array.from(
        document.querySelectorAll('.dnb-dialog button')
      )
      await userEvent.click(cancelButton)
      expect(confirmationStateRef.current).toBe('idle')

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      await userEvent.click(submitButton)
      expect(confirmationStateRef.current).toBe('readyToBeSubmitted')

      const [, confirmButton] = Array.from(
        document.querySelectorAll('.dnb-dialog button')
      )
      await userEvent.click(confirmButton)
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })
      expect(confirmationStateRef.current).toBe('submitInProgress')

      await waitFor(() => {
        expect(confirmationStateRef.current).toBe('submissionComplete')
      })
      await waitFor(() => {
        expect(confirmationStateRef.current).toBe('idle')
      })
    })

    it('should support esc key', async () => {
      const onSubmit = jest.fn(async () => {
        await new Promise((resolve) => setTimeout(resolve, 100))
      })
      const confirmationStateRef: React.MutableRefObject<
        ConfirmParams['confirmationState']
      > = React.createRef()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitButton />

          <Form.SubmitConfirmation
            preventSubmitWhen={() => true}
            onStateChange={({
              confirmationState,
              setConfirmationState,
            }) => {
              switch (confirmationState) {
                case 'submissionComplete':
                  setConfirmationState('idle')
                  break
              }
            }}
            renderWithState={({
              confirmationState,
              connectWithDialog,
            }) => {
              confirmationStateRef.current = confirmationState
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

      expect(confirmationStateRef.current).toBe('idle')

      const submitButton = document.querySelector(
        '.dnb-forms-submit-button'
      )
      await userEvent.click(submitButton)
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(confirmationStateRef.current).toBe('readyToBeSubmitted')
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
        expect(confirmationStateRef.current).toBe('idle')
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
          preventSubmitWhen={() => true}
          onStateChange={({ confirmationState, setConfirmationState }) => {
            switch (confirmationState) {
              case 'submissionComplete':
                setConfirmationState('idle')
                break
            }
          }}
          renderWithState={({ confirmationState, connectWithDialog }) => {
            let content = null

            switch (confirmationState) {
              case 'readyToBeSubmitted':
                content = <output>readyToBeSubmitted</output>
                break
              case 'submitInProgress':
                content = <output>submitInProgress</output>
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

    const submitButton = document.querySelector('.dnb-forms-submit-button')
    await userEvent.click(submitButton)
    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(document.querySelector('output')).toHaveTextContent(
      'readyToBeSubmitted'
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
    expect(document.querySelector('output')).toHaveTextContent(
      'readyToBeSubmitted'
    )
    await waitFor(() => {
      expect(document.querySelector('output')).toBeNull()
    })

    await userEvent.click(submitButton)
    expect(document.querySelector('output')).toHaveTextContent(
      'readyToBeSubmitted'
    )

    const [, confirmButton] = Array.from(
      document.querySelectorAll('.dnb-dialog button')
    )
    await userEvent.click(confirmButton)
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(document.querySelector('output')).toHaveTextContent(
      'submitInProgress'
    )

    await waitFor(() => {
      expect(document.querySelector('output')).toBeNull()
    })
  })

  it('should prevent "onSubmit" from being called', () => {
    const onSubmit = jest.fn()

    const { rerender } = render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation preventSubmitWhen={() => true}>
          content
        </Form.SubmitConfirmation>
      </Form.Handler>
    )

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    rerender(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitConfirmation preventSubmitWhen={() => true}>
          content
        </Form.SubmitConfirmation>
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
          preventSubmitWhen={() => true}
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

  it('should set confirmationState to idle when cancelHandler is called', async () => {
    const confirmationStateRef: React.MutableRefObject<
      ConfirmParams['confirmationState']
    > = React.createRef()
    const cancelHandlerRef: React.MutableRefObject<
      ConfirmParams['cancelHandler']
    > = React.createRef()

    render(
      <Form.Handler>
        <Form.SubmitConfirmation
          preventSubmitWhen={() => true}
          onStateChange={({ cancelHandler }) => {
            cancelHandlerRef.current = cancelHandler
          }}
          renderWithState={({ confirmationState }) => {
            confirmationStateRef.current = confirmationState
            return null
          }}
        >
          content
        </Form.SubmitConfirmation>
      </Form.Handler>
    )

    expect(confirmationStateRef.current).toBe('idle')
    fireEvent.submit(document.querySelector('form'))
    expect(confirmationStateRef.current).toBe('readyToBeSubmitted')

    await act(cancelHandlerRef.current)
    expect(confirmationStateRef.current).toBe('readyToBeSubmitted')
    await waitFor(() => {
      expect(confirmationStateRef.current).toBe('idle')
    })
  })

  it('should not disable buttons when disabled is set to true', () => {
    render(
      <Form.Handler disabled>
        <Form.SubmitConfirmation
          preventSubmitWhen={() => true}
          renderWithState={() => {
            return <Button>I'm not disabled</Button>
          }}
        />
      </Form.Handler>
    )

    expect(document.querySelector('button')).not.toBeDisabled()
  })
})
