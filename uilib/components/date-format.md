---
title: 'DateFormat'
description: 'A ready to use DNB date formatter.'
metadata: https://eufemia.dnb.no/uilib/components/date-format/metadata.json
---

## Import

```tsx
import { DateFormat } from '@dnb/eufemia'
```

## Description

A ready to use DNB date formatter. Use it wherever you want to format dates.

Good reasons to use this component:

- Makes the date formatting uniform for all DNB applications.
- Makes dates accessible to screen readers.

Good to know:

- You can render a date in **different formats**, depending on the locale.
- The component supports **relative time**, such as "2 hours ago", "in 3 days", etc.
- The component supports different **date styles**, such as `short`, `medium`, `long`, and `full`.
- You can include **time** by using the `timeStyle` prop.
- Use `relativeTimeStyle` to control the style used for relative time.
- The component will automatically detect and format **ISO 8601 duration** strings.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/date-format)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/date-format)

### Under the hood

The component uses `Intl.DateTimeFormat` browser API and `Date.toLocaleDateString` as a fallback, to format dates based on locale.

See [Intl.DateTimeFormat locale documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument) for accepted string formats.

The [time element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time) is used to ensure that the date is readable for screen readers.

### Supported date value formats

The following formats are supported as date values for conversion:

- `yyyy-MM-dd`
- `dd.MM.yyyy`
- `dd/MM/yyyy`
- `Date` object

### Relative time reference

When using `relativeTime`, you can provide a `now` prop (as a function) to define the reference point for relative time calculations. This is useful for testing or when you need a specific reference time. If not provided, the current time is used.

### `formatDate` helper function

If you really need a formatted date string without rendering the component, you can import the utility directly:

```ts
import { formatDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
formatDate('2023-01-01', {
  locale: 'en-GB',
  dateStyle: 'long',
})
```

### `getOsloDate` helper

When you need a UTC Date object with midnight that always reflects the current day in `Europe/Oslo`, pull in the helper directly:

```ts
import { getOsloDate } from '@dnb/eufemia/components/date-format/DateFormatUtils'
getOsloDate() // -> e.g. Date object representing "2025-11-24T00:00:00.000Z" regardless of the runtime timezone
```

This is helpful when you are comparing "today" against backend data or applying Oslo-specific highlighting in the [DatePicker](/uilib/components/date-picker/).

#### Parameters

| Name      | Type                         | Default                  | Description                                                                                                                                                       |
| --------- | ---------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `locale`  | `AnyLocale`                  | `'nb-NO'`                | The locale to use for formatting.                                                                                                                                 |
| `options` | `Intl.DateTimeFormatOptions` | `{ dateStyle: 'short' }` | The format options following the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) API. |

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Date styles

```tsx
render(
  <Style>
    <ComponentBox data-visual-test="date-format-date-styles">
      <P>
        <DateFormat dateStyle="full">2025-08-01</DateFormat>
        <DateFormat dateStyle="long">2025-08-01</DateFormat>
        <DateFormat dateStyle="medium">2025-08-01</DateFormat>
        <DateFormat dateStyle="short">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>,
)
```

### Inline

```tsx
render(
  <P>
    Payment due <DateFormat>2025-08-01</DateFormat>. Please make sure you
    have sufficient funds available.
  </P>,
)
```

### Date value formats

```tsx
render(
  <Style>
    <ComponentBox>
      <P>
        <DateFormat>2025-08-01</DateFormat>
        <DateFormat>01.08.2025</DateFormat>
        <DateFormat>01/08/2025</DateFormat>
        <DateFormat value={new Date('2025-08-01')} />
      </P>
    </ComponentBox>
  </Style>,
)
```

### Date and time

Use the `timeStyle` property to include a time value alongside the date. Add
`dateTimeSeparator` if you need a custom separator.

```tsx
render(
  <P>
    Updated at{' '}
    <DateFormat
      value={new Date('2026-01-13T11:55:00')}
      dateStyle="medium"
      timeStyle="short"
      dateTimeSeparator=" – "
    />
  </P>,
)
```

### Relative time

```tsx
render(
  <Style>
    <ComponentBox>
      <P>
        <DateFormat
          value={new Date(new Date().getTime() - 30 * 1000)}
          relativeTime
        />
        <DateFormat
          value={new Date(new Date().getTime() - 2 * 60 * 1000)}
          relativeTime
        />
        <DateFormat
          value={new Date(new Date().getTime() - 24 * 60 * 60 * 1000)}
          relativeTime
        />
      </P>
    </ComponentBox>
  </Style>,
)
```

### Relative time with different styles

Use `relativeTimeStyle` to control the relative time formatting without affecting `dateStyle`.

```tsx
render(
  <Style>
    <ComponentBox
      scope={{
        pastDates,
        futureDates,
      }}
      hideCode
    >
      <H4>Short:</H4>
      {pastDates.map((date, index) => (
        <P key={index}>
          <DateFormat
            value={date}
            relativeTime
            relativeTimeStyle="short"
          />
          {index < pastDates.length - 1 && <br />}
        </P>
      ))}

      <H4>Medium:</H4>
      {pastDates.map((date, index) => (
        <P key={index}>
          <DateFormat
            value={date}
            relativeTime
            relativeTimeStyle="medium"
          />
          {index < pastDates.length - 1 && <br />}
        </P>
      ))}

      <H4>Long (default):</H4>
      {pastDates.map((date, index) => (
        <P key={index}>
          <DateFormat value={date} relativeTime relativeTimeStyle="long" />
          {index < pastDates.length - 1 && <br />}
        </P>
      ))}

      <H4>Future dates with long style:</H4>
      {futureDates.map((date, index) => (
        <P key={index}>
          <DateFormat value={date} relativeTime relativeTimeStyle="long" />
          {index < futureDates.length - 1 && <br />}
        </P>
      ))}

      <H4>Different locales with short style:</H4>
      <P>
        <DateFormat
          value={pastDates[2]}
          relativeTime
          relativeTimeStyle="short"
          locale="de-DE"
        />
        <DateFormat
          value={futureDates[2]}
          relativeTime
          relativeTimeStyle="short"
          locale="sv-SE"
        />
      </P>
    </ComponentBox>
  </Style>,
)
```

### Duration formatting

The DateFormat component automatically detects and formats ISO
8601 duration strings. No additional properties are needed.

- `PT1H` = 1 hour (P = period, T = time, 1H = 1 hour)
- `PT2H30M` = 2 hours 30 minutes
- `P1D` = 1 day (P = period, 1D = 1 day)
- `P1DT2H30M` = 1 day 2 hours 30 minutes
- `P1W` = 1 week,
- `P1M` = 1 month
- `P1Y` = 1 year

```tsx
render(
  <Style>
    <ComponentBox>
      <H4>Short durations:</H4>
      <P>
        <DateFormat value="PT1H" />
        <DateFormat value="PT2H30M" />
        <DateFormat value="PT45M" />
      </P>

      <H4>Longer durations:</H4>
      <P>
        <DateFormat value="P1D" />
        <DateFormat value="P1DT2H30M" />
        <DateFormat value="P1W" />
        <DateFormat value="P1M" />
        <DateFormat value="P1Y" />
      </P>

      <H4>Different locales:</H4>
      <P>
        <DateFormat value="PT2H30M" locale="en-US" />
        <DateFormat value="PT2H30M" locale="nb-NO" />
        <DateFormat value="PT2H30M" locale="de-DE" />
      </P>
    </ComponentBox>
  </Style>,
)
```

### Duration with different styles

The `dateStyle` property affects how durations are formatted using the browser's built-in `Intl.DurationFormat` API.

```tsx
render(
  <Style>
    <ComponentBox>
      <H4>Short:</H4>
      <P>
        <DateFormat value="PT2H30M" dateStyle="short" />
        <DateFormat value="P1DT2H30M" dateStyle="short" />
      </P>

      <H4>Medium:</H4>
      <P>
        <DateFormat value="PT2H30M" dateStyle="medium" />
        <DateFormat value="P1DT2H30M" dateStyle="medium" />
      </P>

      <H4>Long (default):</H4>
      <P>
        <DateFormat value="PT2H30M" dateStyle="long" />
        <DateFormat value="P1DT2H30M" dateStyle="long" />
      </P>

      <H4>Different locales with short style:</H4>
      <P>
        <DateFormat value="PT2H30M" dateStyle="short" locale="en-US" />
        <DateFormat value="PT2H30M" dateStyle="short" locale="nb-NO" />
        <DateFormat value="PT2H30M" dateStyle="short" locale="de-DE" />
      </P>
    </ComponentBox>
  </Style>,
)
```
