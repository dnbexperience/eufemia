import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Card, Flex, P } from '@dnb/eufemia/src'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Form.MainHeading>This is a main heading</Form.MainHeading>
    </ComponentBox>
  )
}

export const OverStack = () => {
  return (
    <ComponentBox data-visual-test="layout-main-heading-over-stack">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Flex.Stack>
        <P>Stack contents</P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const OverStackWithCard = () => {
  return (
    <ComponentBox data-visual-test="layout-main-heading-over-card">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Flex.Stack>
        <Card stack>
          <P>Card contents</P>
        </Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
