import React, { useCallback, useEffect } from 'react'
import { Field, Form } from '../../..'
import { Button, GlobalStatus } from '../../../../../components'
import { debounceAsync } from '../../../../../shared/helpers'

export default {
  title: 'Eufemia/Extensions/Forms/FormHandler',
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
  debug('Validation request 1', value, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 3) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Validation request 1 canceled after ${String(Date.now() - start)}ms`
    )
  } else {
    debug('Validation request 1 done in:', Date.now() - start)
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (A) with invalid value: ' + value) // Show this message
  }
})

const secondValidator = debounceAsync(async function secondValidator(
  value: string
) {
  const start = Date.now()
  debug('Validation request 2', value, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 1) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Validation request 2 canceled after ${String(Date.now() - start)}ms`
    )
  } else {
    debug('Validation request 2 done in:', Date.now() - start)
  }

  if (!wasCanceled() && value !== 'valid') {
    return new Error('Custom error (B) with invalid value: ' + value) // Show this message
  }
})

const thirdValidator = debounceAsync(async function thirdValidator(
  value: string
) {
  const start = Date.now()
  debug('Validation request 3', value, start)

  const request = createRequest()
  const wasCanceled = this.addCancelEvent(request.cancel)
  await request(requestTimeoutOffset * 2) // Simulate a request

  if (wasCanceled()) {
    return new Error(
      `Validation request 3 canceled after ${String(Date.now() - start)}ms`
    )
  } else {
    debug('Validation request 3 done in:', Date.now() - start)
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

export function AdvancedForm() {
  const { cancelHandler } = useCancelAsyncOperations()

  return (
    <>
      <Form.Handler onSubmit={submitHandler} data={initialData}>
        <Form.MainHeading>MainHeading</Form.MainHeading>
        <Form.Card>
          <Form.SubHeading>SubHeading</Form.SubHeading>

          <Field.String
            label="Field A (onBlurValidator)"
            path="/fieldA"
            onBlurValidator={firstValidator}
            // onChangeValidator={firstValidator}
            // validateContinuously
            // validateInitially
            // validateUnchanged
          />

          <Field.Composition
            // info="Info at the bottom"
            width="large"
          >
            <Field.String
              label="Field B with a long label (onBlurValidator) x"
              width="medium"
              path="/fieldB"
              onBlurValidator={secondValidator}
            />
            <Field.String
              label="Field C (onChangeValidator)"
              width="stretch"
              path="/fieldC"
              onChangeValidator={thirdValidator}
              // validateInitially
              // required
            />
          </Field.Composition>

          <Field.String
            label="Field D (required)"
            path="/fieldD"
            required
          />
        </Form.Card>

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

      <Form.Card top>
        <Options />
      </Form.Card>
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
  return {
    error: Error('My error'),
    warning: 'Message',
    info: 'Info',
    // status: 'pending',
  } as const
}

const onFormChange = debounceAsync(async function (data) {
  console.log('onFormChange', data)
  const request = createRequest()

  await request(500) // Simulate a request
  console.log('onFormChange done')

  // return new Error('My error')
  return { warning: 'Warning message' }
}, 500)

const onFieldChange = debounceAsync(async function (value) {
  console.log('onFieldChange with value', value)
  const request = createRequest()

  await request(500) // Simulate a request
  console.log('onFieldChange done', value)

  // return new Error('My error')
  return { info: value || null, success: 'saved' } as const
}, 500)

const onSubmitRequest = () => {
  console.log('onSubmitRequest')
}
const onSubmitComplete = (data, result) => {
  console.log('onSubmitComplete', data, result)
}

export function SimpleForm() {
  return (
    <Form.Handler
      onSubmit={onSubmit}
      onChange={onFormChange}
      onSubmitRequest={onSubmitRequest}
      onSubmitComplete={onSubmitComplete}
    >
      <Form.Card>
        <Field.String
          value="vali"
          label="Name"
          path="/myField1"
          onChangeValidator={secondValidator}
          onBlurValidator={thirdValidator}
          onChange={onFieldChange}
        />
        <Field.String
          label="This is a long label that will wrap after a certain length"
          path="/myField2"
          onChange={onFieldChange}
        />
      </Form.Card>
      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Handler>
  )
}

const delay = debounceAsync(async function () {
  try {
    const request = createRequest()
    await request(1000) // Simulate a request
  } catch (error) {
    return error
  }
})

export function SubmitIndicator() {
  return (
    <Form.Handler onSubmit={delay}>
      <Form.Card>
        <Field.String path="/myField" label="Label" />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Form.Card>
    </Form.Handler>
  )
}

export function GlobalStatusStory() {
  return (
    <>
      <GlobalStatus />

      <Form.Handler id="my-form" onSubmit={delay}>
        <Form.MainHeading>Heading</Form.MainHeading>
        <Form.Card>
          <Field.String
            path="/myField"
            label="Label"
            required
            minLength={5}
          />
          <Form.ButtonRow>
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Form.Card>
      </Form.Handler>
    </>
  )
}

export function UseValidation() {
  // const { setFieldStatus } = Form.useValidation('my-form')
  // useEffect(() => {
  //   setTimeout(() => {
  //     setFieldStatus('/myField', { error: new Error('Error message') })
  //   }, 100)
  //   setTimeout(() => {
  //     setFieldStatus('/myField', undefined)
  //   }, 1400)
  // }, [setFieldStatus])

  return (
    <Form.Handler
      id="my-form"
      onSubmit={(data) => {
        console.log('onSubmit', data)
      }}
    >
      <Field.String label="Test" path="/myField" />

      <UseValidationComponent />

      <Form.SubmitButton top />
    </Form.Handler>
  )
}

function UseValidationComponent() {
  const { setFieldStatus } = Form.useValidation()

  useEffect(() => {
    setTimeout(() => {
      setFieldStatus('/myField', {
        error: new Error('Error message'),
        warning: 'Warning message',
        info: 'Info message',
      })
    }, 100)
    setTimeout(() => {
      setFieldStatus('/myField', { warning: null })
      setFieldStatus('/myField', { info: null })
      setFieldStatus('/myField', { error: null })
    }, 1400)
    setTimeout(() => {
      setFieldStatus('/myField', { info: 'TEst' })
      // setFieldStatus('/myField', { error: new Error('New message') })
    }, 2400)
  }, [setFieldStatus])

  return null
}
