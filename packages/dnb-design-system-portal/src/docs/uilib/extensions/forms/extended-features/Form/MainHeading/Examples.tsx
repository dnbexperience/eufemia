import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Card, Layout, P } from '@dnb/eufemia/src'
import { Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Form }}>
      <Form.MainHeading>This is a main heading</Form.MainHeading>
    </ComponentBox>
  )
}

export const OverStack = () => {
  return (
    <ComponentBox
      scope={{ Form }}
      data-visual-test="layout-main-heading-over-stack"
    >
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Layout.Stack>
        <P>Stack contents</P>
      </Layout.Stack>
    </ComponentBox>
  )
}

export const OverStackWithCard = () => {
  return (
    <ComponentBox
      scope={{ Form }}
      data-visual-test="layout-main-heading-over-card"
    >
      <Form.MainHeading>This is a main heading</Form.MainHeading>
      <Layout.Stack>
        <Card>
          <P>Card contents</P>
        </Card>
      </Layout.Stack>
    </ComponentBox>
  )
}
