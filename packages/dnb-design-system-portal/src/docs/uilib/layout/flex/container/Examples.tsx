import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Card, Flex } from '@dnb/eufemia/src'
import {
  TestElement,
  Field,
  Form,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFieldString = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-field"
    >
      <Flex.Container>
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" width="medium" />
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItemJustifyCenter = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container justify="center">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItemJustifyFlexEnd = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container justify="flex-end">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container direction="vertical">
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalWithCard = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container direction="vertical">
        <Card>Card contents</Card>
        <Card>Card contents</Card>
        <Card>Card contents</Card>
      </Flex.Container>
    </ComponentBox>
  )
}

export const VerticalWithFieldString = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Card>
        <Flex.Container direction="vertical">
          <Field.String label="Label" value="Foo" />
          <Field.String label="Label" value="Foo" />
        </Flex.Container>
      </Card>
    </ComponentBox>
  )
}

export const VerticalLineDivider = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-divider"
    >
      <Card>
        <Flex.Container direction="vertical" divider="line">
          <Form.SubHeading>Heading</Form.SubHeading>
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Flex.Container>
      </Card>
    </ComponentBox>
  )
}

export const LayoutHorizontalFlexGrowItems = () => {
  return (
    <ComponentBox>
      <Flex.Horizontal>
        <Flex.Item size={3}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item size={4}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item size={5}>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item grow>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item grow>
          <Card>Card contents</Card>
        </Flex.Item>
        <Flex.Item grow>
          <Card>Card contents</Card>
        </Flex.Item>
      </Flex.Horizontal>
    </ComponentBox>
  )
}

export const WrappedWithChildren = () => {
  return (
    <ComponentBox
      scope={{ TestElement }}
      data-visual-test="flex-container-with-children"
    >
      {() => {
        const Wrapper = Flex.withChildren(({ children }) => {
          return <div>{children}</div>
        })

        return (
          <Flex.Container direction="vertical">
            <TestElement>FlexItem 1</TestElement>
            <Wrapper>
              <TestElement>FlexItem 2</TestElement>
              <TestElement>FlexItem 3</TestElement>
            </Wrapper>
            <TestElement>FlexItem 4</TestElement>
          </Flex.Container>
        )
      }}
    </ComponentBox>
  )
}
