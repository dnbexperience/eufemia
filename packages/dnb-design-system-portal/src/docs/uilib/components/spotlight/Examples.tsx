import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Spotlight from '@dnb/eufemia/src/components/Spotlight'
import { Flex } from '@dnb/eufemia/src'

export const AmountDefault = () => (
  <ComponentBox data-visual-test="spotlight-amount-default">
    <Flex.Stack>
      <Spotlight.Amount value={1234} currency="NOK" suffix="/mnd" />
      <Spotlight.Amount
        value={1234}
        currency="USD"
        signDisplay="always"
        locale="en-GB"
      />
      <Spotlight.Amount
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
      <Spotlight.Amount
        value={12345}
        currency="NOK"
        mainSize="xx-large"
        auxiliarySize="basis"
      />
      <Spotlight.Amount
        value={12345}
        currency="NOK"
        mainSize="large"
        auxiliarySize="x-small"
      />
    </Flex.Stack>
  </ComponentBox>
)
