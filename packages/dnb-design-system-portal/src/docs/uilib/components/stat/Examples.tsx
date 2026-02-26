import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Stat from '@dnb/eufemia/src/components/Stat'
import { Flex } from '@dnb/eufemia/src'

export const CurrencyDefault = () => (
  <ComponentBox data-visual-test="stat-amount-default">
    <Flex.Stack>
      <Stat.Currency value={1234} currency="NOK" suffix="/mnd" />
      <Stat.Currency
        value={1234}
        currency="USD"
        signDisplay="always"
        locale="en-GB"
      />
      <Stat.Currency
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
      <Stat.Currency
        value={12345}
        currency="NOK"
        mainSize="xx-large"
        auxiliarySize="basis"
      />
      <Stat.Currency
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
      <Stat.Percent value={12.3} />
      <Stat.Percent value={-12.3} signDisplay="always" />
      <Stat.Percent value={0.1234} decimals={2} />
    </Flex.Stack>
  </ComponentBox>
)
