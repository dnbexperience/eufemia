/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { InputMasked, ToggleButton } from '../..'
import { Flex, Hr } from '../../..'
import styled from '@emotion/styled'
import { Provider } from '../../../shared'
import { InternalLocale } from '../../../shared/Context'
import { Field, Form } from '../../../extensions/forms'

const Pre = styled.pre`
  margin-top: 0;
  margin-bottom: 0;
`

export default {
  title: 'Eufemia/Components/InputMasked',
}

export function TypeNumber() {
  return <InputMasked label="Number:" asCurrency value="12" />
}

export function NoProps() {
  return <InputMasked label="what" />
}

export function Sandbox() {
  const [locale, setLocale] = React.useState<InternalLocale>('nb-NO')
  return (
    <Wrapper>
      <Provider
        locale={locale}
        formElement={{
          labelDirection: 'vertical',
        }}
      >
        <Form.Handler>
          <ToggleButton.Group
            value={locale}
            onChange={({ value }) => setLocale(value as InternalLocale)}
            right
            label="Choose locale"
          >
            <ToggleButton value="nb-NO" right>
              nb-NO
            </ToggleButton>
            <ToggleButton value="sv-SE" right>
              sv-SE
            </ToggleButton>
            <ToggleButton value="en-GB" right>
              en-GB
            </ToggleButton>
          </ToggleButton.Group>
          <Hr top bottom />
          <Box>
            <BasicNumberMask />
          </Box>
          <Box>
            <BasicCurrencyMask />
          </Box>
          <Box>
            <CurrencyInput />
          </Box>
          <Box>
            <NumberInput />
          </Box>
          <Box>
            <PercentInput />
          </Box>
          <Box>
            <ShowMask />
          </Box>
        </Form.Handler>
      </Provider>
    </Wrapper>
  )
}

function BasicNumberMask() {
  const [floatVal, setState] = React.useState(10234.556)

  return (
    <InputMasked
      label="numberMask"
      // selectAll
      value={floatVal}
      // placeholder="En placeholder"
      numberMask
      maskOptions={{ disallowLeadingZeroes: true, allowNegative: false }}
      suffix={<Pre>{JSON.stringify(floatVal)}</Pre>}
      onChange={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function BasicCurrencyMask() {
  const [floatVal, setState] = React.useState(1234.556)

  return (
    <InputMasked
      label="currencyMask"
      // selectAll
      value={floatVal}
      // placeholder="En placeholder"
      currencyMask={{
        currency: 'NOK',
        prefix: 'Prefix ',
        allowNegative: false,
      }}
      // maskOptions={{ disallowLeadingZeroes: true }}
      suffix={<Pre>{JSON.stringify(floatVal)}</Pre>}
      onChange={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function CurrencyInput() {
  const [floatVal, setState] = React.useState(1234.556)
  // const [floatVal, setState] = React.useState(0.01)

  return (
    <InputMasked
      label="as_currency"
      value={floatVal}
      asCurrency="NOK"
      // maskOptions={{ disallowLeadingZeroes: true }}
      suffix={<Pre>{JSON.stringify(floatVal)}</Pre>}
      onChange={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function NumberInput() {
  const [floatVal, setState] = React.useState('1234.556')

  return (
    <>
      <InputMasked
        label="as_number"
        value={floatVal}
        asNumber
        maskOptions={{ allowDecimal: true, decimalLimit: null }}
        suffix={<Pre>{JSON.stringify(floatVal)}</Pre>}
        onChange={({ value }) => {
          setState(value)
        }}
      />
    </>
  )
}

function PercentInput() {
  const [floatVal, setState] = React.useState(1)

  return (
    <InputMasked
      label="as_percent"
      value={floatVal}
      asPercent
      maskOptions={{ allowDecimal: true, disallowLeadingZeroes: true }}
      // numberMask={{ allowDecimal: true, decimalLimit: 1 }}
      suffix={<Pre>{JSON.stringify(floatVal)}</Pre>}
      onChange={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

export function ShowMask() {
  return (
    <>
      <InputMasked
        label="showMask"
        showMask
        numberMask={{
          suffix: ' kr',
          allowDecimal: true,
        }}
      />
      <Field.String allowOverflow mask={[/\d/, '-', /\d/, '-', /\d/]} />
      <Field.OrganizationNumber />
    </>
  )
}

export function DisallowLeadingZerosMask() {
  return (
    <Flex.Vertical>
      <InputMasked
        value={-100123}
        currencyMask={{
          disallowLeadingZeroes: true, //
        }}
      />

      <Field.Currency disallowLeadingZeroes />
    </Flex.Vertical>
  )
}
