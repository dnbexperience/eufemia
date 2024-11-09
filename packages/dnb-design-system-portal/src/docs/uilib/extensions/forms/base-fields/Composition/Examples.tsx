import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const Composition = () => (
  <ComponentBox data-visual-test="forms-field-block-composition">
    <Field.Composition info="Info at the bottom" width="large">
      <Field.String label="Field A with a long label" width="medium" />
      <Field.String label="Field B" width="stretch" />
    </Field.Composition>
  </ComponentBox>
)

export const CompositionError = () => (
  <ComponentBox data-visual-test="forms-field-block-composition-error">
    <Field.Composition
      error={new Error('Error at the bottom')}
      width="large"
    >
      <Field.String label="Field A" width="stretch" />
      <Field.String
        label="Field B with a long label that wraps"
        width="medium"
      />
    </Field.Composition>
  </ComponentBox>
)

export const CompositionMultipleStatuses = () => {
  return (
    <ComponentBox data-visual-test="forms-field-block-composition-statuses">
      <Field.Composition label="Label text" info="FieldBlock info">
        <Field.String
          width="small"
          minLength={3}
          warning="Warning message"
        />
        <Field.Number minimum={10} info="Field info" />
      </Field.Composition>
    </ComponentBox>
  )
}

export const Alignment = () => {
  return (
    <ComponentBox data-visual-test="forms-field-block-composition-alignment">
      <Field.Composition label="Label text" align="center">
        <Field.Number width="small" defaultValue={0} showStepControls />
        <Field.Boolean />
      </Field.Composition>
    </ComponentBox>
  )
}
