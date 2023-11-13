import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.Expiry
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.Expiry
        label="Label text"
        onChange={(expiry) => console.log('onChange', expiry)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox scope={{ FormError }}>
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
