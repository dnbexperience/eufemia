import React, { useCallback } from 'react'
import { P } from '../../../../elements'
import { Button } from '../../../../components'
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
  const onSubmit = useCallback((data) => {
    console.log('onSubmit', data)
  }, [])

  return (
    <Form.Handler onSubmit={onSubmit}>
      <Wizard.Container
        onStepChange={onStepChange}
        mode="loose"
        // validationMode="bypassOnNavigation"
        initialActiveIndex={2}
      >
        <Wizard.Step title="Step 1">
          <Field.String
            label="Step 1"
            path="/step1"
            required
            // validateInitially
          />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <Field.String label="Step 2" path="/step2" required />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 3">
          <Field.String label="Step 3" path="/step3" />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>

      <Form.SubmitButton />
    </Form.Handler>
  )
}

export const WizardDynamicStepsIncludeWhen = () => {
  const { createSnapshot, revertSnapshot } = Form.useSnapshot('my-form')
  return (
    <Form.Handler id="my-form" defaultData={{ includedSteps: 'group-a' }}>
      <Wizard.Container
        onStepChange={(index, mode, args) => {
          console.log(
            'onStepChange',
            index,
            mode,
            args.id,
            args.previousStep
          )

          if (mode === 'previous') {
            revertSnapshot(args.id, 'my-snapshot-slice')
          } else {
            createSnapshot(args.previousStep.id, 'my-snapshot-slice')
          }
        }}
      >
        <Wizard.Step
          title="Step A"
          includeWhen={{ path: '/includedSteps', hasValue: 'group-a' }}
          id="step-a"
        >
          <Form.MainHeading>Step A</Form.MainHeading>

          <Form.Snapshot name="my-snapshot-slice">
            <Field.String path="/foo" label="Will be reverted" />
          </Form.Snapshot>

          <Field.String path="/bar" label="Will stay" />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step
          title="Step B"
          includeWhen={{ path: '/includedSteps', hasValue: 'group-a' }}
          id="step-b"
        >
          <Form.MainHeading>Step B</Form.MainHeading>
          <Field.String path="/foo" label="Will be reverted" />
          <Field.String path="/bar" label="Will stay" />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step
          title="Step C"
          includeWhen={{
            path: '/includedSteps',
            hasValue: (value: string) =>
              ['group-a', 'group-b'].includes(value),
          }}
          id="step-c"
        >
          <Form.MainHeading>Step C</Form.MainHeading>
          <Field.String path="/foo" label="Content" />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step
          title="Step D"
          includeWhen={{ path: '/includedSteps', hasValue: 'group-b' }}
          id="step-d"
        >
          <Form.MainHeading>Step D</Form.MainHeading>
          <Field.String path="/foo" label="Content" />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>

      <Field.Selection
        path="/includedSteps"
        variant="button"
        optionsLayout="horizontal"
        top
      >
        <Field.Option value="group-a" title="Group A" />
        <Field.Option value="group-b" title="Group B" />
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
          <Form.Card>
            <Field.String
              label="Required field with async onChangeValidator"
              onChangeValidator={validator1}
              path="/field1"
              required
            />
            <Field.String
              label="Field with async onChangeValidator"
              onChangeValidator={validator2}
              path="/field2"
            />
          </Form.Card>
          <Form.ButtonRow>
            <Wizard.Buttons />
            <Button variant="secondary" onClick={() => setActiveIndex(1)}>
              Goto 2
            </Button>
            <ChildUsingTheHook />
          </Form.ButtonRow>
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <Form.Card>
            <Field.String label="Field 3" path="/field3" required />
          </Form.Card>
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
        <Form.Card>
          <P>foo</P>
          <P>bar</P>
          <Field.String />
        </Form.Card>
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
