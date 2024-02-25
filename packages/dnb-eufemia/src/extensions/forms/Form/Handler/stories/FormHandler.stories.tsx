import React, { useCallback } from 'react'
import { Field, FieldBlock, Form, StepsLayout } from '../../..'
import { Button, Card } from '../../../../../components'
import { debounceAsync } from '../../../../../shared/helpers'
import { P } from '../../../../../elements'

export default {
  title: 'Eufemia/Extensions/Forms/SubmitIndicator',
}

let requestTimeoutOffset = 1000
const debug = console.log

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
  value: string
) {
  const start = Date.now()
  debug('Make request 1', value, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 3) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Request 1 canceled after ${String(Date.now() - start)}ms`
    )
  } else {
    debug('Request 1 done in:', Date.now() - start)
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (A) with invalid value: ' + value) // Show this message
  }
})

const secondValidator = debounceAsync(async function secondValidator(
  value: string
) {
  const start = Date.now()
  debug('Make request 2', value, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 2) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Request 2 canceled after ${String(Date.now() - start)}ms`
    )
  } else {
    debug('Request 2 done in:', Date.now() - start)
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (B) with invalid value: ' + value) // Show this message
  }
})

const thirdValidator = debounceAsync(async function thirdValidator(
  value: string
) {
  const start = Date.now()
  debug('Make request 3', value, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Request 3 canceled after ${String(Date.now() - start)}ms`
    )
  } else {
    debug('Request 3 done in:', Date.now() - start)
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (C) with invalid value: ' + value) // Show this message
  }
}, 500)

const submitHandler = debounceAsync(async function submit(data) {
  const start = Date.now()
  debug('Submit of data started:', data, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 2) // Simulate a submit request

  if (wasCanceled()) {
    debug('Submit of data canceled after', Date.now() - start)
    return new Error('Submit of data canceled')
  } else {
    debug('Submit of data done in:', Date.now() - start)
  }
})

const initialData = { fieldA: 'valid', fieldB: 'valid', fieldC: 'valid' }

export function SubmitIndicator() {
  const { cancelHandler } = useCancelAsyncOperations()

  return (
    <>
      <Form.Handler
        id="unique"
        onSubmit={submitHandler}
        // enableAsyncBehavior={false}
        data={initialData}
      >
        <Form.MainHeading>MainHeading</Form.MainHeading>
        <Card stack>
          <Form.SubHeading>SubHeading</Form.SubHeading>

          <Field.String
            label="Field A (onBlurValidator)"
            path="/fieldA"
            onBlurValidator={firstValidator}
            // validator={firstValidator}
            // continuousValidation
            // validateInitially
            // validateUnchanged
          />

          <FieldBlock
            // info="Info at the bottom"
            width="large"
            composition
          >
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
              // validateInitially
              // required
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

      <Card top>
        <Options />
      </Card>
    </>
  )
}

function useCancelAsyncOperations() {
  const cancelHandler = useCallback(() => {
    firstValidator.cancel()
    secondValidator.cancel()
    thirdValidator.cancel()
    submitHandler.cancel()
  }, [])

  return { cancelHandler }
}

function Options() {
  const handleSliderChange = useCallback((value) => {
    requestTimeoutOffset = value
  }, [])

  return (
    <Field.Number
      width="small"
      label="Request timeout offset (ms)"
      onChange={handleSliderChange}
      value={requestTimeoutOffset}
      minimum={0}
      maximum={8000}
      step={500}
      showStepControls
    />
  )
}

const onSubmit = async function (data) {
  console.log('onSubmit', data)
  const request = createRequest()

  await request(1000) // Simulate a request
  // return new Error('My error')

  return { foo: 'bar' }

  // const { hasError } = await request(1000) // Simulate a request
  // if (hasError) {
  //   return new Error('My error')
  // }
}

const onSubmitRequest = () => {
  console.log('onSubmitRequest')
}
const onSubmitComplete = (data, result) => {
  console.log('onSubmitComplete', data, result)
}

export function SubmitIndicatorSimpleForm() {
  return (
    <Form.Handler
      onSubmit={onSubmit}
      onSubmitRequest={onSubmitRequest}
      onSubmitComplete={onSubmitComplete}
      // enableAsyncBehavior={true}
    >
      <Card stack>
        {/* <Field.String
          label="Name"
          path="/myField"
          validator={firstValidator}
        /> */}
        <Field.String label="Name" path="/myField" />
      </Card>
      <Form.ButtonRow>
        <Form.SubmitButton
        // variant="send"
        />
      </Form.ButtonRow>
    </Form.Handler>
  )
}

export const StepsLayoutAsync = () => {
  const onSubmit = async function (data) {
    console.log('onSubmit', data)
    const request = createRequest()

    await request(1000) // Simulate a request
    // return new Error('My error')

    return { foo: 'bar' }

    // const { hasError } = await request(1000) // Simulate a request
    // if (hasError) {
    //   return new Error('My error')
    // }
  }

  const onStepChange = async function (index, mode) {
    console.log('onStepChange', index)

    if (mode === 'next') {
      const request = createRequest()
      await request(1000) // Simulate a request
    }
    // return new Error('My error')

    return { foo: 'bar' }

    // const { hasError } = await request(1000) // Simulate a request
    // if (hasError) {
    //   return new Error('My error')
    // }
  }

  return (
    <Form.Handler onSubmit={onSubmit} data={initialData}>
      <StepsLayout mode="loose" onStepChange={onStepChange}>
        <StepsLayout.Step title="Step 1">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <Field.String
              label="Field A (onBlurValidator)"
              path="/fieldA"
              // onBlurValidator={firstValidator}
              // validator={firstValidator}
              // continuousValidation
              // validateInitially
              // validateUnchanged
            />
          </Card>
          <Card>
            <Field.String
              label="Field B with a long label (onBlurValidator)"
              width="medium"
              path="/fieldB"
              // onBlurValidator={secondValidator}
            />
          </Card>
          <Card>
            <Field.String
              label="Field C (validator)"
              width="stretch"
              path="/fieldC"
              validator={thirdValidator}
              // validateInitially
              // required
            />
          </Card>

          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Form.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <Field.String
              label="Field C (validator)"
              width="stretch"
              path="/fieldX"
              // validator={thirdValidator}
              // validateInitially
              required
            />
          </Card>

          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Form.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Summary">
          <Form.MainHeading>Summary</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>

          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </StepsLayout.Step>
      </StepsLayout>
    </Form.Handler>
  )
}
