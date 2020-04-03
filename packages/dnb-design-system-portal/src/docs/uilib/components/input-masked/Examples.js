/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

// https://github.com/text-mask/text-mask
// How to use masks: https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme
// import createNumberMask from 'dnb-ui-lib/src/components/input-masked/addons/createNumberMask'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox title="Using the `currency_mask`">
          {/* @jsx */ `
<FormRow vertical>
  <InputMasked
    label="Amount:"
    currency_mask="kr"
    on_change={(e) => {
      console.log('e', e)
    }}
    right
    bottom
  />
  <InputMasked
    label="Amount:"
    currency_mask={{ currency: 'NOK' }}
    align="left"
    on_change={(e) => {
      console.log('e', e)
    }}
  />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox title="Making a custom currency mask">
          {/* @jsx */ `
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
          `}
        </ComponentBox>
        <ComponentBox title="Using the `number_mask` - combined suffix">
          {/* @jsx */ `
<InputMasked
  label="Masked input:"
  value="1000000"
  number_mask={{
    suffix: ',-'
  }}
  suffix="kr."
  align="right"
  on_change={(e) => {
    console.log('e', e)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox title="Using the `number_mask` and a prefix">
          {/* @jsx */ `
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
          `}
        </ComponentBox>
        <ComponentBox
          title="Phone Number, starting with 4"
          data-dnb-test="input-masked-phone"
        >
          {/* @jsx */ `
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
  show_mask="true"
  on_change={(e) => {
    console.log('e', e)
  }}
/>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

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

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)
