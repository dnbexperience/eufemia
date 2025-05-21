/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import DateFormat from '../'
import Card from '../../Card'

export default {
  title: 'Eufemia/Components/DateFormat',
}

export function DateFormatExample() {
  const date = new Date('2025-11-02')

  return (
    <Card stack>
      {/* <DateFormat date="2025-11-01" variant="long" />
      <DateFormat date={new Date('2027-05-03')} variant="long" />
      <DateFormat variant="long">2026-12-02|2027-05-03</DateFormat>

      <DateFormat date="2025-11-01" variant="numeric" />
      <DateFormat date={new Date('2027-05-03')} variant="numeric" />
      <DateFormat variant="numeric">2026-12-02</DateFormat>

      <DateFormat date="2025-11-01" variant="short" />
      <DateFormat date={new Date('2027-05-03')} variant="short" />
      <DateFormat variant="short">2026-12-02</DateFormat> */}

      {/* <DateTimeFormatTest
        date={new Date()}
        options={{ weekday: 'long', day: '2-digit' }}
      />
      <DateTimeFormatTest
        date={new Date()}
        options={{ weekday: 'short', day: '2-digit' }}
      />
      <DateTimeFormatTest
        date={new Date()}
        options={{ weekday: 'narrow', day: 'numeric' }}
      /> */}

      <DateFormat date={date} dateStyle="full" weekday="long" />
      <DateFormat date={date} dateStyle="long" />
      <DateFormat date={date} dateStyle="medium" />
      <DateFormat date={date} dateStyle="short" />

      <DateTimeFormatTest
        date={date}
        options={{
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }}
      />
      <DateTimeFormatTest
        date={date}
        options={{
          // weekday: 'long',
          // month: 'long',
          // day: 'numeric',
          // year: 'numeric',
          dateStyle: 'full',
        }}
      />
      <DateTimeFormatTest
        date={date}
        options={{
          // weekday: 'long',
          // month: 'long',
          // day: 'numeric',
          // year: 'numeric',
          dateStyle: 'long',
        }}
      />
      <DateTimeFormatTest
        date={date}
        options={{
          // weekday: 'long',
          // month: 'long',
          // day: 'numeric',
          // year: 'numeric',
          dateStyle: 'medium',
        }}
      />
      <DateTimeFormatTest
        date={date}
        options={{
          // weekday: 'long',
          // month: 'long',
          // day: 'numeric',
          // year: 'numeric',

          timeStyle: 'short',
        }}
      />
    </Card>
  )
}

type DateTimeFormatTestOptions = {
  date: Date
  options: Intl.DateTimeFormatOptions
}

function DateTimeFormatTest({ date, options }: DateTimeFormatTestOptions) {
  const formattedDate = new Intl.DateTimeFormat('nb-NO', options).format(
    date
  )
  console.log('Object.entries(options)', Object.entries(options))
  return (
    <p>
      {Object.keys(options)
        .map((o) => `${o}-${options[o]}`)
        .join('-')}
      : {formattedDate}
    </p>
  )
}
