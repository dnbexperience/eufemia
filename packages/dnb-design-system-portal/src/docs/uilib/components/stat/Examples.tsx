import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import Stat from '@dnb/eufemia/src/components/Stat'
import { DateFormat, Flex, H3 } from '@dnb/eufemia/src'

export const BasicUsage = () => (
  <ComponentBox data-visual-test="stat-amount-default">
    <Stat.Root>
      <Stat.Label>Revenue growth</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency
          value={1234}
          signDisplay="always"
          srLabel="Revenue"
        />
        <Stat.Trend value="+12.4%" srLabel="Change" />
        <Stat.Info>Some additional information.</Stat.Info>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const RootAndLabel = () => (
  <ComponentBox data-visual-test="stat-root-and-label">
    <Stat.Root>
      <Stat.Label>
        <H3>Revenue growth</H3>
      </Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency value={1234} srLabel="Revenue growth" />
        <Stat.Trend value="+12.4%" srLabel="Growth trend" />
      </Stat.Content>
    </Stat.Root>

    <Stat.Root top="large">
      <Stat.Label>Monthly change</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency
          value={-1234}
          signDisplay="always"
          srLabel="Monthly change"
        />
        <Flex.Horizontal gap="x-small">
          <Stat.Trend value="-2.1%" srLabel="Change trend" />
          <Stat.Info>(some additional information)</Stat.Info>
        </Flex.Horizontal>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const CurrencyWithinTrend = () => (
  <ComponentBox data-visual-test="stat-currency-within-trend">
    <Stat.Root>
      <Stat.Label>
        <DateFormat value="P1Y" />
      </Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency
          value={350234}
          mainSize="large"
          auxiliarySize="large"
          srLabel="Annual revenue"
        />
        <Flex.Horizontal gap="x-small">
          <Stat.Trend>
            <Stat.Currency
              value={46692}
              signDisplay="always"
              mainSize="small"
              auxiliarySize="small"
              srLabel="Revenue delta"
            />
          </Stat.Trend>
          <Stat.Info>
            (
            <Stat.Percent
              value={16.79}
              decimals={2}
              mainWeight="regular"
              mainSize="basis"
              auxiliarySize="basis"
              srLabel="Relative change"
            />
            )
          </Stat.Info>
        </Flex.Horizontal>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const CurrencyDefault = () => (
  <ComponentBox data-visual-test="stat-currency-default">
    <Stat.Root>
      <Stat.Label>Currency</Stat.Label>
      <Stat.Content>
        <Stat.Currency value={1234} srLabel="NOK amount" />
      </Stat.Content>

      <Stat.Label top>Currency</Stat.Label>
      <Stat.Content>
        <Stat.Currency
          value={1234}
          currency="USD"
          suffix="/mnd"
          signDisplay="always"
          locale="en-GB"
          srLabel="USD per month"
        />
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const PercentDefault = () => (
  <ComponentBox data-visual-test="stat-percent-default">
    <Stat.Root>
      <Stat.Label>Percentage</Stat.Label>
      <Stat.Content>
        <Stat.Percent value={12.3} srLabel="Percentage value" />
      </Stat.Content>
      <Stat.Content>
        <Stat.Percent
          value={0.1234}
          decimals={2}
          signDisplay="always"
          mainWeight="regular"
          mainSize="medium"
          auxiliarySize="medium"
          srLabel="Signed percentage value"
        />
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)
