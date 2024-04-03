import React, { useCallback } from 'react'
import { P } from '../../../../elements'
import { Button, Card } from '../../../../components'
import Field, { Form, Wizard } from '../../Forms'
import { createRequest } from '../../Form/Handler/stories/FormHandler.stories'
import { debounceAsync } from '../../../../shared/helpers'
// import { BrowserRouter, useSearchParams } from 'react-router-dom'
// import {
//   navigate,
//   useLocation,
//   Router as ReachRouter,
// } from '@reach/router'

export default {
  title: 'Eufemia/Extensions/Forms/WizardLayout',
}

const Step1 = () => {
  return (
    <Wizard.Step title="Step 1">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Step2 = () => {
  return (
    <Wizard.Step title="Step 2">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Step3 = () => {
  return (
    <Wizard.Step title="Summary">
      <Form.MainHeading>Summary</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Wizard.Buttons />
    </Wizard.Step>
  )
}

export const WizardLayoutFlex = () => {
  return (
    <Wizard.Layout mode="loose" variant="drawer">
      <Step1 />
      <Step2 />
      <Step3 />
    </Wizard.Layout>
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

  const { setActiveIndex } = Wizard.useStep('unique-wizard')

  const ChildUsingTheHook = () => {
    const { setActiveIndex } = Wizard.useStep()
    return (
      <Button variant="secondary" onClick={() => setActiveIndex(1)}>
        Goto 2
      </Button>
    )
  }

  return (
    <Form.Handler onSubmit={onSubmit}>
      <Wizard.Layout
        onStepChange={onStepChange}
        id="unique-wizard"
        mode="loose"
        // variant="drawer"
      >
        <Wizard.Step title="Step 1">
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
            <Wizard.PreviousButton />
            <Wizard.NextButton />
            <Button variant="secondary" onClick={() => setActiveIndex(1)}>
              Goto 2
            </Button>
            <ChildUsingTheHook />
          </Form.ButtonRow>
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <Card stack>
            <Field.String label="Field 3" path="/field3" required />
          </Card>
          <Form.ButtonRow>
            <Wizard.PreviousButton />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Layout>
    </Form.Handler>
  )
}

function RouterWizardLayout() {
  const Step1 = () => {
    return (
      <Wizard.Step>
        <Card stack>
          <P>foo</P>
          <P>bar</P>
          <Field.String />
        </Card>
        <Wizard.Buttons />
      </Wizard.Step>
    )
  }

  Wizard.useQueryLocator('wizard-with-router')
  // Wizard.useReactRouter('wizard-with-router', { useSearchParams })
  // Wizard.useReachRouter('wizard-with-router', { useLocation, navigate })

  return (
    <Form.Handler>
      <Wizard.Layout id="wizard-with-router">
        <Step1 />
        <Step1 />
      </Wizard.Layout>
    </Form.Handler>
  )
}

export function WithRouter() {
  return <RouterWizardLayout />
}
// export function WithRouter() {
//   return (
//     <BrowserRouter>
//       <ReachRouter>
//         <RouterWizardLayout default />
//       </ReachRouter>
//     </BrowserRouter>
//   )
// }
