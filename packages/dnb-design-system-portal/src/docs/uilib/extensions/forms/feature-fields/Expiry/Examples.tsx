import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Expiry
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Expiry
        placeholder="Enter a date"
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Expiry
        label="Label text"
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Expiry
        label="Label text"
        help={{
          title: 'Help is available',
          contents:
            'Kindness and helping others will return to you when you least expect it, and maybe when you need it.',
        }}
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Expiry
        value="2023-01-16"
        label="Label text"
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
        disabled
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.Expiry
        value="2023-01-16"
        label="Label text"
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Expiry
        value="2023-01-16"
        label="Label text"
        onChange={({ month, year }) =>
          console.log('onChange', { month, year })
        }
        required
      />
    </ComponentBox>
  )
}
