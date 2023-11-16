import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Card, Flex, P } from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Card data-visual-test="layout-card-border">
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum.
        </P>
        <P>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus.
        </P>
      </Card>
    </ComponentBox>
  )
}

export const Stack = () => {
  return (
    <ComponentBox data-visual-test="layout-card-stack">
      <Card stack>
        <Field.String label="Label" value="Value" />
        <Field.String label="Label" value="Value" />
      </Card>
    </ComponentBox>
  )
}

export const VerticalFields = () => {
  return (
    <ComponentBox>
      <Card>
        <Flex.Vertical>
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Flex.Vertical>
      </Card>
    </ComponentBox>
  )
}

export const HorizontalFields = () => {
  return (
    <ComponentBox>
      <Card>
        <Flex.Horizontal>
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Flex.Horizontal>
      </Card>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox hidePreview>
      <Card aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id" space={0}>
          Heading
        </Form.SubHeading>
        <P>Content inside a landmark ...</P>
      </Card>
    </ComponentBox>
  )
}
