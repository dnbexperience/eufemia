import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.Row>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.Row>
    </ComponentBox>
  )
}

export const FlexGrowItems = () => {
  return (
    <ComponentBox>
      <Layout.Row>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
      </Layout.Row>
    </ComponentBox>
  )
}
