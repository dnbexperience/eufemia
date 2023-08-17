import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Layout, StepsLayout } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, StepsLayout }}>
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <div>
            <p>Step 1 contents</p>
            <StepsLayout.NextButton />
          </div>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <div>
            <p>Step 2 contents</p>
            <Layout.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Layout.ButtonRow>
          </div>
        </StepsLayout.Step>
        <StepsLayout.Step>
          <div>
            <p>Step 3 contents</p>
            <StepsLayout.PreviousButton />
          </div>
        </StepsLayout.Step>
      </StepsLayout>
    </ComponentBox>
  )
}
