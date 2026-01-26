import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import type { DateValidator } from '@dnb/eufemia/src/extensions/forms/Field/Date'

export const LabelAndValue = () => {
  return (
    <ComponentBox data-visual-test="date-label">
      <Field.Date
        label="Label text"
        value="2023-01-16"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="date-horizontal-layout">
      <Field.Date
        label="Label with a long text that will wrap"
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
    <ComponentBox>
      <Field.Date
        label="Label text"
        value="2023-01-16"
        help={{
          title: 'Help is available',
          content:
            'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Date
        label="Label text"
        value="2023-01-16"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox data-visual-test="date-error">
      <Field.Date
        value="2023-01-16"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Date
        label="Label text"
        value="2023-01-16"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const Range = () => {
  return (
    <ComponentBox>
      <Field.Date label="Label text" value="2023-01-16|2023-04-01" range />
    </ComponentBox>
  )
}

export const AutoClose = () => {
  return (
    <ComponentBox>
      <Field.Date label="Automatically Close" showCancelButton={false} />
    </ComponentBox>
  )
}

export const DatePickerDateLimitValidation = () => {
  return (
    <ComponentBox>
      <Field.Date
        value="2024-12-31|2025-02-01"
        minDate="2025-01-01"
        maxDate="2025-01-31"
        range
      />
    </ComponentBox>
  )
}

export const ValidationExtendValidator = () => {
  return (
    <ComponentBox>
      {() => {
        const myDateValidator = (value: string) => {
          if (value === '2025-01-01') {
            return new Error('My custom message')
          }

          if (value === '2025-01-03') {
            return [
              new Error('My custom message 1'),
              new Error('My custom message 2'),
            ]
          }
        }

        // Combine the shared validator with the custom date rules.
        const myOnBlurValidator: DateValidator = (
          value: string,
          { validators }
        ) => {
          const { dateValidator } = validators ?? {}

          return [myDateValidator, dateValidator]
        }

        return (
          <Field.Date
            value="2025-01-01"
            minDate="2024-12-31"
            maxDate="2025-01-31"
            onBlurValidator={myOnBlurValidator}
          />
        )
      }}
    </ComponentBox>
  )
}

export const Width = () => {
  return (
    <ComponentBox data-visual-test="date-width">
      <Form.Card>
        <Field.String width="stretch" />
        <Field.Date label="default" />
        <Field.Date width="small" label="small" />
        <Field.Date width="medium" label="medium" />
        <Field.Date width="large" label="large" />
        <Field.Date width="stretch" label="stretch" />
      </Form.Card>
    </ComponentBox>
  )
}
