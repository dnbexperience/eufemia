import React from 'react'
import StepsLayout from '../StepsLayout'
import { P } from '../../../../elements'
import { Card } from '../../../../components'
import { Form } from '../../Forms'
import { createRequest } from '../../Form/Handler/stories/FormHandler.stories'

export default {
  title: 'Eufemia/Extensions/Forms/StepsLayout',
}

export const StepsLayoutSandbox = () => {
  return (
    <>
      <StepsLayout mode="loose" variant="drawer">
        <StepsLayout.Step title="Step 1">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <Card>
            <P>Contents</P>
          </Card>
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

      <StepsLayout mode="loose" variant="sidebar">
        <StepsLayout.Step title="Step 1">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <Card>
            <P>Contents</P>
          </Card>
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
    </>
  )
}

export function AsyncStepChange() {
  const onChange = async (index) => {
    console.log('onChange', index)
    const request = createRequest()

    await request(1000) // Simulate a request)
  }

  return (
    <Form.Handler onSubmit={onChange}>
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Form.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <Form.SubmitButton />
          </Form.ButtonRow>
        </StepsLayout.Step>
      </StepsLayout>
    </Form.Handler>
  )
}
