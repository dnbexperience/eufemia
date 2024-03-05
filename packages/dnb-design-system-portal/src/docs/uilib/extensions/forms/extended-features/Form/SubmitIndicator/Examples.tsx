import { Button, Card, Flex, FormLabel } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field, FieldBlock, Form } from '@dnb/eufemia/src/extensions/forms'
import { debounceAsync } from '@dnb/eufemia/src/shared/helpers/debounce'
import { useCallback } from 'react'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.SubmitIndicator state="pending" />
    </ComponentBox>
  )
}

export const SimpleAsyncBehavior = () => {
  return (
    <ComponentBox>
      <Form.Handler
      // enableAsyncBehavior <-- will be supported in another PR
      >
        <Card stack>
          <Field.Email path="/email" />
          <Form.ButtonRow>
            <Form.SubmitButton />
            <Button variant="tertiary">Cancel</Button>
          </Form.ButtonRow>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const AdvancedAsyncBehavior = () => {
  return (
    <ComponentBox
      scope={{
        initialData,
        firstValidator,
        secondValidator,
        thirdValidator,
        submitHandler,
        useCancelAsyncOperations,
      }}
    >
      {() => {
        const SubmitIndicatorExample = () => {
          const { cancelHandler } = useCancelAsyncOperations()

          return (
            <>
              <Form.Handler
                onSubmit={submitHandler}
                // enableAsyncBehavior={false}
                data={initialData}
              >
                <Card stack>
                  <Field.String
                    label="Field A (onBlurValidator)"
                    path="/fieldA"
                    onBlurValidator={firstValidator}
                  />

                  <FieldBlock width="large" composition>
                    <Field.String
                      label="Field B with a long label (onBlurValidator)"
                      width="medium"
                      path="/fieldB"
                      onBlurValidator={secondValidator}
                    />
                    <Field.String
                      label="Field C (validator)"
                      width="stretch"
                      path="/fieldC"
                      validator={thirdValidator}
                    />
                  </FieldBlock>

                  <Field.String
                    label="Field D (required)"
                    path="/fieldD"
                    required
                  />
                </Card>

                <Form.ButtonRow>
                  <Form.SubmitButton />

                  <Button
                    text="Stop async operations"
                    variant="secondary"
                    disabled={false}
                    onClick={cancelHandler}
                  />
                </Form.ButtonRow>
              </Form.Handler>
            </>
          )
        }

        return <SubmitIndicatorExample />
      }}
    </ComponentBox>
  )
}

const initialData = { fieldA: 'valid', fieldB: 'valid', fieldC: 'valid' }
const requestTimeoutOffset = 1000

type CreateRequestReturn = Promise<{ hasError: boolean; cancel?: boolean }>

export const createRequest = () => {
  let timeout: NodeJS.Timeout | null
  let resolvePromise: ((value?: unknown) => void) | undefined

  const fn = (t: number): CreateRequestReturn => {
    return new Promise((resolve) => {
      resolvePromise = resolve
      timeout = setTimeout(() => {
        resolve({ hasError: false })
      }, t)
    })
  }

  fn.cancel = () => {
    resolvePromise?.({ hasError: true })
    clearTimeout(timeout)
    timeout = null
  }

  return fn
}

const firstValidator = debounceAsync(async function firstValidator(
  value: string,
) {
  const start = Date.now()

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 3) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Request 1 canceled after ${String(Date.now() - start)}ms`,
    )
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (A) with invalid value: ' + value) // Show this message
  }
})

const secondValidator = debounceAsync(async function secondValidator(
  value: string,
) {
  const start = Date.now()

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 2) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Request 2 canceled after ${String(Date.now() - start)}ms`,
    )
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (B) with invalid value: ' + value) // Show this message
  }
})

const thirdValidator = debounceAsync(async function thirdValidator(
  value: string,
) {
  const start = Date.now()

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Request 3 canceled after ${String(Date.now() - start)}ms`,
    )
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (C) with invalid value: ' + value) // Show this message
  }
}, 500)

const submitHandler = debounceAsync(async function submit(data) {
  const start = Date.now()

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 2) // Simulate a submit request

  if (wasCanceled()) {
    return new Error(
      `Submit canceled after ${String(Date.now() - start)}ms`,
    )
  }
})

function useCancelAsyncOperations() {
  const cancelHandler = useCallback(() => {
    firstValidator.cancel()
    secondValidator.cancel()
    thirdValidator.cancel()
    submitHandler.cancel()
  }, [])

  return { cancelHandler }
}

export const WithinOtherComponents = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Horizontal align="center">
          <Form.SubmitButton
          // showIndicator // enableAsyncBehavior <-- will be supported in another PR
          />
          <Button variant="secondary" icon="chevron_right">
            Secondary
            <Form.SubmitIndicator state="pending" />
          </Button>
          <Button variant="tertiary">
            Tertiary
            <Form.SubmitIndicator state="pending" />
          </Button>
          <FormLabel>
            Label
            <Form.SubmitIndicator state="pending" />
          </FormLabel>
        </Flex.Horizontal>
      </Form.Handler>
    </ComponentBox>
  )
}
