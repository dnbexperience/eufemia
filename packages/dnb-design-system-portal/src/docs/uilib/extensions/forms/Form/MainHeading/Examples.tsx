import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Card, Flex, P } from '@dnb/eufemia/src'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.MainHeading>This is a main heading</Form.MainHeading>
    </ComponentBox>
  )
}

export const PrecedingFlexContainer = () => {
  return (
    <ComponentBox data-visual-test="layout-main-heading-over-stack">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Flex.Stack>
        <P>Stack contents</P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const PrecedingCard = () => {
  return (
    <ComponentBox data-visual-test="layout-main-heading-preceding-card">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Card stack>
        <P>Card contents</P>
      </Card>
    </ComponentBox>
  )
}

export const WithHelpButton = () => {
  return (
    <ComponentBox data-visual-test="layout-main-heading-help-button">
      <Flex.Stack>
        <Form.MainHeading
          help={{
            title: 'Title',
            content: 'Content',
          }}
        >
          This is a main heading
        </Form.MainHeading>
        <Card stack>
          <P>Card contents</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
