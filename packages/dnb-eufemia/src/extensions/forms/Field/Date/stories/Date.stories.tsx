import React from 'react'
import { Field, Value } from '../../..'
import FormHandler from '../../../Form/Handler/Handler'
import { Card, Dropdown } from '../../../../../components'
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
