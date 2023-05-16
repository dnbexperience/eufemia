import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Layout, StepsLayout } from '@dnb/eufemia/src/extensions/forms'
import { Button } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, StepsLayout }}>
      <Layout.ButtonRow>
        <StepsLayout.PreviousButton />
        <StepsLayout.NextButton />
        <Button>Other button</Button>
      </Layout.ButtonRow>
    </ComponentBox>
  )
}
