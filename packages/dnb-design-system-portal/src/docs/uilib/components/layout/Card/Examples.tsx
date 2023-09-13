import { Layout } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Layout.Card>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        cursus pharetra elit in bibendum.
        <br />
        <br />
        Praesent nunc ipsum, convallis eget convallis gravida, vehicula
        vitae metus..
      </Layout.Card>
    </ComponentBox>
  )
}

export const VerticalFields = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Layout.Card>
        <Layout.Vertical>
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Layout.Vertical>
      </Layout.Card>
    </ComponentBox>
  )
}
