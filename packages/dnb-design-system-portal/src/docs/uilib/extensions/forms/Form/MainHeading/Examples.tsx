import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
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
    <ComponentBox data-visual-test="layout-main-heading-above-stack">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Flex.Stack>
        <P>Stack contents</P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const AboveCard = () => {
  return (
    <ComponentBox data-visual-test="layout-main-heading-above-card">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Form.Card>
        <P>Card contents</P>
      </Form.Card>
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
        <Form.Card>
          <P>Card contents</P>
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
