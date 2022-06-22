/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

const Style = styled.div`
  *:not([data-visual-test='number-format-spacing'])
    > span.dnb-number-format {
    display: block;
  }
  [data-visual-test='number-locales'] .dnb-p:last-of-type {
    padding-bottom: 1rem;
  }
`

export const NumberDefault = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-default">
      {() => /* jsx */ `
<P>
  <NumberFormat value="12345" srLabel="Total:" />
  <NumberFormat>-12345678.9</NumberFormat>
  <NumberFormat prefix={<b>prefix</b>} suffix="suffix">-12345678.9</NumberFormat>
  <NumberFormat decimals={1}>-1234.54321</NumberFormat>
  <NumberFormat decimals={2}>-1234</NumberFormat>
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberPercent = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-percent">
      {() => /* jsx */ `
<P>
  <NumberFormat percent value="12.34" />
  <NumberFormat percent>-12.34</NumberFormat>
  <NumberFormat percent decimals={1}>-12.34</NumberFormat>
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberCurrency = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-currency">
      {() => /* jsx */ `
<P>
  <NumberFormat currency>12345</NumberFormat>
  <NumberFormat currency currency_position="before" value={-12345678.9} />
  <NumberFormat currency value={-12345678.95} decimals={0} />
  <NumberFormat
    currency
    value={-12345678.9}
    currency_display="code"
  />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberCompact = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-compact">
      {() => /* jsx */ `
<P>
  <NumberFormat compact decimals={1}>1234</NumberFormat>
  <NumberFormat
    compact
    decimals={1}
    value={123456}
  />
  <NumberFormat
    compact="short"
    decimals={2}
    value={-1723967.38}
  />
  <NumberFormat
    compact="long"
    decimals={3}
    value={-1234567.9876}
  />
  <NumberFormat
    compact="long"
    currency
    value={12345}
    decimals={1}
    currency_display="name"
  />
  <NumberFormat
    compact
    value={123455678912}
    decimals={3}
  />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberPhone = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-phone">
      {() => /* jsx */ `
<P>
  <NumberFormat value="99999999" phone />
  <NumberFormat value="4799999999" phone />
  <NumberFormat value="++4799999999" phone />
  <NumberFormat value="+4780022222" phone link="sms" />
  <NumberFormat value="+47116000" phone selectall="false" />
  <NumberFormat value="+4702000" phone />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberBankAccount = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-ban">
      {() => /* jsx */ `
<P>
  <NumberFormat value="20001234567" ban />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberNationalIdentification = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-nin">
      {() => /* jsx */ `
<P>
  <NumberFormat value="18089212345" nin />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberOrganization = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-org">
      {() => /* jsx */ `
<P>
  <NumberFormat value="123456789" org suffix="MVA" />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberLocales = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-locales">
      {() => /* jsx */ `
<H3>Numbers</H3>
<P>
  <NumberFormat locale="nb-NO" value="-12345678.9" />
  <NumberFormat locale="en-GB" value="-12345678.9" />
  <NumberFormat locale="de-DE" value="-12345678.9" />
  <NumberFormat locale="de-CH" value="-12345678.9" />
  <NumberFormat locale="fr-CH" value="-12345678.9" />
</P>

<H3>Currencies</H3>
<P>
  <NumberFormat locale="nb-NO" value="-12345.6" currency />
  <NumberFormat locale="en-GB" value="-12345.6" currency />
  <NumberFormat locale="de-DE" value="-12345.6" currency />
  <NumberFormat locale="de-CH" value="-12345.6" currency />
  <NumberFormat locale="fr-CH" value="-12345.6" currency />
</P>
`}
    </ComponentBox>
  </Style>
)

export const NumberSpacing = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-spacing">
      {() => /* jsx */ `
text <NumberFormat value="1234" currency left right />
text <NumberFormat value="5678" currency left right /> text 
`}
    </ComponentBox>
  </Style>
)
