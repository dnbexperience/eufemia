import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Card, P } from '@dnb/eufemia/src'
import { StepsLayout, Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox
      scope={{ StepsLayout }}
      data-visual-test="steps-layout-card-border"
    >
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <Form.MainHeading>Step 1</Form.MainHeading>
          <Card>
            <P>Step 1 contents</P>
          </Card>
          <StepsLayout.NextButton />
        </StepsLayout.Step>
        <StepsLayout.Step title="Step 2">
          <P>Step 2 contents</P>
          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Form.ButtonRow>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <P>Step 3 contents</P>
          <StepsLayout.PreviousButton />
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}
