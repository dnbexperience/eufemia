import { Layout, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
    </ComponentBox>
  )
}

export const OverStack = () => {
  return (
    <ComponentBox>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
      <Layout.Stack>
        <P>Stack contents</P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const OverStackWithCard = () => {
  return (
    <ComponentBox>
      <Layout.MainHeading>This is a main heading</Layout.MainHeading>
      <Layout.Stack>
        <Layout.Card>
          <P>Card contents</P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}
