---
title: 'Stat'
description: 'Composable metric components for highlighted values, trends, and labels.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:55.204Z
checksum: 9f97f348797f3f7f76bb39e17f84fe34b688885bf4e9e471db5c2085ddc3c0a1
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

- `Stat.Text` renders custom content and supports properties such as `fontSize`, `fontWeight`, and `colorizeBySign`.

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
render(<Stat.Root>
      <Stat.Label>Revenue growth</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency value={1234} signDisplay="always" />
        <Stat.Trend srLabel="Change">+12.4%</Stat.Trend>
        <Stat.Info>Some additional information.</Stat.Info>
      </Stat.Content>
    </Stat.Root>)
```


### Root and Label

If the label acts as a section heading, place a heading element inside `Stat.Label` (for example `H3`).


```tsx
render(<Stat.Root>
      <Stat.Label>
        <H3>Revenue growth</H3>
      </Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency value={1234} mainSize="x-large" auxiliarySize="x-small" />
        <Stat.Trend srLabel="Growth trend">+12.4%</Stat.Trend>
      </Stat.Content>

      <Stat.Label top>Monthly change</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency value={-1234} locale="en-GB" />
        <Stat.Inline>
          <Stat.Trend srLabel="Change trend">-2.1%</Stat.Trend>
          <Stat.Info>(some additional information)</Stat.Info>
        </Stat.Inline>
      </Stat.Content>
    </Stat.Root>)
```


#### Hidden Label

Use a visually hidden label (`srOnly`) when the visible UI context already describes the statistic.


```tsx
render(<Stat.Root>
      <Stat.Label srOnly>I'm a hidden label</Stat.Label>
      <Stat.Content>
        <Stat.Currency value={1234} />
      </Stat.Content>
    </Stat.Root>)
```


### Currency

You can use `mainSize` and `auxiliarySize` to adjust the relative size of the currency symbol and the amount.


```tsx
render(<Stat.Root>
      <Stat.Label>Always show sign</Stat.Label>
      <Stat.Content>
        <Stat.Currency value={1234} mainSize="x-large" signDisplay="always" auxiliarySize="x-small" />
      </Stat.Content>

      <Stat.Label top>With suffix</Stat.Label>
      <Stat.Content>
        <Stat.Currency value={1234} currency="USD" suffix="/mnd" mainSize="x-large" auxiliarySize="x-small" />
      </Stat.Content>

      <Stat.Label top>
        Colorized using <Code>en-GB</Code> locale
      </Stat.Label>
      <Stat.Content>
        <Stat.Currency value={-1234.5} decimals={2} currency="USD" signDisplay="always" fontSize="medium" colorizeBySign locale="en-GB" />
      </Stat.Content>
    </Stat.Root>)
```


### Currency within a Trend


```tsx
render(<Stat.Root>
      <Stat.Label>
        <DateFormat value="P1Y" />
      </Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Currency value={350234} srLabel="Annual revenue" />
        <Stat.Inline>
          <Stat.Trend>
            <Stat.Currency value={46692} signDisplay="always" srLabel="Revenue delta" />
          </Stat.Trend>
          <Stat.Info>
            (
            <Stat.Percent value={16.79} decimals={2} srLabel="Relative change" />
            )
          </Stat.Info>
        </Stat.Inline>
      </Stat.Content>
    </Stat.Root>)
```


### Number


```tsx
render(<Stat.Root>
      <Stat.Label>Number</Stat.Label>
      <Stat.Content>
        <Stat.Number value={1234} signDisplay="always" mainSize="x-large" auxiliarySize="x-small" />
      </Stat.Content>

      <Stat.Label top>Number in Trend and Info</Stat.Label>
      <Stat.Content>
        <Stat.Trend tone="negative" srLabel="Negative trend">
          <Stat.Number value={-1234} signDisplay="always" />
        </Stat.Trend>
        <Stat.Info>
          (
          <Stat.Number value={1234} srLabel="Signed amount with currency" />
          )
        </Stat.Info>
      </Stat.Content>
    </Stat.Root>)
```


### Percent


```tsx
render(<Stat.Root>
      <Stat.Label>Percentage</Stat.Label>
      <Stat.Content>
        <Stat.Percent value={12.3} mainSize="x-large" auxiliarySize="x-small" />
      </Stat.Content>

      <Stat.Label top>Percentage colorized</Stat.Label>
      <Stat.Content>
        <Stat.Percent value={0.1234} decimals={2} signDisplay="always" fontSize="medium" colorizeBySign />
      </Stat.Content>
    </Stat.Root>)
```


### Percent colorized by sign


```tsx
render(<Stat.Root>
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
    </Stat.Root>)
```


### Rating


```tsx
render(<Stat.Root>
      <Stat.Label>Stars rating</Stat.Label>
      <Stat.Content>
        <Stat.Rating value={4} />
      </Stat.Content>

      <Stat.Label top>Progressive rating</Stat.Label>
      <Stat.Content direction="vertical">
        <Stat.Rating variant="progressive" value={5} />
      </Stat.Content>
    </Stat.Root>)
```


### Text


```tsx
render(<Stat.Root>
      <Stat.Label>Label</Stat.Label>
      <Stat.Content>
        <Stat.Text colorizeBySign={-123}>Custom content</Stat.Text>
      </Stat.Content>

      <Stat.Label top>With medium font weight and size</Stat.Label>
      <Stat.Content>
        <Stat.Text srLabel="Screen reader label" colorizeBySign={123} fontWeight="medium" fontSize="medium">
          Larger and bolder
        </Stat.Text>
      </Stat.Content>
    </Stat.Root>)
```


### With Subtle Label

Also, the order of the content and label can be switched for visual users (not screen readers), and the label is styled with the `subtle` variant to further de-emphasize it.


```tsx
function Example() {
  const {
    rating
  } = useTranslation().Stat;
  return <Grid.Container rowGap columnGap style={{
    gridAutoRows: '1fr'
  }}>
            <Grid.Item span={{
      small: [1, 12],
      medium: [1, 12],
      large: [1, 3]
    }}>
              <Card style={{
        height: '100%'
      }}>
                <Stat.Root visualOrder="content-label">
                  <Stat.Label variant="subtle">
                    <DateFormat value="P1Y" />
                  </Stat.Label>
                  <Stat.Content direction="vertical">
                    <IconPrimary icon="arrow_up" top="x-small" />
                    <Stat.Percent top="small" value={5.21} decimals={2} fontSize="basis" srLabel="Revenue growth percentage" />
                  </Stat.Content>
                </Stat.Root>
              </Card>
            </Grid.Item>

            <Grid.Item span={{
      small: [1, 12],
      medium: [1, 12],
      large: [4, 6]
    }}>
              <Card style={{
        height: '100%'
      }}>
                <Stat.Root visualOrder="content-label">
                  <Stat.Label variant="subtle">Yearly cost</Stat.Label>
                  <Stat.Content direction="vertical">
                    <Icon icon={globe_medium} />
                    <Stat.Percent top="small" value={0.6} decimals={1} fontSize="basis" />
                  </Stat.Content>
                </Stat.Root>
              </Card>
            </Grid.Item>

            <Grid.Item span={{
      small: [1, 12],
      medium: [1, 12],
      large: [7, 9]
    }}>
              <Card style={{
        height: '100%'
      }}>
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

            <Grid.Item span={{
      small: [1, 12],
      medium: [1, 12],
      large: [10, 12]
    }}>
              <Card style={{
        height: '100%'
      }}>
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
          </Grid.Container>;
}
render(<Example />);
```


### With AriaLive

Use the [AriaLive](/uilib/components/aria-live/) component to announce dynamic value updates to screen readers. Wrap `Stat.Root` with `AriaLive` so that changes are announced when the content updates.


```tsx
function Example() {
  const [value, setValue] = useState(1234);
  return <Flex.Stack>
            <AriaLive variant="content">
              <Stat.Root>
                <Stat.Label>Revenue</Stat.Label>
                <Stat.Content>
                  <Stat.Currency value={value} />
                </Stat.Content>
              </Stat.Root>
            </AriaLive>

            <Button text="Update value" variant="secondary" onClick={() => setValue(prev => prev + 100)} />
          </Flex.Stack>;
}
render(<Example />);
```

## Stat.Currency


```json
{
  "props": {
    "currencyDisplay": {
      "doc": "Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner), `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.",
      "type": "string",
      "status": "optional"
    },
    "currencyPosition": {
      "doc": "Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).",
      "type": "string",
      "status": "optional"
    },
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": [
        "boolean",
        "string"
      ],
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "fontSize": {
      "doc": "Typography size fallback used for both main and auxiliary content. `mainSize` and `auxiliarySize` override this value. If omitted, default is `large` (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless any size prop is set).",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "status": "optional"
    },
    "mainSize": {
      "doc": "Typography size for the main content. When omitted, it falls back to `fontSize` if provided.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "large (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless `fontSize`, `mainSize`, or `auxiliarySize` is set)",
      "status": "optional"
    },
    "mainWeight": {
      "doc": "Typography weight for the main content.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "defaultValue": "medium",
      "status": "optional"
    },
    "auxiliaryWeight": {
      "doc": "Typography weight for secondary content like currency sign and affixes. If omitted, and `mainSize` equals `auxiliarySize` while `mainWeight` is omitted, `medium` is used.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "status": "optional"
    },
    "auxiliarySize": {
      "doc": "Typography size for secondary content like currency sign and affixes (`prefix` and `suffix`). When omitted, it falls back to `fontSize` if provided.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "large (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless `fontSize`, `mainSize`, or `auxiliarySize` is set)",
      "status": "optional"
    },
    "colorizeBySign": {
      "doc": "If `true`, text color follows sign tone (`+` green, `-` red).",
      "type": [
        "boolean"
      ],
      "defaultValue": "false",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Percent


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": [
        "boolean",
        "string"
      ],
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "fontSize": {
      "doc": "Typography size fallback used for both main and auxiliary content. `mainSize` and `auxiliarySize` override this value. If omitted, default is `large` (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless any size prop is set).",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "status": "optional"
    },
    "mainSize": {
      "doc": "Typography size for the main content. When omitted, it falls back to `fontSize` if provided.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "large (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless `fontSize`, `mainSize`, or `auxiliarySize` is set)",
      "status": "optional"
    },
    "mainWeight": {
      "doc": "Typography weight for the main content.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "defaultValue": "medium",
      "status": "optional"
    },
    "auxiliaryWeight": {
      "doc": "Typography weight for secondary content like currency sign and affixes. If omitted, and `mainSize` equals `auxiliarySize` while `mainWeight` is omitted, `medium` is used.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "status": "optional"
    },
    "auxiliarySize": {
      "doc": "Typography size for secondary content like currency sign and affixes (`prefix` and `suffix`). When omitted, it falls back to `fontSize` if provided.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "large (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless `fontSize`, `mainSize`, or `auxiliarySize` is set)",
      "status": "optional"
    },
    "colorizeBySign": {
      "doc": "If `true`, text color follows sign tone (`+` green, `-` red).",
      "type": [
        "boolean"
      ],
      "defaultValue": "false",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Number


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "currency": {
      "doc": "Currency code (ISO 4217) or `true` to use the default `NOK`. Defaults to `true` when using `NumberFormat.Currency`. Uses two decimals by default.",
      "type": [
        "string",
        "boolean"
      ],
      "status": "optional"
    },
    "currencyDisplay": {
      "doc": "Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner), `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.",
      "type": "string",
      "status": "optional"
    },
    "currencyPosition": {
      "doc": "Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": [
        "boolean",
        "string"
      ],
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "percent": {
      "doc": "Formats the value as a percentage.",
      "type": "boolean",
      "status": "optional"
    },
    "fontSize": {
      "doc": "Typography size fallback used for both main and auxiliary content. `mainSize` and `auxiliarySize` override this value. If omitted, default is `large` (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless any size prop is set).",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "status": "optional"
    },
    "mainSize": {
      "doc": "Typography size for the main content. When omitted, it falls back to `fontSize` if provided.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "large (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless `fontSize`, `mainSize`, or `auxiliarySize` is set)",
      "status": "optional"
    },
    "mainWeight": {
      "doc": "Typography weight for the main content.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "defaultValue": "medium",
      "status": "optional"
    },
    "auxiliaryWeight": {
      "doc": "Typography weight for secondary content like currency sign and affixes. If omitted, and `mainSize` equals `auxiliarySize` while `mainWeight` is omitted, `medium` is used.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "status": "optional"
    },
    "auxiliarySize": {
      "doc": "Typography size for secondary content like currency sign and affixes (`prefix` and `suffix`). When omitted, it falls back to `fontSize` if provided.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "large (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless `fontSize`, `mainSize`, or `auxiliarySize` is set)",
      "status": "optional"
    },
    "colorizeBySign": {
      "doc": "If `true`, text color follows sign tone (`+` green, `-` red).",
      "type": [
        "boolean"
      ],
      "defaultValue": "false",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Trend


```json
{
  "props": {
    "value": {
      "doc": "Numeric or string value used to resolve the trend sign and tone. When omitted, the value is extracted from `children`.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "children": {
      "doc": "Trend value content, e.g. `+12.4%` or `-2.1%`.",
      "type": [
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "tone": {
      "doc": "Tone override for state styling.",
      "type": [
        "\"positive\"",
        "\"negative\"",
        "\"neutral\""
      ],
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Rating


```json
{
  "props": {
    "value": {
      "doc": "Rating value used to colorize stars.",
      "type": [
        "number"
      ],
      "defaultValue": "0",
      "status": "optional"
    },
    "max": {
      "doc": "Total number of items to render. Defaults to `5` for `stars` and `7` for `progressive`. Values above `20` are clamped and a warning is emitted.",
      "type": [
        "number"
      ],
      "defaultValue": "5 (stars), 7 (progressive)",
      "status": "optional"
    },
    "variant": {
      "doc": "Visual variant.",
      "type": [
        "\"stars\"",
        "\"progressive\""
      ],
      "defaultValue": "\"stars\"",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Info


```json
{
  "props": {
    "children": {
      "doc": "Additional descriptive information.",
      "type": [
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "variant": {
      "doc": "Info color style variant.",
      "type": [
        "\"plain\"",
        "\"subtle\"",
        "\"prominent\""
      ],
      "defaultValue": "\"subtle\"",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Root


```json
{
  "props": {
    "children": {
      "doc": "Use `Stat.Label` (`dt`) and `Stat.Content` (`dd`) inside root.",
      "type": [
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "visualOrder": {
      "doc": "Visual order of label and content while keeping semantic `dt`/`dd` markup in DOM.",
      "type": [
        "\"label-content\"",
        "\"content-label\""
      ],
      "defaultValue": "\"label-content\"",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state to all Stat sub-components.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Label


```json
{
  "props": {
    "children": {
      "doc": "Label content.",
      "type": [
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "srOnly": {
      "doc": "If `true`, hides the label visually while keeping it available for screen readers.",
      "type": [
        "boolean"
      ],
      "defaultValue": "false",
      "status": "optional"
    },
    "fontWeight": {
      "doc": "Typography weight for the label.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "defaultValue": "\"regular\"",
      "status": "optional"
    },
    "fontSize": {
      "doc": "Typography size for the label. Line-height is derived from the shared heading/text scale.",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "defaultValue": "\"basis\"",
      "status": "optional"
    },
    "variant": {
      "doc": "Label color style variant.",
      "type": [
        "\"plain\"",
        "\"subtle\""
      ],
      "defaultValue": "\"plain\"",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Content


```json
{
  "props": {
    "children": {
      "doc": "Content value area. Typically contains `Stat.Number`, `Stat.Currency`, `Stat.Percent`, `Stat.Text`, `Stat.Trend`, or `Stat.Info`.",
      "type": [
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "direction": {
      "doc": "Layout direction for the content items.",
      "type": [
        "\"horizontal\"",
        "\"vertical\""
      ],
      "defaultValue": "\"horizontal\"",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Stat.Inline


```json
{
  "props": {
    "children": {
      "doc": "Inline layout container for content elements, typically `Stat.Trend` and `Stat.Info`.",
      "type": [
        "React.ReactNode"
      ],
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


## Stat.Text


```json
{
  "props": {
    "children": {
      "doc": "Custom visible content rendered using Stat value typography.",
      "type": [
        "React.ReactNode"
      ],
      "status": "optional"
    },
    "fontSize": {
      "doc": "Typography size fallback used for both main and auxiliary content. `mainSize` and `auxiliarySize` override this value. If omitted, default is `large` (`basis` when nested inside `Stat.Trend` or `Stat.Info`, unless any size prop is set).",
      "type": [
        "\"x-small\"",
        "\"small\"",
        "\"basis\"",
        "\"medium\"",
        "\"large\"",
        "\"x-large\"",
        "\"xx-large\""
      ],
      "status": "optional"
    },
    "fontWeight": {
      "doc": "Typography weight for the text content.",
      "type": [
        "\"regular\"",
        "\"medium\""
      ],
      "status": "optional"
    },
    "colorizeBySign": {
      "doc": "If `true`, text color follows a signed child value when possible. You can also pass a number directly to control the tone for custom content.",
      "type": [
        "boolean",
        "number"
      ],
      "defaultValue": "false",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "skeleton": {
      "doc": "Applies skeleton loading state.",
      "type": [
        "boolean"
      ],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
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
