import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'

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

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="expiry-with-help">
      <Field.Expiry
        label="Label text"
        help={{
          title: 'Help is available',
          contents:
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

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }} data-visual-test="expiry-error">
      <Field.Expiry
        value="0326"
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
        error={new FormError('This is what is wrong...')}
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
