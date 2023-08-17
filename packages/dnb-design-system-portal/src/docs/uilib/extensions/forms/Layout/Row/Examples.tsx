import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout }}>
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
    <ComponentBox scope={{ Layout }}>
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
