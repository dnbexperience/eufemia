import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { StepsLayout } from '@dnb/eufemia/src/extensions/forms'
import { Button, Layout } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox scope={{ StepsLayout }}>
      <Layout.ButtonRow>
        <StepsLayout.PreviousButton />
        <StepsLayout.NextButton />
        <Button>Other button</Button>
      </Layout.ButtonRow>
    </ComponentBox>
  )
}
