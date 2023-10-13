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
    <ComponentBox scope={{ Field }} data-visual-test="layout-card-stack">
      <Card stack>
        <Field.String label="Label" value="Value" />
        <Field.String label="Label" value="Value" />
      </Card>
    </ComponentBox>
  )
}

export const VerticalFields = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Card>
        <Flex.Vertical>
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Flex.Vertical>
      </Card>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox scope={{ Form }} hidePreview>
      <Card aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id" space={0}>
          Heading
        </Form.SubHeading>
        <P>Content inside a landmark ...</P>
      </Card>
    </ComponentBox>
  )
}
