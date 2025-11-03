import React from 'react'
import { Field, Form, Value } from '../../..'
import FormHandler from '../../../Form/Handler/Handler'
import { Card, DatePicker, Dropdown } from '../../../../../components'
import Context from '../../../../../shared/Context'

export default {
  title: 'Eufemia/Extensions/Forms/Date',
}

export function Date() {
  const [state, update] = React.useState('2023-01-16')
  React.useEffect(() => {
    update('2023-01-18')
  }, [])

  return (
    <Field.Date
      required
      // validateInitially
      value={state}
      onBlur={console.log}
      onFocus={console.log}
      onChange={(value) => {
        console.log('onChange', value)
        update(value)
      }}
    />
  )
}

export function Range() {
  return (
    <FormHandler data={{ myRange: '2023-01-16|2023-01-20' }}>
      <Field.Date path="/myRange" range />
      <Value.Date path="/myRange" variant="numeric" />
    </FormHandler>
  )
}

const ChangeLocale = () => {
  const { setLocale, locale } = React.useContext(Context)

  return (
    <Dropdown
      value={locale}
      data={{ 'en-GB': 'English', 'nb-NO': 'Norsk' }}
      on_change={({ data: { value } }) => {
        setLocale(value)
      }}
    />
  )
}

export function DateLimitValidation() {
  const minDate = '2025-01-01'
  const maxDate = '2025-01-31'

  return (
    <FormHandler>
      <Card stack>
        <Field.Date value={minDate} minDate={minDate} maxDate={maxDate} />
        <Field.Date
          value={`${minDate}|${maxDate}`}
          minDate={minDate}
          maxDate={maxDate}
          range
        />
        <ChangeLocale />
      </Card>
    </FormHandler>
  )
}

export function DateLimitValidationErrorDateFns() {
  return (
    <Field.Date
      value="2024-12-31"
      minDate="2025-01-01"
      validateInitially
    />
  )
}

export function DateRangeRequired() {
  return (
    <FormHandler>
      <Card stack>
        <Field.Date label="Field.Date range required" required range />
        <Field.Date label="Field.Date required" required />

        <p>Partial values:</p>

        <Field.Date
          label="Field.Date range required"
          required
          range
          value="2023-01-16|null"
        />
        <Field.Date
          label="Field.Date range required"
          required
          range
          value="null|2023-01-16"
        />

        <p>With values:</p>

        <Field.Date
          label="Field.Date range required"
          required
          range
          value="2023-01-16|2023-04-01"
        />
        <Field.Date
          label="Field.Date required"
          required
          value="2023-04-01"
        />
        <Form.SubmitButton text="Happy coding!" />
      </Card>
    </FormHandler>
  )
}

export function Reset() {
  return (
    <>
      <FormHandler>
        <Field.Date
          path="/reset"
          onReset={(props) => {
            console.log('onReset', props)
          }}
        />
      </FormHandler>
      <DatePicker showInput showResetButton />
    </>
  )
}
