import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Card, Flex, P } from '@dnb/eufemia/src'

export const WithFieldString = () => {
  return (
    <ComponentBox data-visual-test="flex-stack-form">
      <Flex.Stack>
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" />
        <Form.SubmitButton />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithParagraphs = () => {
  return (
    <ComponentBox data-visual-test="flex-stack-paragraphs">
      <Flex.Stack>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum.
        </P>
        <P>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus.
        </P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithMainHeading = () => {
  return (
    <ComponentBox>
      <Flex.Stack>
        <Form.MainHeading>Heading</Form.MainHeading>
        <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
        <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithCard = () => {
  return (
    <ComponentBox data-visual-test="flex-stack-card-stack">
      <Flex.Stack>
        <Card gap="medium">
          <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
          <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
        </Card>
        <Card gap="medium">
          <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
          <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithCardAndHeading = () => {
  return (
    <ComponentBox data-visual-test="flex-stack-card-heading">
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Card gap="medium">
          <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
          <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithCardAndHeadings = () => {
  return (
    <ComponentBox data-visual-test="flex-stack-card-two-headings">
      <Flex.Stack>
        <Form.MainHeading>Main heading</Form.MainHeading>
        <Form.SubHeading>Sub heading</Form.SubHeading>
        <Card gap="medium">
          <P>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
          <P>Aliquam at felis rutrum, luctus dui at, bibendum ipsum.</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const WithHeadingsAndAriaLabel = () => {
  return (
    <ComponentBox hidePreview>
      <Flex.Stack aria-labelledby="unique-id">
        <Form.SubHeading id="unique-id">Heading</Form.SubHeading>
        <Card>
          <P>Content inside a landmark ...</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
