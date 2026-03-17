import React from 'react'
import { Field, Form, Tools, Value } from '../../..'
import { Flex } from '../../../../../components'
import type { CountryISO, CountryType } from '../../../constants/countries'

export default {
  title: 'Eufemia/Extensions/Forms/SelectCountry',
}

export function SelectCountry() {
  const [state, update] = React.useState<CountryISO>('NO')
  React.useEffect(() => {
    update('CH')
  }, [])
  return (
    <Field.SelectCountry
      required
      value={state}
      onChange={(value: CountryISO, data) => {
        console.log('onChange', value, data)
        update(value)
      }}
    />
  )
}

const transformOut = (
  internal: string | CountryType,
  country: CountryType
) => {
  if (internal) {
    return `${country.name} (${internal})`
  }
}
const transformIn = (external: unknown) => {
  return (String(external).match(/\((.*)\)/)?.[1] || 'NO') as CountryISO
}

export function Transform() {
  return (
    <Form.Handler onSubmit={console.log}>
      <Flex.Stack>
        <Field.SelectCountry
          path="/country"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NO"
        />

        <Value.SelectCountry
          path="/country"
          transformIn={transformIn}
          showEmpty
        />

        <Tools.Log />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
