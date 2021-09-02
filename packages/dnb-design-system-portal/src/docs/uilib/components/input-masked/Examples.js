/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

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
    on_change={({ cleaned_value }) => {
      console.log(cleaned_value)
    }}
  />
  <InputMasked
    label="Number (decimal limit):"
    as_number
    number_mask={{ decimalLimit: 2 }}
    number_format={{ omit_rounding: true }}
    value="1234.016"
    align="right"
    right
    bottom
    on_change={({ cleaned_value }) => {
      console.log(cleaned_value)
    }}
  />
</FormRow>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCurrencyLocale = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency">
      {() => /* jsx */ `
<FormRow vertical>
  <InputMasked
    label="Currency:"
    as_currency="EUR"
    value="1234.50"
    right
    bottom
    on_change={({ cleaned_value }) => {
      console.log(cleaned_value)
    }}
  />
  <InputMasked
    label="Currency:"
    as_currency="USD"
    value="1234.50"
    align="left"
    right
    bottom
    on_change={({ cleaned_value }) => {
      console.log(cleaned_value)
    }}
  />
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
    label="Right aligned:"
    currency_mask="kr"
    on_change={({ cleaned_value }) => {
      console.log(cleaned_value)
    }}
    right
    bottom
  />
  <InputMasked
    label="Left aligned:"
    currency_mask={{ currency: 'NOK' }}
    align="left"
    on_change={({ cleaned_value }) => {
      console.log(cleaned_value)
    }}
  />
</FormRow>
`}
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCustomMask = () => (
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
  align="right"
  on_change={({ cleaned_value }) => {
    console.log(cleaned_value)
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
    suffix: ',-'
  }}
  suffix="kr."
  align="right"
  on_change={({ cleaned_value }) => {
    console.log(parseInt(cleaned_value || 0, 10))
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
  align="right"
  stretch="true"
  placeholder="Enter a number"
  on_change={({ cleaned_value }) => {
    console.log(cleaned_value)
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
  on_change={({ cleaned_value }) => {
    console.log(cleaned_value)
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
