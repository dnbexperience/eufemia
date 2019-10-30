/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <>
        <ComponentBox
          caption="Defualt numbers"
          data-dnb-test="number-default"
        >
          {/* @jsx */ `
<Number value="12345678.9" /> random text
<Number value="-12345678.9" /> random text
          `}
        </ComponentBox>
        <ComponentBox caption="Currency" data-dnb-test="number-currency">
          {/* @jsx */ `
<Number value="12345678.9" currency /> random text
<Number value="-12345678.9" currency /> random text
          `}
        </ComponentBox>
        <ComponentBox caption="Phone number" data-dnb-test="number-phone">
          {/* @jsx */ `
<Number value="99999999" phone /> random text
<Number value="4799999999" phone /> random text
<Number value="++4799999999" phone /> random text
<Number value="+4780022222" phone anchor="sms" /> random text
<Number value="+47116000" phone /> random text
<Number value="+4702000" phone /> random text
          `}
        </ComponentBox>
        <ComponentBox
          caption="Bank Account number (Kontonummer)"
          data-dnb-test="number-ban"
        >
          {/* @jsx */ `
<Number value="2000123456" ban /> bank account number
          `}
        </ComponentBox>
        <ComponentBox
          caption="National Identification number (Fødselsnummer)"
          data-dnb-test="number-nin"
        >
          {/* @jsx */ `
<Number value="18089212345" nin /> national identification number
          `}
        </ComponentBox>
      </>
    )
  }
}

export { Example }
export default () => <Example />
