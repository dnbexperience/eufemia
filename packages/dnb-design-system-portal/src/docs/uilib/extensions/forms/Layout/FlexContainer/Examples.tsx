import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Layout,
  TestElement,
  DataInput,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.Card>
        <Layout.FlexContainer>
          <Layout.FlexItem>
            <TestElement>FlexItem</TestElement>
          </Layout.FlexItem>
          <Layout.FlexItem>
            <TestElement>FlexItem</TestElement>
          </Layout.FlexItem>
          <Layout.FlexItem>
            <TestElement>FlexItem</TestElement>
          </Layout.FlexItem>
          <Layout.FlexItem>
            <TestElement>FlexItem</TestElement>
          </Layout.FlexItem>
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const RowWithFlexItem = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="row">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const RowWithFlexItemJustifyCenter = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="row" justify="center">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const RowWithFlexItemJustifyFlexEnd = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="row" justify="flex-end">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const RowWithCard = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="row">
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const RowWithDataInputString = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="row">
        <DataInput.String label="Label" value="Foo" />
        <DataInput.String label="Label" value="Foo" />
        <DataInput.String label="Label" value="Foo" />
        <DataInput.String label="Label" value="Foo" />
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ColumnWithFlexItem = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="column">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ColumnWithCard = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.FlexContainer direction="column">
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ColumnWithDataInputString = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.Card>
        <Layout.FlexContainer direction="column">
          <DataInput.String label="Label" value="Foo" />
          <DataInput.String label="Label" value="Foo" />
          <DataInput.String label="Label" value="Foo" />
          <DataInput.String label="Label" value="Foo" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const ColumnSpaceDivider = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.Card>
        <Layout.FlexContainer direction="column" divider="space">
          <DataInput.String label="Label" value="Value" />
          <DataInput.String label="Label" value="Value" />
          <DataInput.String label="Label" value="Value" />
          <DataInput.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const ColumnLineDivider = () => {
  return (
    <ComponentBox scope={{ Layout, TestElement, DataInput }}>
      <Layout.Card>
        <Layout.FlexContainer direction="column" divider="line">
          <DataInput.String label="Label" value="Value" />
          <DataInput.String label="Label" value="Value" />
          <DataInput.String label="Label" value="Value" />
          <DataInput.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}
