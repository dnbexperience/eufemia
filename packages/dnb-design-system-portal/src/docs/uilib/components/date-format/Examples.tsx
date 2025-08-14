/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Card, DateFormat, P } from '@dnb/eufemia/src'

const Style = styled.div`
  p > .dnb-date-format {
    display: block;
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
    <ComponentBox>
      <P>
        <strong>Basic relative time:</strong>
        <br />
        Skrevet{' '}
        <DateFormat
          value={new Date(new Date().getTime() - 30 * 1000)}
          relativeTime
        />
        <br />
        <DateFormat
          value={new Date(new Date().getTime() - 2 * 60 * 1000)}
          relativeTime
        />
        <br />
        <DateFormat
          value={new Date(new Date().getTime() - 24 * 60 * 60 * 1000)}
          relativeTime
        />
      </P>
    </ComponentBox>
  )
}

export const RelativeTimeWithStyles = () => {
  // Create dates for demonstration
  const now = new Date()
  const pastDates = [
    new Date(now.getTime() - 30 * 1000), // 30 seconds ago
    new Date(now.getTime() - 2 * 60 * 1000), // 2 minutes ago
    new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
  ]

  const futureDates = [
    new Date(now.getTime() + 45 * 1000), // 45 seconds from now
    new Date(now.getTime() + 5 * 60 * 1000), // 5 minutes from now
    new Date(now.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
    new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
  ]

  return (
    <Style>
      <ComponentBox
        scope={{
          pastDates,
          futureDates,
        }}
      >
        <Card stack>
          <P>
            <strong>Long (default):</strong>
            <br />
            {pastDates.map((date, index) => (
              <React.Fragment key={index}>
                <DateFormat value={date} relativeTime dateStyle="long" />
                {index < pastDates.length - 1 && <br />}
              </React.Fragment>
            ))}
          </P>

          <P>
            <strong>Short:</strong>
            <br />
            {pastDates.map((date, index) => (
              <React.Fragment key={index}>
                <DateFormat value={date} relativeTime dateStyle="short" />
                {index < pastDates.length - 1 && <br />}
              </React.Fragment>
            ))}
          </P>

          <P>
            <strong>Medium:</strong>
            <br />
            {pastDates.map((date, index) => (
              <React.Fragment key={index}>
                <DateFormat value={date} relativeTime dateStyle="medium" />
                {index < pastDates.length - 1 && <br />}
              </React.Fragment>
            ))}
          </P>

          <P>
            <strong>Future dates with long style:</strong>
            <br />
            {futureDates.map((date, index) => (
              <React.Fragment key={index}>
                <DateFormat value={date} relativeTime dateStyle="long" />
                {index < futureDates.length - 1 && <br />}
              </React.Fragment>
            ))}
          </P>

          <P>
            <strong>Different locales with short style:</strong>
            <br />
            <DateFormat
              value={pastDates[2]}
              relativeTime
              dateStyle="short"
              locale="en-GB"
            />
            <br />
            <DateFormat
              value={futureDates[2]}
              relativeTime
              dateStyle="short"
              locale="en-GB"
            />
          </P>
        </Card>
      </ComponentBox>
    </Style>
  )
}

export const DurationFormatting = () => {
  return (
    <Style>
      <ComponentBox>
        <Card stack>
          <P>
            <strong>Short durations:</strong>
            <br />
            <DateFormat value="PT1H" />
            <DateFormat value="PT2H30M" />
            <DateFormat value="PT45M" />
          </P>

          <P>
            <strong>Longer durations:</strong>
            <br />
            <DateFormat value="P1D" />
            <DateFormat value="P1DT2H30M" />
            <DateFormat value="P1W" />
            <DateFormat value="P1M" />
            <DateFormat value="P1Y" />
          </P>

          <P>
            <strong>Different locales:</strong>
            <br />
            <DateFormat value="PT2H30M" locale="en-US" />
            <DateFormat value="PT2H30M" locale="nb-NO" />
            <DateFormat value="PT2H30M" locale="de-DE" />
            <DateFormat value="PT2H30M" locale="fr-FR" />
            <DateFormat value="PT2H30M" locale="es-ES" />
          </P>

          <P>
            <strong>Edge cases:</strong>
            <br />
            <DateFormat value="PT0S" />
            <DateFormat value="P0D" />
            <DateFormat value="PT0H0M0S" />
          </P>
        </Card>
      </ComponentBox>
    </Style>
  )
}

export const DurationWithStyles = () => {
  return (
    <Style>
      <ComponentBox>
        <Card stack>
          <P>
            <strong>Long (default):</strong>
            <br />
            <DateFormat value="PT2H30M" dateStyle="long" />
            <DateFormat value="P1DT2H30M" dateStyle="long" />
          </P>

          <P>
            <strong>Short:</strong>
            <br />
            <DateFormat value="PT2H30M" dateStyle="short" />
            <DateFormat value="P1DT2H30M" dateStyle="short" />
          </P>

          <P>
            <strong>Medium:</strong>
            <br />
            <DateFormat value="PT2H30M" dateStyle="medium" />
            <DateFormat value="P1DT2H30M" dateStyle="medium" />
          </P>

          <P>
            <strong>Full:</strong>
            <br />
            <DateFormat value="PT2H30M" dateStyle="full" />
            <DateFormat value="P1DT2H30M" dateStyle="full" />
          </P>

          <P>
            <strong>Different locales with short style:</strong>
            <br />
            <DateFormat value="PT2H30M" dateStyle="short" locale="en-US" />
            <DateFormat value="PT2H30M" dateStyle="short" locale="nb-NO" />
            <DateFormat value="PT2H30M" dateStyle="short" locale="de-DE" />
            <DateFormat value="PT2H30M" dateStyle="short" locale="fr-FR" />
            <DateFormat value="PT2H30M" dateStyle="short" locale="es-ES" />
          </P>
        </Card>
      </ComponentBox>
    </Style>
  )
}
