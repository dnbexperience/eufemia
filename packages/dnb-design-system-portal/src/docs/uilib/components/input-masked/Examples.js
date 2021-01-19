/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

// https://github.com/text-mask/text-mask
// How to use masks: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
// import createNumberMask from 'dnb-ui-lib/src/components/input-masked/addons/createNumberMask'

export const InputMaskedExampleCurrencyMask = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-currency_mask">
      {
        /* @jsx */ `
<FormRow vertical>
  <InputMasked
    label="Right aligned:"
    currency_mask="kr"
    on_change={(e) => {
      console.log('e', e)
    }}
    right
    bottom
  />
  <InputMasked
    label="Left aligned:"
    currency_mask={{ currency: 'NOK' }}
    align="left"
    on_change={(e) => {
      console.log('e', e)
    }}
  />
</FormRow>
          `
      }
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleCustomMask = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<InputMasked
  label="Masked amount:"
  show_mask
  number_mask={{
    suffix: ' kr',
    allowDecimal: true
  }}
  placeholder_char={null}
  align="right"
  on_change={(e) => {
    console.log('e', e)
  }}
/>
          `
      }
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExampleNumberMask = () => (
  <Wrapper>
    <ComponentBox title="" data-visual-test="input-masked-number_mask">
      {
        /* @jsx */ `
<InputMasked
  label="Masked input:"
  value="1000000"
  number_mask={{
    suffix: ',-'
  }}
  suffix="kr."
  align="right"
  on_change={(e) => {
    console.log('e', parseInt(e.cleaned_value || 0, 10))
  }}
/>
          `
      }
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExamplePrefix = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<InputMasked
  label="Masked input:"
  number_mask={{
    prefix: 'NOK '
  }}
  align="right"
  stretch="true"
  placeholder="Enter a number"
  on_change={(e) => {
    console.log('e', e)
  }}
/>
          `
      }
    </ComponentBox>
  </Wrapper>
)

export const InputMaskedExamplePhone = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-masked-phone">
      {
        /* @jsx */ `
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
  on_change={(e) => {
    console.log('e', e)
  }}
/>
          `
      }
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
