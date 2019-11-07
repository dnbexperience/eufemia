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
<Number value="12345" />
<Number>-12345678.9</Number>
          `}
        </ComponentBox>
        <ComponentBox caption="Currency" data-dnb-test="number-currency">
          {/* @jsx */ `
<Number currency>12345</Number>
<Number currency value={-12345678.9} />
<Number currency value={-12345678.9} currency_display="code" />
          `}
        </ComponentBox>
        <ComponentBox caption="Phone number" data-dnb-test="number-phone">
          {/* @jsx */ `
<Number value="99999999" phone />
<Number value="4799999999" phone />
<Number value="++4799999999" phone />
<Number value="+4780022222" phone link="sms" />
<Number value="+47116000" phone />
<Number value="+4702000" phone />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Bank Account number (Kontonummer)"
          data-dnb-test="number-ban"
        >
          {/* @jsx */ `
<Number value="20001234567" ban />
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
        <ComponentBox
          caption="Numbers and currencies in different locales"
          data-dnb-test="number-locales"
        >
          {/* @jsx */ `
<H3>Numbers</H3>
<Number locale="no-NB" value="-12345678.9" />
<Number locale="en-US" value="-12345678.9" />
<Number locale="de-DE" value="-12345678.9" />
<Number locale="de-CH" value="-12345678.9" />
<Number locale="fr-CH" value="-12345678.9" />

<H3>Currencies</H3>
<Number locale="no-NB" value="-12345.6" currency />
<Number locale="en-US" value="-12345.6" currency />
<Number locale="de-DE" value="-12345.6" currency />
<Number locale="de-CH" value="-12345.6" currency />
<Number locale="fr-CH" value="-12345.6" currency />

<br/>
          `}
        </ComponentBox>
      </Style>
    )
  }
}

export { Example }
export default () => <Example />
