import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'
import { StepsLayout } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ StepsLayout }}>
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <>
            <P>Step 1 contents</P>
            <StepsLayout.NextButton />
          </>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <>
            <P>Step 2 contents</P>
            <Layout.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Layout.ButtonRow>
          </>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <>
            <P>Step 3 contents</P>
            <StepsLayout.PreviousButton />
          </>
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}
