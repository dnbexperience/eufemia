import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  FieldBlock,
  Layout,
  Field,
  TestElement,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text">Input features goes here</FieldBlock>
    </ComponentBox>
  )
}

export const WithInfo = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text" info="For your information">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const Horizontal = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text" layout="horizontal">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const HorizontalWithInfo = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock
        label="Label text"
        layout="horizontal"
        info="For your information"
      >
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox scope={{ FieldBlock, TestElement }}>
      <FieldBlock label="Default width (no width props)">
        <TestElement>Input feature</TestElement>
      </FieldBlock>
      <FieldBlock
        label="Small (affects outer block element)"
        width="small"
      >
        <TestElement>Input</TestElement>
      </FieldBlock>
      <FieldBlock
        label="Medium (affects outer block element)"
        width="medium"
      >
        <TestElement>Input feature</TestElement>
      </FieldBlock>
      <FieldBlock
        label="Large (affects outer block element)"
        width="large"
      >
        <TestElement>Input feature</TestElement>
      </FieldBlock>

      <FieldBlock
        label="Small (affects contents only)"
        contentsWidth="small"
      >
        <TestElement>Input</TestElement>
      </FieldBlock>
      <FieldBlock
        label="Medium (affects contents only)"
        contentsWidth="medium"
      >
        <TestElement>Input feature</TestElement>
      </FieldBlock>
      <FieldBlock
        label="Large (affects contents only)"
        contentsWidth="large"
      >
        <TestElement>Input feature</TestElement>
      </FieldBlock>
    </ComponentBox>
  )
}

export const WithDescription = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text" labelDescription="Description text">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const WithSecondary = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text" labelSecondary="Secondary text">
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const WithDescriptionAndSecondary = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock
        label="Label text"
        labelDescription="Description text"
        labelSecondary="42"
      >
        Input features goes here
      </FieldBlock>
    </ComponentBox>
  )
}

export const GroupMultipleFields = () => {
  return (
    <ComponentBox scope={{ FieldBlock, Layout, Field }}>
      <FieldBlock label="Label text" info="For your information">
        <Layout.Row>
          <Field.String width="small" minLength={3} />
          <Field.Number minimum={10} />
        </Layout.Row>
      </FieldBlock>
    </ComponentBox>
  )
}
