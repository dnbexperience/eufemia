import { useTranslation } from '@dnb/eufemia/shared'
import {
  Card,
  Code,
  DateFormat,
  Grid,
  H3,
  Icon,
  IconPrimary,
} from '@dnb/eufemia/src'
import Stat from '@dnb/eufemia/src/components/Stat'
import { globe_medium } from '@dnb/eufemia/src/icons'
import ComponentBox from '../../../../shared/tags/ComponentBox'

export const BasicUsage = () => (
  <ComponentBox data-visual-test="stat-amount-default">
    <Stat.Root>
      <Stat.Label>Revenue growth</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency value={1234} signDisplay="always" />
        <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
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
        <Stat.Currency
          value={1234}
          mainSize="x-large"
          auxiliarySize="x-small"
        />
        <Stat.Trend srLabel="Growth trend">+12.4%</Stat.Trend>
      </Stat.Content>

      <Stat.Label top>Monthly change</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency
          value={-1234}
          signDisplay="always"
          mainSize="x-large"
          auxiliarySize="x-small"
        />
        <Stat.Inline>
          <Stat.Trend srLabel="Change trend">-2.1%</Stat.Trend>
          <Stat.Info>(some additional information)</Stat.Info>
        </Stat.Inline>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const HiddenLabel = () => (
  <ComponentBox>
    <Stat.Root>
      <Stat.Label srOnly>I'm a hidden label</Stat.Label>
      <Stat.Content>
        <Stat.Currency value={1234} />
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
        <Stat.Currency value={350234} srLabel="Annual revenue" />
        <Stat.Inline>
          <Stat.Trend>
            <Stat.Currency
              value={46692}
              signDisplay="always"
              srLabel="Revenue delta"
            />
          </Stat.Trend>
          <Stat.Info>
            (
            <Stat.Percent
              value={16.79}
              decimals={2}
              srLabel="Relative change"
            />
            )
          </Stat.Info>
        </Stat.Inline>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const CurrencyDefault = () => (
  <ComponentBox data-visual-test="stat-currency-default">
    <Stat.Root>
      <Stat.Label>Always show sign</Stat.Label>
      <Stat.Content>
        <Stat.Currency
          value={1234}
          mainSize="x-large"
          signDisplay="always"
          auxiliarySize="x-small"
        />
      </Stat.Content>

      <Stat.Label top>With suffix</Stat.Label>
      <Stat.Content>
        <Stat.Currency
          value={1234}
          currency="USD"
          suffix="/mnd"
          mainSize="x-large"
          auxiliarySize="x-small"
        />
      </Stat.Content>

      <Stat.Label top>
        Colorized using <Code>en-GB</Code> locale
      </Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={-1234.5}>
          <Stat.Currency
            value={-1234.5}
            decimals={2}
            currency="USD"
            signDisplay="always"
            fontSize="medium"
            locale="en-GB"
          />
        </Stat.ColorizeBySign>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const NumberDefault = () => (
  <ComponentBox data-visual-test="stat-number-example">
    <Stat.Root>
      <Stat.Label>Number</Stat.Label>
      <Stat.Content>
        <Stat.Number
          value={1234}
          signDisplay="always"
          mainSize="x-large"
          auxiliarySize="x-small"
        />
      </Stat.Content>

      <Stat.Label top>Number in Trend and Info</Stat.Label>
      <Stat.Content>
        <Stat.Trend tone="negative" srLabel="Negative trend">
          <Stat.Number value={-1234} signDisplay="always" />
        </Stat.Trend>
        <Stat.Info>
          (
          <Stat.Number
            value={1234}
            srLabel="Signed amount with currency"
          />
          )
        </Stat.Info>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const PercentDefault = () => (
  <ComponentBox data-visual-test="stat-percent-default">
    <Stat.Root>
      <Stat.Label>Percentage</Stat.Label>
      <Stat.Content>
        <Stat.Percent
          value={12.3}
          mainSize="x-large"
          auxiliarySize="x-small"
        />
      </Stat.Content>

      <Stat.Label top>Percentage colorized</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={0.1234}>
          <Stat.Percent
            value={0.1234}
            decimals={2}
            signDisplay="always"
            fontSize="medium"
          />
        </Stat.ColorizeBySign>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const PercentColorizeBySign = () => (
  <ComponentBox data-visual-test="stat-percent-colorize-by-sign">
    <Stat.Root>
      <Stat.Label>Positive without signDisplay</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={12.3}>
          <Stat.Percent value={12.3} fontSize="medium" />
        </Stat.ColorizeBySign>
      </Stat.Content>

      <Stat.Label top>Negative without signDisplay</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={-12.3}>
          <Stat.Percent value={-12.3} fontSize="medium" />
        </Stat.ColorizeBySign>
      </Stat.Content>

      <Stat.Label top>Zero without signDisplay</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={0}>
          <Stat.Percent value={0} fontSize="medium" />
        </Stat.ColorizeBySign>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const ColorizeBySignDefault = () => (
  <ComponentBox data-visual-test="stat-colorize-by-sign-default">
    <Stat.Root>
      <Stat.Label>With Stat.Currency</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={1234}>
          <Stat.Currency value={1234} signDisplay="always" />
        </Stat.ColorizeBySign>
      </Stat.Content>

      <Stat.Label top>With plain text</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={-1234}>
          Your content
        </Stat.ColorizeBySign>
      </Stat.Content>

      <Stat.Label top>Zero value</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={0}>Your content</Stat.ColorizeBySign>
      </Stat.Content>

      <Stat.Label top>Negative zero</Stat.Label>
      <Stat.Content>
        <Stat.ColorizeBySign value={-0}>Your content</Stat.ColorizeBySign>
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const RatingDefault = () => (
  <ComponentBox data-visual-test="stat-rating-default">
    <Stat.Root>
      <Stat.Label>Stars rating</Stat.Label>
      <Stat.Content>
        <Stat.Rating value={4} />
      </Stat.Content>

      <Stat.Label top>Progressive rating</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Rating variant="progressive" value={5} />
      </Stat.Content>
    </Stat.Root>
  </ComponentBox>
)

export const WithSubtleLabel = () => (
  <ComponentBox
    data-visual-test="stat-content-label-order-subtle-label"
    scope={{ useTranslation, globe_medium }}
  >
    {() => {
      function Example() {
        const { rating } = useTranslation().Stat
        return (
          <Grid.Container rowGap columnGap style={{ gridAutoRows: '1fr' }}>
            <Grid.Item
              span={{ small: [1, 12], medium: [1, 12], large: [1, 3] }}
            >
              <Card style={{ height: '100%' }}>
                <Stat.Root visualOrder="content-label">
                  <Stat.Label variant="subtle">
                    <DateFormat value="P1Y" />
                  </Stat.Label>
                  <Stat.Content direction="vertical">
                    <IconPrimary icon="arrow_up" top="x-small" />
                    <Stat.Percent
                      top="small"
                      value={5.21}
                      decimals={2}
                      fontSize="basis"
                      srLabel="Revenue growth percentage"
                    />
                  </Stat.Content>
                </Stat.Root>
              </Card>
            </Grid.Item>

            <Grid.Item
              span={{ small: [1, 12], medium: [1, 12], large: [4, 6] }}
            >
              <Card style={{ height: '100%' }}>
                <Stat.Root visualOrder="content-label">
                  <Stat.Label variant="subtle">Yearly cost</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Icon icon={globe_medium} />
                    <Stat.Percent
                      top="small"
                      value={0.6}
                      decimals={1}
                      fontSize="basis"
                    />
                  </Stat.Content>
                </Stat.Root>
              </Card>
            </Grid.Item>

            <Grid.Item
              span={{ small: [1, 12], medium: [1, 12], large: [7, 9] }}
            >
              <Card style={{ height: '100%' }}>
                <Stat.Root visualOrder="content-label">
                  <Stat.Label variant="subtle">Risiko</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Stat.Rating variant="progressive" value={2} />
                    <Stat.Info top variant="prominent">
                      Lav
                    </Stat.Info>
                  </Stat.Content>
                </Stat.Root>
              </Card>
            </Grid.Item>

            <Grid.Item
              span={{ small: [1, 12], medium: [1, 12], large: [10, 12] }}
            >
              <Card style={{ height: '100%' }}>
                <Stat.Root visualOrder="content-label">
                  <Stat.Label variant="subtle">Stars rating</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Stat.Rating value={2} />
                    <Stat.Info top variant="prominent">
                      {rating.replace('%value', '2').replace('%max', '5')}
                    </Stat.Info>
                  </Stat.Content>
                </Stat.Root>
              </Card>
            </Grid.Item>
          </Grid.Container>
        )
      }
      return <Example />
    }}
  </ComponentBox>
)
