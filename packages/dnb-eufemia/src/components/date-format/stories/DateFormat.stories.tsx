/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useContext } from 'react'
import DateFormat from '../'
import { Context, Provider } from '../../../shared'
import { Dropdown, Card, P } from '../../../'

export default {
  title: 'Eufemia/Components/DateFormat',
}

const LocaleChanger = () => {
  const { setLocale, locale } = useContext(Context)

  return (
    <Dropdown
      value={locale}
      data={{
        'en-GB': 'English',
        'en-US': 'English (US)',
        'nb-NO': 'Norsk',
        'sv-SE': 'Svenska',
        'da-DK': 'Dansk',
      }}
      onChange={({ data: { value } }) => {
        setLocale(value)
      }}
    />
  )
}

export function DateFormatExamples() {
  return (
    <Provider>
      <Card stack bottom="large">
        <DateFormat value="2025-08-01" dateStyle="full" />
        <DateFormat value="2025-08-01" dateStyle="long" />
        <DateFormat value="2025-08-01" dateStyle="medium" />
        <DateFormat value="2025-08-01" dateStyle="short" />
      </Card>
      <LocaleChanger />
    </Provider>
  )
}

export function DateFormatInvalidValues() {
  return (
    <Card stack>
      <DateFormat dateStyle="full" value={null}>
        {''}
      </DateFormat>
      <DateFormat dateStyle="long" value={''}>
        {null}
      </DateFormat>
      <DateFormat dateStyle="medium">{''}</DateFormat>
      <DateFormat dateStyle="short">2025-0</DateFormat>
      <DateFormat dateStyle="short" value={undefined}>
        {undefined}
      </DateFormat>
      <DateFormat dateStyle="short" />
      <DateFormat dateStyle="short" value={new Date('2025-16')}>
        {null}
      </DateFormat>
      <DateFormat dateStyle="short">{null}</DateFormat>
      <DateFormat dateStyle="short" value={undefined}>
        {null}
      </DateFormat>
    </Card>
  )
}
export function RelativeTime() {
  const thirtySecondsAgo = new Date(Date.now() - 30 * 1000)
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  const twoWeeksAgo = new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000)
  const threeMonthsAgo = new Date(
    Date.now() - 3 * 30 * 24 * 60 * 60 * 1000
  )
  const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)

  const fortyFiveSecondsUntilNow = new Date(Date.now() + 45 * 1000)
  const fiveMinutesUntilNow = new Date(Date.now() + 5 * 60 * 1000)
  const twoDaysUntilNow = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const twoWeeksUntilNow = new Date(
    Date.now() + 2 * 7 * 24 * 60 * 60 * 1000
  )
  const threeMonthsUntilNow = new Date(
    Date.now() + 3 * 30 * 24 * 60 * 60 * 1000
  )
  const oneYearUntilNow = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)

  return (
    <Provider>
      <Card stack>
        <P>
          Skrevet <DateFormat value={thirtySecondsAgo} relativeTime />
        </P>

        <P>
          Skrevet <DateFormat value={fiveMinutesAgo} relativeTime />
        </P>

        <P>
          Skrevet <DateFormat value={twoDaysAgo} relativeTime />
        </P>

        <P>
          Skrevet <DateFormat value={twoWeeksAgo} relativeTime />
        </P>

        <P>
          Skrevet <DateFormat value={threeMonthsAgo} relativeTime />
        </P>

        <P>
          Skrevet <DateFormat value={oneYearAgo} relativeTime />
        </P>

        <P>
          Publiseres{' '}
          <DateFormat value={fortyFiveSecondsUntilNow} relativeTime />
        </P>

        <P>
          Publiseres{' '}
          <DateFormat value={fiveMinutesUntilNow} relativeTime />
        </P>

        <P>
          Publiseres <DateFormat value={twoDaysUntilNow} relativeTime />
        </P>

        <P>
          Publiseres <DateFormat value={twoWeeksUntilNow} relativeTime />
        </P>

        <P>
          Publiseres{' '}
          <DateFormat value={threeMonthsUntilNow} relativeTime />
        </P>

        <P>
          Publiseres <DateFormat value={oneYearUntilNow} relativeTime />
        </P>
      </Card>
      <LocaleChanger />
    </Provider>
  )
}

export function Duration() {
  return (
    <Card stack>
      <P>
        <strong>Short durations:</strong>
      </P>
      <DateFormat value="PT1H" />
      <DateFormat value="PT1H" locale="de-CH" />
      <DateFormat value="PT2H30M" />
      <P>
        <strong>Longer durations:</strong>
      </P>
      <DateFormat value="P1D" />
      <DateFormat value="P1DT2H30M" />
      <DateFormat value="P1W" />
      <DateFormat value="P1M" />
      <DateFormat value="P1Y" />
      <P>
        <strong>Edge cases:</strong>
      </P>
      <DateFormat value="PT0S" />
      <DateFormat value="P0D" />
      <DateFormat value="PT0H0M0S" />
    </Card>
  )
}

export function DurationWithDateStyle() {
  return (
    <Card stack>
      <P>
        <strong>
          Duration formatting with different dateStyle options:
        </strong>
      </P>
      <P>
        The output now depends on the browser's built-in
        Intl.RelativeTimeFormat API, which provides different styles for
        different locales.
      </P>
      <P>
        <strong>Long (default):</strong>
      </P>
      <DateFormat value="PT2H30M" dateStyle="long" />
      <DateFormat value="P1DT2H30M" dateStyle="long" />
      <P>
        <strong>Short:</strong>
      </P>
      <DateFormat value="PT2H30M" dateStyle="short" />
      <DateFormat value="P1DT2H30M" dateStyle="short" />
      <P>
        <strong>Medium:</strong>
      </P>
      <DateFormat value="PT2H30M" dateStyle="medium" />
      <DateFormat value="P1DT2H30M" dateStyle="medium" />
      <P>
        <strong>Full:</strong>
      </P>
      <DateFormat value="PT2H30M" dateStyle="full" />
      <DateFormat value="P1DT2H30M" dateStyle="full" />

      <P>
        <strong>Different locales with short style:</strong>
      </P>
      <DateFormat value="PT2H30M" dateStyle="short" locale="en-US" />
      <DateFormat value="PT2H30M" dateStyle="short" locale="nb-NO" />
      <DateFormat value="PT2H30M" dateStyle="short" locale="de-DE" />
      <DateFormat value="PT2H30M" dateStyle="short" locale="fr-FR" />
      <DateFormat value="PT2H30M" dateStyle="short" locale="es-ES" />
    </Card>
  )
}
