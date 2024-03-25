import React, { useCallback } from 'react'
import StepsLayout from '../StepsLayout'
import { P } from '../../../../elements'
import { Button, Card } from '../../../../components'
import Field, { Form } from '../../Forms'
import { createRequest } from '../../Form/Handler/stories/FormHandler.stories'
import { debounceAsync } from '../../../../shared/helpers'

export default {
  title: 'Eufemia/Extensions/Forms/StepsLayout',
}

const Step1 = () => {
  return (
    <StepsLayout.Step title="Step 1">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <StepsLayout.Buttons />
    </StepsLayout.Step>
  )
}
const Step2 = () => {
  return (
    <StepsLayout.Step title="Step 2">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <StepsLayout.Buttons />
    </StepsLayout.Step>
  )
}
const Step3 = () => {
  return (
    <StepsLayout.Step title="Summary">
      <Form.MainHeading>Summary</Form.MainHeading>
      <Card stack>
        <P>Contents</P>
        <P>Contents</P>
      </Card>
      <StepsLayout.Buttons />
    </StepsLayout.Step>
  )
}

export const StepsLayoutFlex = () => {
  return (
    <StepsLayout mode="loose" variant="drawer">
      <Step1 />
      <Step2 />
      <Step3 />
    </StepsLayout>
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

  const { setActiveIndex } = StepsLayout.useStep('unique-steps')

  const ChildUsingTheHook = () => {
    const { setActiveIndex } = StepsLayout.useStep()
    return (
      <Button variant="secondary" onClick={() => setActiveIndex(1)}>
        Goto 2
      </Button>
    )
  }

  return (
    <Form.Handler onSubmit={onSubmit}>
      <StepsLayout
        onStepChange={onStepChange}
        id="unique-steps"
        mode="loose"
        // variant="drawer"
      >
        <StepsLayout.Step title="Step 1">
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
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
            <Button variant="secondary" onClick={() => setActiveIndex(1)}>
              Goto 2
            </Button>
            <ChildUsingTheHook />
          </Form.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <Card stack>
            <Field.String label="Field 3" path="/field3" required />
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

export function UseStep() {
  const Step1 = () => {
    const { setActiveIndex, activeIndex } = StepsLayout.useStep()
    return (
      <StepsLayout.Step>
        <Card stack>
          <P>foo</P>
          <P>bar</P>
        </Card>
        <Form.ButtonRow>
          <Button
            top
            onClick={() => {
              setActiveIndex(activeIndex + 1)
            }}
          >
            Next
          </Button>
        </Form.ButtonRow>
      </StepsLayout.Step>
    )
  }

  return (
    <Form.Handler>
      <StepsLayout>
        <Step1 />
        <Step1 />
      </StepsLayout>
    </Form.Handler>
  )
}
