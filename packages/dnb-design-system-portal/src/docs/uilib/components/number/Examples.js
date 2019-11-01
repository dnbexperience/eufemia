/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

const Style = styled.div`
  span.dnb-number {
    display: block;
  }
`

class Example extends PureComponent {
  render() {
    return (
      <Style>
        <ComponentBox
          caption="Defualt numbers"
          data-dnb-test="number-default"
        >
          {/* @jsx */ `
<Number value="12345678.9" />
<Number>-12345678.9</Number>
          `}
        </ComponentBox>
        <ComponentBox caption="Currency" data-dnb-test="number-currency">
          {/* @jsx */ `
<Number currency>12345678.9</Number>
<Number value={-12345678.9} currency />
          `}
        </ComponentBox>
        <ComponentBox caption="Phone number" data-dnb-test="number-phone">
          {/* @jsx */ `
<Number value="99999999" phone />
<Number value="4799999999" phone />
<Number value="++4799999999" phone />
<Number value="+4780022222" phone anchor="sms" />
<Number value="+47116000" phone />
<Number value="+4702000" phone />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Bank Account number (Kontonummer)"
          data-dnb-test="number-ban"
        >
          {/* @jsx */ `
<Number value="2000123456" ban />
          `}
        </ComponentBox>
        <ComponentBox
          caption="National Identification number (Fødselsnummer)"
          data-dnb-test="number-nin"
        >
          {/* @jsx */ `
<Number value="18089212345" nin />
          `}
        </ComponentBox>
      </Style>
    )
  }
}

export { Example }
export default () => <Example />
