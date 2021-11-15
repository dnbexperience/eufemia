/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Provider } from '@dnb/eufemia/src/shared'

// https://github.com/text-mask/text-mask
// How to use masks: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
// import createNumberMask from '@dnb/eufemia/src/components/input-masked/addons/createNumberMask'

export const InputMaskedExampleNumberLocale = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number">
      {() => /* jsx */ `
<FormRow vertical>
  <InputMasked
    label="Number:"
    as_number
    value="1234.50"
    right
    bottom
    on_change={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
  <InputMasked
    label="Number (decimal limit):"
    as_number
    number_mask={{ decimalLimit: 2 }}
    value="1234.016"
    right
    bottom
    on_change={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
  <InputMasked
    label="Percentage:"
    as_percent
    number_mask={{ decimalLimit: 1 }}
    value="1234.016"
    right
    bottom
    on_change={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
</FormRow>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCurrencyLocale = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="input-masked-currency"
      scope={{ Provider }}
    >
      {() => /* jsx */ `
<FormRow vertical>
  <InputMasked
    label="Currency:"
    as_currency="EUR"
    value="1234.50"
    on_change={({ numberValue }) => {
      console.log(numberValue)
    }}
    right
    bottom
  />
  <Provider
    locale="en-GB"
    InputMasked={{
      currency_mask: {
        decimalLimit: 3,
      },
    }}
  >
    <InputMasked
      label="Currency:"
      as_currency="USD"
      value="1234.567"
      on_change={({ numberValue }) => {
        console.log(numberValue)
      }}
      right
      bottom
    />
  </Provider>
</FormRow>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCurrencyMask = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency_mask">
      {() => /* jsx */ `
<FormRow vertical>
  <InputMasked
    label="Left aligned (default):"
    currency_mask="kr"
    on_change={({ numberValue }) => {
      console.log(numberValue)
    }}
    right
    bottom
  />
  <InputMasked
    label="Right aligned:"
    currency_mask={{ currency: 'NOK' }}
    align="right"
    on_change={({ numberValue }) => {
      console.log(numberValue)
    }}
  />
</FormRow>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCustomNumberMask = () => (
  <Wrapper>
    <ComponentBox>
      {() => /* jsx */ `
<InputMasked
  label="Masked amount:"
  show_mask
  number_mask={{
    suffix: ' kr',
    allowDecimal: true
  }}
  placeholder_char={null}
  on_change={({ numberValue }) => {
    console.log(numberValue)
  }}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleNumberMask = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-number_mask">
      {() => /* jsx */ `
<InputMasked
  label="Masked input:"
  value="1000000"
  number_mask={{
    suffix: ',-',
    allowDecimal: false
  }}
  suffix="kr"
  on_change={({ numberValue }) => {
    console.log(parseInt(numberValue || 0, 10))
  }}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExamplePrefix = () => (
  <Wrapper>
    <ComponentBox>
      {() => /* jsx */ `
<InputMasked
  label="Masked input:"
  number_mask={{
    prefix: 'NOK '
  }}
  stretch="true"
  placeholder="Enter a number"
  on_change={({ numberValue }) => {
    console.log(numberValue)
  }}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExamplePhone = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-phone">
      {() => /* jsx */ `
<InputMasked
  label="Masked input:"
  mask={[
    '0',
    '0',
    /[4]/, // have to start with 4
    /[5-7]/, // can be 5,6 or 7
    ' ',
    /[49]/, // have to start with 4 or 9
    /\\d/,
    ' ',
    /\\d/,
    /\\d/,
    ' ',
    /\\d/,
    /\\d/,
    ' ',
    /\\d/,
    /\\d/
  ]}
  show_mask
  keep_char_positions
  on_change={({ numberValue }) => {
    console.log(numberValue)
  }}
/>
`}
    </ComponentBox>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-masked-input {
    margin: 1rem 0;
  }
  .dnb-form-label + .dnb-masked-input {
    margin-top: 0;
  }
`
