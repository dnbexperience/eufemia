import React from 'react'
import { Field, Form, Tools, Value } from '../../..'
import { Flex } from '../../../../../components'
import { CountryType } from '../../../constants/countries'

export default {
  title: 'Eufemia/Extensions/Forms/SelectCountry',
}

export function SelectCountry() {
  const [state, update] = React.useState('NO')
  React.useEffect(() => {
    update('CH')
  }, [])
  return (
    <Field.SelectCountry
      required
      value={state}
      onChange={(value, data) => {
        console.log('onChange', value, data)
        update(value)
      }}
    />
  )
}

const transformOut = (internal: string, country: CountryType) => {
  if (internal) {
    return `${country.name} (${internal})`
  }
}
const transformIn = (external: unknown) => {
  return String(external).match(/\((.*)\)/)?.[1] || 'NO'
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
