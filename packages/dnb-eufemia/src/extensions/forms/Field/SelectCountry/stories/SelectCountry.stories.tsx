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

const transformOut = (value, country: CountryType) => {
  if (value) {
    return `${country.name} (${value})`
  }
}
const transformIn = (value) => {
  return String(value).match(/\((.*)\)/)?.[1]
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
