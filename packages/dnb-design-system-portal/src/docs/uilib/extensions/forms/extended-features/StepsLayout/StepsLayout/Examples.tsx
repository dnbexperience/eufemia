import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'
import { StepsLayout, Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ StepsLayout, Form }}>
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <Layout.MainHeading>Step 1</Layout.MainHeading>
          <Layout.Card>
            <P>Step 1 contents</P>
          </Layout.Card>
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
