---
title: 'Stat'
description: 'Composable metric components for highlighted values, trends, and labels.'
version: 10.101.2
generatedAt: 2026-03-25T07:08:27.589Z
checksum: 30fa6d1efae36f3ea3005035dea83acba7d3bb0b6d171a7890b5e00b1da462eb
---

# Stat

## Import

```tsx
import { Stat } from '@dnb/eufemia'
```

## Description

`Stat` contains components for prominent values with a label, where typography and visual emphasis are part of the component.

## Available components

- `Stat.Root` renders a definition list (`dl`).

  - `Stat.Label` renders descriptive text with dedicated typography and color for metric context (`dt`).

  - `Stat.Content` renders the main value as a definition description (`dd`).

- `Stat.Number` is the base value formatter built on the [NumberFormat](/uilib/components/number-format/) formatting logic.

- `Stat.Currency` and `Stat.Percent` are convenience wrappers around `Stat.Number`.

  - It adds typography-specific properties such as `fontSize`, `fontWeight` and `colorizeBySign`, along with `mainSize` and `auxiliarySize` as well as `mainWeight` and `auxiliaryWeight` that can be used to customize the visual emphasis of the different parts of the value (currency symbol or percent sign).

- `Stat.Trend` renders explicit `+` / `-` indicators with red/green background states and screen-reader text.

- `Stat.Rating` renders a star rating (defaults to 5 stars) and colorizes stars based on `value`. The `max` prop is clamped to `20` to prevent excessive DOM output; a console warning is emitted when the limit is exceeded.

- `Stat.Info` renders supporting text with a smaller, muted style.

- `Stat.Inline` is a horizontal layout container for grouping content elements like `Stat.Trend` and `Stat.Info` side by side with consistent spacing and alignment.

### Deprecated

- `Stat.Amount` is deprecated and will be removed in a future version. Use `Stat.Number` instead.

## Accessibility

- `Stat.Root` provides semantic definition-list markup (`dl`), where `Stat.Label` is rendered as `dt` and `Stat.Content` as `dd`.

- If the label also acts as a section heading, use a heading element inside `Stat.Label` (for example `H3`) to preserve a meaningful heading outline.

- Use `srLabel` to prepend context in the screen-reader text only, for example turning `1,234 kr` into `Revenue 1,234 kr` for screen readers.

- When e.g. `signDisplay="always"` is used, the sign is rendered as a separate visual element with CSS spacing, while the accessible text stays based on the formatted number string.

- All Stat variants keep dedicated accessibility handling. `Currency`, `Percent`, and `Trend` use a dedicated screen-reader value (`.dnb-sr-only`) based on the formatted content. `Rating` uses an accessible label (`role="img"` + `aria-label`) that includes value and max.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/stat)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/stat)

## Demos

### Basic usage

```tsx
render(
  <Stat.Root>
    <Stat.Label>Revenue growth</Stat.Label>
    <Stat.Content direction="vertical">
      <Stat.Currency value={1234} signDisplay="always" />
      <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
      <Stat.Info>Some additional information.</Stat.Info>
    </Stat.Content>
  </Stat.Root>
)
```

### Root and Label

If the label acts as a section heading, place a heading element inside `Stat.Label` (for example `H3`).

```tsx
render(
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
)
```

#### Hidden Label

Use a visually hidden label (`srOnly`) when the visible UI context already describes the statistic.

```tsx
render(
  <Stat.Root>
    <Stat.Label srOnly>I'm a hidden label</Stat.Label>
    <Stat.Content>
      <Stat.Currency value={1234} />
    </Stat.Content>
  </Stat.Root>
)
```

### Currency

You can use `mainSize` and `auxiliarySize` to adjust the relative size of the currency symbol and the amount.

```tsx
render(
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
      <Stat.Currency
        value={-1234.5}
        decimals={2}
        currency="USD"
        signDisplay="always"
        fontSize="medium"
        colorizeBySign
        locale="en-GB"
      />
    </Stat.Content>
  </Stat.Root>
)
```

### Currency within a Trend

```tsx
render(
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
          />)
        </Stat.Info>
      </Stat.Inline>
    </Stat.Content>
  </Stat.Root>
)
```

### Number

```tsx
render(
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
        <Stat.Number value={1234} srLabel="Signed amount with currency" />)
      </Stat.Info>
    </Stat.Content>
  </Stat.Root>
)
```

### Percent

```tsx
render(
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
      <Stat.Percent
        value={0.1234}
        decimals={2}
        signDisplay="always"
        fontSize="medium"
        colorizeBySign
      />
    </Stat.Content>
  </Stat.Root>
)
```

### Percent colorized by sign

```tsx
render(
  <Stat.Root>
    <Stat.Label>Positive without signDisplay</Stat.Label>
    <Stat.Content>
      <Stat.Percent value={12.3} fontSize="medium" colorizeBySign />
    </Stat.Content>

    <Stat.Label top>Negative without signDisplay</Stat.Label>
    <Stat.Content>
      <Stat.Percent value={-12.3} fontSize="medium" colorizeBySign />
    </Stat.Content>

    <Stat.Label top>Zero without signDisplay</Stat.Label>
    <Stat.Content>
      <Stat.Percent value={0} fontSize="medium" colorizeBySign />
    </Stat.Content>
  </Stat.Root>
)
```

### Rating

```tsx
render(
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
)
```

### With Subtle Label

Also, the order of the content and label can be switched for visual users (not screen readers), and the label is styled with the `subtle` variant to further de-emphasize it.

```tsx
function Example() {
  const { rating } = useTranslation().Stat
  return (
    <Grid.Container
      rowGap
      columnGap
      style={{
        gridAutoRows: '1fr',
      }}
    >
      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [1, 3],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
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
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [4, 6],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
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
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [7, 9],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
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
        span={{
          small: [1, 12],
          medium: [1, 12],
          large: [10, 12],
        }}
      >
        <Card
          style={{
            height: '100%',
          }}
        >
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
render(<Example />)
```

## Stat.Currency

<PropertiesTable props={CurrencyProperties} />

## Stat.Percent

<PropertiesTable props={PercentProperties} />

## Stat.Number

<PropertiesTable props={NumberProperties} />

## Stat.Trend

<PropertiesTable props={TrendProperties} />

## Stat.Rating

<PropertiesTable props={RatingProperties} />

## Stat.Info

<PropertiesTable props={InfoProperties} />

## Stat.Root

<PropertiesTable props={RootProperties} />

## Stat.Label

<PropertiesTable props={LabelProperties} />

## Stat.Content

<PropertiesTable props={ContentProperties} />

## Stat.Inline

```json
{
  "props": {
    "children": {
      "doc": "Inline layout container for content elements, typically `Stat.Trend` and `Stat.Info`.",
      "type": ["React.ReactNode"],
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton state to the inline container.",
      "type": "boolean",
      "status": "optional"
    },
    "[Flex.Horizontal](/uilib/layout/flex/horizontal/properties)": {
      "doc": "Supports all additional `Flex.Horizontal` properties.",
      "type": "Various",
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Stat.rating": {
      "nb-NO": "%value av %max",
      "en-GB": "%value of %max",
      "sv-SE": "%value av %max",
      "da-DK": "%value af %max"
    }
  }
}
```
