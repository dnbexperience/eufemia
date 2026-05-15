/**
 * UI lib Component Example
 *
 */

import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { DateFormat, H4, Hr, P } from '@dnb/eufemia/src'

const Style = styled.div`
  p > .dnb-date-format {
    display: block;
    width: fit-content;
  }
`

export const SupportedFormats = () => {
  return (
    <Style>
      <ComponentBox>
        <P>
          <DateFormat>2025-08-01</DateFormat>
          <DateFormat>01.08.2025</DateFormat>
          <DateFormat>01/08/2025</DateFormat>
          <DateFormat value={new Date('2025-08-01')} />
        </P>
      </ComponentBox>
    </Style>
  )
}

export const DateStyles = () => (
  <Style>
    <ComponentBox data-visual-test="date-format-date-styles">
      <P>
        <DateFormat dateStyle="full">2025-08-01</DateFormat>
        <DateFormat dateStyle="long">2025-08-01</DateFormat>
        <DateFormat dateStyle="medium">2025-08-01</DateFormat>
        <DateFormat dateStyle="short">2025-08-01</DateFormat>
      </P>
    </ComponentBox>
  </Style>
)

export const HideCurrentYear = () => {
  return (
    <Style>
      <ComponentBox>
        {() => {
          const currentYear = new Date().getFullYear()
          const dateInCurrentYear = `${currentYear}-02-04`
          const dateInOtherYear = `${currentYear - 1}-02-04`

          return (
            <>
              <P>
                <DateFormat
                  value={dateInCurrentYear}
                  dateStyle="medium"
                  hideCurrentYear
                />
                <DateFormat
                  value={dateInOtherYear}
                  dateStyle="medium"
                  hideCurrentYear
                />
              </P>
              <Hr />
              <P>
                <DateFormat
                  value={dateInCurrentYear}
                  dateStyle="long"
                  hideCurrentYear
                />
                <DateFormat
                  value={dateInOtherYear}
                  dateStyle="long"
                  hideCurrentYear
                />
              </P>
            </>
          )
        }}
      </ComponentBox>
    </Style>
  )
}

export const DateFormatInline = () => {
  return (
    <ComponentBox data-visual-test="date-format-date-inline">
      <P>
        Payment due <DateFormat>2025-08-01</DateFormat>. Please make sure
        you have sufficient funds available.
      </P>
    </ComponentBox>
  )
}

export const RelativeTime = () => {
  return (
    <Style>
      <ComponentBox>
        {() => {
          const referenceDate = new Date('2025-06-01T12:00:00')
          return (
            <P>
              <DateFormat
                value={new Date('2025-06-01T11:59:30')}
                relativeTime
                relativeTimeReference={() => referenceDate}
              />
              <DateFormat
                value={new Date('2025-06-01T11:58:00')}
                relativeTime
                relativeTimeReference={() => referenceDate}
              />
              <DateFormat
                value={new Date('2025-05-31T12:00:00')}
                relativeTime
                relativeTimeReference={() => referenceDate}
              />
            </P>
          )
        }}
      </ComponentBox>
    </Style>
  )
}

export const RelativeTimeWithStyles = () => {
  // Use fixed dates with a fixed reference to avoid SSR hydration mismatches
  const referenceDate = new Date('2025-06-01T12:00:00')
  const pastDates = [
    new Date('2025-06-01T11:59:30'), // 30 seconds before reference
    new Date('2025-06-01T11:58:00'), // 2 minutes before reference
    new Date('2025-06-01T09:00:00'), // 3 hours before reference
    new Date('2025-05-30T12:00:00'), // 2 days before reference
    new Date('2025-05-25T12:00:00'), // 1 week before reference
  ]

  const futureDates = [
    new Date('2025-06-01T12:00:45'), // 45 seconds after reference
    new Date('2025-06-01T12:05:00'), // 5 minutes after reference
    new Date('2025-06-01T14:00:00'), // 2 hours after reference
    new Date('2025-06-04T12:00:00'), // 3 days after reference
    new Date('2025-06-15T12:00:00'), // 2 weeks after reference
  ]

  return (
    <Style>
      <ComponentBox
        scope={{
          pastDates,
          futureDates,
          referenceDate,
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
              relativeTimeReference={() => referenceDate}
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
              relativeTimeReference={() => referenceDate}
            />
            {index < pastDates.length - 1 && <br />}
          </P>
        ))}

        <H4>Long (default):</H4>
        {pastDates.map((date, index) => (
          <P key={index}>
            <DateFormat
              value={date}
              relativeTime
              relativeTimeStyle="long"
              relativeTimeReference={() => referenceDate}
            />
            {index < pastDates.length - 1 && <br />}
          </P>
        ))}

        <H4>Future dates with long style:</H4>
        {futureDates.map((date, index) => (
          <P key={index}>
            <DateFormat
              value={date}
              relativeTime
              relativeTimeStyle="long"
              relativeTimeReference={() => referenceDate}
            />
            {index < futureDates.length - 1 && <br />}
          </P>
        ))}

        <H4>Different locales with short style:</H4>
        <P>
          <DateFormat
            value={pastDates[2]}
            relativeTime
            relativeTimeStyle="short"
            relativeTimeReference={() => referenceDate}
            locale="de-DE"
          />
          <DateFormat
            value={futureDates[2]}
            relativeTime
            relativeTimeStyle="short"
            relativeTimeReference={() => referenceDate}
            locale="sv-SE"
          />
        </P>
      </ComponentBox>
    </Style>
  )
}

export const DurationFormatting = () => {
  return (
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
    </Style>
  )
}

export const DurationWithStyles = () => {
  return (
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
    </Style>
  )
}

export const DateAndTime = () => {
  return (
    <ComponentBox>
      <P>
        Updated at{' '}
        <DateFormat
          value={new Date('2026-01-13T11:55:00')}
          dateStyle="medium"
          timeStyle="short"
          dateTimeSeparator=" – "
        />
      </P>
    </ComponentBox>
  )
}
