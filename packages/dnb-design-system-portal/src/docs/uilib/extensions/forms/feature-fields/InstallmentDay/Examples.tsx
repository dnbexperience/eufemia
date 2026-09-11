import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Tools } from '@dnb/eufemia/src/extensions/forms'

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

export const ConstrainedWithoutLastDay = () => {
  return (
    <ComponentBox>
      <Field.InstallmentDay
        days={[1, 5, 10, 15, 20, 25]}
        showLastDay={false}
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
          title: 'What is an instalment day?',
          content:
            'The instalment day is the day of the month when the payment is deducted from your account.',
        }}
      />
    </ComponentBox>
  )
}

export const TransformToBackendFormat = () => {
  return (
    <ComponentBox>
      {() => {
        // The field works with clean values internally: a number (1–28)
        // or 'last'. At the API boundary we convert to the wire format the
        // backend expects – a fixed two-digit day ('01'–'28') and a sentinel
        // for the last day of the month.
        const transformOut = (internal) => {
          if (internal === 'last') {
            return 'last-day'
          }
          if (typeof internal === 'number') {
            return String(internal).padStart(2, '0')
          }
        }

        // Convert the backend format back to the field's internal value
        // so it displays correctly.
        const transformIn = (external) => {
          if (external === 'last-day') {
            return 'last'
          }
          if (external != null && external !== '') {
            return Number(external)
          }
        }

        return (
          <Form.Handler
            defaultData={{ installmentDay: '01' }}
            onSubmit={(data) => console.log('onSubmit', data)}
          >
            <Field.InstallmentDay
              path="/installmentDay"
              transformIn={transformIn}
              transformOut={transformOut}
              onChange={(value) => console.log('onChange', value)}
            />
            <Form.SubmitButton top="small" />
            <Tools.Log top="small" />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
