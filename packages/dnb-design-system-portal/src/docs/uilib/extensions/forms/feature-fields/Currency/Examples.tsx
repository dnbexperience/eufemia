import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'
import { Provider } from '@dnb/eufemia/src/shared'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.Currency
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.Currency
        placeholder="Enter a number"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.Currency
        label="Amount"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.Currency
        value={150000}
        currency="NOK"
        label="Amount"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Currency
        value={150000}
        currency="NOK"
        label="Amount"
        help={{
          title: 'Help is available',
          content:
            'Helping others, without expecting anything in return is what true self-worth is all about.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithGBLocale = () => {
  return (
    <ComponentBox>
      <Provider locale="en-GB">
        <Field.Currency value={-150000} align="right" />
      </Provider>
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Currency
        value={25000000}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.Currency
        value={12345678}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Currency
        value={42}
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const WithStepControls = () => (
  <ComponentBox data-visual-test="currency-input-step-controls">
    <Field.Currency
      showStepControls
      label="Amount"
      minimum={500}
      maximum={2000}
      value={1000}
      step={100}
    />
  </ComponentBox>
)
