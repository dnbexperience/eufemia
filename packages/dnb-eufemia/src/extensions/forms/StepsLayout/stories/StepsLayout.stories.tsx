import React, { useCallback } from 'react'
import StepsLayout from '../StepsLayout'
import { P } from '../../../../elements'
import { Button, Card, Flex } from '../../../../components'
import Field, { Form } from '../../Forms'
import { createRequest } from '../../Form/Handler/stories/FormHandler.stories'
import { debounceAsync } from '../../../../shared/helpers'

export default {
  title: 'Eufemia/Extensions/Forms/StepsLayout',
}

// By using this code, we can look up the direct children of the component and apply a FlexContainer around them.
// This is useful when we don't want to use the `Flex.withChildren` HOC on the children as well.
// But it can have negative side effects by rendering a component twice.
// So the recommended way is to use `Flex.Stack` in the externalized Step component itself.
//
// Example fo
// if (typeof child.type === 'function') {
//   const r = child.type.apply(child.type, [child.props])
//   if (r?.type === React.Fragment) {
//     return (
//       <FlexContainer {...props}>{r.props.children}</FlexContainer>
//     )
//   }
// }

// const Child1 = () => {
//   return (
//     <>
//       <Card>Contents</Card>
//       <Card>Contents</Card>
//     </>
//   )
// }
// const Child2 = Flex.withChildren(() => {
//   return (
//     <>
//       <Card>Contents</Card>
//       <Card>Contents</Card>
//     </>
//   )
// })
const Child3 = () => {
  return (
    <Flex.Stack>
      <Card>Contents</Card>
      <Card>Contents</Card>
    </Flex.Stack>
  )
}

export const StepsLayoutFlex = () => {
  return (
    <StepsLayout mode="loose" variant="drawer">
      <StepsLayout.Step title="Step 1">
        <Form.MainHeading>Heading</Form.MainHeading>
        {/* <Child1 /> */}
        {/* <Child2 /> */}
        <Child3 />
      </StepsLayout.Step>

      <StepsLayout.Step title="Step 2">
        <Form.MainHeading>Heading</Form.MainHeading>
        <Card>
          <P>Contents</P>
        </Card>
      </StepsLayout.Step>

      <StepsLayout.Step title="Summary">
        <Form.MainHeading>Summary</Form.MainHeading>
        <Card>
          <P>Contents</P>
        </Card>
      </StepsLayout.Step>
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
