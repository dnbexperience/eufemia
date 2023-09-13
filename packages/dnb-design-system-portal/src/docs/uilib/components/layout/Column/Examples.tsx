import { Layout } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.Column>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.Column>
    </ComponentBox>
  )
}
