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
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <Card>
            <P>Contents</P>
          </Card>
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Form.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Summary">
          <Form.MainHeading>Summary</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <StepsLayout.PreviousButton />
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}

export const Drawer = () => {
  return (
    <ComponentBox
      scope={{ StepsLayout }}
      data-visual-test="steps-layout-drawer"
    >
      <StepsLayout variant="drawer">
        <StepsLayout.Step title="Step 1">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <Card>
            <P>Contents</P>
          </Card>
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <Form.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Form.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Summary">
          <Form.MainHeading>Summary</Form.MainHeading>
          <Card>
            <P>Contents</P>
          </Card>
          <StepsLayout.PreviousButton />
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}
