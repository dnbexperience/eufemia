import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const TextOnly = () => {
  return (
    <ComponentBox>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
    </ComponentBox>
  )
}

export const BelowMainHeading = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-below-main">
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
    </ComponentBox>
  )
}

export const PrecedingFlexContainer = () => {
  return (
    <ComponentBox>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
      <Flex.Stack>
        <P>Stack contents</P>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const InsideCard = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-inside-card">
      <Form.Card>
        <Flex.Stack>
          <Form.SubHeading>This is a sub heading</Form.SubHeading>
          <P>Card contents</P>
        </Flex.Stack>
      </Form.Card>
    </ComponentBox>
  )
}

export const AboveCard = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-above-card">
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
      <Form.Card>
        <P>Card contents</P>
      </Form.Card>
    </ComponentBox>
  )
}

export const TwoSubHeadings = () => {
  return (
    <ComponentBox>
      <Form.SubHeading>This is sub heading 1</Form.SubHeading>
      <Form.SubHeading>This is sub heading 2</Form.SubHeading>
      Other contents
    </ComponentBox>
  )
}

export const WithHelpButton = () => {
  return (
    <ComponentBox data-visual-test="layout-sub-heading-help-button">
      <Flex.Stack>
        <Form.SubHeading
          help={{
            title: 'Title',
            content: 'Content',
          }}
        >
          This is a sub heading
        </Form.SubHeading>
        <Form.Card>
          <P>Card contents</P>
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
