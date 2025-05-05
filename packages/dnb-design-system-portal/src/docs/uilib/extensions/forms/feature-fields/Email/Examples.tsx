import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { createRequest } from '../../Form/SubmitIndicator/Examples'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.Email onChange={(value) => console.log('onChange', value)} />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.Email
        placeholder="Enter email address..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.Email
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.Email
        label="Label text"
        value="my-m@il.com"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.Email
        label="Label text"
        value="my-m@il.com"
        help={{
          title: 'Help is available',
          content:
            'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Email
        value="my-m@il.com"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const InvalidSyntax = () => {
  return (
    <ComponentBox>
      <Field.Email
        value="Not a mail"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.Email
        value="foo@bar.com"
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
      <Field.Email
        value="my-m@il.com"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const WithAsyncOnBlurValidator = () => {
  return (
    <ComponentBox scope={{ createRequest }}>
      {() => {
        async function mockAsyncValidator(value) {
          const request = createRequest()
          console.log('making API request to validate:', value)

          await request(3000) // Simulate a request
          console.log('API request finished')

          // Randomly validates or invalidates
          const validation = Math.random() < 0.5
          console.log('API request finished and validated to:', validation)

          if (validation) {
            throw new Error('This email is not valid!')
          }
        }

        return (
          <Field.Email
            value="foo@bar.com"
            onBlurValidator={mockAsyncValidator}
          />
        )
      }}
    </ComponentBox>
  )
}
