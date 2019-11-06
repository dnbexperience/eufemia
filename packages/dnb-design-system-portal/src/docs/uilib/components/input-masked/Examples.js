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
  handleInputChange = ({ value }) => {
    console.log(value)
  }
  render() {
    const handleInputChange = this.handleInputChange
    return (
      <Fragment>
        <ComponentBox
          caption="Only numbers"
          scope={{
            handleInputChange
          }}
        >
          {/* @jsx */ `
<InputMasked
  label="Masked input:"
  autocomplete="off"
  value="1000000"
  number_mask={{
    suffix: ',-'
  }}
  suffix="kr."
  align="right"
  on_change={handleInputChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Only numbers, right aligned and large sized input"
          scope={{
            handleInputChange: this.handleInputChange
          }}
        >
          {/* @jsx */ `
<InputMasked
  label="Masked input:"
  autocomplete="off"
  size="large"
  number_mask={{
    prefix: 'NOK '
  }}
  align="right"
  stretch="true"
  placeholder="Enter a number"
  on_change={handleInputChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Phone Number, starting with 4"
          scope={{ handleInputChange: this.handleInputChange }}
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
  on_change={handleInputChange}
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
