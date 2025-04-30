import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox data-visual-test="expiry-empty">
      <Field.Expiry
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox data-visual-test="expiry-with-value">
      <Field.Expiry
        value="0835"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="expiry-horizontal-layout">
      <Field.Expiry
        value="0835"
        layout="horizontal"
        layoutOptions={{
          width: 'medium', // can be a rem value
        }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="expiry-with-help">
      <Field.Expiry
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
        }}
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox data-visual-test="expiry-disabled">
      <Field.Expiry
        value="0826"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="expiry-error">
      <Field.Expiry
        value="0326"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Expiry
        value="0826"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        required
      />
    </ComponentBox>
  )
}

export const WidthSmall = () => {
  return (
    <ComponentBox data-visual-test="expiry-width-small">
      <Field.Expiry width="small" />
    </ComponentBox>
  )
}

export const WidthMedium = () => {
  return (
    <ComponentBox data-visual-test="expiry-width-medium">
      <Field.Expiry width="medium" />
    </ComponentBox>
  )
}

export const WidthLarge = () => {
  return (
    <ComponentBox data-visual-test="expiry-width-large">
      <Field.Expiry width="large" />
    </ComponentBox>
  )
}

export const WidthStretch = () => {
  return (
    <ComponentBox data-visual-test="expiry-width-stretch">
      <Form.Card>
        <Field.String width="stretch" />
        <Field.Expiry width="stretch" />
      </Form.Card>
    </ComponentBox>
  )
}
