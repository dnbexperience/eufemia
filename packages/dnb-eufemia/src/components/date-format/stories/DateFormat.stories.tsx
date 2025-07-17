/**
 * @dnb/eufemia Component Story
 *
 */

import React, { useContext } from 'react'
import DateFormat from '../'
import Card from '../../Card'
import { Context, Provider } from '../../../shared'
import { Dropdown } from '../../lib'

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
      }}
      on_change={({ data: { value } }) => {
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
    <Card stack>
      <DateFormat value={thirtySecondsAgo} relativeTime />
      <DateFormat value={fiveMinutesAgo} relativeTime />
      <DateFormat value={twoDaysAgo} relativeTime />
      <DateFormat value={twoWeeksAgo} relativeTime />
      <DateFormat value={threeMonthsAgo} relativeTime />
      <DateFormat value={oneYearAgo} relativeTime />
      <DateFormat value={fortyFiveSecondsUntilNow} relativeTime />
      <DateFormat value={fiveMinutesUntilNow} relativeTime />
      <DateFormat value={twoDaysUntilNow} relativeTime />
      <DateFormat value={twoWeeksUntilNow} relativeTime />
      <DateFormat value={threeMonthsUntilNow} relativeTime />
      <DateFormat value={oneYearUntilNow} relativeTime />
    </Card>
  )
}
