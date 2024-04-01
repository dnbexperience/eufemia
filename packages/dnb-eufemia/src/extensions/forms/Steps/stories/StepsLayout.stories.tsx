import React, { useCallback } from 'react'
import { P } from '../../../../elements'
import { Button, Card } from '../../../../components'
import Field, { Form, Steps } from '../../Forms'
import { createRequest } from '../../Form/Handler/stories/FormHandler.stories'
import { debounceAsync } from '../../../../shared/helpers'
// import { BrowserRouter, useSearchParams } from 'react-router-dom'
// import {
//   navigate,
//   useLocation,
//   Router as ReachRouter,
// } from '@reach/router'

export default {
  title: 'Eufemia/Extensions/Forms/StepsLayout',
}

const Step1 = () => {
  return (
    <Steps.Step title="Step 1">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Steps.Buttons />
    </Steps.Step>
  )
}
const Step2 = () => {
  return (
    <Steps.Step title="Step 2">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Steps.Buttons />
    </Steps.Step>
  )
}
const Step3 = () => {
  return (
    <Steps.Step title="Summary">
      <Form.MainHeading>Summary</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Steps.Buttons />
    </Steps.Step>
  )
}

export const StepsLayoutFlex = () => {
  return (
    <Steps.Layout mode="loose" variant="drawer">
      <Step1 />
      <Step2 />
      <Step3 />
    </Steps.Layout>
  )
}

const validator1 = debounceAsync(async (value) => {
  console.log('validator1', value)
  const request = createRequest()
  await request(300) // Simulate a request

  if (value === 'invalid') {
    return Error('Error message')
  }
})
const validator2 = debounceAsync(async (value) => {
  console.log('validator2', value)
  const request = createRequest()
  await request(300) // Simulate a request

  if (value === 'invalid') {
    return Error('Error message')
  }
})

export function AsyncStepChange() {
  const onStepChange = useCallback(async (index, mode) => {
    console.log('onStepChange', index)

    if (mode === 'next') {
      const request = createRequest()
      await request(300) // Simulate a request
    }

    return { info: 'Info message: ' + index }
  }, [])

  const onSubmit = useCallback(async (data) => {
    console.log('onSubmit', data)

    const request = createRequest()
    await request(300) // Simulate a request

    return { warning: 'Warning message' }
  }, [])

  const { setActiveIndex } = Steps.useStep('unique-steps')

  const ChildUsingTheHook = () => {
    const { setActiveIndex } = Steps.useStep()
    return (
      <Button variant="secondary" onClick={() => setActiveIndex(1)}>
        Goto 2
      </Button>
    )
  }

  return (
    <Form.Handler onSubmit={onSubmit}>
      <Steps.Layout
        onStepChange={onStepChange}
        id="unique-steps"
        mode="loose"
        // variant="drawer"
      >
        <Steps.Step title="Step 1">
          <Card stack>
            <Field.String
              label="Required field with async validator"
              validator={validator1}
              path="/field1"
              required
            />
            <Field.String
              label="Field with async validator"
              validator={validator2}
              path="/field2"
            />
          </Card>
          <Form.ButtonRow>
            <Steps.PreviousButton />
            <Steps.NextButton />
            <Button variant="secondary" onClick={() => setActiveIndex(1)}>
              Goto 2
            </Button>
            <ChildUsingTheHook />
          </Form.ButtonRow>
        </Steps.Step>

        <Steps.Step title="Step 2">
          <Card stack>
            <Field.String label="Field 3" path="/field3" required />
          </Card>
          <Form.ButtonRow>
            <Steps.PreviousButton />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Steps.Step>
      </Steps.Layout>
    </Form.Handler>
  )
}

function RouterStepsLayout() {
  const Step1 = () => {
    return (
      <Steps.Step>
        <Card stack>
          <P>foo</P>
          <P>bar</P>
          <Field.String />
        </Card>
        <Steps.Buttons />
      </Steps.Step>
    )
  }

  Steps.useQueryLocator('steps-with-router')
  // Steps.useReactRouter('steps-with-router', { useSearchParams })
  // Steps.useReachRouter('steps-with-router', { useLocation, navigate })

  return (
    <Form.Handler>
      <Steps.Layout id="steps-with-router">
        <Step1 />
        <Step1 />
      </Steps.Layout>
    </Form.Handler>
  )
}

export function WithRouter() {
  return <RouterStepsLayout />
}
// export function WithRouter() {
//   return (
//     <BrowserRouter>
//       <ReachRouter>
//         <RouterStepsLayout default />
//       </ReachRouter>
//     </BrowserRouter>
//   )
// }
