import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Layout, StepsLayout } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, StepsLayout }}>
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <div>
            <P>Step 1 contents</P>
            <StepsLayout.NextButton />
          </div>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <div>
            <P>Step 2 contents</P>
            <Layout.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Layout.ButtonRow>
          </div>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <div>
            <P>Step 3 contents</P>
            <StepsLayout.PreviousButton />
          </div>
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}
