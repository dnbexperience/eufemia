import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay value={15} />
    </ComponentBox>
  )
}

export const ConstrainedDays = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        days={[1, 5, 10, 15, 20, 25]}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithoutLastDay = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        showLastDay={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ConstrainedWithLastDay = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        days={[1, 5, 10, 15, 20, 25]}
        showLastDay
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Required = () => {
  return (
    <ComponentBox>
      <Form.Handler onSubmit={(data) => console.log('onSubmit', data)}>
        <Field.InstallmentDay path="/installmentDay" required />
        <Form.SubmitButton top="small" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay value={10} disabled />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        help={{
          title: 'What is an installment day?',
          content:
            'The installment day is the day of the month when the payment is deducted from your account.',
        }}
      />
    </ComponentBox>
  )
}

export const Tiles = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        variant="tiles"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ConstrainedTilesWithLastDay = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        variant="tiles"
        days={[1, 5, 10, 15, 20, 25]}
        showLastDay
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}
