import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Tools,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const OptionSelected = () => {
  return (
    <ComponentBox data-visual-test="select-currency-vertical-layout">
      <Field.SelectCurrency
        value="NOK"
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="select-currency-horizontal-layout">
      <Field.SelectCurrency
        value="NOK"
        layout="horizontal"
        layoutOptions={{ width: '6rem' }}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.SelectCurrency
        value="NOK"
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
        }}
        onChange={(value, obj) => console.log('onChange', value, obj)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.SelectCurrency
        value="NOK"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        disabled
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.SelectCurrency
        value="NOK"
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidationRequired = () => {
  return (
    <ComponentBox>
      <Field.SelectCurrency
        label="Label text"
        onChange={(value, obj) => console.log('onChange', value, obj)}
        required
        validateInitially
        validateUnchanged
      />
    </ComponentBox>
  )
}

export function FilterCurrencies() {
  return (
    <ComponentBox>
      <Field.SelectCurrency
        currencies="Scandinavia"
        filterCurrencies={({ iso }) => iso !== 'DKK'}
      />
    </ComponentBox>
  )
}

export function TransformInAndOut() {
  return (
    <ComponentBox>
      {() => {
        // From the Field (internal value) to the data context or event parameter
        const transformOut = (value, currency) => {
          if (value) {
            return currency
          }
        }

        // To the Field (from e.g. defaultValue)
        const transformIn = (currency) => {
          return currency?.iso
        }

        const MyForm = () => {
          return (
            <Form.Handler onSubmit={console.log}>
              <Form.Card>
                <Field.SelectCurrency
                  path="/currency"
                  transformIn={transformIn}
                  transformOut={transformOut}
                  defaultValue="NOK"
                />

                <Value.SelectCurrency
                  path="/currency"
                  transformIn={transformIn}
                  placeholder="(Select a currency)"
                  showEmpty
                />

                <Form.SubHeading>Data Context</Form.SubHeading>
                <Tools.Log />
              </Form.Card>
              <Form.SubmitButton />
            </Form.Handler>
          )
        }
        return <MyForm />
      }}
    </ComponentBox>
  )
}

export function WithFieldCurrency() {
  return (
    <ComponentBox>
      <Form.Handler onSubmit={console.log}>
        <Form.Card>
          <Flex.Horizontal>
            <Field.SelectCurrency
              label="Select a currency"
              path="/currency"
              value="EUR"
              autoComplete="transaction-currency"
            />
            <Field.Currency
              label="Amount"
              currency="/currency"
              autoComplete="transaction-amount"
            />
          </Flex.Horizontal>
        </Form.Card>
        <Form.SubmitButton text="Pay" />
      </Form.Handler>
    </ComponentBox>
  )
}

export const Opened = () => (
  <ComponentBox data-visual-test="select-currency-opened">
    <Field.SelectCurrency value="NOK" htmlAttributes={{ opened: true }} />
  </ComponentBox>
)
