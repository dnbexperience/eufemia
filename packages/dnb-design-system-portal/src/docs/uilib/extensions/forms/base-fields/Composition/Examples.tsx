import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const Composition = () => (
  <ComponentBox data-visual-test="forms-field-block-composition">
    <Field.Composition info="Info at the bottom" width="large">
      <Field.String label="Field A with a long label" width="medium" />
      <Field.String label="Field B" width="stretch" />
    </Field.Composition>
  </ComponentBox>
)

export const CompositionWithLabel = () => (
  <ComponentBox data-visual-test="forms-field-block-composition-with-label">
    <Field.Composition label="A legend for the fieldset" width="large">
      <Field.String label="Field label" width="stretch" />
      <Field.Number width="small" placeholder="0000" />
    </Field.Composition>
  </ComponentBox>
)

export const CompositionWithHelpButton = () => (
  <ComponentBox data-visual-test="forms-field-block-composition-with-help-button">
    <Field.Composition
      label="A legend for the fieldset"
      width="large"
      help={{ title: 'Help title', content: 'Help content', open: true }}
    >
      <Field.String
        label="Field label"
        help={{ title: 'Help title', content: 'Help content', open: true }}
      />
      <Field.String
        label="Field label"
        width="stretch"
        help={{ title: 'Help title', content: 'Help content', open: true }}
      />
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

export const Wrapping = () => {
  const sixtyOneChars =
    '0000000000000000000000000000000000000000000000000000000000000'
  const sixtyOneCharsIncludingASpace =
    '000000000000000000000000000000 000000000000000000000000000000'
  const fiftyEightCharsIncludingASpace =
    '00000000000000000000000000000000000000000000000000000000 0'
  return (
    <ComponentBox
      scope={{
        sixtyOneChars,
        sixtyOneCharsIncludingASpace,
        fiftyEightCharsIncludingASpace,
      }}
      data-visual-test="forms-field-block-composition-wrapping"
    >
      <Flex.Stack>
        <Form.Card>
          <Form.SubHeading>
            Breaking word with 61 characters
          </Form.SubHeading>
          <Field.Composition label={sixtyOneChars}>
            <Field.String value="string" />
            <Field.String value="string" />
          </Field.Composition>
          <Field.Composition
            label={sixtyOneChars}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Field.String value="string" />
            <Field.String value="string" />
          </Field.Composition>
        </Form.Card>
        <Form.Card>
          <Form.SubHeading>
            Breaking a sentence of 61 characters that include a space
          </Form.SubHeading>
          <Field.Composition label={sixtyOneCharsIncludingASpace}>
            <Field.String value="string" />
            <Field.String value="string" />
          </Field.Composition>
          <Field.Composition
            label={sixtyOneCharsIncludingASpace}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Field.String value="string" />
            <Field.String value="string" />
          </Field.Composition>
        </Form.Card>
        <Form.Card>
          <Form.SubHeading>
            Help button should not wrap alone
          </Form.SubHeading>
          <Field.Composition
            label={fiftyEightCharsIncludingASpace}
            help={{ title: 'Help title', content: 'Help content' }}
          >
            <Field.String value="string" />
            <Field.String value="string" />
          </Field.Composition>
        </Form.Card>
      </Flex.Stack>
    </ComponentBox>
  )
}
