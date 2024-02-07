import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.Password
        onFocus={(value) => console.log('onFocus', value)}
        onBlur={(value) => console.log('onBlur', value)}
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.Password
        placeholder="Please enter your password"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.Password
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox data-visual-test="phone-number-label">
      <Field.Password
        label="Label text"
        value="password123"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Password
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
        help={{
          title: 'Help is available',
          content:
            'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
        }}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Password
        value="password123"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox
      scope={{ FormError }}
      data-visual-test="phone-number-error"
    >
      <Field.Password
        value="your-birthday"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.Password
        value="pass"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
        required
      />
    </ComponentBox>
  )
}

export const Pattern = () => {
  return (
    <ComponentBox>
      <Field.Password
        value="password123"
        pattern="\\w{8}[0-9]{2}"
        onChange={(value) => console.log('onChange', value)}
        onHidePassword={(event) => console.log('onHidePassword', event)}
        onShowPassword={(event) => console.log('onShowPassword', event)}
        required
      />
    </ComponentBox>
  )
}

export const LongLabel = () => {
  return (
    <ComponentBox data-visual-test="phone-number-long-label">
      <Field.Password label="Telefon/mobilnummer with long label" />
    </ComponentBox>
  )
}
