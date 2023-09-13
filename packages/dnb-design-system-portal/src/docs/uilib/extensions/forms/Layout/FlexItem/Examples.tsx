import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
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
        <P>No width (default)</P>
        <Layout.FlexItem>
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
        <P>Small</P>
        <Layout.FlexItem width="small">
          <TestElement>Cont.</TestElement>
        </Layout.FlexItem>
        <P>Medium</P>
        <Layout.FlexItem width="medium">
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
        <P>Large</P>
        <Layout.FlexItem width="large">
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
      </Layout.Card>
    </ComponentBox>
  )
}
