import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const TextOnly = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
    </ComponentBox>
  )
}

export const BelowMainHeading = () => {
  return (
    <ComponentBox
      scope={{ Form }}
      data-visual-test="layout-sub-heading-below-main"
    >
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
    </ComponentBox>
  )
}

export const OverStack = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
      <Layout.Stack>
        <P>Stack contents</P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const InsideCard = () => {
  return (
    <ComponentBox
      scope={{ Form }}
      data-visual-test="layout-sub-heading-inside-card"
    >
      <Layout.Card>
        <Layout.Stack>
          <Form.SubHeading>This is a sub heading</Form.SubHeading>
          <P>Card contents</P>
        </Layout.Stack>
      </Layout.Card>
    </ComponentBox>
  )
}

export const OverStackWithCard = () => {
  return (
    <ComponentBox
      scope={{ Form }}
      data-visual-test="layout-sub-heading-over-card"
    >
      <Form.SubHeading>This is a sub heading</Form.SubHeading>
      <Layout.Stack>
        <Layout.Card>
          <P>Card contents</P>
        </Layout.Card>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const TwoSubHeadings = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Form.SubHeading>This is sub heading 1</Form.SubHeading>
      <Form.SubHeading>This is sub heading 2</Form.SubHeading>
      Other contents
    </ComponentBox>
  )
}
