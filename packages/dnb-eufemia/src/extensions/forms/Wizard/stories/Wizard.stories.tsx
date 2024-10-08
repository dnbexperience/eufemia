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
  title: 'Eufemia/Extensions/Forms/WizardContainer',
}

export const Basic = () => {
  const onStepChange = useCallback(async (index, mode) => {
    console.log('onStepChange', index, mode)
  }, [])
  return (
    <Form.Handler>
      <Wizard.Container
        onStepChange={onStepChange}
        mode="loose"
        variant="drawer"
      >
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.NextButton />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}

export const WizardDynamicStepsActiveWhen = () => {
  return (
    <Form.Handler defaultData={{ activeSteps: 'group-1' }}>
      <Wizard.Container
        onStepChange={(index, mode, args) => {
          console.log(
            'onStepChange',
            index,
            mode,
            args.id,
            args.previousIndex
          )
        }}
      >
        <Wizard.Step
          title="Step A"
          activeWhen={{ path: '/activeSteps', hasValue: 'group-1' }}
          id="step-a"
        >
          <Form.MainHeading>Step A</Form.MainHeading>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step
          title="Step B"
          activeWhen={{ path: '/activeSteps', hasValue: 'group-1' }}
          id="step-b"
        >
          <Form.MainHeading>Step B</Form.MainHeading>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step
          title="Step C"
          activeWhen={{
            path: '/activeSteps',
            hasValue: (value: string) =>
              ['group-1', 'group-2'].includes(value),
          }}
          id="step-c"
        >
          <Form.MainHeading>Step C</Form.MainHeading>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step
          title="Step D"
          activeWhen={{ path: '/activeSteps', hasValue: 'group-2' }}
          id="step-d"
        >
          <Form.MainHeading>Step D</Form.MainHeading>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>

      <Field.Selection
        path="/activeSteps"
        variant="button"
        optionsLayout="horizontal"
        top
      >
        <Field.Option value="group-1" title="Group 1" />
        <Field.Option value="group-2" title="Group 2" />
      </Field.Selection>
    </Form.Handler>
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
      <Wizard.Container
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
            <Wizard.Buttons />
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
            <Wizard.Buttons />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}

function RouterWizardContainer() {
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
      <Wizard.Container id="wizard-with-router">
        <Step1 />
        <Step1 />
      </Wizard.Container>
    </Form.Handler>
  )
}

export function WithRouter() {
  return <RouterWizardContainer />
}
// export function WithRouter() {
//   return (
//     <BrowserRouter>
//       <ReachRouter>
//         <RouterWizardContainer default />
//       </ReachRouter>
//     </BrowserRouter>
//   )
// }
