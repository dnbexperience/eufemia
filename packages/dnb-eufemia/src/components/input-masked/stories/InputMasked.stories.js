/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import emailMask from '../../input-masked/addons/emailMask'
import { InputMasked, FormSet, ToggleButton } from '../../'
import { Hr } from '../../../elements'
import styled from '@emotion/styled'
import { Provider } from '../../../shared'

const Pre = styled.pre`
  margin-top: 0;
  margin-bottom: 0;
`

export default {
  title: 'Eufemia/Components/InputMasked',
}

export function Sandbox() {
  const [locale, setLocale] = React.useState('nb-NO')
  return (
    <Wrapper>
      <Provider locale={locale}>
        <FormSet label_direction="vertical">
          <ToggleButton.Group
            value={locale}
            on_change={({ value }) => setLocale(value)}
            right
            label="Choose locale"
          >
            <ToggleButton value="nb-NO" right>
              nb-NO
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
            <EmailMask />
          </Box>
          <Box>
            <ShowMask />
          </Box>
        </FormSet>
      </Provider>
    </Wrapper>
  )
}

function BasicNumberMask() {
  const [floatval, setState] = React.useState(10234.556)

  return (
    <InputMasked
      label="number_mask"
      // selectall
      value={floatval}
      // placeholder="En placeholder"
      number_mask
      mask_options={{ allowLeadingZeroes: true, allowNegative: false }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function BasicCurrencyMask() {
  const [floatval, setState] = React.useState(1234.556)

  return (
    <InputMasked
      label="currency_mask"
      // selectall
      value={floatval}
      // placeholder="En placeholder"
      currency_mask={{
        currency: 'NOK',
        prefix: 'Prefix ',
        // allowDecimal: false,
        allowNegative: false,
      }}
      // mask_options={{ allowLeadingZeroes: true }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function CurrencyInput() {
  const [floatval, setState] = React.useState(1234.556)
  // const [floatval, setState] = React.useState(0.01)

  return (
    <InputMasked
      label="as_currency"
      value={floatval}
      as_currency="NOK"
      // mask_options={{ allowLeadingZeroes: true }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function NumberInput() {
  const [floatval, setState] = React.useState('1234.556')

  return (
    <>
      <InputMasked
        label="as_number"
        value={floatval}
        as_number
        mask_options={{ allowDecimal: true, decimalLimit: null }}
        suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
        on_change={({ numberValue }) => {
          setState(numberValue)
        }}
      />
    </>
  )
}

function PercentInput() {
  const [floatval, setState] = React.useState(1)

  return (
    <InputMasked
      label="as_percent"
      value={floatval}
      as_percent
      mask_options={{ allowDecimal: true, allowLeadingZeroes: true }}
      // number_mask={{ allowDecimal: true, decimalLimit: 1 }}
      suffix={<Pre>{JSON.stringify(floatval)}</Pre>}
      on_change={({ numberValue }) => {
        setState(numberValue)
      }}
    />
  )
}

function EmailMask() {
  return (
    <InputMasked
      label="emailMask"
      // DOMException: Failed to execute 'setSelectionRange' on 'HTMLInputElement'
      // The input element's type ('email') does not support selection.
      // type="email"
      placeholder="@."
      autocomplete="on"
      keep_placeholder
      mask={emailMask}
      right
      bottom
    />
  )
}

function ShowMask() {
  return (
    <InputMasked
      label="show_mask"
      show_mask
      number_mask={{
        suffix: ' kr',
        allowDecimal: true,
      }}
    />
  )
}
