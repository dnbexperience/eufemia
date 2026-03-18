import React from 'react'
import { Field, Form, Tools, Value } from '../../..'
import { Flex } from '../../../../../components'
import type {
  CurrencyISO,
  CurrencyType,
} from '../../../constants/currencies'

export default {
  title: 'Eufemia/Extensions/Forms/SelectCurrency',
}

export function SelectCurrency() {
  const [state, update] = React.useState<CurrencyISO>('NOK')
  React.useEffect(() => {
    update('CHF')
  }, [])
  return (
    <Field.SelectCurrency
      required
      value={state}
      onChange={(value: CurrencyISO, data) => {
        console.log('onChange', value, data)
        update(value)
      }}
    />
  )
}

const transformOut = (internal: CurrencyType, currency: CurrencyType) => {
  if (internal) {
    return `${currency.name} (${internal})`
  }
}
const transformIn = (external: unknown) => {
  return (String(external).match(/\((.*)\)/)?.[1] || 'NOK') as CurrencyISO
}

export function Transform() {
  return (
    <Form.Handler onSubmit={console.log}>
      <Flex.Stack>
        <Field.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="NOK"
        />

        <Value.SelectCurrency
          path="/currency"
          transformIn={transformIn}
          showEmpty
        />

        <Tools.Log />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

export function FieldCurrency() {
  return (
    <Form.Handler onSubmit={console.log}>
      <Flex.Horizontal>
        <Field.SelectCurrency
          label="Select a currency"
          path="/currency"
          width="medium"
          value="SEK"
          autoComplete="transaction-currency"
        />
        <Field.Currency
          label="Amount"
          currency="/currency"
          autoComplete="transaction-amount"
        />
      </Flex.Horizontal>
    </Form.Handler>
  )
}
