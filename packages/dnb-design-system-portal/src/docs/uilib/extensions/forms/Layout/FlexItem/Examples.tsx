import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Layout,
  TestElement,
  Field,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, Field }}>
      <Layout.FlexItem>Contents</Layout.FlexItem>
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, Field }}>
      <Layout.Card>
        <p>No width (default)</p>
        <Layout.FlexItem>
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
        <p>Small</p>
        <Layout.FlexItem width="small">
          <TestElement>Cont.</TestElement>
        </Layout.FlexItem>
        <p>Medium</p>
        <Layout.FlexItem width="medium">
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
        <p>Large</p>
        <Layout.FlexItem width="large">
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
      </Layout.Card>
    </ComponentBox>
  )
}
