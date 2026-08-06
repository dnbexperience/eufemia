import { useEffect, useLayoutEffect, useRef } from 'react'
import { render, waitFor } from '@testing-library/react'
import { Form } from '../../..'

function SubmitInEffect({ onSettled }: { onSettled: () => void }) {
  const { submit } = Form.useSubmit()
  const submittedRef = useRef(false)

  useEffect(() => {
    if (!submittedRef.current) {
      submittedRef.current = true
      void submit().finally(onSettled)
    }
  }, [onSettled, submit])

  return null
}

function SubmitInLayoutEffect({ onSettled }: { onSettled: () => void }) {
  const { submit } = Form.useSubmit()
  const submittedRef = useRef(false)

  useLayoutEffect(() => {
    if (!submittedRef.current) {
      submittedRef.current = true
      void submit().finally(onSettled)
    }
  }, [onSettled, submit])

  return null
}

describe('useEventListener timing', () => {
  it.each([
    ['effect', SubmitInEffect],
    ['layout effect', SubmitInLayoutEffect],
  ])(
    'registers SubmitConfirmation before a child %s can submit',
    async (_effect, SubmitOnMount) => {
      const onSubmit = vi.fn()
      const onStateChange = vi.fn()
      const onSettled = vi.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Form.SubmitConfirmation
            preventSubmitWhen={() => true}
            onStateChange={onStateChange}
          >
            <SubmitOnMount onSettled={onSettled} />
          </Form.SubmitConfirmation>
        </Form.Handler>
      )

      await waitFor(() => {
        expect(onSettled).toHaveBeenCalledTimes(1)
      })
      expect(onStateChange).toHaveBeenCalledWith(
        expect.objectContaining({
          confirmationState: 'readyToBeSubmitted',
        })
      )
      expect(onSubmit).toHaveBeenCalledTimes(0)
    }
  )
})
