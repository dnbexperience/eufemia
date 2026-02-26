import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Spotlight from '@dnb/eufemia/src/components/Spotlight'
import { Flex } from '@dnb/eufemia/src'

export const CurrencyDefault = () => (
  <ComponentBox data-visual-test="spotlight-amount-default">
    <Flex.Stack>
      <Spotlight.Currency value={1234} currency="NOK" suffix="/mnd" />
      <Spotlight.Currency
        value={1234}
        currency="USD"
        signDisplay="always"
        locale="en-GB"
      />
      <Spotlight.Currency
        value={1234}
        currency="EUR"
        currencyPosition="before"
        decimals={2}
      />
    </Flex.Stack>
  </ComponentBox>
)

export const CurrencySizes = () => (
  <ComponentBox>
    <Flex.Stack>
      <Spotlight.Currency
        value={12345}
        currency="NOK"
        mainSize="xx-large"
        auxiliarySize="basis"
      />
      <Spotlight.Currency
        value={12345}
        currency="NOK"
        mainSize="large"
        auxiliarySize="x-small"
      />
    </Flex.Stack>
  </ComponentBox>
)

export const PercentDefault = () => (
  <ComponentBox>
    <Flex.Stack>
      <Spotlight.Percent value={12.3} />
      <Spotlight.Percent value={-12.3} signDisplay="always" />
      <Spotlight.Percent value={0.1234} decimals={2} />
    </Flex.Stack>
  </ComponentBox>
)
