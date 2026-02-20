import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import HeroFormat from '@dnb/eufemia/src/components/HeroFormat'
import { Flex } from '@dnb/eufemia/src'

export const AmountDefault = () => (
  <ComponentBox data-visual-test="hero-format-amount-default">
    <Flex.Stack>
      <HeroFormat.Amount value={1234} currency="NOK" suffix="/mnd" />
      <HeroFormat.Amount
        value={1234}
        currency="USD"
        signDisplay="always"
        locale="en-GB"
      />
      <HeroFormat.Amount
        value={1234}
        currency="EUR"
        currencyPosition="before"
        decimals={2}
      />
    </Flex.Stack>
  </ComponentBox>
)

export const AmountSizes = () => (
  <ComponentBox>
    <Flex.Stack>
      <HeroFormat.Amount
        value={12345}
        currency="NOK"
        numberSize="xx-large"
        currencySize="basis"
      />
      <HeroFormat.Amount
        value={12345}
        currency="NOK"
        numberSize="large"
        currencySize="x-small"
      />
    </Flex.Stack>
  </ComponentBox>
)
