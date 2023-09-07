import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Layout,
  Field,
  FieldGroup,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ FieldGroup }}>
      <FieldGroup label="Label text">Input features goes here</FieldGroup>
    </ComponentBox>
  )
}

export const WithInfo = () => {
  return (
    <ComponentBox scope={{ Layout, Field, FieldGroup }}>
      <FieldGroup label="Label text" info="For your information">
        <Layout.Row>
          <Field.String />
          <Field.Number />
        </Layout.Row>
      </FieldGroup>
    </ComponentBox>
  )
}
