/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Provider } from '@dnb/eufemia/src/shared'
import NumberFormat from '@dnb/eufemia/src/components/NumberFormat'
import Stat from '@dnb/eufemia/src/components/Stat'
import P from '@dnb/eufemia/src/elements/P'
import H3 from '@dnb/eufemia/src/elements/H3'

const Style = styled.div`
  *:not([data-visual-test='number-format-spacing'])
    > span.dnb-number-format {
    display: flex;
    width: max-content;
  }
  [data-visual-test='number-locales'] .dnb-p:last-of-type {
    padding-bottom: 1rem;
  }
`

export const NumberDefault = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-default">
      <P>
        <NumberFormat.Number value="12345" srLabel="Total:" />
        <NumberFormat.Number>-12345678.9</NumberFormat.Number>
        <NumberFormat.Number prefix={<b>prefix</b>} suffix="suffix">
          -12345678.9
        </NumberFormat.Number>
        <NumberFormat.Number decimals={1}>-1234.54321</NumberFormat.Number>
        <NumberFormat.Number decimals={2} copySelection={false}>
          -1234
        </NumberFormat.Number>
        <NumberFormat.Number decimals={2}>invalid</NumberFormat.Number>
      </P>
    </ComponentBox>
  </Style>
)

export const NumberPercent = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-percent">
      <P>
        <NumberFormat.Percent value="12.34" />
        <NumberFormat.Percent>-12.34</NumberFormat.Percent>
        <NumberFormat.Percent decimals={1}>-12.34</NumberFormat.Percent>
      </P>
    </ComponentBox>
  </Style>
)

export const NumberCurrency = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-currency">
      <P>
        <NumberFormat.Currency>12345</NumberFormat.Currency>
        <NumberFormat.Currency
          currencyPosition="before"
          value={-12345678.9}
        />
        <NumberFormat.Currency value={-12345678.95} decimals={0} />
        <NumberFormat.Currency
          value={-12345678.9}
          currencyDisplay="code"
        />
        <NumberFormat.Currency
          value={-12345678.9}
          currencyDisplay={false}
        />
        <NumberFormat.Currency decimals={2}>invalid</NumberFormat.Currency>
      </P>
    </ComponentBox>
  </Style>
)

export const NumberHeroStyleAmount = () => (
  <Style>
    <ComponentBox>
      <Stat.Currency
        value={12345}
        currency="NOK"
        suffix="/mnd"
        signDisplay="always"
        mainSize="x-large"
        auxiliarySize="x-small"
      />
    </ComponentBox>
  </Style>
)

export const NumberProvider = () => (
  <Style>
    <ComponentBox>
      <Provider
        value={{
          NumberFormat: {
            currency: true,
            rounding: 'omit',
            cleanCopyValue: true,
          },
        }}
      >
        <P>
          <NumberFormat.Currency>12345</NumberFormat.Currency>
          <NumberFormat.Currency value={-12345.123} decimals={0} />
          <NumberFormat.Currency
            value={-12345678.955}
            currencyPosition="before"
          />
        </P>
      </Provider>
    </ComponentBox>
  </Style>
)

export const NumberCompact = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-compact">
      <P>
        <NumberFormat.Compact decimals={1}>1234</NumberFormat.Compact>
        <NumberFormat.Compact decimals={1} value={123456} />
        <NumberFormat.Compact
          compact="short"
          decimals={2}
          value={-1723967.38}
        />
        <NumberFormat.Compact
          compact="long"
          decimals={3}
          value={-1234567.9876}
        />
        <NumberFormat.Compact
          compact="long"
          currency
          value={12345}
          decimals={1}
          currencyDisplay="name"
        />
        <NumberFormat.Compact value={123455678912} decimals={3} />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberPhone = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-phone">
      <P>
        <NumberFormat.PhoneNumber value="99999999" />
        <NumberFormat.PhoneNumber value="4799999999" />
        <NumberFormat.PhoneNumber value="004799999999" />
        <NumberFormat.PhoneNumber value="+4780022222" link="sms" />
        <NumberFormat.PhoneNumber value="+47116000" selectAll={false} />
        <NumberFormat.PhoneNumber value="+4702000" />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberBankAccount = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-ban">
      <P>
        <NumberFormat.BankAccountNumber value="20001234567" />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberNationalIdentification = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-nin">
      <P>
        <NumberFormat.NationalIdentityNumber value="18089212345" />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberOrganization = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-org">
      <P>
        <NumberFormat.OrganizationNumber value="123456789" suffix="MVA" />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberLocales = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-locales">
      <H3>Numbers</H3>
      <P>
        <NumberFormat.Number locale="nb-NO" value="-12345678.9" />
        <NumberFormat.Number locale="en-GB" value="-12345678.9" />
        <NumberFormat.Number locale="de-DE" value="-12345678.9" />
        <NumberFormat.Number locale="de-CH" value="-12345678.9" />
        <NumberFormat.Number locale="fr-CH" value="-12345678.9" />
      </P>

      <H3>Currencies</H3>
      <P>
        <NumberFormat.Currency locale="nb-NO" value="-12345.6" />
        <NumberFormat.Currency locale="en-GB" value="-12345.6" />
        <NumberFormat.Currency locale="de-DE" value="-12345.6" />
        <NumberFormat.Currency locale="de-CH" value="-12345.6" />
        <NumberFormat.Currency locale="fr-CH" value="-12345.6" />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberSpacing = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-spacing">
      <span>text</span> <NumberFormat.Currency value="1234" left right />
      <span>text</span> <NumberFormat.Currency value="5678" left right />
      <span>text</span>
    </ComponentBox>
  </Style>
)

export const NumberSignDisplay = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-sign-display">
      <H3>signDisplay="auto"</H3>
      <P>
        <NumberFormat.Number signDisplay="auto" value={1234} />
        <NumberFormat.Number signDisplay="auto" value={-1234} />
        <NumberFormat.Number signDisplay="auto" value={0} />
      </P>
      <H3>signDisplay="always"</H3>
      <P>
        <NumberFormat.Number signDisplay="always" value={1234} />
        <NumberFormat.Number signDisplay="always" value={-1234} />
        <NumberFormat.Number signDisplay="always" value={0} />
      </P>
      <H3>signDisplay="never"</H3>
      <P>
        <NumberFormat.Number signDisplay="never" value={1234} />
        <NumberFormat.Number signDisplay="never" value={-1234} />
        <NumberFormat.Number signDisplay="never" value={0} />
      </P>
      <H3>signDisplay="negative"</H3>
      <P>
        <NumberFormat.Number signDisplay="negative" value={1234} />
        <NumberFormat.Number signDisplay="negative" value={-1234} />
        <NumberFormat.Number signDisplay="negative" value={0} />
      </P>
      <H3>signDisplay="exceptZero"</H3>
      <P>
        <NumberFormat.Number signDisplay="exceptZero" value={1234} />
        <NumberFormat.Number signDisplay="exceptZero" value={-1234} />
        <NumberFormat.Number signDisplay="exceptZero" value={0} />
      </P>
    </ComponentBox>
  </Style>
)

export const NumberMonospace = () => (
  <Style>
    <ComponentBox data-visual-test="number-format-monospace">
      <NumberFormat.Currency
        value="123456"
        locale="en-GB"
        currency="NOK"
        monospace
      />
    </ComponentBox>
  </Style>
)
