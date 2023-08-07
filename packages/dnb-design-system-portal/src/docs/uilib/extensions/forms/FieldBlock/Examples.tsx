import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { FieldBlock } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ FieldBlock }}>
      <FieldBlock label="Label text">Input features goes here</FieldBlock>
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
