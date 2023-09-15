import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Layout, StepsLayout } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, StepsLayout }}>
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
          <Layout.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Layout.ButtonRow>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <P>Step 3 contents</P>
          <StepsLayout.PreviousButton />
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}
