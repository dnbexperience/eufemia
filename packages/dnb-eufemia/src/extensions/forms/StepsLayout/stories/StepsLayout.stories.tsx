import React from 'react'
import StepsLayout from '../StepsLayout'
import { P } from '../../../../elements'
import { Card } from '../../../../components'
import { Form } from '../../Forms'

export default {
  title: 'Eufemia/Extensions/Forms/StepsLayout',
}

export const StepsLayoutSandbox = () => {
  return (
    <>
      <StepsLayout
        noAnimation={false}
        title="Min tittel"
        mode="strict"
        variant="drawer"
      >
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

      <StepsLayout
        noAnimation={false}
        title="Min tittel"
        mode="strict"
        variant="sidebar"
      >
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
